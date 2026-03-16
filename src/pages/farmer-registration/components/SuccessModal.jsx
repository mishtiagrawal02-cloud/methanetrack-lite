import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

export default function SuccessModal({ isOpen, farmName, onGoToDashboard, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-modal"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-modal flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div
              className="relative w-full max-w-md rounded-2xl p-6 md:p-8 flex flex-col items-center text-center"
              style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xl)',
              }}
              onClick={(e) => e?.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-md transition-colors"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                <Icon name="X" size={18} />
              </button>

              {/* Icon */}
              <div
                className="flex items-center justify-center rounded-full mb-5"
                style={{
                  width: 72,
                  height: 72,
                  background: 'rgba(16, 163, 74, 0.15)',
                  border: '2px solid rgba(16, 163, 74, 0.4)',
                }}
              >
                <Icon name="CheckCircle2" size={36} color="var(--color-primary)" />
              </div>

              <h2 className="font-heading font-700 text-xl md:text-2xl mb-2" style={{ color: 'var(--color-card-foreground)' }}>
                Farm Registered!
              </h2>
              <p className="font-body text-sm md:text-base mb-1" style={{ color: 'var(--color-muted-foreground)' }}>
                <span className="font-600" style={{ color: 'var(--color-foreground)' }}>{farmName}</span> has been successfully registered on MethaneTrack Lite.
              </p>
              <p className="font-body text-sm mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
                Your baseline methane emissions have been calculated. Head to your dashboard to view your carbon credit potential.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {['Verified Farm', 'Carbon Ready', 'Climate Positive']?.map((badge) => (
                  <span
                    key={badge}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-caption font-500"
                    style={{
                      backgroundColor: 'rgba(16, 163, 74, 0.12)',
                      border: '1px solid rgba(16, 163, 74, 0.3)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    <Icon name="Leaf" size={11} color="var(--color-primary)" />
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  variant="default"
                  fullWidth
                  iconName="LayoutDashboard"
                  iconPosition="left"
                  onClick={onGoToDashboard}
                >
                  Go to Dashboard
                </Button>
                <Button variant="outline" fullWidth onClick={onClose}>
                  Register Another
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}