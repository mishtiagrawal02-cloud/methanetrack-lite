import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const NAV_ITEMS = [
  { label: 'Home', path: '/landing-page', icon: 'Home' },
  { label: 'Regional Insights', path: '/regional-methane-overview', icon: 'MapPin' },
  { label: 'Get Started', path: '/farmer-registration', icon: 'Sprout' },
  { label: 'Dashboard', path: '/farmer-dashboard', icon: 'LayoutDashboard', protected: true },
  { label: 'Marketplace', path: '/marketplace', icon: 'ShoppingBag' },
];

export default function Header({ isAuthenticated = false, userRole = null, notificationCount = 0, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const visibleNavItems = NAV_ITEMS?.filter(item => {
    if (item?.protected && !isAuthenticated) return false;
    return true;
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef?.current && !notifRef?.current?.contains(e?.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location?.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isActive = (path) => location?.pathname === path;

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="sticky top-0 w-full z-navigation"
        style={{
          backgroundColor: 'var(--color-card)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-nav)',
          height: '64px',
        }}
      >
        <div className="max-w-container mx-auto h-full flex items-center justify-between px-6">
          {/* Logo */}
          <button
            onClick={() => navigate('/landing-page')}
            className="flex items-center gap-3 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            aria-label="MethaneTrack Lite - Go to home"
          >
            <div
              className="flex items-center justify-center rounded-md"
              style={{
                width: '36px',
                height: '36px',
                background: 'rgba(16, 163, 74, 0.15)',
                border: '1px solid rgba(16, 163, 74, 0.3)',
              }}
            >
              <Icon name="Leaf" size={20} color="var(--color-primary)" />
            </div>
            <span
              className="font-heading font-700 text-foreground hidden sm:block"
              style={{ fontSize: '1.125rem', letterSpacing: '-0.01em' }}
            >
              MethaneTrack{' '}
              <span style={{ color: 'var(--color-primary)' }}>Lite</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {visibleNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavClick(item?.path)}
                className={`nav-link btn-press ${isActive(item?.path) ? 'active' : ''}`}
                aria-current={isActive(item?.path) ? 'page' : undefined}
              >
                {item?.label}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            {isAuthenticated && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  style={{
                    width: '40px',
                    height: '40px',
                    color: 'var(--color-muted-foreground)',
                  }}
                  aria-label={`Notifications${notificationCount > 0 ? `, ${notificationCount} unread` : ''}`}
                  aria-expanded={notifOpen}
                >
                  <Icon name="Bell" size={20} />
                  {notificationCount > 0 && (
                    <span
                      className="absolute top-1 right-1 flex items-center justify-center rounded-full font-caption font-500 text-primary-foreground"
                      style={{
                        minWidth: '16px',
                        height: '16px',
                        fontSize: '10px',
                        backgroundColor: 'var(--color-primary)',
                        padding: '0 3px',
                      }}
                    >
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="notification-panel animate-slide-down" role="dialog" aria-label="Notifications">
                    <div
                      className="flex items-center justify-between px-4 py-3"
                      style={{ borderBottom: '1px solid var(--color-border)' }}
                    >
                      <span className="font-heading font-600 text-card-foreground" style={{ fontSize: '0.9375rem' }}>
                        Notifications
                      </span>
                      <button
                        onClick={() => setNotifOpen(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close notifications"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                    <NotificationCenter onClose={() => setNotifOpen(false)} />
                  </div>
                )}
              </div>
            )}

            {/* User Role + Auth */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                {userRole && <UserRoleIndicator role={userRole} />}
                <button
                  onClick={onLogout}
                  className="nav-link btn-press flex items-center gap-2"
                  style={{ color: 'var(--color-muted-foreground)' }}
                >
                  <Icon name="LogOut" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/farmer-registration')}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Sprout"
                  iconPosition="left"
                  onClick={() => navigate('/farmer-registration')}
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                width: '40px',
                height: '40px',
                color: 'var(--color-muted-foreground)',
              }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Icon name="Menu" size={22} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay animate-fade-in md:hidden flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Mobile Header */}
          <div
            className="flex items-center justify-between px-6"
            style={{
              height: '64px',
              borderBottom: '1px solid var(--color-border)',
              flexShrink: 0,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-md"
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(16, 163, 74, 0.15)',
                  border: '1px solid rgba(16, 163, 74, 0.3)',
                }}
              >
                <Icon name="Leaf" size={20} color="var(--color-primary)" />
              </div>
              <span className="font-heading font-700 text-foreground" style={{ fontSize: '1.125rem' }}>
                MethaneTrack <span style={{ color: 'var(--color-primary)' }}>Lite</span>
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ width: '40px', height: '40px', color: 'var(--color-muted-foreground)' }}
              aria-label="Close navigation menu"
            >
              <Icon name="X" size={22} />
            </button>
          </div>

          {/* Mobile Nav Items */}
          <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {visibleNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavClick(item?.path)}
                  className={`flex items-center gap-3 w-full text-left rounded-md px-4 py-3 transition-colors btn-press ${
                    isActive(item?.path)
                      ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{
                    backgroundColor: isActive(item?.path) ? 'rgba(16, 163, 74, 0.1)' : 'transparent',
                    fontFamily: 'var(--font-caption)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    minHeight: '48px',
                  }}
                  aria-current={isActive(item?.path) ? 'page' : undefined}
                >
                  <Icon name={item?.icon} size={20} color={isActive(item?.path) ? 'var(--color-primary)' : 'currentColor'} />
                  {item?.label}
                </button>
              ))}
            </div>

            {/* Mobile Auth */}
            <div className="mt-8 pt-6 flex flex-col gap-3" style={{ borderTop: '1px solid var(--color-border)' }}>
              {isAuthenticated ? (
                <>
                  {userRole && (
                    <div className="px-4 mb-2">
                      <UserRoleIndicator role={userRole} />
                    </div>
                  )}
                  <button
                    onClick={() => { onLogout?.(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 w-full text-left rounded-md px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
                    style={{ fontFamily: 'var(--font-caption)', fontSize: '1rem', fontWeight: 600, minHeight: '48px' }}
                  >
                    <Icon name="LogOut" size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => handleNavClick('/farmer-registration')}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="default"
                    fullWidth
                    iconName="Sprout"
                    iconPosition="left"
                    onClick={() => handleNavClick('/farmer-registration')}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function UserRoleIndicator({ role }) {
  const isFarmer = role === 'farmer';
  return (
    <span className={`badge-role ${isFarmer ? 'badge-farmer' : 'badge-corporate'}`}>
      {isFarmer ? 'Farmer' : 'Corporate Buyer'}
    </span>
  );
}

function NotificationCenter({ onClose }) {
  const notifications = [
    {
      id: 1,
      type: 'credit',
      title: 'Carbon Credits Generated',
      message: '12.4 tCO₂e credits are ready for marketplace listing.',
      time: '2 hours ago',
      read: false,
      icon: 'Leaf',
    },
    {
      id: 2,
      type: 'certificate',
      title: 'Certificate Available',
      message: 'Your verification certificate #MT-2026-0042 is ready.',
      time: '1 day ago',
      read: false,
      icon: 'Award',
    },
    {
      id: 3,
      type: 'marketplace',
      title: 'Purchase Confirmed',
      message: 'GreenCorp Inc. purchased 5 tCO₂e from your listing.',
      time: '3 days ago',
      read: true,
      icon: 'ShoppingBag',
    },
  ];

  return (
    <div className="max-h-80 overflow-y-auto">
      {notifications?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
          <Icon name="BellOff" size={32} color="var(--color-muted-foreground)" />
          <p className="mt-3 font-caption text-muted-foreground text-sm">No notifications yet</p>
        </div>
      ) : (
        notifications?.map((notif) => (
          <div
            key={notif?.id}
            className="flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer"
            style={{
              borderBottom: '1px solid var(--color-border)',
              backgroundColor: notif?.read ? 'transparent' : 'rgba(16, 163, 74, 0.05)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(148, 163, 184, 0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = notif?.read ? 'transparent' : 'rgba(16, 163, 74, 0.05)'; }}
          >
            <div
              className="flex items-center justify-center rounded-md flex-shrink-0 mt-0.5"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: notif?.read ? 'rgba(148, 163, 184, 0.1)' : 'rgba(16, 163, 74, 0.15)',
              }}
            >
              <Icon
                name={notif?.icon}
                size={16}
                color={notif?.read ? 'var(--color-muted-foreground)' : 'var(--color-primary)'}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p
                  className="font-caption font-500 truncate"
                  style={{
                    fontSize: '0.8125rem',
                    color: notif?.read ? 'var(--color-muted-foreground)' : 'var(--color-card-foreground)',
                  }}
                >
                  {notif?.title}
                </p>
                {!notif?.read && (
                  <span
                    className="flex-shrink-0 rounded-full"
                    style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-primary)', marginTop: '4px' }}
                  />
                )}
              </div>
              <p
                className="font-caption mt-0.5"
                style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)', lineHeight: '1.4' }}
              >
                {notif?.message}
              </p>
              <p className="font-caption mt-1" style={{ fontSize: '0.6875rem', color: 'var(--color-muted-foreground)' }}>
                {notif?.time}
              </p>
            </div>
          </div>
        ))
      )}
      <div className="px-4 py-3">
        <button
          onClick={onClose}
          className="w-full text-center font-caption font-500 transition-colors"
          style={{ fontSize: '0.8125rem', color: 'var(--color-primary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-foreground)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
        >
          View all notifications
        </button>
      </div>
    </div>
  );
}