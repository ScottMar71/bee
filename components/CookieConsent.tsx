"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  CONSENT_EVENT,
  OPEN_SETTINGS_EVENT,
  readConsent,
  writeConsent,
  type Consent,
} from "@/lib/consent";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick";

export function CookieSettingsButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center underline underline-offset-2 hover:text-brick ${focusRing} ${className}`}
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
    >
      Cookie settings
    </button>
  );
}

export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
    const open = () => setSettingsOpen(true);
    const sync = () => setConsent(readConsent());
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    window.addEventListener(CONSENT_EVENT, sync);
    return () => {
      window.removeEventListener(OPEN_SETTINGS_EVENT, open);
      window.removeEventListener(CONSENT_EVENT, sync);
    };
  }, []);

  function save(next: Consent) {
    writeConsent(next);
    setConsent(next);
    setSettingsOpen(false);
  }

  if (!ready) return null;

  return (
    <>
      {consent === null && !settingsOpen ? (
        <Banner
          onAccept={() => save({ map: true })}
          onReject={() => save({ map: false })}
          onManage={() => setSettingsOpen(true)}
        />
      ) : null}
      {settingsOpen ? (
        <Preferences
          initial={consent ?? { map: false }}
          onSave={save}
          onClose={() => setSettingsOpen(false)}
        />
      ) : null}
    </>
  );
}

function Banner({
  onAccept,
  onReject,
  onManage,
}: {
  onAccept: () => void;
  onReject: () => void;
  onManage: () => void;
}) {
  return (
    <div
      role="region"
      aria-label="Cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-cream px-4 py-4 shadow-[0_-8px_24px_rgba(42,34,28,0.08)] sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-ink">
          We use a cookie to remember this choice. The contact page can show a
          Google Map, which stays off unless you allow it.{" "}
          <Link
            href="/cookies"
            className={`underline underline-offset-2 hover:text-brick ${focusRing}`}
          >
            Cookie policy
          </Link>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onManage}
            className={`min-h-11 rounded-full px-4 text-sm text-ink underline underline-offset-2 hover:text-brick ${focusRing}`}
          >
            Manage preferences
          </button>
          <button
            type="button"
            onClick={onReject}
            className={`min-h-11 rounded-full border border-ink/20 px-4 text-sm font-semibold ${focusRing}`}
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={onAccept}
            className={`min-h-11 rounded-full bg-brick px-4 text-sm font-semibold text-cream hover:bg-brick-dark ${focusRing}`}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

function Preferences({
  initial,
  onSave,
  onClose,
}: {
  initial: Consent;
  onSave: (consent: Consent) => void;
  onClose: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const [map, setMap] = useState(initial.map);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusable = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'a[href], button, input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusable()[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream p-6 shadow-lg"
      >
        <h2 id={titleId} className="font-display text-3xl">
          Cookie preferences
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Necessary cookies stay on. The map is the only optional tool on this
          site.
        </p>

        <ul className="mt-6 space-y-4">
          <li className="rounded-2xl bg-cream-dark p-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked
                disabled
                className="mt-1 h-5 w-5 accent-ink"
              />
              <span>
                <span className="font-semibold">Necessary</span>
                <span className="mt-1 block text-sm leading-6 text-muted">
                  Always on. This covers the cookie that remembers your choice,
                  and the pub owner’s login when they update the site.
                </span>
              </span>
            </label>
          </li>
          <li className="rounded-2xl bg-cream-dark p-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={map}
                onChange={(event) => setMap(event.target.checked)}
                className={`mt-1 h-5 w-5 accent-brick ${focusRing}`}
              />
              <span>
                <span className="font-semibold">Map</span>
                <span className="mt-1 block text-sm leading-6 text-muted">
                  Shows the Google Map on the contact page. Google may set its
                  own cookies after you allow this.
                </span>
              </span>
            </label>
          </li>
        </ul>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`min-h-11 rounded-full border border-ink/20 px-4 text-sm ${focusRing}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave({ map })}
            className={`min-h-11 rounded-full bg-brick px-4 text-sm font-semibold text-cream hover:bg-brick-dark ${focusRing}`}
          >
            Save preferences
          </button>
        </div>
        <p className="mt-4 text-sm">
          <Link
            href="/cookies"
            className={`underline underline-offset-2 hover:text-brick ${focusRing}`}
          >
            Read the cookie policy
          </Link>
        </p>
      </div>
    </div>
  );
}
