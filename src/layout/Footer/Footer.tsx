import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook, Instagram, Linkedin, Youtube, MapPin, Mail, Phone, ArrowUpRight, Sparkles,
  ShieldCheck, Award, BadgeCheck, Send, Clock, Check,
} from "lucide-react";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { AUDIENCES } from "@/data/audiences";
import { Button } from "@/components/Button/Button";
import "./Footer.scss";

export function Footer() {
  const year = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="footer">
      {/* ========== TOP CTA BANNER ========== */}
      <div className="footer__beacon container container--wide">
        <div className="footer__beacon-card">
          <div className="footer__beacon-text">
            <span className="footer__beacon-eyebrow">
              <Sparkles size={12} /> One step away
            </span>
            <h3>Compassionate care, <em>delivered home.</em></h3>
            <p>Talk to a real person in under 60 seconds — no commitment, no paperwork to start.</p>
          </div>
          <div className="footer__beacon-actions">
            <Button to="/refer-a-patient" variant="primary" size="lg" iconRight={<ArrowUpRight size={16} />}>
              Refer a patient
            </Button>
            <a href={SITE.phoneHref} className="footer__beacon-phone">
              <span className="footer__beacon-phone-pulse" aria-hidden="true" />
              <Phone size={16} />
              <span>
                <em>24/7 nursing line</em>
                <strong>{SITE.phone}</strong>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ========== MAIN GRID ========== */}
      <div className="footer__main container container--wide">
        {/* Left: Brand + tagline + contact compact */}
        <div className="footer__brand-block">
          <Link to="/" className="footer__brand">
            <span className="footer__brand-mark">
              <svg viewBox="0 0 64 64" width="44" height="44">
                <defs>
                  <linearGradient id="footer-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"   stopColor="#2D7FF9" />
                    <stop offset="55%"  stopColor="#34C77B" />
                    <stop offset="100%" stopColor="#FF8B6B" />
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="14" fill="url(#footer-grad)" />
                <path d="M32 46 L20 30 a8 8 0 1 1 12-9 a8 8 0 1 1 12 9 Z" fill="#fff" />
              </svg>
            </span>
            <span className="footer__brand-text">
              <strong>Plexify Health</strong>
              <em>Compassionate · Clinically-led · 24/7</em>
            </span>
          </Link>

          <p className="footer__tagline">
            Skilled nursing and therapy delivered to your living room — by an RN-led team that respects your time and your story.
          </p>

          <div className="footer__contact-grid">
            <a href={SITE.phoneHref} className="footer__contact-card">
              <span className="footer__contact-icon"><Phone size={16} /></span>
              <span>
                <em>Call · 24/7</em>
                <strong>{SITE.phone}</strong>
              </span>
            </a>
            <a href={`mailto:${SITE.email}`} className="footer__contact-card">
              <span className="footer__contact-icon"><Mail size={16} /></span>
              <span>
                <em>Email</em>
                <strong>{SITE.email}</strong>
              </span>
            </a>
            <div className="footer__contact-card footer__contact-card--static">
              <span className="footer__contact-icon"><MapPin size={16} /></span>
              <span>
                <em>Office</em>
                <strong>{SITE.address.city}, {SITE.address.state}</strong>
              </span>
            </div>
            <div className="footer__contact-card footer__contact-card--static">
              <span className="footer__contact-icon"><Clock size={16} /></span>
              <span>
                <em>Hours</em>
                <strong>Mon–Fri · 9–6 PT</strong>
              </span>
            </div>
          </div>

          {/* Social */}
          <ul className="footer__social-row" aria-label="Social media">
            <li><a href={SITE.social.facebook}  aria-label="Facebook"  target="_blank" rel="noopener noreferrer"><Facebook  size={16} /></a></li>
            <li><a href={SITE.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram size={16} /></a></li>
            <li><a href={SITE.social.linkedin}  aria-label="LinkedIn"  target="_blank" rel="noopener noreferrer"><Linkedin  size={16} /></a></li>
            <li><a href={SITE.social.youtube}   aria-label="YouTube"   target="_blank" rel="noopener noreferrer"><Youtube   size={16} /></a></li>
          </ul>
        </div>

        {/* Right: 4 link columns, dense + readable */}
        <div className="footer__cols">
          <div className="footer__col">
            <h4 className="footer__heading">Disciplines</h4>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.title}</Link></li>
              ))}
              <li><Link to="/services" className="footer__col-cta">All services <ArrowUpRight size={11} /></Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">For you</h4>
            <ul>
              {AUDIENCES.map((a) => (
                <li key={a.key}><Link to={`/for-you/${a.key}`}>{a.title}</Link></li>
              ))}
              <li><Link to="/for-you" className="footer__col-cta">Find your path <ArrowUpRight size={11} /></Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Company</h4>
            <ul>
              <li><Link to="/about">About Plexify</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/resources">Articles & guides</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Take action</h4>
            <ul>
              <li><Link to="/refer-a-patient">Refer a patient</Link></li>
              <li><Link to="/verify-insurance">Verify insurance</Link></li>
              <li><Link to="/contact">Schedule consultation</Link></li>
              <li><Link to="/careers">Apply (clinicians)</Link></li>
              <li><a href={SITE.phoneHref}>Call 24/7 nursing line</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ========== NEWSLETTER BAND ========== */}
      <div className="footer__news-band">
        <div className="container container--wide footer__news-band-inner">
          <div className="footer__news-text">
            <span className="footer__news-eyebrow"><Sparkles size={11} /> Stay in the loop</span>
            <h4>Monthly clinical guides + caregiving tips.</h4>
            <p>Written by our medical director and RN team. No spam — unsubscribe in one click.</p>
          </div>
          {subscribed ? (
            <p className="footer__news-success" role="status" aria-live="polite">
              <Check size={16} aria-hidden="true" /> Thanks — you're on the list. Check your inbox for a confirmation.
            </p>
          ) : (
            <form
              className="footer__news-form"
              onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
            >
              <label htmlFor="footer-email" className="visually-hidden">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@example.com"
                className="footer__news-input"
                required
                aria-label="Email address"
              />
              <button type="submit" className="footer__news-submit">
                Subscribe <Send size={14} aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ========== TRUST BAND ========== */}
      <div className="footer__trust container container--wide">
        <span className="footer__trust-eyebrow">Trusted, accredited & secure</span>
        <ul className="footer__trust-list">
          <li><ShieldCheck size={16} /> <strong>HIPAA</strong> Secured</li>
          <li><BadgeCheck size={16} /> <strong>Medicare</strong> Certified</li>
          <li><Award size={16} /> <strong>Joint Commission</strong> Accredited</li>
          <li><BadgeCheck size={16} /> <strong>CHAP</strong> Member</li>
          <li><BadgeCheck size={16} /> <strong>CAHSAH</strong> Member</li>
          <li><ShieldCheck size={16} /> <strong>WCAG 2.1 AA</strong> Accessible</li>
        </ul>
      </div>

      {/* ========== LEGAL ========== */}
      <div className="footer__legal-band">
        <div className="footer__legal container container--wide">
          <p className="footer__legal-copy">© {year} {SITE.name}. All rights reserved.</p>

          <ul className="footer__legal-links">
            <li><Link to={SITE.legal.privacy}>Privacy</Link></li>
            <li><Link to={SITE.legal.terms}>Terms</Link></li>
            <li><Link to={SITE.legal.accessibility}>Accessibility</Link></li>
            <li><Link to={SITE.legal.nondiscrimination}>Non-discrimination</Link></li>
          </ul>

          <a
            href="https://plexifystudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__studio"
          >
            <span className="footer__studio-eyebrow">Powered by</span>
            <span className="footer__studio-mark">
              <span className="footer__studio-dot" aria-hidden="true" />
              <strong>Plexify</strong> Studio
              <ArrowUpRight size={12} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
