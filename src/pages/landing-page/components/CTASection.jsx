import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "components/AppIcon";
import Button from "components/ui/Button";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8"
      style={{ background: "var(--color-background)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(16,163,74,0.15) 0%, rgba(14,165,233,0.1) 100%)",
            border: "1px solid rgba(16,163,74,0.25)",
          }}>
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(16,163,74,0.12) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{ background: "rgba(16,163,74,0.15)", border: "1px solid rgba(16,163,74,0.3)" }}>
              <Icon name="Leaf" size={32} color="var(--color-primary)" />
            </div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-4">
              Ready to Turn Your Farm Into a Climate Asset?
            </h2>
            <p className="font-body text-sm md:text-base max-w-2xl mx-auto mb-8"
              style={{ color: "var(--color-muted-foreground)", lineHeight: "1.7" }}>
              Join thousands of Indian farmers already earning carbon credits. Register today, calculate your methane reduction, and start earning ₹800 per credit — no upfront cost required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8">
              <Button
                variant="default"
                size="lg"
                iconName="Sprout"
                iconPosition="left"
                onClick={() => navigate("/farmer-registration")}
              >
                Register as Farmer
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="ShoppingBag"
                iconPosition="left"
                onClick={() => navigate("/farmer-dashboard")}
              >
                View Marketplace
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {[
                { icon: "CheckCircle", text: "Free to register" },
                { icon: "CheckCircle", text: "No technical expertise needed" },
                { icon: "CheckCircle", text: "Instant credit calculation" },
              ]?.map((item) => (
                <div key={item?.text} className="flex items-center gap-2">
                  <Icon name={item?.icon} size={16} color="var(--color-primary)" />
                  <span className="font-caption text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                    {item?.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}