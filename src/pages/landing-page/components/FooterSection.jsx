import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "components/AppIcon";

export default function FooterSection() {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const links = [
    { label: "Home", path: "/landing-page" },
    { label: "Regional Insights", path: "/regional-insights" },
    { label: "Register as Farmer", path: "/farmer-registration" },
    { label: "Dashboard", path: "/farmer-dashboard" },
    { label: "Marketplace", path: "/marketplace" },
  ];

  return (
    <footer className="py-10 md:py-12 px-4 md:px-6 lg:px-8"
      style={{ background: "var(--color-card)", borderTop: "1px solid var(--color-border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg"
              style={{ background: "rgba(16,163,74,0.15)", border: "1px solid rgba(16,163,74,0.3)" }}>
              <Icon name="Leaf" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <span className="font-heading font-bold text-white text-lg">
                MethaneTrack <span style={{ color: "var(--color-primary)" }}>Lite</span>
              </span>
              <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                Climate Accounting Platform
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {links?.map((l) => (
              <button
                key={l?.path}
                onClick={() => navigate(l?.path)}
                className="font-caption text-sm transition-colors hover:text-white"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                {l?.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid var(--color-border)" }}>
          <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
            &copy; {currentYear} MethaneTrack Lite. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={13} color="var(--color-muted-foreground)" />
            <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
              Compliant with MoEFCC &amp; UNFCCC standards
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}