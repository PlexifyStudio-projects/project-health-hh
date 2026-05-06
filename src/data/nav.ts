import type { NavItem } from "@/types";

export const HOME_SECTIONS = [
  { id: "hero",         label: "Top",          iconName: "Home" },
  { id: "disciplines",  label: "Disciplines",  iconName: "Stethoscope" },
  { id: "audiences",    label: "For You",      iconName: "Users" },
  { id: "process",      label: "Process",      iconName: "Workflow" },
  { id: "stories",      label: "Stories",      iconName: "MessageCircle" },
  { id: "coverage",     label: "Coverage",     iconName: "MapPin" },
  { id: "resources",    label: "Resources",    iconName: "BookOpen" },
  { id: "faq",          label: "FAQ",          iconName: "HelpCircle" },
];

// Map a home section ID to the page nav `to` that should highlight while scrolling
export const SECTION_TO_PAGE: Record<string, string | null> = {
  hero:        "/",
  disciplines: "/services",
  audiences:   "/for-you",
  process:     "/services",
  stories:     null,
  coverage:    null,
  resources:   "/resources",
  faq:         "/resources",
};

export type NavTone = "ink" | "blue" | "green" | "coral" | "gold";

export interface PageNavItem {
  label: string;
  to: string;
  iconName: string;
  submenu?: Array<{ label: string; to: string; description?: string; tone?: NavTone }>;
}

// Primary HEADER navigation = real pages (with submenus where useful)
export const PAGE_NAV: PageNavItem[] = [
  { label: "Home",     to: "/",           iconName: "Home" },
  { label: "About",    to: "/about",      iconName: "Sparkles" },
  {
    label: "Services", to: "/services",   iconName: "Stethoscope",
    submenu: [
      { label: "All services overview",   to: "/services",                       description: "Six clinical disciplines, one team",   tone: "ink"   },
      { label: "Skilled Nursing",         to: "/services/skilled-nursing",       description: "RN/LVN-led clinical care",             tone: "blue"  },
      { label: "Physical Therapy",        to: "/services/physical-therapy",      description: "Mobility · Strength · Balance",        tone: "green" },
      { label: "Occupational Therapy",    to: "/services/occupational-therapy",  description: "Independence in daily living",         tone: "coral" },
      { label: "Speech-Language Therapy", to: "/services/speech-therapy",        description: "Voice · Swallow · Communicate",        tone: "gold"  },
      { label: "Medical Social Work",     to: "/services/medical-social-work",   description: "Counseling · Resources · Planning",    tone: "blue"  },
      { label: "Home Health Aide",        to: "/services/home-health-aide",      description: "Personal care with dignity",           tone: "green" },
    ],
  },
  {
    label: "For You",  to: "/for-you",    iconName: "Users",
    submenu: [
      { label: "Patients & Families",     to: "/for-you/patients",   description: "Care that comes to you",       tone: "blue"  },
      { label: "Caregivers (Careers)",    to: "/for-you/caregivers", description: "Build your career with us",     tone: "green" },
      { label: "Referral Sources",        to: "/for-you/referrals",  description: "Refer in 60 seconds",           tone: "coral" },
      { label: "Insurance Partners",      to: "/for-you/insurance",  description: "Outcomes-driven networks",      tone: "ink"   },
      { label: "Agency Owners",           to: "/for-you/owners",     description: "Scale your HH operation",       tone: "gold"  },
    ],
  },
  {
    label: "Resources", to: "/resources", iconName: "BookOpen",
    submenu: [
      { label: "Articles",                to: "/resources", description: "Guides by clinicians", tone: "blue"  },
      { label: "FAQ",                     to: "/faq",       description: "Common questions",     tone: "coral" },
    ],
  },
  { label: "Careers",  to: "/careers",    iconName: "Briefcase" },
  { label: "Contact",  to: "/contact",    iconName: "Mail" },
];

// Backward compat exports kept for any importer
export const PRIMARY_NAV: NavItem[] = PAGE_NAV.map((p) => ({
  label: p.label,
  to: p.to,
  children: p.submenu?.map((s) => ({ label: s.label, to: s.to })),
}));

export const HEADER_CTAS = {
  primary:   { label: "Refer a Patient",  to: "/refer-a-patient" },
  secondary: { label: "Verify Insurance", to: "/verify-insurance" },
};
