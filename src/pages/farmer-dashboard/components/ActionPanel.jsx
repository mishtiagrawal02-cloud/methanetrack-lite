import React from "react";
import Button from "components/ui/Button";
import Icon from "components/AppIcon";

export default function ActionPanel({ onGenerateCertificate, onViewMarketplace, onUpdateFarm }) {
  return (
    <div className="card">
      <h3 className="font-heading font-600 text-base md:text-lg mb-4" style={{ color: "var(--color-foreground)" }}>
        Quick Actions
      </h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          iconName="Award"
          iconPosition="left"
          onClick={onGenerateCertificate}
          className="flex-1"
        >
          Generate Certificate
        </Button>
        <Button
          variant="secondary"
          iconName="ShoppingBag"
          iconPosition="left"
          onClick={onViewMarketplace}
          className="flex-1"
        >
          View Marketplace
        </Button>
        <Button
          variant="outline"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={onUpdateFarm}
          className="flex-1"
        >
          Update Farm Data
        </Button>
      </div>
      <div
        className="mt-4 rounded-lg p-3 flex items-start gap-3"
        style={{ backgroundColor: "rgba(16,163,74,0.08)", border: "1px solid rgba(16,163,74,0.2)" }}
      >
        <Icon name="Info" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
        <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
          Your carbon credits are verified and ready for marketplace listing. Generate a certificate to share your environmental impact with stakeholders.
        </p>
      </div>
    </div>
  );
}