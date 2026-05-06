import { lazy, Suspense } from "react";

interface Props {
  audienceAware?: boolean;
}

// Lazy-load the Swiper-based carousel so the ~100KB swiper bundle is only
// fetched when this section actually mounts (not on initial route load).
const TestimonialsCarouselImpl = lazy(() => import("./TestimonialsCarousel.impl"));

function TestimonialsPlaceholder() {
  return (
    <section
      className="testimonials section section--bg-mist"
      data-section="stories"
      id="stories"
      aria-busy="true"
      style={{ minHeight: "560px" }}
    />
  );
}

export function TestimonialsCarousel(props: Props) {
  return (
    <Suspense fallback={<TestimonialsPlaceholder />}>
      <TestimonialsCarouselImpl {...props} />
    </Suspense>
  );
}
