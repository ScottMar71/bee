import Image from "next/image";

export function PageHero({
  title,
  image,
  imageClassName = "object-cover",
  overlayClassName = "bg-ink/45",
  children,
}: {
  title: string;
  image: string;
  imageClassName?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate min-h-[42vh] overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        className={imageClassName}
        sizes="100vw"
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="relative mx-auto flex min-h-[42vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="font-display text-5xl text-cream sm:text-6xl">{title}</h1>
        {children ? (
          <p className="mt-4 max-w-2xl text-lg text-cream/90">{children}</p>
        ) : null}
      </div>
    </section>
  );
}
