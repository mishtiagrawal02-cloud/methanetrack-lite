import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const creditData = [
  { month: "Sep \'25", credits: 8, revenue: 6400 },
  { month: "Oct \'25", credits: 9, revenue: 7200 },
  { month: "Nov \'25", credits: 8, revenue: 6400 },
  { month: "Dec \'25", credits: 10, revenue: 8000 },
  { month: "Jan \'26", credits: 9, revenue: 7200 },
  { month: "Feb \'26", credits: 9, revenue: 7200 },
  { month: "Mar \'26", credits: 8, revenue: 6400 },
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
            {p?.name}: <span className="font-600">{p?.name?.includes("Revenue") ? `₹${p?.value?.toLocaleString("en-IN")}` : p?.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CreditRevenueChart() {
  return (
    <div className="card">
      <h3 className="font-heading font-600 text-base md:text-lg mb-4" style={{ color: "var(--color-foreground)" }}>
        Credits &amp; Revenue Generated
      </h3>
      <div className="w-full h-48 md:h-64" aria-label="Monthly carbon credits and revenue bar chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={creditData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
            <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} width={50} tickFormatter={(v) => `₹${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px", color: "#94A3B8" }} />
            <Bar yAxisId="left" dataKey="credits" name="Credits" fill="#16A34A" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="revenue" name="Revenue (₹)" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}