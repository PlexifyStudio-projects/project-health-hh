import { ShieldCheck } from "lucide-react";
import "./BadgeTrust.scss";

interface Props {
  label: string;
  sublabel?: string;
}

export function BadgeTrust({ label, sublabel }: Props) {
  return (
    <div className="badge-trust" role="img" aria-label={`${label}${sublabel ? `: ${sublabel}` : ""}`}>
      <span className="badge-trust__icon" aria-hidden="true">
        <ShieldCheck size={18} />
      </span>
      <span className="badge-trust__label">{label}</span>
      {sublabel && <span className="badge-trust__sub">{sublabel}</span>}
    </div>
  );
}
