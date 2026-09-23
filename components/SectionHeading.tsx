export function SectionHeading({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-center">
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.22em] text-brick uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display mt-2 text-4xl text-ink sm:text-5xl">
        — {children} —
      </h2>
    </div>
  );
}
