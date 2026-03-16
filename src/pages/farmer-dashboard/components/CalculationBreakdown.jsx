import React from "react";
import Icon from "components/AppIcon";

export default function CalculationBreakdown({ farmData }) {
  const { farmType, livestockCount, landSize, farmName } = farmData;

  const emissionFactors = {
    Dairy: { factor: 100, unit: "kg/cow/year", label: "Dairy Cattle" },
    Rice: { factor: 150, unit: "kg/acre/year", label: "Rice Field" },
    Waste: { factor: 200, unit: "kg/ton/year", label: "Waste Management" },
  };

  const ef = emissionFactors?.[farmType] || emissionFactors?.Dairy;
  const quantity = farmType === "Dairy" ? livestockCount : landSize;
  const baseline = quantity * ef?.factor;
  const reduced = baseline * 0.6;
  const co2Eq = reduced * 80;
  const credits = Math.floor(co2Eq / 1000);
  const revenue = credits * 800;

  const steps = [
    {
      label: "Emission Factor",
      formula: `1 ${ef?.label} = ${ef?.factor} kg methane/${ef?.unit?.split("/")?.slice(1)?.join("/")}`,
      result: `${ef?.factor} kg CH₄`,
      icon: "FlaskConical",
      color: "var(--color-accent)",
    },
    {
      label: "Baseline Methane",
      formula: `${quantity?.toLocaleString("en-IN")} × ${ef?.factor} kg`,
      result: `${baseline?.toLocaleString("en-IN")} kg CH₄/year`,
      icon: "Activity",
      color: "#EF4444",
    },
    {
      label: "Methane Reduced",
      formula: `${baseline?.toLocaleString("en-IN")} × 0.6`,
      result: `${reduced?.toLocaleString("en-IN")} kg CH₄/year`,
      icon: "TrendingDown",
      color: "var(--color-primary)",
    },
    {
      label: "CO₂ Equivalent",
      formula: `${reduced?.toLocaleString("en-IN")} × 80`,
      result: `${co2Eq?.toLocaleString("en-IN")} kg CO₂e`,
      icon: "Wind",
      color: "var(--color-secondary)",
    },
    {
      label: "Carbon Credits",
      formula: `${co2Eq?.toLocaleString("en-IN")} ÷ 1,000`,
      result: `${credits} Credits`,
      icon: "Leaf",
      color: "var(--color-primary)",
    },
    {
      label: "Market Value",
      formula: `${credits} × ₹800`,
      result: `₹${revenue?.toLocaleString("en-IN")}`,
      icon: "IndianRupee",
      color: "var(--color-accent)",
    },
  ];

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Calculator" size={18} color="var(--color-primary)" />
        <h3 className="font-heading font-600 text-base md:text-lg" style={{ color: "var(--color-foreground)" }}>
          Calculation Breakdown — {farmName}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps?.map((step, i) => (
          <div
            key={step?.label}
            className="rounded-lg p-3 flex flex-col gap-1"
            style={{ backgroundColor: "var(--color-surface-3)", border: "1px solid var(--color-border)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center rounded"
                style={{ width: "28px", height: "28px", backgroundColor: `${step?.color}18` }}
              >
                <Icon name={step?.icon} size={14} color={step?.color} />
              </div>
              <span className="font-caption text-xs font-600" style={{ color: "var(--color-muted-foreground)" }}>
                Step {i + 1}: {step?.label}
              </span>
            </div>
            <p className="font-data text-xs mt-1" style={{ color: "var(--color-muted-foreground)" }}>{step?.formula}</p>
            <p className="font-data text-sm font-600" style={{ color: step?.color }}>{step?.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}