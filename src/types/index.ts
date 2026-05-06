import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface NavItem {
  label: string;
  to: string;
  children?: NavItem[];
  description?: string;
  icon?: LucideIcon;
}

export type ServiceCategory = "Nursing" | "Therapy" | "Aide" | "Social";

export interface ServiceQualifier {
  label: string;
}

export interface ServiceWeekStep {
  label: string;
  title: string;
  description: string;
}

export interface ServiceSpecialty {
  title: string;
  description: string;
  iconName?: string;
}

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  iconName: string;
  image: string;
  features: string[];
  audiences: AudienceKey[];
  category?: ServiceCategory;
  stat?: { value: string; label: string };
  qualifiers?: ServiceQualifier[];
  timeline?: ServiceWeekStep[];
  specialties?: ServiceSpecialty[];
  coverage?: string[];
}

export type AudienceKey =
  | "patients"
  | "caregivers"
  | "referrals"
  | "insurance"
  | "owners";

export interface Audience {
  key: AudienceKey;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  cta: { label: string; to: string };
  image: string;
  accent: "blue" | "green" | "coral" | "gold" | "ink";
  iconName: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "patient" | "referral" | "insurance" | "career";
}

export type TeamDepartment = "Clinical" | "Operations" | "Leadership";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  department?: TeamDepartment;
  credentials?: string[];
  isCMO?: boolean;
}

export interface CoverageArea {
  region: string;
  cities: string[];
}

export interface InsurancePartner {
  name: string;
  logo: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  date: string;
  image: string;
  body?: ReactNode;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  description: string;
}
