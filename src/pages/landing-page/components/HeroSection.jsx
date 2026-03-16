import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "components/AppIcon";
import Button from "components/ui/Button";

export default function HeroSection() {
  const navigate = useNavigate();

  const stats = [
    { value: "14.5%", label: "of global GHG from agriculture", icon: "Globe" },
    { value: "80×", label: "more potent than CO₂ over 20 years", icon: "Flame" },
    { value: "₹800", label: "per carbon credit earned", icon: "IndianRupee" },
  ];

  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36 px-4 md:px-6 lg:px-8">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,163,74,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 md:mb-8"
          style={{ background: "rgba(16,163,74,0.12)", border: "1px solid rgba(16,163,74,0.3)" }}>
          <Icon name="Leaf" size={14} color="var(--color-primary)" />
          <span className="font-caption text-xs md:text-sm font-medium" style={{ color: "var(--color-primary)" }}>
            India&apos;s Climate Accounting Platform
          </span>
        </div>

        <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 leading-tight">
          MethaneTrack{" "}
          <span style={{ color: "var(--color-primary)" }}>Lite</span>
        </h1>
        <p className="font-body text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 max-w-3xl mx-auto"
          style={{ color: "var(--color-muted-foreground)" }}>
          Turning Methane Emissions into Measurable Climate Impact
        </p>
        <p className="font-body text-sm md:text-base max-w-2xl mx-auto mb-8 md:mb-10"
          style={{ color: "var(--color-muted-foreground)", lineHeight: "1.7" }}>
          Empowering Indian farmers to quantify, reduce, and monetize methane emissions from dairy, rice, and waste operations — transforming environmental responsibility into real revenue.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16">
          <Button
            variant="default"
            size="lg"
            iconName="Sprout"
            iconPosition="left"
            onClick={() => navigate("/farmer-registration")}
          >
            Register as Farmer
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconName="ShoppingBag"
            iconPosition="left"
            onClick={() => navigate("/farmer-dashboard")}
          >
            View Marketplace
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
          {stats?.map((stat) => (
            <div
              key={stat?.label}
              className="flex flex-col items-center gap-2 p-4 md:p-5 rounded-xl"
              style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{ background: "rgba(16,163,74,0.12)" }}>
                <Icon name={stat?.icon} size={20} color="var(--color-primary)" />
              </div>
              <span className="font-heading font-bold text-2xl md:text-3xl text-white">{stat?.value}</span>
              <span className="font-caption text-xs md:text-sm text-center"
                style={{ color: "var(--color-muted-foreground)" }}>{stat?.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}