import React from 'react';
import Icon from 'components/AppIcon';

const INTENSITY_CONFIG = {
  High: {
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.3)',
    badgeBg: 'rgba(239,68,68,0.2)',
    badgeColor: '#EF4444',
    badgeBorder: 'rgba(239,68,68,0.4)',
    barColor: '#EF4444',
  },
  Medium: {
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
    badgeBg: 'rgba(245,158,11,0.2)',
    badgeColor: '#F59E0B',
    badgeBorder: 'rgba(245,158,11,0.4)',
    barColor: '#F59E0B',
  },
  Low: {
    bg: 'rgba(22,163,74,0.08)',
    border: 'rgba(22,163,74,0.2)',
    badgeBg: 'rgba(22,163,74,0.15)',
    badgeColor: '#16A34A',
    badgeBorder: 'rgba(22,163,74,0.35)',
    barColor: '#16A34A',
  },
};

const SOURCE_ICONS = {
  'Rice Paddies': { icon: 'Wheat', label: 'Rice Paddies' },
  'Dairy': { icon: 'Milk', label: 'Dairy' },
  'Waste': { icon: 'Trash2', label: 'Waste' },
  'Mixed': { icon: 'Layers', label: 'Mixed' },
};

const MAX_EMISSION = 680;

export default function RegionCard({ region }) {
  const config = INTENSITY_CONFIG?.[region?.intensity];
  const sourceInfo = SOURCE_ICONS?.[region?.source] ?? { icon: 'Layers', label: region?.source };
  const barWidth = Math.round(((region?.emission ?? 0) / MAX_EMISSION) * 100);

  return (
    <div
      className="rounded-xl p-4 card-hover"
      style={{
        background: config?.bg,
        border: `1px solid ${config?.border}`,
        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3
            className="font-heading font-semibold text-white"
            style={{ fontSize: '0.9375rem', lineHeight: 1.3 }}
          >
            {region?.state}
          </h3>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', fontFamily: 'var(--font-caption)', marginTop: 2 }}>
            {region?.region}
          </p>
        </div>
        <span
          className="rounded-md px-2 py-0.5 flex-shrink-0"
          style={{
            background: config?.badgeBg,
            color: config?.badgeColor,
            border: `1px solid ${config?.badgeBorder}`,
            fontSize: '0.6875rem',
            fontFamily: 'var(--font-caption)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {region?.intensity}
        </span>
      </div>

      {/* Emission value */}
      <div className="flex items-end gap-1 mb-3">
        <span
          className="font-data font-semibold"
          style={{ fontSize: '1.375rem', color: config?.badgeColor, lineHeight: 1 }}
        >
          {region?.emission}k
        </span>
        <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', fontFamily: 'var(--font-caption)', marginBottom: 2 }}>
          tonnes CH₄/yr
        </span>
      </div>

      {/* Emission bar */}
      <div
        className="rounded-full mb-3"
        style={{ height: 4, background: 'rgba(148,163,184,0.1)' }}
      >
        <div
          className="rounded-full"
          style={{
            height: '100%',
            width: `${barWidth}%`,
            background: config?.barColor,
            transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>

      {/* Source category */}
      <div className="flex items-center gap-1.5">
        <div
          className="flex items-center justify-center rounded-md"
          style={{
            width: 24,
            height: 24,
            background: 'rgba(148,163,184,0.1)',
            border: '1px solid rgba(148,163,184,0.15)',
          }}
        >
          <Icon name={sourceInfo?.icon} size={13} color="var(--color-muted-foreground)" />
        </div>
        <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', fontFamily: 'var(--font-caption)' }}>
          {sourceInfo?.label}
        </span>
      </div>
    </div>
  );
}
