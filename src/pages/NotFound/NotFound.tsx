import { Link } from "react-router-dom";
import { Home, ArrowRight, Stethoscope, Users, MessageCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { useSeo } from "@/lib/seo";
import "./NotFound.scss";

const SUGGESTIONS = [
  { to: "/",         icon: Home,         title: "Home",         description: "Start fresh on the front page." },
  { to: "/services", icon: Stethoscope,  title: "Services",     description: "RN, LVN, PT, OT, ST, MSW & HHA." },
  { to: "/for-you",  icon: Users,        title: "For You",      description: "Pick the path for your role." },
  { to: "/contact",  icon: MessageCircle, title: "Contact",     description: "A real human in 60 seconds." },
];

export default function NotFound() {
  useSeo({
    title: "Page Not Found (404) | Plexify Health",
    description:
      "The page you were looking for took a wrong turn. Return to Plexify Health home or browse our services, FAQ and contact options.",
    canonical: "https://plexifyhealth.com/404",
    noindex: true,
  });
  return (
    <section className="not-found">
      <div className="container container--narrow">
        <span className="not-found__code">404</span>
        <h1>This page took a wrong turn.</h1>
        <p>Let's get you back somewhere useful — these are the four most-visited pages on the site.</p>

        <ul className="not-found__grid" role="list">
          {SUGGESTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.to}>
                <Link to={s.to} className="not-found__card">
                  <span className="not-found__card-icon" aria-hidden="true"><Icon size={20} /></span>
                  <div>
                    <strong>{s.title}</strong>
                    <span>{s.description}</span>
                  </div>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="not-found__actions">
          <Button to="/" variant="primary" iconLeft={<Home size={16} />}>Back to home</Button>
          <Button to="/contact" variant="outline" iconRight={<ArrowRight size={14} />}>Or talk to us</Button>
        </div>

        <p className="not-found__hint">Looking for something specific? Try the <Link to="/faq">FAQ</Link> or <Link to="/resources">Resources</Link>.</p>
      </div>
    </section>
  );
}
