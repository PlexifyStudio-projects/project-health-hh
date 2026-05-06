import { ShieldCheck, ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/Button/Button";
import "./ServiceCoverage.scss";

interface Props {
  coverage: string[];
  serviceTitle: string;
}

export function ServiceCoverage({ coverage, serviceTitle }: Props) {
  return (
    <section className="service-coverage section section--bg-mist" data-section="coverage">
      <div className="container container--wide">
        <div className="service-coverage__panel">
          <div className="service-coverage__intro">
            <span className="service-coverage__icon"><ShieldCheck size={22} /></span>
            <h2>Insurance &amp; coverage</h2>
            <p>
              Most patients pay <em>nothing</em> out of pocket for {serviceTitle.toLowerCase()}. Verification takes about 24 hours.
            </p>
            <Button to="/verify-insurance" variant="primary" iconRight={<ArrowRight size={16} />}>
              Verify my coverage
            </Button>
          </div>

          <ul className="service-coverage__plans" aria-label="Plans accepted">
            {coverage.map((c) => (
              <li key={c} className="service-coverage__plan">
                <BadgeCheck size={16} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
