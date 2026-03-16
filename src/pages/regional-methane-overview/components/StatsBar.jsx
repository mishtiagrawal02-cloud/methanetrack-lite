import React from 'react';
import Icon from 'components/AppIcon';

export default function StatsBar({ regions }) {
  const total = regions?.length ?? 0;
  const highCount = regions?.filter((r) => r?.intensity === 'High')?.length ?? 0;
  const avgEmission = regions?.length
    ? Math.round(regions?.reduce((sum, r) => sum + (r?.emission ?? 0), 0) / regions?.length)
    : 0;

  const stats = [
    {
      label: 'Total Regions Monitored',
      value: total,
      unit: 'states',
      icon: 'Map',
      color: 'var(--color-secondary)',
      bg: 'rgba(14,165,233,0.1)',
      border: 'rgba(14,165,233,0.25)',
    },
    {
      label: 'High Intensity Zones',
      value: highCount,
      unit: 'regions',
      icon: 'AlertTriangle',
      color: '#EF4444',
      bg: 'rgba(239,68,68,0.1)',
      border: 'rgba(239,68,68,0.25)',
    },
    {
      label: 'Avg Emission per Region',
      value: `${avgEmission}k`,
      unit: 'tonnes/yr',
      icon: 'TrendingUp',
      color: 'var(--color-primary)',
      bg: 'rgba(22,163,74,0.1)',
      border: 'rgba(22,163,74,0.25)',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats?.map((stat) => (
        <div
          key={stat?.label}
          className="flex items-center gap-4 rounded-xl px-5 py-4"
          style={{
            background: stat?.bg,
            border: `1px solid ${stat?.border}`,
          }}
        >
          <div
            className="flex items-center justify-center rounded-lg flex-shrink-0"
            style={{
              width: 44,
              height: 44,
              background: `${stat?.bg}`,
              border: `1px solid ${stat?.border}`,
            }}
          >
            <Icon name={stat?.icon} size={20} color={stat?.color} />
          </div>
          <div>
            <div
              className="font-data font-semibold"
              style={{ fontSize: '1.5rem', color: stat?.color, lineHeight: 1.1 }}
            >
              {stat?.value}
            </div>
            <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', fontFamily: 'var(--font-caption)' }}>
              {stat?.unit}
            </div>
            <div style={{ color: 'var(--color-card-foreground)', fontSize: '0.8125rem', fontFamily: 'var(--font-caption)', marginTop: 2 }}>
              {stat?.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
