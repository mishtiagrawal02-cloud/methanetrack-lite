import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const ROUTE_META = {
  '/landing-page': { label: 'Home', icon: 'Home' },
  '/regional-insights': { label: 'Regional Insights', icon: 'MapPin' },
  '/farmer-registration': { label: 'Get Started', icon: 'Sprout' },
  '/estimation-engine': { label: 'Estimation Engine', icon: 'Calculator' },
  '/farmer-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
  '/certificates': { label: 'Certificates', icon: 'Award' },
  '/marketplace': { label: 'Marketplace', icon: 'ShoppingBag' },
};

const WORKFLOW_PATHS = [
  '/farmer-registration',
  '/estimation-engine',
  '/farmer-dashboard',
  '/certificates',
  '/marketplace',
];

const SHOW_ON_PATHS = [
  '/farmer-registration',
  '/estimation-engine',
  '/farmer-dashboard',
  '/certificates',
  '/marketplace',
];

export default function NavigationBreadcrumbs({ className = '' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location?.pathname;

  if (!SHOW_ON_PATHS?.includes(currentPath)) return null;

  const buildCrumbs = () => {
    const crumbs = [{ label: 'Home', path: '/landing-page', icon: 'Home' }];
    const currentIndex = WORKFLOW_PATHS?.indexOf(currentPath);

    if (currentIndex > 0) {
      WORKFLOW_PATHS?.slice(0, currentIndex)?.forEach((path) => {
        if (ROUTE_META?.[path]) {
          crumbs?.push({ label: ROUTE_META?.[path]?.label, path, icon: ROUTE_META?.[path]?.icon });
        }
      });
    }

    if (ROUTE_META?.[currentPath]) {
      crumbs?.push({ label: ROUTE_META?.[currentPath]?.label, path: currentPath, icon: ROUTE_META?.[currentPath]?.icon, current: true });
    }

    return crumbs;
  };

  const crumbs = buildCrumbs();

  if (crumbs?.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center ${className}`}
    >
      {/* Mobile: show only current */}
      <div className="flex sm:hidden items-center gap-2">
        <button
          onClick={() => crumbs?.length > 1 && navigate(crumbs?.[crumbs?.length - 2]?.path)}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontFamily: 'var(--font-caption)', fontSize: '0.875rem' }}
          aria-label="Go back"
        >
          <Icon name="ChevronLeft" size={14} />
          <span>{crumbs?.length > 1 ? crumbs?.[crumbs?.length - 2]?.label : 'Back'}</span>
        </button>
        <Icon name="ChevronRight" size={12} color="var(--color-muted-foreground)" />
        <span
          className="font-caption font-500 text-foreground"
          style={{ fontSize: '0.875rem' }}
          aria-current="page"
        >
          {crumbs?.[crumbs?.length - 1]?.label}
        </span>
      </div>
      {/* Desktop: full breadcrumb */}
      <ol className="hidden sm:flex items-center gap-1" role="list">
        {crumbs?.map((crumb, index) => {
          const isLast = index === crumbs?.length - 1;
          return (
            <li key={crumb?.path} className="flex items-center gap-1">
              {index > 0 && (
                <Icon name="ChevronRight" size={12} color="var(--color-muted-foreground)" className="flex-shrink-0" />
              )}
              {isLast ? (
                <span
                  className="breadcrumb-item current flex items-center gap-1.5"
                  aria-current="page"
                >
                  <Icon name={crumb?.icon} size={13} color="var(--color-foreground)" />
                  {crumb?.label}
                </span>
              ) : (
                <button
                  onClick={() => navigate(crumb?.path)}
                  className="breadcrumb-item flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                >
                  <Icon name={crumb?.icon} size={13} color="currentColor" />
                  {crumb?.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}