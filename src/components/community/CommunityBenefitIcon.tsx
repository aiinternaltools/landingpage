import type { JSX } from "react";
import type { CommunityBenefitId } from "@/content/community";

type IconProps = {
  className?: string;
};

function IconBookOpen({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 7v14" />
      <path d="M12 7a3 3 0 00-3-3H5v16a2 2 0 002 2h10a2 2 0 002-2V4a3 3 0 00-3-3h-1" />
    </svg>
  );
}

function IconBriefcase({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 7V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V7" />
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M3 12h18M9 12v4M15 12v4" />
    </svg>
  );
}

function IconWorkflow({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="3" width="6" height="6" rx="1.5" />
      <rect x="9" y="15" width="6" height="6" rx="1.5" />
      <path d="M6 9v3h12V9M12 12v3" />
    </svg>
  );
}

function IconUsers({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 19v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1" />
      <circle cx="9" cy="7" r="3" />
      <path d="M22 19v-1a3 3 0 00-2.2-2.9M16 3.1a3 3 0 010 5.8" />
    </svg>
  );
}

function IconTrending({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 17l6-6 4 4 7-9" />
      <path d="M14 6h7v7" />
    </svg>
  );
}

const icons: Record<CommunityBenefitId, (props: IconProps) => JSX.Element> = {
  curated: IconBookOpen,
  examples: IconBriefcase,
  templates: IconWorkflow,
  networking: IconUsers,
  updates: IconTrending,
};

type CommunityBenefitIconProps = IconProps & {
  id: CommunityBenefitId;
};

export function CommunityBenefitIcon({ id, className }: CommunityBenefitIconProps) {
  const Icon = icons[id];
  return <Icon className={className} />;
}
