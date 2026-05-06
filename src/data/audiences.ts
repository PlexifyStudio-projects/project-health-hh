import type { Audience } from "@/types";

export const AUDIENCES: Audience[] = [
  {
    key: "patients",
    title: "Patients & Families",
    tagline: "Care that comes to you.",
    description:
      "Stay home. Heal faster. Our nurses, therapists and aides bring hospital-grade care into your living room — covered by Medicare, Medi-Cal and most plans.",
    benefits: [
      "100% covered for Medicare cardholders",
      "Same-day intake, weekend admits",
      "Bilingual care teams (EN / ES / TL)",
      "24/7 nursing line",
    ],
    cta: { label: "Schedule a free assessment", to: "/contact" },
    image: "https://images.pexels.com/photos/7551622/pexels-photo-7551622.jpeg?auto=compress&cs=tinysrgb&w=1280",
    accent: "blue",
    iconName: "HeartPulse",
  },
  {
    key: "caregivers",
    title: "Nurses & Caregivers",
    tagline: "Build a career you'll be proud of.",
    description:
      "Join a clinically-led team that respects your time, pays competitively, and invests in your growth. Flexible scheduling, real mentorship, and a culture that puts caregivers first.",
    benefits: [
      "Top-of-market pay + bonuses",
      "Flexible 1099 / W2 options",
      "Free CEUs & certifications",
      "Mentor pairing from day one",
    ],
    cta: { label: "View open roles", to: "/careers" },
    image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1280",
    accent: "green",
    iconName: "Briefcase",
  },
  {
    key: "referrals",
    title: "Referral Sources",
    tagline: "Refer in 60 seconds. Outcomes you can measure.",
    description:
      "Hospitals, physicians, case managers and SNFs trust Plexify for transitions of care. Online referral portal, real-time admit confirmation, and shared dashboards for outcomes.",
    benefits: [
      "60-second online referral",
      "Same-day admit confirmation",
      "Shared outcome dashboards",
      "Dedicated liaison per partner",
    ],
    cta: { label: "Submit a referral", to: "/refer-a-patient" },
    image: "https://images.pexels.com/photos/4173324/pexels-photo-4173324.jpeg?auto=compress&cs=tinysrgb&w=1280",
    accent: "coral",
    iconName: "FileHeart",
  },
  {
    key: "insurance",
    title: "Insurance Partners",
    tagline: "Lower readmits. Better stars.",
    description:
      "Outcomes-driven home health that moves your HEDIS, Star Ratings and total cost of care. Value-based contracting, transparent reporting, and tight ED-utilization controls.",
    benefits: [
      "Readmission rates 30% below benchmark",
      "Star-rated quality measures",
      "Value-based contracting ready",
      "Real-time utilization reporting",
    ],
    cta: { label: "Talk to network team", to: "/contact" },
    image: "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=1280",
    accent: "ink",
    iconName: "ShieldCheck",
  },
  {
    key: "owners",
    title: "Agency Owners & CEOs",
    tagline: "Scale your HH operation, the modern way.",
    description:
      "Whether you operate one office or twenty, Plexify gives you the staffing depth, clinical leadership and tech stack to grow margin while improving outcomes.",
    benefits: [
      "On-demand clinical staffing",
      "Compliance-ready ops playbooks",
      "EMR-agnostic data integrations",
      "Joint-venture & MSO models",
    ],
    cta: { label: "Book an executive call", to: "/contact" },
    image: "https://images.pexels.com/photos/7414214/pexels-photo-7414214.jpeg?auto=compress&cs=tinysrgb&w=1280",
    accent: "gold",
    iconName: "Building2",
  },
];
