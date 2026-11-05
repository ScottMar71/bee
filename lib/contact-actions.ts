export type ContactAction = {
  href: string;
  label: string;
  note: string;
};

export type ContactActions = {
  call?: ContactAction;
  whatsapp?: ContactAction;
  raw: string;
};

const NUMBER = /(\d[\d\s]{8,}\d)/;

function international(display: string) {
  const digits = display.replace(/\D/g, "");
  return digits.startsWith("0") ? `44${digits.slice(1)}` : digits;
}

function noteAfter(section: string, number: string) {
  const after = section.slice(section.indexOf(number) + number.length);
  return after.match(/\(([^)]+)\)/)?.[1]?.trim() ?? "";
}

export function contactActions(phone: string): ContactActions {
  const raw = phone.trim();
  const parts = raw.split(/\s+or\s+whatsapp\s+/i);
  if (parts.length !== 2) return { raw };

  const callMatch = parts[0].match(NUMBER)?.[1];
  const whatsappMatch = parts[1].match(NUMBER)?.[1];
  if (!callMatch || !whatsappMatch) return { raw };

  const callNumber = callMatch.replace(/\s+/g, " ").trim();
  const whatsappNumber = whatsappMatch.replace(/\s+/g, " ").trim();

  return {
    raw,
    call: {
      href: `tel:+${international(callNumber)}`,
      label: callNumber,
      note: noteAfter(parts[0], callMatch),
    },
    whatsapp: {
      href: `https://wa.me/${international(whatsappNumber)}`,
      label: whatsappNumber,
      note: noteAfter(parts[1], whatsappMatch),
    },
  };
}
