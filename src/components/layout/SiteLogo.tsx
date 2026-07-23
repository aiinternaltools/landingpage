import Image from "next/image";

type SiteLogoProps = {
  size?: "nav" | "footer";
  priority?: boolean;
};

const sizeConfig = {
  nav: {
    className: "h-12 w-auto sm:h-14",
  },
  footer: {
    className: "h-9 w-auto sm:h-10",
  },
} as const;

export function SiteLogo({ size = "nav", priority = false }: SiteLogoProps) {
  const { className } = sizeConfig[size];
  const sizes = size === "nav" ? "112px" : "80px";

  return (
    <Image
      src="/logoAIT-trim.png"
      alt="AI Internal Tools"
      width={653}
      height={445}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
