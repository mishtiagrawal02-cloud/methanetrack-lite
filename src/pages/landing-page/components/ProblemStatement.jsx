import React from "react";
import Icon from "components/AppIcon";

const problems = [
  {
    icon: "CloudRain",
    title: "Agriculture Drives 14.5% of Global Emissions",
    description:
      "Livestock, rice paddies, and organic waste decomposition are among the largest sources of methane — a greenhouse gas 80× more potent than CO₂ over 20 years. Indian agriculture contributes significantly to this global challenge.",
    color: "var(--color-destructive)",
    bg: "rgba(239,68,68,0.1)",
  },
  {
    icon: "TrendingDown",
    title: "Farmers Lack Tools to Measure Impact",
    description:
      "Most smallholder farmers have no access to digital tools that quantify their methane output, making it impossible to participate in carbon markets or demonstrate sustainability credentials to buyers and regulators.",
    color: "var(--color-warning)",
    bg: "rgba(245,158,11,0.1)",
  },
  {
    icon: "IndianRupee",
    title: "Missed Revenue from Carbon Credits",
    description:
      "The voluntary carbon market is growing rapidly, yet Indian farmers are largely excluded. Every tonne of CO₂ equivalent reduced represents real monetary value — ₹800 per credit — that currently goes uncaptured.",
    color: "var(--color-secondary)",
    bg: "rgba(14,165,233,0.1)",
  },
];

const solutions = [
  { icon: "Calculator", text: "Automated methane estimation using standard emission factors" },
  { icon: "BarChart2", text: "Real-time dashboard tracking reductions and credit generation" },
  { icon: "Award", text: "Verifiable carbon credit certificates with unique IDs" },
  { icon: "ShoppingBag", text: "Direct marketplace connecting farmers with corporate buyers" },
];

export default function ProblemStatement() {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8"
      style={{ background: "var(--color-surface-2)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}>
            <Icon name="AlertTriangle" size={13} color="var(--color-destructive)" />
            <span className="font-caption text-xs font-medium" style={{ color: "var(--color-destructive)" }}>
              The Problem
            </span>
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-3">
            Agriculture&apos;s Hidden Climate Crisis
          </h2>
          <p className="font-body text-sm md:text-base max-w-2xl mx-auto"
            style={{ color: "var(--color-muted-foreground)" }}>
            Methane from farms is invisible, unmeasured, and unmonetized. MethaneTrack Lite changes that.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {problems?.map((p) => (
            <div key={p?.title} className="card card-hover p-5 md:p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                style={{ background: p?.bg }}>
                <Icon name={p?.icon} size={24} color={p?.color} />
              </div>
              <h3 className="font-heading font-semibold text-base md:text-lg text-white mb-2">{p?.title}</h3>
              <p className="font-body text-sm" style={{ color: "var(--color-muted-foreground)", lineHeight: "1.65" }}>
                {p?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Solution strip */}
        <div className="rounded-2xl p-6 md:p-8"
          style={{ background: "rgba(16,163,74,0.07)", border: "1px solid rgba(16,163,74,0.2)" }}>
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
              style={{ background: "rgba(16,163,74,0.12)", border: "1px solid rgba(16,163,74,0.3)" }}>
              <Icon name="Zap" size={13} color="var(--color-primary)" />
              <span className="font-caption text-xs font-medium" style={{ color: "var(--color-primary)" }}>
                Our Solution
              </span>
            </span>
            <h3 className="font-heading font-bold text-xl md:text-2xl text-white">
              A Complete Digital Climate Accounting Platform
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {solutions?.map((s) => (
              <div key={s?.text} className="flex items-start gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg"
                  style={{ background: "rgba(16,163,74,0.15)" }}>
                  <Icon name={s?.icon} size={18} color="var(--color-primary)" />
                </div>
                <p className="font-body text-sm" style={{ color: "var(--color-muted-foreground)", lineHeight: "1.5" }}>
                  {s?.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}