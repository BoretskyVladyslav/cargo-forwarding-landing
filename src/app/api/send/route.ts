import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

/** E.164 national number length: accept 10–15 digits after normalizing. */
function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (trimmed.length < 10 || trimmed.length > 25) return false;
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) return false;
  const digitsOnly = trimmed.replace(/\D/g, '');
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Build a conservative `tel:` href (digits; leading `+` preserved when provided). */
function telHref(phone: string): string {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return 'tel:';
  const dial = trimmed.startsWith('+') ? `+${digits}` : digits;
  return `tel:${dial}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const phoneRaw =
    typeof body === 'object' &&
    body !== null &&
    'phone' in body &&
    typeof (body as { phone: unknown }).phone === 'string'
      ? (body as { phone: string }).phone
      : undefined;

  if (!isValidPhone(phoneRaw ?? '')) {
    return NextResponse.json(
      { error: 'Invalid phone number. Provide a string with 10–15 digits.' },
      { status: 400 }
    );
  }

  const phone = phoneRaw!.trim();
  const notificationEmail = process.env.NOTIFICATION_EMAIL?.trim();

  if (!notificationEmail) {
    return NextResponse.json(
      { error: 'Server is not configured to receive notifications.' },
      { status: 503 }
    );
  }

  if (!resend) {
    return NextResponse.json(
      { error: 'Email provider is not configured.' },
      { status: 503 }
    );
  }

  const displayPhone = escapeHtml(phone);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Landed Lead <onboarding@resend.dev>',
      to: [notificationEmail],
      subject: '🚚 New Callback Request - Logistics Landing',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0F172A; border-bottom: 2px solid #F59E0B; padding-bottom: 10px;">New Request for Cargo Transportation</h2>
          <p style="font-size: 16px; margin-top: 20px;">A potential B2B client has requested a callback:</p>
          <div style="background-color: #F8FAFC; padding: 15px; border-left: 4px solid #F59E0B; margin: 20px 0;">
            <p style="font-size: 18px; margin: 0; font-weight: bold;">Phone: <a href="${escapeHtml(telHref(phone))}" style="color: #1E293B; text-decoration: none;">${displayPhone}</a></p>
          </div>
          <p style="font-size: 12px; color: #64748B; margin-top: 30px;">Sent automatically from your Next.js landing page.</p>
        </div>
      `,
    });

    if (error) {
      const status =
        typeof error === 'object' &&
        error !== null &&
        'statusCode' in error &&
        typeof (error as { statusCode: unknown }).statusCode === 'number'
          ? (error as { statusCode: number }).statusCode
          : undefined;
      const upstreamStatus =
        typeof status === 'number' && status >= 400 && status < 600 ? status : 502;
      const message =
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message: unknown }).message === 'string'
          ? (error as { message: string }).message
          : 'Failed to send notification email.';
      return NextResponse.json({ error: message }, { status: upstreamStatus });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to send notification email.' }, { status: 500 });
  }
}
