import type { Testimonial } from "@/types";
import type { AudienceId } from "@/lib/audience";

export interface AudienceTestimonial extends Testimonial {
  audience: AudienceId;
}

export const TESTIMONIALS: AudienceTestimonial[] = [
  // ─────────────────── PATIENTS & FAMILIES (4)
  {
    audience: "patient",
    quote:
      "After Mom's hip surgery I was terrified. Plexify's nurse called within an hour and a PT was at our door the next morning. Three weeks later she was walking the block again.",
    author: "Maria G.",
    role: "Daughter & primary caregiver — Glendale, CA",
    image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "patient",
    quote:
      "Speech therapy after my stroke gave me my words back. Six months ago I couldn't say my granddaughter's name. Yesterday I read her a bedtime story.",
    author: "Robert P.",
    role: "Patient, age 71 — Pasadena, CA",
    image: "https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "patient",
    quote:
      "Medicare covered everything. The nurse explained every medication in plain English. Dad finally feels safe at home — and so do we.",
    author: "Daniel K.",
    role: "Family caregiver — Long Beach, CA",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "patient",
    quote:
      "I was discharged on a Friday afternoon. By Saturday morning a Plexify RN was in my living room. Same-day admit isn't marketing — they actually do it.",
    author: "Linda S.",
    role: "Patient, age 68 — Anaheim, CA",
    image: "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },

  // ─────────────────── NURSES & CAREGIVERS (4)
  {
    audience: "nurse",
    quote:
      "Best agency I've ever worked with. Pay is real, mentorship is real, and clinically I feel respected. I've been here 3 years — never going back.",
    author: "James O., RN",
    role: "Visiting Nurse, joined 2023",
    image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "nurse",
    quote:
      "I left the hospital because I wanted my life back. At Plexify I have autonomy, manageable caseloads, and a CMO who actually answers my texts.",
    author: "Aisha P., DPT",
    role: "Physical Therapist, joined 2024",
    image: "https://images.pexels.com/photos/6749774/pexels-photo-6749774.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "nurse",
    quote:
      "The free CEUs alone saved me $2,400 last year. Add the mentorship and pay, and there's just no comparison to my old agency.",
    author: "Carlos M., LVN",
    role: "Visiting Nurse, joined 2022",
    image: "https://images.pexels.com/photos/5452281/pexels-photo-5452281.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "nurse",
    quote:
      "What sold me was the 30-minute clinical conversation in my interview. Not behavioral games — actual patient cases. They take clinical depth seriously.",
    author: "Sarah L., RN, MSN",
    role: "Senior Visiting Nurse, joined 2021",
    image: "https://images.pexels.com/photos/4173324/pexels-photo-4173324.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },

  // ─────────────────── REFERRAL SOURCES (4)
  {
    audience: "referral",
    quote:
      "Their referral portal cut our discharge friction in half. We see admit confirmations in real time and the readmit numbers speak for themselves.",
    author: "Dr. Lin H.",
    role: "Hospitalist Director, Metro Health",
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "referral",
    quote:
      "We refer 40+ patients a month. Plexify's same-day admit and outcome dashboard is the cleanest workflow we have. Our case managers love them.",
    author: "Jennifer W., MSW",
    role: "Director of Care Transitions, Regional Hospital",
    image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "referral",
    quote:
      "Our SNF discharges to home health hit 94% admit rate within 24 hours. That's industry-leading. Plexify is on our preferred list for a reason.",
    author: "Dr. Rakesh M.",
    role: "Medical Director, Skilled Nursing Facility",
    image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "referral",
    quote:
      "I send all my post-op cases to Plexify. The communication back to my office is structured, fast and actually useful for follow-up visits.",
    author: "Dr. Emily T.",
    role: "Orthopedic Surgeon, Private Practice",
    image: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },

  // ─────────────────── INSURANCE PARTNERS (4)
  {
    audience: "insurance",
    quote:
      "We chose Plexify for our value-based contract because their data was the cleanest. They actually move the needle on our quality measures.",
    author: "Priya N.",
    role: "VP Network Strategy, Major Health Plan",
    image: "https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "insurance",
    quote:
      "Their HEDIS performance ranks in the top decile of our home health network. Real-time reporting changed how our care management team operates.",
    author: "Michael R.",
    role: "Director Quality, Medicare Advantage Plan",
    image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "insurance",
    quote:
      "We saw a 28% reduction in 30-day readmits for plan-attributed members in their first year. Their network team is responsive and data-fluent.",
    author: "Anna K.",
    role: "VP Provider Networks, Commercial Payer",
    image: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "insurance",
    quote:
      "Plexify integrates with our analytics stack via API. No more spreadsheet emails. We close HEDIS gaps faster and our actuaries finally trust the data.",
    author: "Tom B.",
    role: "Chief Network Officer, Regional Plan",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },

  // ─────────────────── AGENCY OWNERS (4)
  {
    audience: "owner",
    quote:
      "We partnered with Plexify on a JV to expand into Orange County. Their compliance, staffing and clinical leadership made it possible to launch in 90 days.",
    author: "David W.",
    role: "CEO & Founder, Mid-size HH Agency",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "owner",
    quote:
      "Adding specialty therapy lines without hiring overhead transformed our P&L. Margin lift was 22% in year one. We refer to Plexify weekly.",
    author: "Rachel S.",
    role: "Owner, Family-run HH Agency",
    image: "https://images.pexels.com/photos/3760257/pexels-photo-3760257.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "owner",
    quote:
      "Their MSO model handed us back 20 hours a week of operations time. We focus on patient relationships now — they handle everything behind the scenes.",
    author: "Marco F.",
    role: "Co-founder, Two-office HH Operation",
    image: "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
  {
    audience: "owner",
    quote:
      "Compliance was killing us. Plexify's playbooks plus their quarterly audits got us survey-ready in 60 days. Money very well spent.",
    author: "Elena C.",
    role: "Director of Operations, Multi-location Agency",
    image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
  },
];
