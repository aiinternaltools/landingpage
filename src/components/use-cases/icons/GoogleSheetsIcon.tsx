type IconProps = {
  className?: string;
};

export function GoogleSheetsIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#0F9D58" />
      <rect x="6" y="7" width="5" height="2" rx="0.5" fill="white" fillOpacity="0.9" />
      <rect x="6" y="11" width="12" height="2" rx="0.5" fill="white" fillOpacity="0.7" />
      <rect x="6" y="15" width="9" height="2" rx="0.5" fill="white" fillOpacity="0.7" />
      <path
        d="M15 3v4.5c0 .83.67 1.5 1.5 1.5H21"
        fill="#87CEAC"
      />
      <path
        d="M15 3l6 6"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
    </svg>
  );
}
