import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check, ShieldCheck, BadgeCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { Accordion } from "@/components/Accordion/Accordion";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import { INSURANCE, ACCREDITATIONS } from "@/data/insurance-accepted";
import { FAQ } from "@/data/faq";
import "@/pages/Contact/Contact.scss"; // reuse form styles
import "./VerifyInsurance.scss";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  insurer: z.string().min(2),
  member_id_last4: z.string().regex(/^\d{4}$/, "Last 4 digits only").optional().or(z.literal("")),
  zip: z.string().min(5),
});

type Values = z.infer<typeof schema>;

export default function VerifyInsurance() {
  const [sent, setSent] = useState(false);
  useSeo({
    title: "Verify Home Health Insurance | Plexify Health California",
    description:
      "Confirm your home health insurance coverage in 24 hours. Medicare, Medi-Cal, VA, TRICARE and most private plans accepted across California.",
    canonical: "https://plexifyhealth.com/verify-insurance",
    jsonLd: buildBreadcrumbLd([
      { name: "Home", url: "https://plexifyhealth.com/" },
      { name: "Verify Insurance", url: "https://plexifyhealth.com/verify-insurance" },
    ]),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values) => {
    await new Promise((r) => setTimeout(r, 800));
    console.info("verify insurance", values);
    setSent(true);
  };

  const insuranceFaq = FAQ.filter((f) => f.category === "insurance");

  return (
    <>
      <section className="verify-insurance contact">
        <div className="container container--wide">
          <div className="contact__grid">
            <div className="contact__info">
              <span className="contact__eyebrow verify-insurance__eyebrow">Verify Insurance</span>
              <h1>Confirm coverage <em>in 24 hours</em>.</h1>
              <p>We work with most major plans. Tell us a bit about yours and our verification team will email you back within one business day — most patients pay nothing out of pocket.</p>

              <ul className="verify-insurance__pills">
                <li><ShieldCheck size={16} /> No PHI required to start</li>
                <li><Send size={16} /> Reply by email or phone</li>
                <li><BadgeCheck size={16} /> Same-day for Medicare cardholders</li>
              </ul>

              <div className="verify-insurance__legal">
                <strong>Privacy first.</strong>
                <p>We only ask for the minimum we need. Full eligibility is verified securely by our intake team — never on this form.</p>
              </div>
            </div>

            <div className="contact__form-wrap">
              {sent ? (
                <div className="contact__success">
                  <span className="contact__success-icon"><Check size={32} /></span>
                  <h2>Got it.</h2>
                  <p>You'll hear from our verification team within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="contact__form" noValidate aria-label="Insurance verification form">
                  <div className="form-row">
                    <label className="form-label" htmlFor="vname">Your name</label>
                    <input
                      id="vname"
                      className="form-input"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "vname-error" : undefined}
                      {...register("name")}
                    />
                    {errors.name && <span id="vname-error" className="form-error" role="alert">Required</span>}
                  </div>
                  <div className="form-grid">
                    <div className="form-row">
                      <label className="form-label" htmlFor="vemail">Email</label>
                      <input
                        id="vemail"
                        type="email"
                        className="form-input"
                        autoComplete="email"
                        inputMode="email"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "vemail-error" : undefined}
                        {...register("email")}
                      />
                      {errors.email && <span id="vemail-error" className="form-error" role="alert">Valid email please</span>}
                    </div>
                    <div className="form-row">
                      <label className="form-label" htmlFor="vphone">Phone</label>
                      <input
                        id="vphone"
                        type="tel"
                        className="form-input"
                        autoComplete="tel"
                        inputMode="tel"
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "vphone-error" : undefined}
                        {...register("phone")}
                      />
                      {errors.phone && <span id="vphone-error" className="form-error" role="alert">Required</span>}
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="form-row">
                      <label className="form-label" htmlFor="insurer">Insurer / plan</label>
                      <input
                        id="insurer"
                        className="form-input"
                        placeholder="e.g. Anthem Blue Cross"
                        aria-required="true"
                        aria-invalid={!!errors.insurer}
                        aria-describedby={errors.insurer ? "insurer-error" : undefined}
                        {...register("insurer")}
                      />
                      {errors.insurer && <span id="insurer-error" className="form-error" role="alert">Required</span>}
                    </div>
                    <div className="form-row">
                      <label className="form-label" htmlFor="memid">Member ID — last 4 (optional)</label>
                      <input
                        id="memid"
                        className="form-input"
                        inputMode="numeric"
                        maxLength={4}
                        aria-invalid={!!errors.member_id_last4}
                        aria-describedby={errors.member_id_last4 ? "memid-error" : undefined}
                        {...register("member_id_last4")}
                      />
                      {errors.member_id_last4 && <span id="memid-error" className="form-error" role="alert">{errors.member_id_last4.message}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <label className="form-label" htmlFor="vzip">ZIP code</label>
                    <input
                      id="vzip"
                      className="form-input"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      aria-required="true"
                      aria-invalid={!!errors.zip}
                      aria-describedby={errors.zip ? "vzip-error" : undefined}
                      {...register("zip")}
                    />
                    {errors.zip && <span id="vzip-error" className="form-error" role="alert">Required</span>}
                  </div>

                  <p className="contact__legal">No full member IDs, dates of birth or PHI required. Full eligibility is verified securely by our team.</p>

                  <Button variant="primary" size="lg" iconRight={<Send size={16} />} disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Verify my plan"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Plans we accept */}
      <section className="verify-plans section section--bg-mist">
        <div className="container container--wide">
          <SectionHeader
            eyebrow="Plans we accept"
            title={<>Most major plans, <em>fully covered</em>.</>}
            description="Medicare and Medi-Cal cover skilled home health for eligible patients at no cost. We also work with private plans, VA, TRICARE and workers' comp."
          />
          <ScrollReveal childSelector=".verify-plans__plan" stagger={0.04} className="verify-plans__grid">
            {INSURANCE.map((p) => (
              <div key={p.name} className="verify-plans__plan">
                <span className="verify-plans__check" aria-hidden="true"><Check size={14} /></span>
                <span>{p.name}</span>
              </div>
            ))}
          </ScrollReveal>

          <div className="verify-plans__accreditations">
            <span className="verify-plans__accreditations-eyebrow">Plus, fully accredited</span>
            <ul>
              {ACCREDITATIONS.map((a) => (
                <li key={a.name}><BadgeCheck size={14} /> {a.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Insurance FAQ */}
      <section className="verify-faq section">
        <div className="container container--narrow">
          <SectionHeader
            eyebrow="Insurance · FAQ"
            title={<>Coverage questions, <em>answered</em>.</>}
            description="The questions our intake team hears most often about insurance, coverage and out-of-pocket costs."
          />
          <Accordion items={insuranceFaq.map((f) => ({ question: f.question, answer: f.answer }))} />
          <div className="verify-faq__footer">
            <Button to="/faq" variant="outline" iconRight={<ArrowRight size={14} />}>See full FAQ</Button>
          </div>
        </div>
      </section>
    </>
  );
}
