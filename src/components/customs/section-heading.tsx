interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, description, className = "" }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl space-y-3 ${className}`}>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-caramel">{eyebrow}</p>}
      <h2 id={id} className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      {description && <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  );
}
