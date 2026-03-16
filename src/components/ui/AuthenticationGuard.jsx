import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function AuthenticationGuard({ children, isAuthenticated = false, requiredRole = null, userRole = null }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div
          className="card flex flex-col items-center text-center animate-fade-in"
          style={{ maxWidth: '440px', width: '100%' }}
        >
          <div
            className="flex items-center justify-center rounded-lg mb-6"
            style={{
              width: '64px',
              height: '64px',
              background: 'rgba(16, 163, 74, 0.1)',
              border: '1px solid rgba(16, 163, 74, 0.2)',
            }}
          >
            <Icon name="Lock" size={28} color="var(--color-primary)" />
          </div>

          <h2
            className="font-heading font-600 text-card-foreground mb-3"
            style={{ fontSize: '1.5rem' }}
          >
            Authentication Required
          </h2>
          <p
            className="font-body text-muted-foreground mb-8"
            style={{ fontSize: '0.9375rem', lineHeight: '1.6' }}
          >
            You need to be signed in to access this area. Join MethaneTrack Lite to start monetizing your methane reduction efforts.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="default"
              fullWidth
              iconName="Sprout"
              iconPosition="left"
              onClick={() => navigate('/farmer-registration')}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate('/landing-page')}
            >
              Learn More
            </Button>
          </div>

          <p className="mt-6 font-caption text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/farmer-registration')}
              className="font-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              style={{ color: 'var(--color-primary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div
          className="card flex flex-col items-center text-center animate-fade-in"
          style={{ maxWidth: '440px', width: '100%' }}
        >
          <div
            className="flex items-center justify-center rounded-lg mb-6"
            style={{
              width: '64px',
              height: '64px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <Icon name="ShieldOff" size={28} color="var(--color-error)" />
          </div>

          <h2
            className="font-heading font-600 text-card-foreground mb-3"
            style={{ fontSize: '1.5rem' }}
          >
            Access Restricted
          </h2>
          <p
            className="font-body text-muted-foreground mb-8"
            style={{ fontSize: '0.9375rem', lineHeight: '1.6' }}
          >
            This area is only accessible to{' '}
            <span className="font-500 text-foreground">
              {requiredRole === 'farmer' ? 'Farmers' : 'Corporate Buyers'}
            </span>
            . Your current role does not have permission to view this content.
          </p>

          <Button
            variant="default"
            fullWidth
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}