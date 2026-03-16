import React from 'react';
import Icon from 'components/AppIcon';

const STEPS = [
  { id: 1, label: 'Farm Identity', fields: ['farmName', 'farmType'] },
  { id: 2, label: 'Farm Details', fields: ['landSize', 'livestockCount'] },
  { id: 3, label: 'Location', fields: ['state'] },
];

export default function RegistrationProgress({ formData, errors }) {
  const getStepStatus = (step) => {
    const filled = step?.fields?.filter((f) => {
      const val = formData?.[f];
      return val !== '' && val !== null && val !== undefined;
    });
    const hasError = step?.fields?.some((f) => errors?.[f]);
    if (hasError) return 'error';
    if (filled?.length === step?.fields?.length) return 'complete';
    if (filled?.length > 0) return 'partial';
    return 'empty';
  };

  const totalFields = STEPS?.flatMap((s) => s?.fields)?.length;
  const filledFields = STEPS?.flatMap((s) => s?.fields)?.filter((f) => {
    const val = formData?.[f];
    return val !== '' && val !== null && val !== undefined;
  })?.length;
  const percent = Math.round((filledFields / totalFields) * 100);

  return (
    <div
      className="rounded-xl p-4 md:p-5"
      style={{
        backgroundColor: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-caption font-600 text-sm" style={{ color: 'var(--color-card-foreground)' }}>
          Registration Progress
        </span>
        <span className="font-data text-sm font-500" style={{ color: 'var(--color-primary)' }}>
          {percent}%
        </span>
      </div>
      {/* Progress bar */}
      <div className="w-full h-2 rounded-full mb-4" style={{ backgroundColor: 'var(--color-surface-3)' }}>
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
          }}
        />
      </div>
      {/* Steps */}
      <div className="flex items-center gap-2">
        {STEPS?.map((step, idx) => {
          const status = getStepStatus(step);
          const iconMap = {
            complete: { name: 'CheckCircle2', color: 'var(--color-primary)' },
            error: { name: 'AlertCircle', color: 'var(--color-error)' },
            partial: { name: 'Circle', color: 'var(--color-secondary)' },
            empty: { name: 'Circle', color: 'var(--color-muted-foreground)' },
          };
          const ic = iconMap?.[status];
          return (
            <React.Fragment key={step?.id}>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Icon name={ic?.name} size={15} color={ic?.color} />
                <span
                  className="font-caption text-xs hidden sm:block"
                  style={{
                    color: status === 'empty' ? 'var(--color-muted-foreground)' : 'var(--color-card-foreground)',
                  }}
                >
                  {step?.label}
                </span>
              </div>
              {idx < STEPS?.length - 1 && (
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}