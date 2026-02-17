type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="space-y-5 pb-14 pt-8 md:pt-14">
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.22em] text-muted">{eyebrow}</p>
      ) : null}
      <h1 className="max-w-3xl text-balance font-serif text-4xl leading-tight text-text md:text-6xl">
        {title}
      </h1>
      <p className="max-w-prose text-lg leading-relaxed text-muted">{description}</p>
    </section>
  );
}
