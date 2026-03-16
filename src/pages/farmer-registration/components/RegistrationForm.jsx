import React from 'react';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import Select from 'components/ui/Select';

import FarmTypeTooltip from './FarmTypeTooltip';

const FARM_TYPE_OPTIONS = [
  { value: 'Dairy', label: 'Dairy Farm', description: 'Livestock-based methane emissions' },
  { value: 'Rice', label: 'Rice Field', description: 'Paddy field methane emissions' },
  { value: 'Waste', label: 'Waste Management', description: 'Organic waste methane emissions' },
];

const INDIAN_STATES = [
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AR', label: 'Arunachal Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'BR', label: 'Bihar' },
  { value: 'CG', label: 'Chhattisgarh' },
  { value: 'GA', label: 'Goa' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'HR', label: 'Haryana' },
  { value: 'HP', label: 'Himachal Pradesh' },
  { value: 'JH', label: 'Jharkhand' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'KL', label: 'Kerala' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'MN', label: 'Manipur' },
  { value: 'ML', label: 'Meghalaya' },
  { value: 'MZ', label: 'Mizoram' },
  { value: 'NL', label: 'Nagaland' },
  { value: 'OD', label: 'Odisha' },
  { value: 'PB', label: 'Punjab' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'SK', label: 'Sikkim' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TS', label: 'Telangana' },
  { value: 'TR', label: 'Tripura' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'UK', label: 'Uttarakhand' },
  { value: 'WB', label: 'West Bengal' },
  { value: 'DL', label: 'Delhi' },
];

export default function RegistrationForm({ formData, errors, onChange, onSelectChange, onSubmit, isSubmitting, isValid }) {
  const showLivestock = formData?.farmType === 'Dairy';
  const showLandSize = formData?.farmType === 'Rice' || formData?.farmType === 'Waste';
  const landLabel = formData?.farmType === 'Waste' ? 'Waste Processed (tons/year)' : 'Land Size (acres)';
  const landPlaceholder = formData?.farmType === 'Waste' ? 'e.g. 500' : 'e.g. 25';

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Farm Name */}
      <div>
        <Input
          label="Farm Name"
          type="text"
          id="farmName"
          name="farmName"
          placeholder="e.g. Green Valley Dairy Farm"
          value={formData?.farmName}
          onChange={onChange}
          error={errors?.farmName}
          required
          maxLength={80}
        />
      </div>
      {/* Farm Type */}
      <div>
        <Select
          label="Farm Type"
          id="farmType"
          name="farmType"
          placeholder="Select farm type"
          options={FARM_TYPE_OPTIONS}
          value={formData?.farmType}
          onChange={(val) => onSelectChange('farmType', val)}
          error={errors?.farmType}
          required
        />
        {formData?.farmType && (
          <div className="mt-2">
            <FarmTypeTooltip farmType={formData?.farmType} />
          </div>
        )}
      </div>
      {/* Land Size */}
      {(showLandSize || !formData?.farmType) && (
        <div>
          <Input
            label={formData?.farmType === 'Waste' ? 'Waste Processed (tons/year)' : 'Land Size (acres)'}
            type="number"
            id="landSize"
            name="landSize"
            placeholder={formData?.farmType === 'Waste' ? 'e.g. 500' : 'e.g. 25'}
            value={formData?.landSize}
            onChange={onChange}
            error={errors?.landSize}
            required={showLandSize}
            min="0.1"
            step="0.1"
            description={
              !formData?.farmType
                ? 'Select a farm type first'
                : formData?.farmType === 'Waste' ?'Total waste processed annually in metric tons' :'Total cultivated land area in acres'
            }
          />
        </div>
      )}
      {/* Livestock Count */}
      {(showLivestock || !formData?.farmType) && (
        <div>
          <Input
            label="Livestock Count"
            type="number"
            id="livestockCount"
            name="livestockCount"
            placeholder="e.g. 50"
            value={formData?.livestockCount}
            onChange={onChange}
            error={errors?.livestockCount}
            required={showLivestock}
            min="1"
            step="1"
            description={
              !formData?.farmType
                ? 'Select a farm type first' :'Total number of dairy cattle on your farm'
            }
          />
        </div>
      )}
      {/* State */}
      <div>
        <Select
          label="Location (State)"
          id="state"
          name="state"
          placeholder="Select your state"
          options={INDIAN_STATES}
          value={formData?.state}
          onChange={(val) => onSelectChange('state', val)}
          error={errors?.state}
          required
          searchable
        />
      </div>
      {/* Submit */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          iconName="ArrowRight"
          iconPosition="right"
          size="lg"
        >
          {isSubmitting ? 'Registering Farm...' : 'Register & Calculate Emissions'}
        </Button>
      </div>
      {/* Terms note */}
      <p className="text-center font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
        By registering, you agree to our{' '}
        <span className="underline cursor-pointer" style={{ color: 'var(--color-primary)' }}>
          Terms of Service
        </span>{' '}
        and{' '}
        <span className="underline cursor-pointer" style={{ color: 'var(--color-primary)' }}>
          Privacy Policy
        </span>
        .
      </p>
    </form>
  );
}