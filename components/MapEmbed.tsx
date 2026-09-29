"use client";

import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, writeConsent } from "@/lib/consent";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick";

export function MapEmbed({ src }: { src: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const apply = () => setAllowed(readConsent()?.map === true);
    apply();
    window.addEventListener(CONSENT_EVENT, apply);
    return () => window.removeEventListener(CONSENT_EVENT, apply);
  }, []);

  if (!allowed) {
    return (
      <div className="flex h-[420px] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="max-w-sm text-muted">
          The map stays off until you allow it.
        </p>
        <button
          type="button"
          onClick={() => writeConsent({ map: true })}
          className={`min-h-11 rounded-full bg-brick px-5 text-sm font-semibold text-cream hover:bg-brick-dark ${focusRing}`}
        >
          Show map
        </button>
      </div>
    );
  }

  return (
    <iframe
      title="Map of The Beehive, Leopold Road, Norwich"
      src={src}
      className="h-[420px] w-full"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
