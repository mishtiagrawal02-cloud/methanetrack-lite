import React from "react";
import Icon from "components/AppIcon";

const steps = [
  {
    step: "01",
    icon: "ClipboardList",
    title: "Register Your Farm",
    description: "Enter farm details — type (Dairy/Rice/Waste), land size, livestock count, and location. Takes under 5 minutes.",
    color: "var(--color-primary)",
    bg: "rgba(16,163,74,0.12)",
  },
  {
    step: "02",
    icon: "Calculator",
    title: "Calculate Emissions",
    description: "Our engine applies standard emission factors to compute your baseline methane output and simulated reduction potential.",
    color: "var(--color-secondary)",
    bg: "rgba(14,165,233,0.12)",
  },
  {
    step: "03",
    icon: "LayoutDashboard",
    title: "View Your Dashboard",
    description: "Track CO₂ equivalent, carbon credits generated, and revenue earned in real-time with interactive charts.",
    color: "var(--color-accent)",
    bg: "rgba(245,158,11,0.12)",
  },
  {
    step: "04",
    icon: "Award",
    title: "Get Certified & Sell",
    description: "Receive a verifiable carbon credit certificate and list your credits on the corporate marketplace for ₹800 per credit.",
    color: "var(--color-primary)",
    bg: "rgba(16,163,74,0.12)",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8"
      style={{ background: "var(--color-background)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.25)" }}>
            <Icon name="GitBranch" size={13} color="var(--color-secondary)" />
            <span className="font-caption text-xs font-medium" style={{ color: "var(--color-secondary)" }}>
              How It Works
            </span>
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-3">
            From Farm to Carbon Credit in 4 Steps
          </h2>
          <p className="font-body text-sm md:text-base max-w-xl mx-auto"
            style={{ color: "var(--color-muted-foreground)" }}>
            A transparent, science-backed process that turns your methane reduction into verified climate value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps?.map((s, i) => (
            <div key={s?.step} className="relative card card-hover p-5 md:p-6">
              {i < steps?.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 z-10">
                  <Icon name="ChevronRight" size={20} color="var(--color-muted-foreground)" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{ background: s?.bg }}>
                  <Icon name={s?.icon} size={22} color={s?.color} />
                </div>
                <span className="font-data font-bold text-2xl" style={{ color: "var(--color-border)" }}>
                  {s?.step}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-base md:text-lg text-white mb-2">{s?.title}</h3>
              <p className="font-body text-sm" style={{ color: "var(--color-muted-foreground)", lineHeight: "1.6" }}>
                {s?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}