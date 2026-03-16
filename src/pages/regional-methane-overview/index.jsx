import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import IndiaRegionMap from './components/IndiaRegionMap';
import StatsBar from './components/StatsBar';
import IntensityFilter from './components/IntensityFilter';
import RegionCard from './components/RegionCard';

const REGIONS = [
  { id: 'punjab', state: 'Punjab', region: 'North India', intensity: 'High', emission: 420, source: 'Rice Paddies' },
  { id: 'uttar-pradesh', state: 'Uttar Pradesh', region: 'North India', intensity: 'High', emission: 680, source: 'Mixed' },
  { id: 'west-bengal', state: 'West Bengal', region: 'East India', intensity: 'High', emission: 510, source: 'Rice Paddies' },
  { id: 'bihar', state: 'Bihar', region: 'East India', intensity: 'High', emission: 390, source: 'Rice Paddies' },
  { id: 'maharashtra', state: 'Maharashtra', region: 'West India', intensity: 'Medium', emission: 310, source: 'Dairy' },
  { id: 'rajasthan', state: 'Rajasthan', region: 'North-West India', intensity: 'Medium', emission: 280, source: 'Dairy' },
  { id: 'madhya-pradesh', state: 'Madhya Pradesh', region: 'Central India', intensity: 'Medium', emission: 260, source: 'Mixed' },
  { id: 'tamil-nadu', state: 'Tamil Nadu', region: 'South India', intensity: 'Medium', emission: 220, source: 'Rice Paddies' },
  { id: 'haryana', state: 'Haryana', region: 'North India', intensity: 'Medium', emission: 240, source: 'Dairy' },
  { id: 'odisha', state: 'Odisha', region: 'East India', intensity: 'Medium', emission: 200, source: 'Rice Paddies' },
  { id: 'gujarat', state: 'Gujarat', region: 'West India', intensity: 'Low', emission: 180, source: 'Dairy' },
  { id: 'karnataka', state: 'Karnataka', region: 'South India', intensity: 'Low', emission: 150, source: 'Mixed' },
];

export default function RegionalMethaneOverview() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredRegions = useMemo(() => {
    if (activeFilter === 'All') return REGIONS;
    return REGIONS?.filter((r) => r?.intensity === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header isAuthenticated={false} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => navigate('/landing-page')}
              className="flex items-center gap-1 btn-press"
              style={{ color: 'var(--color-muted-foreground)', fontSize: '0.8125rem', fontFamily: 'var(--font-caption)' }}
            >
              <Icon name="ChevronLeft" size={14} />
              Home
            </button>
            <Icon name="ChevronRight" size={12} color="var(--color-muted-foreground)" />
            <span style={{ color: 'var(--color-primary)', fontSize: '0.8125rem', fontFamily: 'var(--font-caption)' }}>
              Regional Insights
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1
                className="font-heading font-bold text-white mb-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                Regional Methane{' '}
                <span style={{ color: 'var(--color-primary)' }}>Overview</span>
              </h1>
              <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.9375rem', maxWidth: '60ch' }}>
                Methane emission intensity across Indian states — sourced from agricultural, livestock, and waste sectors.
              </p>
            </div>
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2"
              style={{
                background: 'rgba(22,163,74,0.1)',
                border: '1px solid rgba(22,163,74,0.25)',
              }}
            >
              <div className="rounded-full" style={{ width: 8, height: 8, background: '#16A34A', animation: 'pulse 2s infinite' }} />
              <span style={{ color: 'var(--color-primary)', fontSize: '0.8125rem', fontFamily: 'var(--font-caption)', fontWeight: 600 }}>
                Live Data — 2025–26
              </span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mb-8">
          <StatsBar regions={REGIONS} />
        </div>

        {/* Main content: map + cards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map section */}
          <div
            className="lg:col-span-2 rounded-2xl p-6"
            style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div
                className="flex items-center justify-center rounded-lg"
                style={{ width: 32, height: 32, background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)' }}
              >
                <Icon name="Map" size={16} color="var(--color-secondary)" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-white" style={{ fontSize: '0.9375rem' }}>
                  Emission Intensity Map
                </h2>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', fontFamily: 'var(--font-caption)' }}>
                  Hover over regions for details
                </p>
              </div>
            </div>
            <IndiaRegionMap regions={REGIONS} activeFilter={activeFilter} />
          </div>

          {/* Cards section */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <h2 className="font-heading font-semibold text-white" style={{ fontSize: '1rem' }}>
                State-wise Breakdown
                <span
                  className="ml-2 rounded-full px-2 py-0.5"
                  style={{
                    background: 'rgba(14,165,233,0.15)',
                    color: 'var(--color-secondary)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-caption)',
                    fontWeight: 600,
                  }}
                >
                  {filteredRegions?.length} states
                </span>
              </h2>
              <IntensityFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              style={{ transition: 'all 0.3s ease' }}
            >
              {filteredRegions?.map((region) => (
                <RegionCard key={region?.id} region={region} />
              ))}
            </div>

            {filteredRegions?.length === 0 && (
              <div
                className="flex flex-col items-center justify-center rounded-xl py-16"
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              >
                <Icon name="SearchX" size={32} color="var(--color-muted-foreground)" />
                <p className="mt-3" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-caption)' }}>
                  No regions match this filter.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Source note */}
        <div
          className="mt-8 rounded-xl px-5 py-4 flex items-start gap-3"
          style={{
            background: 'rgba(14,165,233,0.06)',
            border: '1px solid rgba(14,165,233,0.15)',
          }}
        >
          <Icon name="Info" size={16} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.8125rem', fontFamily: 'var(--font-caption)', maxWidth: '80ch' }}>
            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>Data Source: </span>
            Emission estimates are based on IPCC Tier-1 methodology and India GHG Platform 2025–26 projections.
            Values represent estimated annual methane (CH₄) in thousand metric tonnes from primary agricultural and waste sources.
          </p>
        </div>
      </main>
    </div>
  );
}
