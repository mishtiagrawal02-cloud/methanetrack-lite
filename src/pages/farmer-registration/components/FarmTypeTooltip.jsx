import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FARM_TYPE_INFO = {
  Dairy: {
    icon: 'Milk',
    color: 'var(--color-primary)',
    bg: 'rgba(16, 163, 74, 0.1)',
    border: 'rgba(16, 163, 74, 0.25)',
    factor: '100 kg methane/cow/year',
    description: 'Dairy farms calculate emissions based on livestock count. Each dairy cow produces approximately 100 kg of methane per year through enteric fermentation and manure management.',
  },
  Rice: {
    icon: 'Wheat',
    color: 'var(--color-secondary)',
    bg: 'rgba(14, 165, 233, 0.1)',
    border: 'rgba(14, 165, 233, 0.25)',
    factor: '150 kg methane/acre/year',
    description: 'Rice paddy fields emit methane through anaerobic decomposition of organic matter in flooded conditions. Emissions are calculated per acre of cultivated land.',
  },
  Waste: {
    icon: 'Recycle',
    color: 'var(--color-accent)',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.25)',
    factor: '200 kg methane/ton/year',
    description: 'Waste management operations generate methane from organic decomposition in landfills and composting. Emissions are calculated per ton of waste processed annually.',
  },
};

export default function FarmTypeTooltip({ farmType }) {
  const [open, setOpen] = useState(false);
  if (!farmType || !FARM_TYPE_INFO?.[farmType]) return null;
  const info = FARM_TYPE_INFO?.[farmType];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-caption font-500 transition-colors"
        style={{
          backgroundColor: info?.bg,
          border: `1px solid ${info?.border}`,
          color: info?.color,
        }}
        aria-label="View emission factor details"
      >
        <Icon name="Info" size={13} color={info?.color} />
        Emission Factor: {info?.factor}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute left-0 top-full mt-2 z-50 rounded-lg p-4 w-72 shadow-xl"
            style={{
              backgroundColor: 'var(--color-card)',
              border: `1px solid ${info?.border}`,
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex items-center justify-center rounded-md flex-shrink-0"
                style={{ width: 36, height: 36, backgroundColor: info?.bg }}
              >
                <Icon name={info?.icon} size={18} color={info?.color} />
              </div>
              <div>
                <p className="font-heading font-600 text-sm mb-1" style={{ color: 'var(--color-card-foreground)' }}>
                  {farmType} Farm Emissions
                </p>
                <p className="font-caption text-xs leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
                  {info?.description}
                </p>
                <div
                  className="mt-3 px-3 py-2 rounded-md"
                  style={{ backgroundColor: info?.bg }}
                >
                  <p className="font-data text-xs font-500" style={{ color: info?.color }}>
                    Factor: {info?.factor}
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 p-1 rounded transition-colors"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}