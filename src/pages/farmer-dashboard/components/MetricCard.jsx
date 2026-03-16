import React from "react";
import Icon from "components/AppIcon";

export default function MetricCard({ title, value, unit, subtitle, iconName, iconColor, trend, trendValue }) {
  return (
    <div className="card card-hover flex flex-col gap-3 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div
          className="flex items-center justify-center rounded-md flex-shrink-0"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: `${iconColor}18`,
            border: `1px solid ${iconColor}30`,
          }}
        >
          <Icon name={iconName} size={20} color={iconColor} />
        </div>
        {trend && (
          <span
            className="flex items-center gap-1 text-xs font-caption font-500 px-2 py-1 rounded-full flex-shrink-0"
            style={{
              backgroundColor: trend === "up" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
              color: trend === "up" ? "var(--color-success)" : "var(--color-error)",
            }}
          >
            <Icon name={trend === "up" ? "TrendingUp" : "TrendingDown"} size={12} />
            {trendValue}
          </span>
        )}
      </div>
      <div>
        <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>{title}</p>
        <p className="font-heading font-700 mt-1 text-xl md:text-2xl lg:text-3xl" style={{ color: "var(--color-foreground)" }}>
          {value}
          {unit && <span className="text-sm md:text-base font-400 ml-1" style={{ color: "var(--color-muted-foreground)" }}>{unit}</span>}
        </p>
        {subtitle && <p className="font-caption text-xs mt-1" style={{ color: "var(--color-muted-foreground)" }}>{subtitle}</p>}
      </div>
    </div>
  );
}