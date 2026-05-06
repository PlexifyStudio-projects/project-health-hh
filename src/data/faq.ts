import type { FaqItem } from "@/types";

export const FAQ: FaqItem[] = [
  // ────────────────── PATIENTS & FAMILIES
  {
    question: "Who pays for home health care?",
    answer:
      "Most home health is fully covered by Medicare and Medi-Cal/Medicaid for eligible patients — at no cost to you. We also accept most private insurance plans, VA benefits and out-of-pocket arrangements. Verify your coverage in 24 hours via our Verify Insurance form.",
    category: "patient",
  },
  {
    question: "How quickly can a patient be admitted?",
    answer:
      "Most patients are admitted within 24 hours of referral. Urgent same-day admits are available 7 days a week, including weekends and holidays.",
    category: "patient",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We currently serve Greater Los Angeles, San Fernando Valley, Ventura County, Orange County and Inland Empire. New territories are added quarterly — contact us to confirm.",
    category: "patient",
  },
  {
    question: "Will the same nurse visit every time?",
    answer:
      "We assign a primary RN and a backup care team to every patient so you see familiar faces. Continuity of care is one of our top quality measures — we track and report it openly.",
    category: "patient",
  },
  {
    question: "Do you serve patients who don't speak English?",
    answer:
      "Yes — our care teams are bilingual in English, Spanish, Tagalog, Mandarin and Armenian. We also support family-led translation and TTY/relay services for hearing-impaired patients.",
    category: "patient",
  },

  // ────────────────── REFERRALS
  {
    question: "How do hospitals and physicians refer patients?",
    answer:
      "Use our 60-second online referral form, or fax/phone us 24/7. You'll receive admit confirmation the same business day. Dedicated liaison teams support every hospital and large practice partner.",
    category: "referral",
  },
  {
    question: "Are you HIPAA-compliant?",
    answer:
      "Yes. All clinical communications, referrals and electronic records are processed under full HIPAA compliance with signed Business Associate Agreements where applicable.",
    category: "referral",
  },
  {
    question: "Can we integrate with our hospital's EMR?",
    answer:
      "Yes. We support Epic, Cerner, Meditech and Allscripts via direct interfaces, and any system via HL7/FHIR APIs. Average integration takes 4-6 weeks with our IT team.",
    category: "referral",
  },
  {
    question: "What outcome data do referrers see?",
    answer:
      "Each referring partner gets a real-time dashboard with admit confirmations, visit completions, 30-day rehospitalization rates, patient satisfaction and discharge reports — for every patient you refer.",
    category: "referral",
  },
  {
    question: "Do you accept weekend and holiday referrals?",
    answer:
      "Yes — 24/7/365. Our admit team is staffed nights and weekends. Urgent same-day admits are processed in under 4 hours regardless of day or holiday.",
    category: "referral",
  },

  // ────────────────── INSURANCE
  {
    question: "What insurance plans do you accept?",
    answer:
      "Medicare, Medi-Cal, most major commercial plans, Medicare Advantage, VA, workers' comp and TRICARE. Use Verify Insurance to confirm your specific plan.",
    category: "insurance",
  },
  {
    question: "Do you offer value-based contracts?",
    answer:
      "Yes. We currently operate under shared-savings, episodic bundle and full-risk arrangements with five California health plans. Our outcomes data is available for due diligence.",
    category: "insurance",
  },
  {
    question: "How do you measure quality outcomes?",
    answer:
      "We track CMS Star Rating measures, HEDIS quality indicators, 30-day rehospitalization rates, ED utilization and member satisfaction (HHCAHPS). All data is shared with plan partners in real-time dashboards.",
    category: "insurance",
  },
  {
    question: "What's your readmission rate?",
    answer:
      "Our 30-day readmission rate runs ~30% below the CMS national benchmark, attributed across plan partners. Detailed segmentation by member, region and condition is available in your reporting portal.",
    category: "insurance",
  },

  // ────────────────── CAREERS
  {
    question: "What's the application process for nurses and therapists?",
    answer:
      "Apply online in under 5 minutes. We respond within 48 hours, run a 30-minute clinical conversation, and most candidates are onboarded within two weeks. Both 1099 and W2 paths available.",
    category: "career",
  },
  {
    question: "Do you offer training and CEUs?",
    answer:
      "All clinical staff receive free CEUs, specialty certifications (wound care, IV therapy, geriatric specialist) and quarterly clinical rounds with our medical director.",
    category: "career",
  },
  {
    question: "What's the pay structure for visiting clinicians?",
    answer:
      "Per-visit, hourly and salaried options available — you choose what fits. Per-visit base rates run 18% above market average for California, with bonuses for bilingual, night, weekend and specialty cases.",
    category: "career",
  },
  {
    question: "Can I work part-time or PRN?",
    answer:
      "Absolutely. We have full-time, part-time, PRN and seasonal options. Flexibility is a feature, not an exception — many of our clinicians supplement hospital roles with Plexify shifts.",
    category: "career",
  },
  {
    question: "What support do new hires get?",
    answer:
      "Day-one mentor pairing with a senior clinician, two-week ride-along onboarding, dedicated clinical supervisor, and 24/7 admin/scheduling support. You focus on patients — we handle the rest.",
    category: "career",
  },
];
