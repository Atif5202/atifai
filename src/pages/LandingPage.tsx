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
      {/* Front Hero above the fold mockup */}
      <Hero />

      {/* Dynamic count-up counter widget bar */}
      <Stats />

      {/* 6 Grid features guide details cards */}
      <Features />

      {/* Stateful Demo Mini application panel */}
      <Demo />

      {/* Why Choose Us details grid */}
      <WhyChooseUs />

      {/* Feedback auto-carousel loops */}
      <Testimonials />

      {/* Tiers catalog Pricing tables */}
      <Pricing />

      {/* Expandable question-solutions Accordion lists */}
      <FAQ />

      {/* Validated submission Contact Form */}
      <Contact />
    </>
  );
}
export default LandingPage;
