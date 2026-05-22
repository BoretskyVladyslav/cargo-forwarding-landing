import { NextResponse } from 'next/server';

import { resend } from '@/lib/resend';



/** Resend sandbox — must use onboarding@resend.dev until a domain is verified. */

const RESEND_FROM = 'KTEK <onboarding@resend.dev>' as const;



function countPhoneDigits(phone: string): number {

  return phone.replace(/\D/g, '').length;

}



function isValidPhone(phone: string): boolean {

  const digits = countPhoneDigits(phone);

  return digits >= 10 && digits <= 15;

}



function escapeHtml(text: string): string {

  return text

    .replace(/&/g, '&amp;')

    .replace(/</g, '&lt;')

    .replace(/>/g, '&gt;')

    .replace(/"/g, '&quot;')

    .replace(/'/g, '&#39;');

}



function telHref(phone: string): string {

  const trimmed = phone.trim();

  const digits = trimmed.replace(/\D/g, '');

  if (!digits) return 'tel:';

  const dial = trimmed.startsWith('+') ? `+${digits}` : digits;

  return `tel:${dial}`;

}



function readStringField(body: unknown, key: string): string | undefined {

  if (typeof body !== 'object' || body === null || !(key in body)) return undefined;

  const value = (body as Record<string, unknown>)[key];

  return typeof value === 'string' ? value : undefined;

}



export async function POST(request: Request) {

  let body: unknown;

  try {

    body = await request.json();

  } catch {

    return NextResponse.json({ error: 'Некоректний запит.' }, { status: 400 });

  }



  const systemReq = readStringField(body, 'system_req') ?? '';

  if (systemReq.trim().length > 0) {

    return NextResponse.json({ ok: true }, { status: 200 });

  }



  const phoneRaw = readStringField(body, 'phone');



  if (!phoneRaw || !isValidPhone(phoneRaw)) {

    return NextResponse.json(

      { error: 'Некоректний формат телефону' },

      { status: 400 },

    );

  }



  const phone = phoneRaw.trim();

  const notificationEmail = process.env.NOTIFICATION_EMAIL?.trim();



  if (!notificationEmail) {

    return NextResponse.json(

      { error: 'Сервер тимчасово не приймає заявки. Спробуйте пізніше.' },

      { status: 503 },

    );

  }



  if (!resend) {

    return NextResponse.json(

      { error: 'Сервер тимчасово не приймає заявки. Спробуйте пізніше.' },

      { status: 503 },

    );

  }



  const displayPhone = escapeHtml(phone);



  try {

    const { data, error } = await resend.emails.send({

      from: 'KTEK Logistics <info@kteklogistics.com>', 

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

        typeof status === 'number' && status >= 400 && status < 600 ? status : 500;

      return NextResponse.json(

        { error: 'Не вдалося надіслати заявку. Спробуйте пізніше.' },

        { status: upstreamStatus },

      );

    }



    if (!data?.id) {

      return NextResponse.json(

        { error: 'Не вдалося надіслати заявку. Спробуйте пізніше.' },

        { status: 502 },

      );

    }



    return NextResponse.json({ ok: true, id: data.id }, { status: 200 });

  } catch {

    return NextResponse.json(

      { error: 'Не вдалося надіслати заявку. Спробуйте пізніше.' },

      { status: 500 },

    );

  }

}


