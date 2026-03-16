import React from "react";
import Header from "components/ui/Header";
import HeroSection from "./components/HeroSection";
import ProblemStatement from "./components/ProblemStatement";
import HowItWorks from "./components/HowItWorks";
import TrustIndicators from "./components/TrustIndicators";
import CTASection from "./components/CTASection";
import FooterSection from "./components/FooterSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-background)" }}>
      <Header isAuthenticated={false} />
      <main className="flex-1">
        <HeroSection />
        <ProblemStatement />
        <HowItWorks />
        <TrustIndicators />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  );
}