import type { Locale } from "@/i18n/routing";

export type NavLabels = {
  community: string;
  aiNews: string;
  useCases: string;
  contact: string;
  openMenu: string;
  closeMenu: string;
  menu: string;
  languageSwitcher: {
    label: string;
    en: string;
    ro: string;
  };
};

export type NavLinkKey = "community" | "aiNews" | "useCases" | "contact";

export type NavbarProps = {
  labels: NavLabels;
  locale: Locale;
};

export type LocaleSwitcherProps = {
  labels: NavLabels["languageSwitcher"];
  locale: Locale;
  variant?: "compact" | "mobile";
  onSelect?: () => void;
};
