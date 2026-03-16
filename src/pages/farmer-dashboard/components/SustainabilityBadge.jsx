import React from "react";
import Icon from "components/AppIcon";

export default function SustainabilityBadge({ credits, co2Offset }) {
  const level = credits >= 10 ? "Platinum" : credits >= 5 ? "Gold" : credits >= 2 ? "Silver" : "Bronze";
  const levelColors = {
    Platinum: { bg: "rgba(14,165,233,0.12)", border: "rgba(14,165,233,0.3)", color: "var(--color-secondary)" },
    Gold: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", color: "var(--color-accent)" },
    Silver: { bg: "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.3)", color: "#94A3B8" },
    Bronze: { bg: "rgba(180,120,60,0.12)", border: "rgba(180,120,60,0.3)", color: "#B4783C" },
  };
  const lc = levelColors?.[level];

  return (
    <div
      className="card flex flex-col items-center text-center gap-4 py-6 md:py-8"
      style={{ border: `1px solid ${lc?.border}`, background: lc?.bg }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{ width: "72px", height: "72px", background: lc?.bg, border: `2px solid ${lc?.border}` }}
      >
        <Icon name="Award" size={36} color={lc?.color} />
      </div>
      <div>
        <p className="font-caption text-xs uppercase tracking-widest mb-1" style={{ color: lc?.color }}>Sustainability Achievement</p>
        <h3 className="font-heading font-700 text-xl md:text-2xl" style={{ color: "var(--color-foreground)" }}>
          {level} Climate Champion
        </h3>
        <p className="font-body text-sm mt-2" style={{ color: "var(--color-muted-foreground)" }}>
          Offset <span className="font-600" style={{ color: lc?.color }}>{co2Offset?.toLocaleString("en-IN")} kg CO₂</span> through verified methane reduction
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {["Verified Farmer", "Carbon Positive", "MethaneTrack Certified"]?.map((tag) => (
          <span
            key={tag}
            className="font-caption text-xs px-3 py-1 rounded-full"
            style={{ backgroundColor: "rgba(16,163,74,0.12)", color: "var(--color-primary)", border: "1px solid rgba(16,163,74,0.25)" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}