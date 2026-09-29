export const CONSENT_COOKIE = "beehive_consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
export const CONSENT_EVENT = "beehive-consent";
export const OPEN_SETTINGS_EVENT = "beehive-cookie-settings";

export type Consent = {
  map: boolean;
};

export function parseConsent(value: string | null | undefined): Consent | null {
  if (!value) return null;
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    return null;
  }
  const map = decoded.match(/(?:^|;)map=([01])(?:;|$)/);
  if (!map) return null;
  return { map: map[1] === "1" };
}

export function serializeConsent(consent: Consent) {
  return `map=${consent.map ? "1" : "0"}`;
}

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const entry = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  if (!entry) return null;
  return parseConsent(entry.slice(CONSENT_COOKIE.length + 1));
}

export function writeConsent(consent: Consent) {
  const secure =
    typeof location !== "undefined" && location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${CONSENT_COOKIE}=${serializeConsent(consent)}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
}
