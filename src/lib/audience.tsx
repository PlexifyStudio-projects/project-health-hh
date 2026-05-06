import { createContext, useContext, useState, type ReactNode } from "react";

export type AudienceId = "patient" | "nurse" | "referral" | "insurance" | "owner";

interface Ctx {
  active: AudienceId;
  setActive: (id: AudienceId) => void;
}

const AudienceContext = createContext<Ctx>({
  active: "patient",
  setActive: () => {},
});

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<AudienceId>("patient");
  return (
    <AudienceContext.Provider value={{ active, setActive }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  return useContext(AudienceContext);
}
