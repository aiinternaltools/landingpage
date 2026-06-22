type LocaleFlagProps = {
  locale: "en" | "ro";
  className?: string;
};

/** Compact flag icons for the locale switcher (GB = Eng, RO = Ro). */
export function LocaleFlag({ locale, className = "h-3.5 w-[1.125rem] shrink-0" }: LocaleFlagProps) {
  if (locale === "en") {
    return (
      <svg
        viewBox="0 0 60 30"
        aria-hidden
        className={className}
      >
        <clipPath id="gb-clip">
          <path d="M0 0h60v30H0z" />
        </clipPath>
        <g clipPath="url(#gb-clip)">
          <path fill="#012169" d="M0 0h60v30H0z" />
          <path
            stroke="#fff"
            strokeWidth="6"
            d="M0 0l60 30M60 0L0 30"
          />
          <path
            stroke="#C8102E"
            strokeWidth="4"
            d="M0 0l60 30M60 0L0 30"
          />
          <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" />
          <path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 40" aria-hidden className={className}>
      <path fill="#002B7F" d="M0 0h20v40H0z" />
      <path fill="#FCD116" d="M20 0h20v40H20z" />
      <path fill="#CE1126" d="M40 0h20v40H40z" />
    </svg>
  );
}
