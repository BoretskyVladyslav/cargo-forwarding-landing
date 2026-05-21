export const CONTACT_PHONE_DISPLAY = "+38 (067) 000-00-00";

const phoneDigits = CONTACT_PHONE_DISPLAY.replace(/\D/g, "");

/** E.164 digits derived from display — keeps `tel:` links in sync. */
export const CONTACT_PHONE_TEL = `+${phoneDigits}`;

export const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE_TEL}`;

export const CONTACT_EMAIL = "office@ktek.ua";

export const CONTACT_MAILTO_HREF = `mailto:${CONTACT_EMAIL}`;
