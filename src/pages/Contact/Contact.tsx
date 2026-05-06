import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Mail, Phone, Send, Check, Clock, MessageSquare, Calendar, Users } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { CoverageMap } from "@/sections/CoverageMap/CoverageMap";
import { SITE } from "@/data/site";
import { useSeo, buildBreadcrumbLd } from "@/lib/seo";
import "./Contact.scss";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Valid email please"),
  phone: z.string().optional(),
  reason: z.enum(["patient", "referral", "career", "insurance", "owner", "other"]),
  message: z.string().min(10, "A few more words please"),
});

type Values = z.infer<typeof schema>;

interface HoursRow { label: string; time: string; note?: string; icon: React.ElementType }
const HOURS: HoursRow[] = [
  { label: "24/7 Nursing line",       time: "Always on",        note: "Clinical questions, urgent admits", icon: Phone },
  { label: "Office (Mon-Fri)",        time: "9:00 AM – 6:00 PM", note: "General questions and intake",      icon: Calendar },
  { label: "Weekend admits",          time: "Saturday & Sunday", note: "Same-day for urgent referrals",     icon: Users },
  { label: "Email response",          time: "≤ 1 business day",  note: "Real human, no auto-replies",       icon: Mail },
  { label: "Liaison reply",           time: "5 minutes (avg)",   note: "For our hospital and SNF partners", icon: MessageSquare },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  useSeo({
    title: "Contact Plexify Health | Home Health Care California",
    description:
      "Talk to the Plexify Health team in Los Angeles, California. 24/7 nursing line, weekend admits and a real human reply within one business day.",
    canonical: "https://plexifyhealth.com/contact",
    jsonLd: [
      buildBreadcrumbLd([
        { name: "Home", url: "https://plexifyhealth.com/" },
        { name: "Contact", url: "https://plexifyhealth.com/contact" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": ["MedicalBusiness", "LocalBusiness"],
        name: "Plexify Health",
        url: "https://plexifyhealth.com/contact",
        logo: "https://plexifyhealth.com/favicon.svg",
        image: "https://plexifyhealth.com/og-image.svg",
        telephone: "+1-555-010-2026",
        email: "care@plexifyhealth.com",
        priceRange: "Insurance accepted",
        address: {
          "@type": "PostalAddress",
          streetAddress: "100 Wilshire Blvd, Suite 1200",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          postalCode: "90017",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 34.052,
          longitude: -118.244,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        areaServed: { "@type": "State", name: "California" },
        sameAs: [
          "https://facebook.com/plexifyhealth",
          "https://instagram.com/plexifyhealth",
          "https://linkedin.com/company/plexifyhealth",
          "https://youtube.com/@plexifyhealth",
        ],
      },
    ],
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { reason: "patient" },
  });

  const onSubmit = async (values: Values) => {
    await new Promise((r) => setTimeout(r, 800));
    console.info("contact submit", values);
    setSent(true);
  };

  return (
    <>
      <section className="contact">
        <div className="container container--wide">
          <div className="contact__grid">
            <div className="contact__info">
              <span className="contact__eyebrow">Contact</span>
              <h1>Let's <em>talk</em>.</h1>
              <p>Fastest answers come by phone — but every email gets a real human reply within one business day.</p>

              <ul className="contact__list">
                <li><span><Phone size={18} /></span><div><strong>Phone</strong><a href={SITE.phoneHref}>{SITE.phone}</a></div></li>
                <li><span><Mail size={18} /></span><div><strong>Email</strong><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div></li>
                <li><span><MapPin size={18} /></span><div><strong>Office</strong>{SITE.address.street}<br />{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</div></li>
              </ul>

              {/* Hours panel */}
              <div className="contact__hours" aria-labelledby="contact-hours-heading">
                <span className="contact__hours-eyebrow"><Clock size={14} /> Hours & response times</span>
                <h2 id="contact-hours-heading" className="contact__hours-title">When you'll hear from us.</h2>
                <ul className="contact__hours-list">
                  {HOURS.map((h) => {
                    const Icon = h.icon;
                    return (
                      <li key={h.label} className="contact__hours-row">
                        <span className="contact__hours-icon" aria-hidden="true"><Icon size={16} /></span>
                        <div>
                          <strong>{h.label}</strong>
                          <span>{h.time}</span>
                          {h.note && <em>{h.note}</em>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="contact__form-wrap">
              {sent ? (
                <div className="contact__success">
                  <span className="contact__success-icon"><Check size={32} /></span>
                  <h2>Got it — talk soon.</h2>
                  <p>Your message landed in our inbox. A real human will reply within one business day. For urgent items call <a href={SITE.phoneHref}>{SITE.phone}</a>.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="contact__form" noValidate aria-label="Contact form">
                  <div className="form-row">
                    <label className="form-label" htmlFor="name">Full name</label>
                    <input
                      id="name"
                      className="form-input"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      {...register("name")}
                    />
                    {errors.name && <span id="name-error" className="form-error" role="alert">{errors.name.message}</span>}
                  </div>

                  <div className="form-grid">
                    <div className="form-row">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="form-input"
                        autoComplete="email"
                        inputMode="email"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                      />
                      {errors.email && <span id="email-error" className="form-error" role="alert">{errors.email.message}</span>}
                    </div>
                    <div className="form-row">
                      <label className="form-label" htmlFor="phone">Phone (optional)</label>
                      <input
                        id="phone"
                        type="tel"
                        className="form-input"
                        autoComplete="tel"
                        inputMode="tel"
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label className="form-label" htmlFor="reason">Reason</label>
                    <select id="reason" className="form-input" {...register("reason")}>
                      <option value="patient">I'm a patient or family member</option>
                      <option value="referral">I want to refer a patient</option>
                      <option value="career">I want to apply / careers</option>
                      <option value="insurance">Insurance / payer partnership</option>
                      <option value="owner">Agency owner / leadership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      className="form-input"
                      rows={5}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      {...register("message")}
                    />
                    {errors.message && <span id="message-error" className="form-error" role="alert">{errors.message.message}</span>}
                  </div>

                  <p className="contact__legal">By submitting you agree to our <a href="/legal/privacy">privacy policy</a>. No PHI please — for clinical messages call us.</p>

                  <Button variant="primary" size="lg" iconRight={<Send size={16} />} disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage map */}
      <CoverageMap />
    </>
  );
}
