import { ErrorBoundary } from "../components/ErrorBoundary";
import { Hero } from "../sections/Hero";
import { Stats } from "../sections/Stats";
import { Features } from "../sections/Features";
import { Demo } from "../sections/Demo";
import { WhyChooseUs } from "../sections/WhyChooseUs";
import { Testimonials } from "../sections/Testimonials";
import { Pricing } from "../sections/Pricing";
import { FAQ } from "../sections/FAQ";
import { Contact } from "../sections/Contact";

export function LandingPage() {
  return (
    <>
      <ErrorBoundary><Hero /></ErrorBoundary>
      <ErrorBoundary><Stats /></ErrorBoundary>
      <ErrorBoundary><Features /></ErrorBoundary>
      <ErrorBoundary><Demo /></ErrorBoundary>
      <ErrorBoundary><WhyChooseUs /></ErrorBoundary>
      <ErrorBoundary><Testimonials /></ErrorBoundary>
      <ErrorBoundary><Pricing /></ErrorBoundary>
      <ErrorBoundary><FAQ /></ErrorBoundary>
      <ErrorBoundary><Contact /></ErrorBoundary>
    </>
  );
}
export default LandingPage;
