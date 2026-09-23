import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ href, children, variant = "primary" }: Props) {
  const styles = {
    primary:
      "bg-brick text-cream hover:bg-brick-dark",
    secondary:
      "bg-cream text-ink hover:bg-cream-dark",
    ghost:
      "border border-ink/15 bg-cream text-ink hover:border-brick hover:text-brick",
  }[variant];

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 text-base font-semibold tracking-wide transition ${styles}`}
    >
      {children}
    </Link>
  );
}
