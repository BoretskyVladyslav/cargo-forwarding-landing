import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

/**
 * Resend client singleton. Only constructed when `RESEND_API_KEY` is set,
 * so this module can load when email is intentionally disabled.
 */
export const resend: Resend | null =
  typeof apiKey === 'string' && apiKey.trim().length > 0 ? new Resend(apiKey.trim()) : null;
