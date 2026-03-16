import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const monthlyData = [
  { month: "Sep \'25", baseline: 18000, reduced: 10800, co2Eq: 864000 / 1000 },
  { month: "Oct \'25", baseline: 18000, reduced: 11200, co2Eq: 896000 / 1000 },
  { month: "Nov \'25", baseline: 18000, reduced: 10600, co2Eq: 848000 / 1000 },
  { month: "Dec \'25", baseline: 18000, reduced: 11400, co2Eq: 912000 / 1000 },
  { month: "Jan \'26", baseline: 18000, reduced: 10900, co2Eq: 872000 / 1000 },
  { month: "Feb \'26", baseline: 18000, reduced: 11100, co2Eq: 888000 / 1000 },
  { month: "Mar \'26", baseline: 18000, reduced: 10800, co2Eq: 864000 / 1000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload?.length) {
    return (
      <div
        className="rounded-lg p-3 text-xs font-caption"
        style={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-lg)" }}
      >
        <p className="font-600 mb-2" style={{ color: "var(--color-foreground)" }}>{label}</p>
        {payload?.map((p) => (
          <p key={p?.name} style={{ color: p?.color }}>
            {p?.name}: <span className="font-600">{p?.value?.toLocaleString("en-IN")}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function EmissionChart() {
  return (
    <div className="card">
      <h3 className="font-heading font-600 text-base md:text-lg mb-4" style={{ color: "var(--color-foreground)" }}>
        Emission Reduction Trend
      </h3>
      <div className="w-full h-48 md:h-64" aria-label="Monthly emission reduction area chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="reducedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
            <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} width={45} tickFormatter={(v) => `${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px", color: "#94A3B8" }} />
            <Area type="monotone" dataKey="baseline" name="Baseline (kg)" stroke="#EF4444" fill="url(#baselineGrad)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="reduced" name="Reduced (kg)" stroke="#16A34A" fill="url(#reducedGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}