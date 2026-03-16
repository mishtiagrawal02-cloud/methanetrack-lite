/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',       // slate-900
        foreground: 'var(--color-foreground)',       // slate-50

        card: {
          DEFAULT: 'var(--color-card)',              // slate-800
          foreground: 'var(--color-card-foreground)' // slate-100
        },

        popover: {
          DEFAULT: 'var(--color-popover)',           // slate-800
          foreground: 'var(--color-popover-foreground)' // slate-100
        },

        primary: {
          DEFAULT: 'var(--color-primary)',           // green-600
          foreground: 'var(--color-primary-foreground)' // white
        },

        secondary: {
          DEFAULT: 'var(--color-secondary)',         // sky-500
          foreground: 'var(--color-secondary-foreground)' // white
        },

        accent: {
          DEFAULT: 'var(--color-accent)',            // amber-400
          foreground: 'var(--color-accent-foreground)' // gray-800
        },

        muted: {
          DEFAULT: 'var(--color-muted)',             // slate-700
          foreground: 'var(--color-muted-foreground)' // slate-400
        },

        destructive: {
          DEFAULT: 'var(--color-destructive)',       // red-500
          foreground: 'var(--color-destructive-foreground)' // white
        },

        success: {
          DEFAULT: 'var(--color-success)',           // emerald-500
          foreground: 'var(--color-success-foreground)' // white
        },

        warning: {
          DEFAULT: 'var(--color-warning)',           // amber-400
          foreground: 'var(--color-warning-foreground)' // gray-800
        },

        error: {
          DEFAULT: 'var(--color-error)',             // red-500
          foreground: 'var(--color-error-foreground)' // white
        },

        border: 'var(--color-border)',               // slate-400/20
        input: 'var(--color-input)',                 // slate-800
        ring: 'var(--color-ring)',                   // green-600

        surface: {
          1: 'var(--color-surface-1)',               // slate-900
          2: 'var(--color-surface-2)',               // slate-800
          3: 'var(--color-surface-3)',               // slate-700
        },
      },

      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Inter', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
        sans: ['Source Sans 3', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        'display-1': ['2.5rem', { lineHeight: '1.2' }],
        'display-2': ['2rem', { lineHeight: '1.25' }],
        'heading-3': ['1.5rem', { lineHeight: '1.3' }],
        'heading-4': ['1.25rem', { lineHeight: '1.4' }],
        'heading-5': ['1.125rem', { lineHeight: '1.5' }],
        'body-base': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.4' }],
      },

      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '18px',
        xl: '24px',
        DEFAULT: '12px',
      },

      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
      },

      boxShadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px rgba(0, 0, 0, 0.35)',
        lg: '0 8px 15px rgba(0, 0, 0, 0.4)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.4)',
        'primary-glow': '0 0 12px rgba(16, 163, 74, 0.1)',
        'secondary-glow': '0 0 12px rgba(14, 165, 233, 0.08)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.35)',
        'nav': '0 1px 3px rgba(0, 0, 0, 0.3)',
      },

      transitionTimingFunction: {
        'natural': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        'base': '250ms',
        'chart': '400ms',
      },

      zIndex: {
        'base': '0',
        'card': '1',
        'dropdown': '50',
        'navigation': '100',
        'modal': '200',
        'toast': '300',
      },

      maxWidth: {
        'measure': '75ch',
        'container': '1200px',
      },

      height: {
        'header': '64px',
        'header-mobile': '56px',
        'touch': '44px',
        'btn': '48px',
      },

      minWidth: {
        'touch': '44px',
      },

      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'fade-in': 'fadeIn 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      },

      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
 plugins: [],
};