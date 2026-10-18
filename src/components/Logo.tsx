type LogoProps = {
  className?: string;
  /** Hide the "Parkview / Realty Ltd" wordmark and show only the house mark. */
  markOnly?: boolean;
};

const Logo = ({ className = "", markOnly = false }: LogoProps) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 64 56" className="h-10 md:h-12 w-auto shrink-0" aria-hidden="true">
      <path d="M4 28 L32 4 L60 28" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="miter" />
      <rect x="21" y="27" width="10" height="10" fill="hsl(var(--accent))" />
      <rect x="33" y="27" width="10" height="10" fill="hsl(var(--accent))" />
      <rect x="21" y="39" width="10" height="10" fill="hsl(var(--accent))" />
      <rect x="33" y="39" width="10" height="10" fill="hsl(var(--accent))" />
    </svg>
    {!markOnly && (
      <span className="flex flex-col leading-[1.05] font-bold tracking-tight">
        <span className="text-[17px] md:text-[20px] text-foreground">Parkview</span>
        <span className="text-[17px] md:text-[20px] text-accent">Realty Ltd</span>
      </span>
    )}
    <span className="sr-only">Parkview Realty Ltd</span>
  </span>
);

export default Logo;
