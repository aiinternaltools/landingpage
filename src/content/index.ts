import type { Locale } from "@/i18n/routing";
import { aboutProfile as aboutProfileEn } from "./about-profile.en";
import { aboutProfile as aboutProfileRo } from "./about-profile.ro";
import {
  communityBenefits as communityBenefitsEn,
  communityInterests as communityInterestsEn,
  communityRoles as communityRolesEn,
  communityWaitlist as communityWaitlistEn,
} from "./community.en";
import {
  communityBenefits as communityBenefitsRo,
  communityInterests as communityInterestsRo,
  communityRoles as communityRolesRo,
  communityWaitlist as communityWaitlistRo,
} from "./community.ro";
import { contactPage as contactPageEn, contactForm as contactFormEn } from "./contact.en";
import { contactPage as contactPageRo, contactForm as contactFormRo } from "./contact.ro";
import { aiSocialMediaAssistant as aiSocialMediaAssistantEn } from "./use-cases/ai-social-media-assistant.en";
import { aiSocialMediaAssistant as aiSocialMediaAssistantRo } from "./use-cases/ai-social-media-assistant.ro";
import {
  contactUseCaseCustomId,
  contactUseCaseOptionsEn,
  contactUseCaseOptionsRo,
  landingUseCasesEn,
  landingUseCasesRo,
  type ContactUseCaseId,
  type LandingUseCaseId,
} from "./use-cases.en";

export {
  contactUseCaseCustomId,
  contactUseCaseOptionsEn,
  type ContactUseCaseId,
  type LandingUseCaseId,
} from "./use-cases.en";

export type {
  CommunityBenefitId,
  CommunityRole,
  CommunityInterestId,
  CommunitySignupPayload,
} from "./community.en";

export function getContactPage(locale: Locale) {
  return locale === "ro" ? contactPageRo : contactPageEn;
}

export function getContactForm(locale: Locale) {
  return locale === "ro" ? contactFormRo : contactFormEn;
}

export function getContactUseCaseOptions(locale: Locale) {
  return locale === "ro" ? contactUseCaseOptionsRo : contactUseCaseOptionsEn;
}

export function getLandingUseCases(locale: Locale) {
  return locale === "ro" ? landingUseCasesRo : landingUseCasesEn;
}

export function getCommunityWaitlist(locale: Locale) {
  return locale === "ro" ? communityWaitlistRo : communityWaitlistEn;
}

export function getCommunityBenefits(locale: Locale) {
  return locale === "ro" ? communityBenefitsRo : communityBenefitsEn;
}

export function getCommunityRoles(locale: Locale) {
  return locale === "ro" ? communityRolesRo : communityRolesEn;
}

export function getCommunityInterests(locale: Locale) {
  return locale === "ro" ? communityInterestsRo : communityInterestsEn;
}

export function getAboutProfile(locale: Locale) {
  return locale === "ro" ? aboutProfileRo : aboutProfileEn;
}

export function getAiSocialMediaAssistant(locale: Locale) {
  return locale === "ro" ? aiSocialMediaAssistantRo : aiSocialMediaAssistantEn;
}

export type ContactFormPayload = {
  name: string;
  email: string;
  useCase: ContactUseCaseId;
  message?: string;
  company?: string;
};
