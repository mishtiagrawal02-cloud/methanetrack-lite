import React from "react";
import Icon from "components/AppIcon";

const certifications = [
{ icon: "ShieldCheck", label: "MoEFCC Compliant", sub: "Ministry of Environment, Forest & Climate Change" },
{ icon: "Leaf", label: "ICAR Verified", sub: "Indian Council of Agricultural Research" },
{ icon: "Award", label: "VCS Standard", sub: "Verified Carbon Standard Protocol" },
{ icon: "Globe", label: "UNFCCC Aligned", sub: "UN Framework Convention on Climate Change" }];


const testimonials = [
{
  name: "Rajesh Kumar",
  role: "Dairy Farmer, Punjab",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1aac56550-1763295507132.png",
  avatarAlt: "Middle-aged Indian man with short black hair wearing a white kurta in a rural setting",
  quote: "MethaneTrack helped me understand my farm's carbon footprint and earn ₹24,000 in my first quarter from credits I didn't even know I could generate.",
  credits: "30 credits",
  revenue: "₹24,000"
},
{
  name: "Priya Sharma",
  role: "Rice Farmer, West Bengal",
  avatar: "https://images.unsplash.com/photo-1560838944-9e0177bbc294",
  avatarAlt: "Young Indian woman with long dark hair wearing a green saree standing in a rice field",
  quote: "The platform is simple to use and the certificate gives me credibility with corporate buyers. My farm is now part of the global climate solution.",
  credits: "18 credits",
  revenue: "₹14,400"
},
{
  name: "Amit Patel",
  role: "Waste Manager, Gujarat",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19e6db4d2-1772525512332.png",
  avatarAlt: "Older Indian man with grey hair wearing a blue shirt standing near waste management facility",
  quote: "The estimation engine is accurate and transparent. I can show exactly how my waste reduction practices translate into verified carbon credits.",
  credits: "45 credits",
  revenue: "₹36,000"
}];


export default function TrustIndicators() {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8"
    style={{ background: "var(--color-surface-2)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Certifications */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
            Trusted &amp; Certified
          </h2>
          <p className="font-body text-sm md:text-base" style={{ color: "var(--color-muted-foreground)" }}>
            Aligned with Indian and international climate standards
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-14 md:mb-16">
          {certifications?.map((c) =>
          <div key={c?.label} className="flex flex-col items-center text-center p-4 md:p-5 rounded-xl"
          style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}>
              <div className="flex items-center justify-center w-11 h-11 rounded-xl mb-3"
            style={{ background: "rgba(16,163,74,0.12)" }}>
                <Icon name={c?.icon} size={22} color="var(--color-primary)" />
              </div>
              <span className="font-heading font-semibold text-sm md:text-base text-white mb-1">{c?.label}</span>
              <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>{c?.sub}</span>
            </div>
          )}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">
            Farmers Already Earning
          </h2>
          <p className="font-body text-sm md:text-base" style={{ color: "var(--color-muted-foreground)" }}>
            Real results from real farmers across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials?.map((t) =>
          <div key={t?.name} className="card card-hover p-5 md:p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img src={t?.avatar} alt={t?.avatarAlt} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-white">{t?.name}</p>
                  <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>{t?.role}</p>
                </div>
              </div>
              <p className="font-body text-sm italic flex-1"
            style={{ color: "var(--color-muted-foreground)", lineHeight: "1.65" }}>
                &ldquo;{t?.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-3"
            style={{ borderTop: "1px solid var(--color-border)" }}>
                <div className="flex items-center gap-1.5">
                  <Icon name="Award" size={14} color="var(--color-primary)" />
                  <span className="font-data text-xs font-medium" style={{ color: "var(--color-primary)" }}>
                    {t?.credits}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="IndianRupee" size={14} color="var(--color-accent)" />
                  <span className="font-data text-xs font-medium" style={{ color: "var(--color-accent)" }}>
                    {t?.revenue}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}