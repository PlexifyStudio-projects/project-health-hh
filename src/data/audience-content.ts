import type { AudienceId } from "@/lib/audience";
import type { Stat, ProcessStep } from "@/types";

export interface AudienceContent {
  ctaTitle: string;
  ctaTitleHighlight: string;
  ctaDescription: string;
  ctaPrimary: { label: string; to: string };
  ctaSecondary: { label: string; to: string };
  faqCategory: "patient" | "referral" | "insurance" | "career";
  resourceCategory: string | null;
  testimonialKeywords: string[];
  stats: Stat[];
  processIntro: string;
  processSubtitle: string;
  processSteps: ProcessStep[];          // 4 unique steps per audience
  trustBadges: string[];
  audienceLabel: string;

  // Services context
  servicesEyebrow: string;
  servicesTitle: string;
  servicesTitleAccent: string;
  servicesDescription: string;

  // Coverage context
  coverageEyebrow: string;
  coverageTitle: string;
  coverageTitleAccent: string;
  coverageDescription: string;

  // Per-audience service tile overrides (image + short copy)
  serviceFrames: Record<string, { image: string; short: string }>;
}

// Image library — only verified Pexels healthcare images that load reliably
const IMG = {
  // Warm / patient-side
  warmNursing:    "https://images.pexels.com/photos/7551621/pexels-photo-7551621.jpeg?auto=compress&cs=tinysrgb&w=1280",
  warmPT:         "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1280",
  warmOT:         "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1280",
  warmST:         "https://images.pexels.com/photos/4173324/pexels-photo-4173324.jpeg?auto=compress&cs=tinysrgb&w=1280",
  warmMSW:        "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1280",
  warmHHA:        "https://images.pexels.com/photos/5452281/pexels-photo-5452281.jpeg?auto=compress&cs=tinysrgb&w=1280",

  // Clinical / professional-side
  clinicalNursing: "https://images.pexels.com/photos/4173324/pexels-photo-4173324.jpeg?auto=compress&cs=tinysrgb&w=1280",
  clinicalPT:      "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1280",
  clinicalOT:      "https://images.pexels.com/photos/5452281/pexels-photo-5452281.jpeg?auto=compress&cs=tinysrgb&w=1280",
  clinicalST:      "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1280",
  clinicalMSW:     "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1280",
  clinicalHHA:     "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1280",

  // Data / executive
  dataMedical:     "https://images.pexels.com/photos/4173324/pexels-photo-4173324.jpeg?auto=compress&cs=tinysrgb&w=1280",
  dataExec:        "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1280",
};

export const AUDIENCE_CONTENT: Record<AudienceId, AudienceContent> = {
  patient: {
    ctaTitle: "Ready to bring care",
    ctaTitleHighlight: "home?",
    ctaDescription: "Talk to a real person in under 60 seconds. No paperwork to start — just answers, in plain English.",
    ctaPrimary:   { label: "Schedule consultation", to: "/contact" },
    ctaSecondary: { label: "Verify insurance",      to: "/verify-insurance" },
    faqCategory: "patient",
    resourceCategory: "Patients & Families",
    testimonialKeywords: ["caregiver", "Patient", "Family", "Daughter", "Son", "age"],
    stats: [
      { value: 15, suffix: "K+", label: "Patients served",  description: "Across California since 2018" },
      { value: 24, suffix: "/7", label: "Nursing line",     description: "Always-on clinical support" },
      { value: 98, suffix: "%",  label: "Satisfaction",     description: "Verified post-discharge surveys" },
      { value: 100, suffix: "%", label: "Medicare covered", description: "For eligible cardholders" },
    ],
    processIntro: "From first call — to first visit.",
    processSubtitle: "Most patients are admitted within 24 hours. Same-day for urgent cases. No paperwork mountains, no insurance friction — we handle it all.",
    processSteps: [
      { step: 1, title: "Free consultation",   description: "Tell us what you need by phone or online. No commitment, no paperwork to start. Real human in 60 seconds.", iconName: "Phone" },
      { step: 2, title: "Clinical assessment", description: "An RN visits your home (or video-visits) within 24 hours, completes the OASIS evaluation, reviews medications and goals.", iconName: "ClipboardCheck" },
      { step: 3, title: "Personalized plan",   description: "Our medical director, your physician and the care team co-design a plan tailored to your diagnosis and family.", iconName: "FileText" },
      { step: 4, title: "Care delivered",      description: "Visits start the same week. Real-time updates to your family. 24/7 nursing access until you're independent again.", iconName: "HeartHandshake" },
    ],
    trustBadges: ["Medicare", "Medi-Cal", "HIPAA", "24/7 line"],
    audienceLabel: "Patients & Families",
    servicesEyebrow: "Services for you",
    servicesTitle: "Clinical care, ",
    servicesTitleAccent: "delivered with care.",
    servicesDescription: "Every Plexify patient is supported by a multidisciplinary team — RN-led — with a plan that adapts as you recover.",
    coverageEyebrow: "Where we visit you",
    coverageTitle: "Care, ",
    coverageTitleAccent: "close to home.",
    coverageDescription: "We currently serve five major regions across California — and we're expanding. Don't see your city? Call us, we may already be there.",
    serviceFrames: {
      "skilled-nursing":      { image: IMG.warmNursing, short: "Hospital-grade nursing in your living room." },
      "physical-therapy":     { image: IMG.warmPT,      short: "Walk again. Lift again. Live again — with a PT at your side." },
      "occupational-therapy": { image: IMG.warmOT,      short: "Get back to dressing, cooking and showering on your own." },
      "speech-therapy":       { image: IMG.warmST,      short: "Find your voice — and your meals — after stroke or illness." },
      "medical-social-work":  { image: IMG.warmMSW,     short: "Help navigating insurance, benefits and family decisions." },
      "home-health-aide":     { image: IMG.warmHHA,     short: "A kind, certified hand for bathing, mobility and companionship." },
    },
  },
  nurse: {
    ctaTitle: "Ready to start a career",
    ctaTitleHighlight: "you'll love?",
    ctaDescription: "Apply in under 5 minutes. Real human follow-up within 48 hours — no recruiter games.",
    ctaPrimary:   { label: "View open roles",   to: "/careers" },
    ctaSecondary: { label: "Talk to recruiter", to: "/contact" },
    faqCategory: "career",
    resourceCategory: "Careers",
    testimonialKeywords: ["RN", "Nurse", "joined", "career"],
    stats: [
      { value: 18, suffix: "%",  label: "Pay vs market",  description: "Across all clinical roles" },
      { value: 3,  suffix: ".4y", label: "Avg tenure",     description: "Clinical staff retention" },
      { value: 98, suffix: "%",  label: "Would recommend", description: "Internal pulse survey" },
      { value: 50, suffix: "+",  label: "Free CEUs",      description: "Yearly per clinician" },
    ],
    processIntro: "From application — to first visit.",
    processSubtitle: "Apply, interview, get matched, hit the ground running. We respect your time and your craft.",
    processSteps: [
      { step: 1, title: "Quick application",      description: "5-minute online form. Upload your license and resume — that's it. No essays, no marathon tests.", iconName: "FileText" },
      { step: 2, title: "Clinical conversation",  description: "30-minute call with our Director of Clinical Ops within 48 hours. Real clinician asking real questions.", iconName: "Phone" },
      { step: 3, title: "Match & onboard",        description: "We pair you with a mentor, your specialty area and a caseload that matches your goals — not the other way around.", iconName: "ClipboardCheck" },
      { step: 4, title: "First visit & beyond",   description: "Day-one shadow with a senior clinician. Quarterly clinical rounds with our medical director. Free CEUs for life.", iconName: "HeartHandshake" },
    ],
    trustBadges: ["W2 + 1099", "Free CEUs", "Mentorship", "Top pay"],
    audienceLabel: "Nurses & Caregivers",
    servicesEyebrow: "Disciplines you'd join",
    servicesTitle: "Six disciplines, ",
    servicesTitleAccent: "endless growth.",
    servicesDescription: "Whether you're an RN, LVN, PT, OT, ST, MSW or HHA — there's a path here. Specialize, mentor, lead clinical rounds.",
    coverageEyebrow: "Where you'd work",
    coverageTitle: "Roles ",
    coverageTitleAccent: "across California.",
    coverageDescription: "Five regions, dozens of caseload styles. Pick what works for your life — full-time, part-time, PRN, geographic preference.",
    serviceFrames: {
      "skilled-nursing":      { image: IMG.clinicalNursing, short: "RN/LVN — wound care, IV, post-op, chronic disease. Mentor-paired." },
      "physical-therapy":     { image: IMG.clinicalPT,      short: "DPT track. Manageable caseload, ortho/neuro depth, free CEUs." },
      "occupational-therapy": { image: IMG.clinicalOT,      short: "OT/COTA — ADL, hand therapy, cognitive rehab, CHT-supported." },
      "speech-therapy":       { image: IMG.clinicalST,      short: "SLP — aphasia, dysphagia, voice. MBSImP-supported, real autonomy." },
      "medical-social-work":  { image: IMG.clinicalMSW,     short: "LCSW — counseling, advance care planning, real time for families." },
      "home-health-aide":     { image: IMG.clinicalHHA,     short: "CHHA roles — RN-supervised, dignity-first protocols, predictable schedule." },
    },
  },
  referral: {
    ctaTitle: "Ready to refer in",
    ctaTitleHighlight: "60 seconds?",
    ctaDescription: "Online, fax or phone — accepted 24/7. Real-time admit confirmation, no chasing.",
    ctaPrimary:   { label: "Submit a referral", to: "/refer-a-patient" },
    ctaSecondary: { label: "Talk to liaison",   to: "/for-you/referrals" },
    faqCategory: "referral",
    resourceCategory: null,
    testimonialKeywords: ["Hospital", "Physician", "Director", "Hospitalist", "Dr."],
    stats: [
      { value: 8,  suffix: "h",   label: "Avg admit time",   description: "Same-day common" },
      { value: 99, suffix: "%",   label: "Confirmation",     description: "Within same business day" },
      { value: 30, suffix: "%",   label: "Lower readmits",   description: "vs CMS national benchmark" },
      { value: 5,  suffix: "min", label: "Liaison response", description: "Average reply time" },
    ],
    processIntro: "From referral — to admit.",
    processSubtitle: "Hospitals, physicians, case managers and SNFs trust Plexify for clean transitions of care. Tracked end-to-end.",
    processSteps: [
      { step: 1, title: "Submit referral",       description: "Online portal, secure fax or phone. Pre-filled patient packet. Takes about 60 seconds for most cases.", iconName: "FileText" },
      { step: 2, title: "Same-day confirmation", description: "Liaison reviews and confirms admit eligibility within 2 business hours. You see status live in the portal.", iconName: "ClipboardCheck" },
      { step: 3, title: "Clinical coordination", description: "We coordinate directly with your discharge planner, the patient and physician. Zero follow-up needed from your side.", iconName: "Phone" },
      { step: 4, title: "Outcomes shared",       description: "Real-time dashboard with admit confirmations, visit completions, and readmission tracking — for every patient you refer.", iconName: "HeartHandshake" },
    ],
    trustBadges: ["HIPAA", "Joint Commission", "EMR-API", "Same-day admit"],
    audienceLabel: "Referral Sources",
    servicesEyebrow: "Services we accept",
    servicesTitle: "Six disciplines, ",
    servicesTitleAccent: "one referral.",
    servicesDescription: "Submit one referral — we triage, coordinate and deliver multidisciplinary care. RN-led for every patient.",
    coverageEyebrow: "Where we accept referrals",
    coverageTitle: "Referrals ",
    coverageTitleAccent: "across California.",
    coverageDescription: "Hospitals, physicians and SNFs in five major California regions trust Plexify. Same-day admits across the entire footprint.",
    serviceFrames: {
      "skilled-nursing":      { image: IMG.clinicalMSW,     short: "Skilled nursing referrals — same-day admit, OASIS within 24h." },
      "physical-therapy":     { image: IMG.clinicalPT,      short: "PT referrals — post-op rehab, fall prevention, gait training." },
      "occupational-therapy": { image: IMG.clinicalOT,      short: "OT referrals — ADL recovery, cognitive rehab, home safety." },
      "speech-therapy":       { image: IMG.clinicalST,      short: "SLP referrals — post-stroke aphasia, dysphagia, voice." },
      "medical-social-work":  { image: IMG.clinicalNursing, short: "MSW referrals — discharge planning support, resource navigation." },
      "home-health-aide":     { image: IMG.clinicalHHA,     short: "HHA pairs with skilled care — bathing, mobility, dignity." },
    },
  },
  insurance: {
    ctaTitle: "Ready to move",
    ctaTitleHighlight: "your stars?",
    ctaDescription: "Outcomes-driven home health that delivers measurable HEDIS, Star Ratings and TCC improvements.",
    ctaPrimary:   { label: "Talk to network team", to: "/contact" },
    ctaSecondary: { label: "See outcomes data",    to: "/for-you/insurance" },
    faqCategory: "insurance",
    resourceCategory: "Insurance",
    testimonialKeywords: ["Network", "Plan", "Payer", "Strategy", "VP"],
    stats: [
      { value: 30, suffix: "%",  label: "Lower readmits", description: "Plan-attributed members" },
      { value: 4,  suffix: "★+", label: "Star measures",  description: "HEDIS quality" },
      { value: 22, suffix: "%",  label: "TCC reduction",  description: "Total cost of care" },
      { value: 5,  suffix: "",   label: "Plan partners",  description: "Live in California" },
    ],
    processIntro: "From contract — to outcomes.",
    processSubtitle: "Value-based contracting with real-time reporting, shared dashboards and clear quality measures.",
    processSteps: [
      { step: 1, title: "Network discovery",     description: "Strategy session: HEDIS gaps, member geography, contracting model. We come prepared with your data.", iconName: "Phone" },
      { step: 2, title: "Contract & integrate",  description: "Standard or value-based agreements. EMR-agnostic API integration in 4-6 weeks — your IT team thanks us.", iconName: "FileText" },
      { step: 3, title: "Quality delivery",      description: "RN-led care plans designed to close HEDIS gaps. Real-time visit reporting and member satisfaction tracking.", iconName: "ClipboardCheck" },
      { step: 4, title: "Quarterly reviews",     description: "Joint quality reviews with your network and clinical teams. Transparent outcomes, attributed to your members.", iconName: "HeartHandshake" },
    ],
    trustBadges: ["Value-based", "Real-time API", "HEDIS", "Star Ratings"],
    audienceLabel: "Insurance Partners",
    servicesEyebrow: "Covered services",
    servicesTitle: "Outcomes-driven ",
    servicesTitleAccent: "service mix.",
    servicesDescription: "Every discipline mapped to HEDIS measures. Real-time visit and outcome reporting, ready for your network team.",
    coverageEyebrow: "Network footprint",
    coverageTitle: "Members ",
    coverageTitleAccent: "across California.",
    coverageDescription: "Five regions, growing fast. Member-attributed outcomes data available per region, per plan, in real time.",
    serviceFrames: {
      "skilled-nursing":      { image: IMG.dataMedical,     short: "Skilled nursing — drives readmits, HEDIS gap closure, CMS Stars." },
      "physical-therapy":     { image: IMG.clinicalPT,      short: "PT — falls reduction, post-op LOS, ED utilization." },
      "occupational-therapy": { image: IMG.clinicalOT,      short: "OT — ADL recovery linked to plan-attributed independence measures." },
      "speech-therapy":       { image: IMG.clinicalST,      short: "SLP — dysphagia care reduces aspiration-related readmits." },
      "medical-social-work":  { image: IMG.clinicalMSW,     short: "MSW — closes social-determinant gaps tied to your quality measures." },
      "home-health-aide":     { image: IMG.clinicalHHA,     short: "HHA — paired with skilled, supports HCBS waiver attribution." },
    },
  },
  owner: {
    ctaTitle: "Ready to scale your",
    ctaTitleHighlight: "agency?",
    ctaDescription: "Joint-venture, MSO or growth partnership — let's structure the deal that fits your operation.",
    ctaPrimary:   { label: "Book exec call",         to: "/contact" },
    ctaSecondary: { label: "Read operator playbook", to: "/for-you/owners" },
    faqCategory: "career",
    resourceCategory: "Owners & Leadership",
    testimonialKeywords: ["CEO", "Director", "Founder", "Operator"],
    stats: [
      { value: 22,  suffix: "%", label: "Margin lift",   description: "Year over year" },
      { value: 48,  suffix: "h", label: "Fill time",     description: "Avg clinical staffing" },
      { value: 14,  suffix: "",  label: "Offices",       description: "Operating today in CA" },
      { value: 100, suffix: "%", label: "EMR ready",     description: "API integrations" },
    ],
    processIntro: "From discovery — to scale.",
    processSubtitle: "JV, MSO or growth partnership. Compliance-ready playbooks, on-demand staffing and EMR-agnostic data.",
    processSteps: [
      { step: 1, title: "Discovery call",       description: "30-min exec call. Your numbers, your bottlenecks, your goals. We come prepared with comparable benchmarks.", iconName: "Phone" },
      { step: 2, title: "Tailored proposal",    description: "JV, MSO, advisory or full partnership — we model 3 paths and tradeoffs. Real numbers, transparent pricing.", iconName: "FileText" },
      { step: 3, title: "Onboarding & launch",  description: "Playbooks, staffing pipeline, EMR integration. Compliance team ensures every box is checked.", iconName: "ClipboardCheck" },
      { step: 4, title: "Scale & operate",      description: "Quarterly business reviews, ongoing recruiting support, joint marketing. Your operation, supercharged.", iconName: "HeartHandshake" },
    ],
    trustBadges: ["JV/MSO", "On-demand staffing", "Compliance", "Multi-EMR"],
    audienceLabel: "Agency Owners",
    servicesEyebrow: "Service portfolio",
    servicesTitle: "Disciplines to add to ",
    servicesTitleAccent: "your operation.",
    servicesDescription: "Add specialty disciplines without hiring overhead. We staff and clinically-supervise — you keep the patient relationship.",
    coverageEyebrow: "Operating regions",
    coverageTitle: "Coverage ",
    coverageTitleAccent: "to white-label.",
    coverageDescription: "Plug into our 5-region California footprint, or partner on geographic expansion. We make the operations side disappear.",
    serviceFrames: {
      "skilled-nursing":      { image: IMG.dataExec,        short: "Add nursing depth without hiring — full RN/LVN bench under your brand." },
      "physical-therapy":     { image: IMG.clinicalPT,      short: "PT line-up on demand. PRN or contract, CHT-supported." },
      "occupational-therapy": { image: IMG.clinicalOT,      short: "OT capacity in 48h. Specialty hand & low-vision tracks." },
      "speech-therapy":       { image: IMG.clinicalST,      short: "SLP coverage you can offer same-week. Shared revenue models." },
      "medical-social-work":  { image: IMG.clinicalMSW,     short: "LCSW capacity to round out your bundled offering." },
      "home-health-aide":     { image: IMG.clinicalHHA,     short: "HHA staffing pipeline — vetted, RN-supervised, plug-and-play." },
    },
  },
};
