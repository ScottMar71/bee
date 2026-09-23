import type { SiteContent } from "@/lib/types";

export function HoursList({ hours }: { hours: SiteContent["hours"] }) {
  return (
    <dl className="divide-y divide-ink/10">
      {hours.map((row) => (
        <div key={row.day} className="flex items-baseline justify-between gap-6 py-3">
          <dt className="font-medium">{row.day}</dt>
          <dd className="text-muted">{row.hours}</dd>
        </div>
      ))}
    </dl>
  );
}
