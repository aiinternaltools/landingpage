type IconProps = {
  className?: string;
};

export function AiAgentIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="8" width="14" height="11" rx="2" />
      <circle cx="9.5" cy="13" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13" r="1.25" fill="currentColor" stroke="none" />
      <path d="M10 16.5h4" />
      <path d="M12 8V5" />
      <circle cx="12" cy="4" r="1" fill="currentColor" stroke="none" />
      <path d="M8 11H5.5a1.5 1.5 0 010-3H8M16 11h2.5a1.5 1.5 0 000-3H16" />
      <path
        d="M18 3l1 1M20 5l1-1M19 2v2"
        strokeWidth="1.25"
        className="text-accent"
      />
    </svg>
  );
}
