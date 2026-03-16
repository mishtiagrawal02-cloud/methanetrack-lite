import React, { useState } from 'react';

const REGION_POSITIONS = [
  { id: 'punjab', name: 'Punjab', x: 180, y: 90, r: 28 },
  { id: 'haryana', name: 'Haryana', x: 215, y: 120, r: 24 },
  { id: 'uttar-pradesh', name: 'Uttar Pradesh', x: 290, y: 130, r: 38 },
  { id: 'bihar', name: 'Bihar', x: 360, y: 145, r: 28 },
  { id: 'west-bengal', name: 'West Bengal', x: 415, y: 175, r: 26 },
  { id: 'odisha', name: 'Odisha', x: 385, y: 230, r: 24 },
  { id: 'madhya-pradesh', name: 'Madhya Pradesh', x: 270, y: 200, r: 32 },
  { id: 'rajasthan', name: 'Rajasthan', x: 175, y: 175, r: 32 },
  { id: 'gujarat', name: 'Gujarat', x: 140, y: 240, r: 26 },
  { id: 'maharashtra', name: 'Maharashtra', x: 220, y: 270, r: 32 },
  { id: 'karnataka', name: 'Karnataka', x: 230, y: 340, r: 26 },
  { id: 'tamil-nadu', name: 'Tamil Nadu', x: 270, y: 400, r: 24 },
];

const INTENSITY_COLORS = {
  High: { fill: 'rgba(239,68,68,0.25)', stroke: '#EF4444', glow: 'rgba(239,68,68,0.5)', label: '#EF4444' },
  Medium: { fill: 'rgba(245,158,11,0.25)', stroke: '#F59E0B', glow: 'rgba(245,158,11,0.5)', label: '#F59E0B' },
  Low: { fill: 'rgba(22,163,74,0.25)', stroke: '#16A34A', glow: 'rgba(22,163,74,0.5)', label: '#16A34A' },
};

export default function IndiaRegionMap({ regions, activeFilter }) {
  const [hoveredId, setHoveredId] = useState(null);

  const getRegionData = (regionId) =>
    regions?.find((r) => r?.id === regionId);

  const hoveredRegion = hoveredId ? getRegionData(hoveredId) : null;
  const hoveredPos = hoveredId ? REGION_POSITIONS?.find((p) => p?.id === hoveredId) : null;

  return (
    <div className="relative w-full" style={{ maxWidth: 560, margin: '0 auto' }}>
      <svg
        viewBox="0 0 560 480"
        width="100%"
        style={{ display: 'block' }}
        aria-label="India regional methane intensity map"
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.06)" strokeWidth="1" />
          </pattern>
          {REGION_POSITIONS?.map((pos) => {
            const data = getRegionData(pos?.id);
            if (!data) return null;
            const colors = INTENSITY_COLORS?.[data?.intensity];
            return (
              <filter key={`glow-${pos?.id}`} id={`glow-${pos?.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor={colors?.glow} floodOpacity="0.6" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            );
          })}
        </defs>

        <rect width="560" height="480" fill="url(#grid)" rx="12" />

        {/* India outline silhouette (simplified) */}
        <path
          d="M 155 55 L 200 45 L 260 50 L 320 55 L 380 70 L 430 100 L 450 140 L 445 180 L 430 210 L 420 250 L 400 280 L 380 310 L 350 340 L 320 370 L 300 400 L 280 430 L 265 450 L 250 430 L 235 410 L 215 380 L 195 350 L 175 320 L 155 290 L 130 260 L 115 230 L 110 195 L 115 160 L 125 130 L 135 100 L 145 75 Z"
          fill="rgba(30,41,59,0.6)"
          stroke="rgba(148,163,184,0.15)"
          strokeWidth="1.5"
        />

        {/* Region bubbles */}
        {REGION_POSITIONS?.map((pos) => {
          const data = getRegionData(pos?.id);
          if (!data) return null;
          const colors = INTENSITY_COLORS?.[data?.intensity];
          const isFiltered = activeFilter !== 'All' && data?.intensity !== activeFilter;
          const isHovered = hoveredId === pos?.id;

          return (
            <g
              key={pos?.id}
              style={{ cursor: 'pointer', transition: 'opacity 0.25s' }}
              opacity={isFiltered ? 0.2 : 1}
              onMouseEnter={() => setHoveredId(pos?.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Pulse ring */}
              {isHovered && (
                <circle
                  cx={pos?.x}
                  cy={pos?.y}
                  r={pos?.r + 10}
                  fill="none"
                  stroke={colors?.stroke}
                  strokeWidth="1"
                  opacity="0.4"
                />
              )}
              <circle
                cx={pos?.x}
                cy={pos?.y}
                r={pos?.r}
                fill={colors?.fill}
                stroke={colors?.stroke}
                strokeWidth={isHovered ? 2 : 1.5}
                filter={isHovered ? `url(#glow-${pos?.id})` : undefined}
                style={{ transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)' }}
              />
              <text
                x={pos?.x}
                y={pos?.y - 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={colors?.label}
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {data?.emission}k
              </text>
              <text
                x={pos?.x}
                y={pos?.y + 10}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(248,250,252,0.7)"
                fontSize="7.5"
                fontFamily="Source Sans 3, sans-serif"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {pos?.name?.length > 10 ? pos?.name?.slice(0, 9) + '…' : pos?.name}
              </text>
            </g>
          );
        })}
      </svg>
      {/* Hover tooltip */}
      {hoveredRegion && hoveredPos && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${(hoveredPos?.x / 560) * 100}%`,
            top: `${(hoveredPos?.y / 480) * 100}%`,
            transform: 'translate(-50%, -110%)',
            zIndex: 10,
          }}
        >
          <div
            className="rounded-lg px-3 py-2 text-sm"
            style={{
              background: 'var(--color-card)',
              border: `1px solid ${INTENSITY_COLORS?.[hoveredRegion?.intensity]?.stroke}`,
              boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 12px ${INTENSITY_COLORS?.[hoveredRegion?.intensity]?.glow}`,
              minWidth: 160,
              fontFamily: 'var(--font-caption)',
            }}
          >
            <p className="font-semibold text-white mb-1" style={{ fontSize: '0.875rem' }}>{hoveredRegion?.state}</p>
            <p style={{ color: INTENSITY_COLORS?.[hoveredRegion?.intensity]?.label, fontSize: '0.75rem', fontWeight: 600 }}>
              {hoveredRegion?.intensity} Intensity
            </p>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>
              {hoveredRegion?.emission}k tonnes/yr
            </p>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>
              {hoveredRegion?.source}
            </p>
          </div>
        </div>
      )}
      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-4">
        {Object.entries(INTENSITY_COLORS)?.map(([level, colors]) => (
          <div key={level} className="flex items-center gap-1.5">
            <div
              className="rounded-full"
              style={{ width: 10, height: 10, background: colors?.stroke }}
            />
            <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', fontFamily: 'var(--font-caption)' }}>
              {level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
