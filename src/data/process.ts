import type { ProcessStep } from "@/types";

export const PROCESS: ProcessStep[] = [
  {
    step: 1,
    title: "Free Consultation",
    description:
      "Tell us what you need — by phone, online or via your hospital. We listen, answer questions and schedule the next step in minutes.",
    iconName: "Phone",
  },
  {
    step: 2,
    title: "Clinical Assessment",
    description:
      "A nurse visits your home (or video-visits) within 24 hours, completes the OASIS evaluation, and reviews medications, environment and goals.",
    iconName: "ClipboardCheck",
  },
  {
    step: 3,
    title: "Personalized Care Plan",
    description:
      "Our medical director, your physician and the care team co-design a plan tailored to your diagnosis, recovery goals and family situation.",
    iconName: "FileText",
  },
  {
    step: 4,
    title: "Compassionate Delivery",
    description:
      "Visits start the same week. Real-time updates to your family, transparent outcomes, and 24/7 nursing access until you're independent again.",
    iconName: "HeartHandshake",
  },
];
