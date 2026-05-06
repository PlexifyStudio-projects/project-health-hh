import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send, Check, ShieldCheck, Clock, FileHeart,
  Phone, ClipboardCheck, FileText, HeartHandshake, Network,
} from "lucide-react";
import { Button } from "@/components/Button/Button";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import "./ReferPatient.scss";

const schema = z.object({
  // Referrer
  referrer_name: z.string().min(2),
  referrer_org: z.string().min(2),
  referrer_email: z.string().email(),
  referrer_phone: z.string().min(7),

  // Patient (NO sensitive PHI in v1; backend integration is documented)
  patient_initials: z.string().min(1, "Use initials only — full name comes via secure portal"),
  patient_zip: z.string().min(5),
  service_needed: z.enum(["skilled_nursing", "pt", "ot", "st", "msw", "hha", "multiple"]),
  urgency: z.enum(["same_day", "next_day", "this_week", "routine"]),
  notes: z.string().optional(),
  hipaa_acknowledge: z.literal(true, { errorMap: () => ({ message: "Please acknowledge our HIPAA-aware intake" }) }),
});

type Values = z.infer<typeof schema>;

const NEXT_STEPS = [
  { icon: ClipboardCheck, time: "≤ 2 hours", title: "Liaison review",          description: "Our admissions liaison reviews eligibility, geography and discipline mix. You see status live in your portal." },
  { icon: Phone,          time: "Same day",  title: "Confirmation call",       description: "We call your office and the patient/family to confirm visit times. No callbacks needed from your team." },
  { icon: FileText,       time: "24 hours",  title: "OASIS evaluation",        description: "An RN visits the patient (or video-visits) within 24 hours, completes OASIS, reviews meds and goals." },
  { icon: HeartHandshake, time: "Day 2-3",   title: "Visits begin",            description: "Care plan signed off by the medical director and physician. First skilled visits start within 72 hours." },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "HIPAA-compliant",          description: "BAAs in place. Audited annually." },
  { icon: FileHeart,   label: "Joint Commission",         description: "Accredited home health operations." },
  { icon: Network,     label: "EMR-API ready",            description: "Epic, Cerner, Meditech, HL7/FHIR." },
];

export default function ReferPatient() {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(1);
  useSeo({
    title: "Refer a Patient | Plexify Health Home Health California",
    description:
      "Submit a patient referral in 60 seconds. Same-day admit confirmation for hospitals, physicians, SNFs and case managers across California — HIPAA-aware intake.",
    canonical: "https://plexifyhealth.com/refer-a-patient",
    jsonLd: buildBreadcrumbLd([
      { name: "Home", url: "https://plexifyhealth.com/" },
      { name: "Refer a Patient", url: "https://plexifyhealth.com/refer-a-patient" },
    ]),
  });

  const { register, handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { service_needed: "skilled_nursing", urgency: "next_day" },
  });

  const next = async () => {
    const ok = await trigger(["referrer_name", "referrer_org", "referrer_email", "referrer_phone"]);
    if (ok) setStep(2);
  };

  const onSubmit = async (values: Values) => {
    await new Promise((r) => setTimeout(r, 800));
    console.info("referral submit", values);
    setSent(true);
  };

  return (
    <>
      <section className="refer-patient">
        <div className="container container--wide">
          <div className="refer-patient__grid">
            <aside className="refer-patient__aside">
              <span className="refer-patient__eyebrow">Refer a patient</span>
              <h1>60 seconds. <em>Same-day admit.</em></h1>
              <p>Hospitals, physicians, case managers and SNFs trust Plexify for fast, clean transitions of care. Submit below — you'll get admit confirmation the same business day.</p>

              <ul className="refer-patient__pills">
                <li><FileHeart size={16} /> Online + fax + phone accepted</li>
                <li><Clock size={16} /> Same-day admits 7 days/week</li>
                <li><ShieldCheck size={16} /> HIPAA-aware intake</li>
              </ul>

              {/* Inline "what's next" preview on desktop */}
              <div className="refer-patient__next">
                <span className="refer-patient__next-eyebrow">What happens after you submit</span>
                <ol>
                  {NEXT_STEPS.map((s) => (
                    <li key={s.title}>
                      <strong>{s.time}</strong> <span>{s.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="refer-patient__form-wrap">
              {sent ? (
                <div className="refer-patient__success">
                  <span className="refer-patient__success-icon"><Check size={28} /></span>
                  <h2>Referral received.</h2>
                  <p>A liaison will reach out within 2 business hours with admit confirmation. For urgent cases call <a href="tel:+15550102026">(555) 010-2026</a>.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="refer-patient__form" noValidate>
                  <div className="refer-patient__steps" role="progressbar" aria-valuemin={1} aria-valuemax={2} aria-valuenow={step}>
                    <span className={`refer-patient__step ${step >= 1 ? "is-active" : ""}`}>1. About you</span>
                    <span className={`refer-patient__step ${step >= 2 ? "is-active" : ""}`}>2. About the patient</span>
                  </div>

                  {step === 1 && (
                    <>
                      <div className="form-row">
                        <label className="form-label" htmlFor="referrer_name">Your name</label>
                        <input
                          id="referrer_name"
                          className="form-input"
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={!!errors.referrer_name}
                          aria-describedby={errors.referrer_name ? "referrer_name-error" : undefined}
                          {...register("referrer_name")}
                        />
                        {errors.referrer_name && <span id="referrer_name-error" className="form-error" role="alert">Required</span>}
                      </div>
                      <div className="form-grid">
                        <div className="form-row">
                          <label className="form-label" htmlFor="referrer_org">Organization</label>
                          <input
                            id="referrer_org"
                            className="form-input"
                            autoComplete="organization"
                            aria-required="true"
                            aria-invalid={!!errors.referrer_org}
                            aria-describedby={errors.referrer_org ? "referrer_org-error" : undefined}
                            {...register("referrer_org")}
                          />
                          {errors.referrer_org && <span id="referrer_org-error" className="form-error" role="alert">Required</span>}
                        </div>
                        <div className="form-row">
                          <label className="form-label" htmlFor="referrer_phone">Phone</label>
                          <input
                            id="referrer_phone"
                            type="tel"
                            className="form-input"
                            autoComplete="tel"
                            inputMode="tel"
                            aria-required="true"
                            aria-invalid={!!errors.referrer_phone}
                            aria-describedby={errors.referrer_phone ? "referrer_phone-error" : undefined}
                            {...register("referrer_phone")}
                          />
                          {errors.referrer_phone && <span id="referrer_phone-error" className="form-error" role="alert">Required</span>}
                        </div>
                      </div>
                      <div className="form-row">
                        <label className="form-label" htmlFor="referrer_email">Email</label>
                        <input
                          id="referrer_email"
                          type="email"
                          className="form-input"
                          autoComplete="email"
                          inputMode="email"
                          aria-required="true"
                          aria-invalid={!!errors.referrer_email}
                          aria-describedby={errors.referrer_email ? "referrer_email-error" : undefined}
                          {...register("referrer_email")}
                        />
                        {errors.referrer_email && <span id="referrer_email-error" className="form-error" role="alert">Valid email please</span>}
                      </div>
                      <Button type="button" onClick={next} variant="primary">Continue</Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="form-grid">
                        <div className="form-row">
                          <label className="form-label" htmlFor="patient_initials">Patient initials</label>
                          <input
                            id="patient_initials"
                            className="form-input"
                            placeholder="e.g. J.D."
                            aria-required="true"
                            aria-invalid={!!errors.patient_initials}
                            aria-describedby={errors.patient_initials ? "patient_initials-error" : undefined}
                            {...register("patient_initials")}
                          />
                          {errors.patient_initials && <span id="patient_initials-error" className="form-error" role="alert">{errors.patient_initials.message}</span>}
                        </div>
                        <div className="form-row">
                          <label className="form-label" htmlFor="patient_zip">Patient ZIP code</label>
                          <input
                            id="patient_zip"
                            className="form-input"
                            autoComplete="postal-code"
                            inputMode="numeric"
                            aria-required="true"
                            aria-invalid={!!errors.patient_zip}
                            aria-describedby={errors.patient_zip ? "patient_zip-error" : undefined}
                            {...register("patient_zip")}
                          />
                          {errors.patient_zip && <span id="patient_zip-error" className="form-error" role="alert">Required</span>}
                        </div>
                      </div>
                      <div className="form-grid">
                        <div className="form-row">
                          <label className="form-label" htmlFor="service_needed">Service needed</label>
                          <select id="service_needed" className="form-input" {...register("service_needed")}>
                            <option value="skilled_nursing">Skilled Nursing</option>
                            <option value="pt">Physical Therapy</option>
                            <option value="ot">Occupational Therapy</option>
                            <option value="st">Speech-Language Therapy</option>
                            <option value="msw">Medical Social Work</option>
                            <option value="hha">Home Health Aide</option>
                            <option value="multiple">Multiple disciplines</option>
                          </select>
                        </div>
                        <div className="form-row">
                          <label className="form-label" htmlFor="urgency">Urgency</label>
                          <select id="urgency" className="form-input" {...register("urgency")}>
                            <option value="same_day">Same-day admit</option>
                            <option value="next_day">Next-day admit</option>
                            <option value="this_week">This week</option>
                            <option value="routine">Routine</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <label className="form-label" htmlFor="notes">Notes (no PHI please)</label>
                        <textarea id="notes" className="form-input" rows={4} placeholder="Diagnosis category, mobility status, special equipment, etc." {...register("notes")} />
                      </div>
                      <label className="form-check">
                        <input type="checkbox" {...register("hipaa_acknowledge")} />
                        <span>I understand this form is for non-PHI intake. Full PHI will be transmitted via our secure HIPAA portal after liaison contact.</span>
                      </label>
                      {errors.hipaa_acknowledge && <span className="form-error">{errors.hipaa_acknowledge.message}</span>}

                      <div className="refer-patient__actions">
                        <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
                        <Button variant="primary" iconRight={<Send size={16} />} disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit referral"}
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What happens next — full timeline */}
      <section className="refer-next section section--bg-mist">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="What happens next"
            title={<>From submit — <em>to first visit</em>.</>}
            description="Every referral gets the same end-to-end treatment. You stay informed without lifting a finger."
          />
          <ScrollReveal childSelector=".refer-next__step" stagger={0.06} className="refer-next__list">
            {NEXT_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <article key={s.title} className="refer-next__step">
                  <span className="refer-next__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="refer-next__icon" aria-hidden="true"><Icon size={20} /></span>
                  <span className="refer-next__time">{s.time}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </article>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* Trust strip */}
      <section className="refer-trust section">
        <div className="container container--wide">
          <ul className="refer-trust__list">
            {TRUST_BADGES.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.label} className="refer-trust__item">
                  <span className="refer-trust__icon" aria-hidden="true"><Icon size={20} /></span>
                  <strong>{b.label}</strong>
                  <span className="refer-trust__desc">{b.description}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
