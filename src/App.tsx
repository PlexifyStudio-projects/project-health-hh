import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "@/layout/Header/Header";
import { SectionTrack } from "@/layout/SectionTrack/SectionTrack";
import { Footer } from "@/layout/Footer/Footer";
import { Cursor } from "@/layout/Cursor/Cursor";
import { MobileBottomBar } from "@/layout/MobileBottomBar/MobileBottomBar";
import { AudienceProvider } from "@/lib/audience";
import { useLenis } from "@/hooks/useLenis";
import "./App.scss";

const Home              = lazy(() => import("@/pages/Home/Home"));
const About             = lazy(() => import("@/pages/About/About"));
const Services          = lazy(() => import("@/pages/Services/Services"));
const ServiceDetail     = lazy(() => import("@/pages/Services/ServiceDetail"));
const ForYouHub         = lazy(() => import("@/pages/ForYou/ForYouHub"));
const AudienceDetail    = lazy(() => import("@/pages/ForYou/AudienceDetail"));
const Resources         = lazy(() => import("@/pages/Resources/Resources"));
const Article           = lazy(() => import("@/pages/Resources/Article"));
const FAQ               = lazy(() => import("@/pages/FAQ/FAQ"));
const Careers           = lazy(() => import("@/pages/Careers/Careers"));
const ReferPatient      = lazy(() => import("@/pages/ReferPatient/ReferPatient"));
const VerifyInsurance   = lazy(() => import("@/pages/VerifyInsurance/VerifyInsurance"));
const Contact           = lazy(() => import("@/pages/Contact/Contact"));
const NotFound          = lazy(() => import("@/pages/NotFound/NotFound"));

function PageFallback() {
  return <div className="route-fallback"><span className="route-fallback__pulse" /></div>;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  useLenis();
  useEffect(() => { document.documentElement.lang = "en"; }, []);

  return (
    <AudienceProvider>
      <Cursor />
      <Header />
      <SectionTrack />
      <ScrollToTop />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/for-you" element={<ForYouHub />} />
            <Route path="/for-you/:slug" element={<AudienceDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<Article />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/refer-a-patient" element={<ReferPatient />} />
            <Route path="/verify-insurance" element={<VerifyInsurance />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <MobileBottomBar />
    </AudienceProvider>
  );
}
