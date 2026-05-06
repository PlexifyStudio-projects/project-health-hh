import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { MapPin } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { COVERAGE } from "@/data/coverage-areas";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { useAudience } from "@/lib/audience";
import { AUDIENCE_CONTENT } from "@/data/audience-content";
import "leaflet/dist/leaflet.css";
import "./CoverageMap.scss";

interface ServiceMarker {
  lat: number;
  lng: number;
  label: string;
  color: "blue" | "green" | "coral" | "ink" | "gold";
  cities: string;
}

const MARKERS: ServiceMarker[] = [
  { lat: 34.052, lng: -118.244, label: "Greater LA",          color: "blue",  cities: "LA · Glendale · Pasadena · Long Beach" },
  { lat: 34.182, lng: -118.435, label: "San Fernando Valley", color: "green", cities: "Sherman Oaks · Encino · Northridge"   },
  { lat: 33.836, lng: -117.913, label: "Orange County",       color: "coral", cities: "Anaheim · Santa Ana · Irvine"         },
  { lat: 34.197, lng: -119.177, label: "Ventura County",      color: "ink",   cities: "Oxnard · Thousand Oaks · Camarillo"   },
  { lat: 33.953, lng: -117.396, label: "Inland Empire",       color: "gold",  cities: "Riverside · San Bernardino · Ontario" },
];

// Build a custom HTML divIcon for each marker (with pulse + tooltip on hover)
function makeIcon(m: ServiceMarker, idx: number): L.DivIcon {
  const html = `
    <div class="lm coverage-map__marker coverage-map__marker--${m.color}" data-mk-idx="${idx}" style="--pulse-delay:${idx * 0.5}s">
      <div class="coverage-map__marker-inner">
        <span class="coverage-map__marker-pulse"></span>
        <span class="coverage-map__marker-dot"></span>
        <span class="coverage-map__marker-label">
          <strong>${m.label}</strong>
          <em>${m.cities}</em>
        </span>
      </div>
    </div>`;
  return L.divIcon({
    html,
    className: "coverage-map__divicon",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

export default function CoverageMapImpl() {
  const { active } = useAudience();
  const content = AUDIENCE_CONTENT[active];
  const sectionRef = useRef<HTMLElement>(null);

  // Center on LA metro, zoom 9 shows Ventura → Inland Empire → OC nicely
  const center: [number, number] = [34.05, -118.05];
  const zoom = 9;

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Pre-set markers to invisible — fall in when section enters.
      // Target the inner wrapper (not the outer one, which Leaflet/SCSS centers via transform).
      const findMarkers = () =>
        Array.from(root.querySelectorAll<HTMLElement>(".coverage-map__marker-inner"));

      // Markers are mounted async by Leaflet, so use a small wait
      let st: ScrollTrigger | null = null;
      const init = () => {
        const markers = findMarkers();
        if (markers.length === 0) return false;

        // Initial state — only animate the inner marker, not the leaflet positioned wrapper
        gsap.set(markers, { opacity: 0, y: -40 });

        st = ScrollTrigger.create({
          trigger: root,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(markers, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "back.out(1.6)",
              stagger: 0.12,
            });
          },
        });
        return true;
      };

      // Try a few times until Leaflet renders the divIcons
      let tries = 0;
      const intervalId = window.setInterval(() => {
        tries++;
        if (init() || tries > 20) window.clearInterval(intervalId);
      }, 100);

      return () => {
        window.clearInterval(intervalId);
        if (st) st.kill();
        ScrollTrigger.getAll().forEach((s) => {
          if (s.trigger === root) s.kill();
        });
      };
    },
    { scope: sectionRef, dependencies: [active] }
  );

  return (
    <section ref={sectionRef} className="coverage-map section" data-section="coverage" id="coverage">
      <div className="container container--wide">
        <SectionHeader
          eyebrow={content.coverageEyebrow}
          title={<>{content.coverageTitle}<em>{content.coverageTitleAccent}</em></>}
          description={content.coverageDescription}
        />

        <div className="coverage-map__grid">
          <ScrollReveal className="coverage-map__visual">
            <div className="coverage-map__realmap">
              <MapContainer
                center={center}
                zoom={zoom}
                minZoom={zoom}
                maxZoom={zoom}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                dragging={false}
                touchZoom={false}
                boxZoom={false}
                keyboard={false}
                zoomControl={false}
                attributionControl={false}
                zoomSnap={0}
                className="coverage-map__leaflet"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {MARKERS.map((m, i) => (
                  <Marker
                    key={m.label}
                    position={[m.lat, m.lng]}
                    icon={makeIcon(m, i)}
                  />
                ))}
              </MapContainer>

              {/* Compass */}
              <span className="coverage-map__compass" aria-hidden="true">N ↑</span>

              {/* Legend */}
              <div className="coverage-map__legend" aria-hidden="true">
                <span className="coverage-map__legend-eyebrow">Live coverage</span>
                <span className="coverage-map__legend-value">5 regions</span>
                <span className="coverage-map__legend-meta">35+ cities · 24/7</span>
              </div>

              {/* Attribution (small) */}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="coverage-map__attribution"
              >
                © OpenStreetMap
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal childSelector=".coverage-map__region" stagger={0.08} className="coverage-map__regions" mode="slide-in-right">
            {COVERAGE.map((c, i) => (
              <details
                key={c.region}
                className={`coverage-map__region coverage-map__region--${["blue","green","coral","ink","gold"][i % 5]}`}
              >
                <summary className="coverage-map__region-head">
                  <span className={`coverage-map__pin coverage-map__pin--${["blue","green","coral","ink","gold"][i % 5]}`}>
                    <MapPin size={16} />
                  </span>
                  <h3 className="coverage-map__region-title">{c.region}</h3>
                  <span className="coverage-map__region-count">{c.cities.length} cities</span>
                </summary>
                <p className="coverage-map__cities">{c.cities.join(" · ")}</p>
              </details>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
