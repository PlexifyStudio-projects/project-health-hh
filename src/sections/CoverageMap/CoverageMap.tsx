import { lazy, Suspense } from "react";

// Lazy-load the heavy implementation (pulls in leaflet + react-leaflet + leaflet css).
// This keeps ~150KB of map code out of the initial route bundle until CoverageMap mounts.
const CoverageMapImpl = lazy(() => import("./CoverageMap.impl"));

function CoverageMapPlaceholder() {
  return (
    <section
      className="coverage-map section"
      data-section="coverage"
      id="coverage"
      aria-busy="true"
      style={{ minHeight: "640px" }}
    />
  );
}

export function CoverageMap() {
  return (
    <Suspense fallback={<CoverageMapPlaceholder />}>
      <CoverageMapImpl />
    </Suspense>
  );
}
