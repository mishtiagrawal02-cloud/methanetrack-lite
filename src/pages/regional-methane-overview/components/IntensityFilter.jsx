import React from 'react';

const FILTERS = ['All', 'High', 'Medium', 'Low'];

const FILTER_STYLES = {
  All: { active: { bg: 'rgba(14,165,233,0.2)', border: 'rgba(14,165,233,0.5)', color: '#0EA5E9' }, dot: '#0EA5E9' },
  High: { active: { bg: 'rgba(239,68,68,0.2)', border: 'rgba(239,68,68,0.5)', color: '#EF4444' }, dot: '#EF4444' },
  Medium: { active: { bg: 'rgba(245,158,11,0.2)', border: 'rgba(245,158,11,0.5)', color: '#F59E0B' }, dot: '#F59E0B' },
  Low: { active: { bg: 'rgba(22,163,74,0.2)', border: 'rgba(22,163,74,0.5)', color: '#16A34A' }, dot: '#16A34A' },
};

export default function IntensityFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.8125rem', fontFamily: 'var(--font-caption)', marginRight: 4 }}>
        Filter by intensity:
      </span>
      {FILTERS?.map((filter) => {
        const isActive = activeFilter === filter;
        const style = FILTER_STYLES?.[filter];
        return (
          <button
            key={filter}
            onClick={() => onFilterChange?.(filter)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 btn-press"
            style={{
              background: isActive ? style?.active?.bg : 'rgba(148,163,184,0.08)',
              border: `1px solid ${isActive ? style?.active?.border : 'rgba(148,163,184,0.15)'}`,
              color: isActive ? style?.active?.color : 'var(--color-muted-foreground)',
              fontSize: '0.8125rem',
              fontFamily: 'var(--font-caption)',
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
              cursor: 'pointer',
            }}
          >
            {filter !== 'All' && (
              <span
                className="rounded-full flex-shrink-0"
                style={{ width: 7, height: 7, background: isActive ? style?.dot : 'var(--color-muted-foreground)' }}
              />
            )}
            {filter}
          </button>
        );
      })}
    </div>
  );
}
