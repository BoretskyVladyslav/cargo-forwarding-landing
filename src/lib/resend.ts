import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

export const resend: Resend | null =
  typeof apiKey === 'string' && apiKey.trim().length > 0 ? new Resend(apiKey.trim()) : null;
