type IconProps = {
  className?: string;
};

export function AiAgentHubIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="agent-face-grad" x1="32" y1="12" x2="32" y2="52">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <path
        d="M32 8v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="32" cy="6" r="2.5" fill="currentColor" />
      <rect
        x="16"
        y="18"
        width="32"
        height="28"
        rx="8"
        fill="url(#agent-face-grad)"
        opacity="0.92"
      />
      <rect x="20" y="22" width="24" height="20" rx="4" fill="#0f172a" fillOpacity="0.08" />
      <circle cx="26" cy="32" r="3" fill="#e0f2fe" />
      <circle cx="38" cy="32" r="3" fill="#e0f2fe" />
      <path
        d="M26 40h12"
        stroke="#e0f2fe"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 28h6M48 28h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M24 46v6h16v-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.65"
      />
      <path
        d="M28 52h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
