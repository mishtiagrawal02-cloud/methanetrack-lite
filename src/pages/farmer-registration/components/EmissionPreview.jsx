import React from 'react';
import Icon from 'components/AppIcon';

function calcEmissions(formData) {
  const { farmType, landSize, livestockCount } = formData;
  let baseline = 0;
  if (farmType === 'Dairy') {
    baseline = (parseFloat(livestockCount) || 0) * 100;
  } else if (farmType === 'Rice') {
    baseline = (parseFloat(landSize) || 0) * 150;
  } else if (farmType === 'Waste') {
    baseline = (parseFloat(landSize) || 0) * 200;
  }
  const reduced = baseline * 0.6;
  const co2eq = reduced * 80;
  const credits = Math.floor(co2eq / 1000);
  const revenue = credits * 800;
  return { baseline, reduced, co2eq, credits, revenue };
}

function fmt(n) {
  return n?.toLocaleString('en-IN');
}

export default function EmissionPreview({ formData }) {
  const { farmType, landSize, livestockCount } = formData;
  const hasData =
    farmType &&
    ((farmType === 'Dairy' && parseFloat(livestockCount) > 0) ||
      (farmType !== 'Dairy' && parseFloat(landSize) > 0));

  if (!hasData) {
    return (
      <div
        className="rounded-xl p-4 md:p-5 flex flex-col items-center justify-center text-center gap-3"
        style={{
          backgroundColor: 'var(--color-surface-2)',
          border: '1px dashed var(--color-border)',
          minHeight: 160,
        }}
      >
        <Icon name="Calculator" size={28} color="var(--color-muted-foreground)" />
        <p className="font-caption text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
          Fill in Farm Type and size/livestock to preview your estimated carbon credits.
        </p>
      </div>
    );
  }

  const { baseline, reduced, co2eq, credits, revenue } = calcEmissions(formData);

  const metrics = [
    { label: 'Baseline Methane', value: `${fmt(baseline)} kg/yr`, icon: 'Wind', color: 'var(--color-muted-foreground)' },
    { label: 'Methane Reduced', value: `${fmt(reduced)} kg/yr`, icon: 'TrendingDown', color: 'var(--color-secondary)' },
    { label: 'CO₂ Equivalent', value: `${fmt(co2eq)} kg`, icon: 'Leaf', color: 'var(--color-primary)' },
    { label: 'Credits Generated', value: `${fmt(credits)} credits`, icon: 'Award', color: 'var(--color-accent)' },
    { label: 'Est. Revenue', value: `₹${fmt(revenue)}`, icon: 'IndianRupee', color: 'var(--color-success)' },
  ];

  return (
    <div
      className="rounded-xl p-4 md:p-5"
      style={{
        backgroundColor: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Zap" size={16} color="var(--color-accent)" />
        <span className="font-heading font-600 text-sm" style={{ color: 'var(--color-card-foreground)' }}>
          Live Emission Preview
        </span>
        <span
          className="ml-auto text-xs font-caption px-2 py-0.5 rounded-full"
          style={{ backgroundColor: 'rgba(245,158,11,0.15)', color: 'var(--color-accent)' }}
        >
          Estimate
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {metrics?.map((m) => (
          <div key={m?.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon name={m?.icon} size={14} color={m?.color} />
              <span className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                {m?.label}
              </span>
            </div>
            <span className="font-data text-xs font-500 whitespace-nowrap" style={{ color: m?.color }}>
              {m?.value}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs font-caption" style={{ color: 'var(--color-muted-foreground)', lineHeight: 1.5 }}>
        * Estimates based on standard emission factors. Final values calculated after registration.
      </p>
    </div>
  );
}