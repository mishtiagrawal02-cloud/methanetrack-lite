// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Header from "components/ui/Header";
// import NavigationBreadcrumb from "components/ui/NavigationBreadcrumb";
// import Icon from "components/AppIcon";


// import MetricCard from "./components/MetricCard";
// import SustainabilityBadge from "./components/SustainabilityBadge";
// import EmissionChart from "./components/EmissionChart";
// import CreditRevenue from "./components/CreditRevenue";
// import CalculationBreakdown from "./components/CalculationBreakdown";
// import ActionPanel from "./components/ActionPanel";

// const MOCK_FARM = {
//   farmName: "Sunrise Dairy Farm",
//   farmType: "Dairy",
//   landSize: 45,
//   livestockCount: 120,
//   location: "Punjab",
//   registeredOn: "15/01/2026",
//   farmerName: "Harpreet Singh",
// };

// function computeMetrics(farm) {
//   const ef = farm?.farmType === "Dairy" ? 100 : farm?.farmType === "Rice" ? 150 : 200;
//   const quantity = farm?.farmType === "Dairy" ? farm?.livestockCount : farm?.landSize;
//   const baseline = quantity * ef;
//   const reduced = baseline * 0.6;
//   const co2Eq = reduced * 80;
//   const credits = Math.floor(co2Eq / 1000);
//   const revenue = credits * 800;
//   return { baseline, reduced, co2Eq, credits, revenue };
// }

// export default function FarmerDashboard() {
//   const navigate = useNavigate();
//   const [certToast, setCertToast] = useState(false);

//   const metrics = computeMetrics(MOCK_FARM);

//   const handleGenerateCertificate = () => {
//     setCertToast(true);
//     setTimeout(() => setCertToast(false), 3500);
//   };

//   const metricCards = [
//     {
//       title: "Baseline Methane Emission",
//       value: metrics?.baseline?.toLocaleString("en-IN"),
//       unit: "kg CH₄/yr",
//       subtitle: "Annual farm baseline",
//       iconName: "Activity",
//       iconColor: "#EF4444",
//       trend: null,
//     },
//     {
//       title: "Methane Reduced",
//       value: metrics?.reduced?.toLocaleString("en-IN"),
//       unit: "kg CH₄/yr",
//       subtitle: "60% reduction achieved",
//       iconName: "TrendingDown",
//       iconColor: "var(--color-primary)",
//       trend: "up",
//       trendValue: "60%",
//     },
//     {
//       title: "CO₂ Equivalent",
//       value: (metrics?.co2Eq / 1000)?.toLocaleString("en-IN"),
//       unit: "tCO₂e",
//       subtitle: "Total offset impact",
//       iconName: "Wind",
//       iconColor: "var(--color-secondary)",
//       trend: "up",
//       trendValue: "+12%",
//     },
//     {
//       title: "Credits Generated",
//       value: metrics?.credits?.toLocaleString("en-IN"),
//       unit: "credits",
//       subtitle: "1 credit = 1,000 kg CO₂e",
//       iconName: "Leaf",
//       iconColor: "var(--color-primary)",
//       trend: "up",
//       trendValue: "+3",
//     },
//     {
//       title: "Revenue Earned",
//       value: `₹${metrics?.revenue?.toLocaleString("en-IN")}`,
//       unit: "",
//       subtitle: "@ ₹800 per credit",
//       iconName: "IndianRupee",
//       iconColor: "var(--color-accent)",
//       trend: "up",
//       trendValue: "+₹2,400",
//     },
//   ];

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
//       <Header
//         isAuthenticated={true}
//         userRole="farmer"
//         notificationCount={2}
//         onLogout={() => navigate("/landing-page")}
//       />
//       <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
//         {/* Breadcrumbs */}
//         <NavigationBreadcrumbs className="mb-4 md:mb-6" />

//         {/* Page Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <Icon name="LayoutDashboard" size={20} color="var(--color-primary)" />
//               <h1 className="font-heading font-700 text-xl md:text-2xl lg:text-3xl" style={{ color: "var(--color-foreground)" }}>
//                 Farmer Dashboard
//               </h1>
//             </div>
//             <p className="font-body text-sm md:text-base" style={{ color: "var(--color-muted-foreground)" }}>
//               Welcome back, <span className="font-600" style={{ color: "var(--color-foreground)" }}>{MOCK_FARM?.farmerName}</span> &mdash; {MOCK_FARM?.farmName} &bull; {MOCK_FARM?.location}
//             </p>
//           </div>
//           <div className="flex items-center gap-2 flex-shrink-0">
//             <span
//               className="font-caption text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
//               style={{ backgroundColor: "rgba(16,163,74,0.12)", color: "var(--color-primary)", border: "1px solid rgba(16,163,74,0.25)" }}
//             >
//               <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
//               Live Data
//             </span>
//             <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
//               Updated: 03/03/2026
//             </span>
//           </div>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-6 md:mb-8">
//           {metricCards?.map((card) => (
//             <MetricCard key={card?.title} {...card} />
//           ))}
//         </div>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
//           <EmissionChart />
//           <CreditRevenueChart />
//         </div>

//         {/* Sustainability Badge + Calculation Breakdown */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
//           <div className="lg:col-span-1">
//             <SustainabilityBadge credits={metrics?.credits} co2Offset={metrics?.co2Eq} />
//           </div>
//           <div className="lg:col-span-2">
//             <CalculationBreakdown farmData={MOCK_FARM} />
//           </div>
//         </div>

//         {/* Action Panel */}
//         <ActionPanel
//           onGenerateCertificate={handleGenerateCertificate}
//           onViewMarketplace={() => navigate("/marketplace")}
//           onUpdateFarm={() => navigate("/farmer-registration")}
//         />

//         {/* Farm Info Footer */}
//         <div
//           className="mt-6 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
//           style={{ backgroundColor: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}
//         >
//           <div className="flex items-center gap-2">
//             <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
//             <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
//               Location: <span style={{ color: "var(--color-foreground)" }}>{MOCK_FARM?.location}</span>
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Icon name="Sprout" size={14} color="var(--color-muted-foreground)" />
//             <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
//               Farm Type: <span style={{ color: "var(--color-foreground)" }}>{MOCK_FARM?.farmType}</span>
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Icon name="Calendar" size={14} color="var(--color-muted-foreground)" />
//             <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
//               Registered: <span style={{ color: "var(--color-foreground)" }}>{MOCK_FARM?.registeredOn}</span>
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Icon name="Shield" size={14} color="var(--color-primary)" />
//             <span className="font-caption text-xs" style={{ color: "var(--color-primary)" }}>
//               Verification ID: MT-2026-SR-0042
//             </span>
//           </div>
//         </div>
//       </main>
//       {/* Toast Notification */}
//       {certToast && (
//         <div
//           className="fixed bottom-6 right-4 md:right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl animate-fade-in"
//           style={{ backgroundColor: "var(--color-card)", border: "1px solid rgba(16,163,74,0.4)", maxWidth: "340px" }}
//         >
//           <div
//             className="flex items-center justify-center rounded-md flex-shrink-0"
//             style={{ width: "36px", height: "36px", backgroundColor: "rgba(16,163,74,0.15)" }}
//           >
//             <Icon name="CheckCircle" size={18} color="var(--color-primary)" />
//           </div>
//           <div>
//             <p className="font-caption font-600 text-sm" style={{ color: "var(--color-foreground)" }}>Certificate Generated!</p>
//             <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
//               Credit ID: MT-2026-SR-0042 is ready to download.
//             </p>
//           </div>
//           <button
//             onClick={() => setCertToast(false)}
//             className="flex-shrink-0 ml-2"
//             style={{ color: "var(--color-muted-foreground)" }}
//             aria-label="Dismiss notification"
//           >
//             <Icon name="X" size={14} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "components/ui/Header";
import NavigationBreadcrumb from "components/ui/NavigationBreadcrumb";
import Icon from "components/AppIcon";

import MetricCard from "./components/MetricCard";
import SustainabilityBadge from "./components/SustainabilityBadge";
import EmissionChart from "./components/EmissionChart";
import CreditRevenue from "./components/CreditRevenue";
import CalculationBreakdown from "./components/CalculationBreakdown";
import ActionPanel from "./components/ActionPanel";

const MOCK_FARM = {
  farmName: "Sunrise Dairy Farm",
  farmType: "Dairy",
  landSize: 45,
  livestockCount: 120,
  location: "Punjab",
  registeredOn: "15/01/2026",
  farmerName: "Harpreet Singh",
};

function computeMetrics(farm) {
  const ef =
    farm?.farmType === "Dairy"
      ? 100
      : farm?.farmType === "Rice"
      ? 150
      : 200;

  const quantity =
    farm?.farmType === "Dairy"
      ? farm?.livestockCount
      : farm?.landSize;

  const baseline = quantity * ef;
  const reduced = baseline * 0.6;
  const co2Eq = reduced * 80;
  const credits = Math.floor(co2Eq / 1000);
  const revenue = credits * 800;

  return { baseline, reduced, co2Eq, credits, revenue };
}

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [certToast, setCertToast] = useState(false);

  const metrics = computeMetrics(MOCK_FARM);

  const handleGenerateCertificate = () => {
    setCertToast(true);
    setTimeout(() => setCertToast(false), 3500);
  };

  const metricCards = [
    {
      title: "Baseline Methane Emission",
      value: metrics?.baseline?.toLocaleString("en-IN"),
      unit: "kg CH₄/yr",
      subtitle: "Annual farm baseline",
      iconName: "Activity",
      iconColor: "#EF4444",
      trend: null,
    },
    {
      title: "Methane Reduced",
      value: metrics?.reduced?.toLocaleString("en-IN"),
      unit: "kg CH₄/yr",
      subtitle: "60% reduction achieved",
      iconName: "TrendingDown",
      iconColor: "var(--color-primary)",
      trend: "up",
      trendValue: "60%",
    },
    {
      title: "CO₂ Equivalent",
      value: (metrics?.co2Eq / 1000)?.toLocaleString("en-IN"),
      unit: "tCO₂e",
      subtitle: "Total offset impact",
      iconName: "Wind",
      iconColor: "var(--color-secondary)",
      trend: "up",
      trendValue: "+12%",
    },
    {
      title: "Credits Generated",
      value: metrics?.credits?.toLocaleString("en-IN"),
      unit: "credits",
      subtitle: "1 credit = 1,000 kg CO₂e",
      iconName: "Leaf",
      iconColor: "var(--color-primary)",
      trend: "up",
      trendValue: "+3",
    },
    {
      title: "Revenue Earned",
      value: `₹${metrics?.revenue?.toLocaleString("en-IN")}`,
      unit: "",
      subtitle: "@ ₹800 per credit",
      iconName: "IndianRupee",
      iconColor: "var(--color-accent)",
      trend: "up",
      trendValue: "+₹2,400",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <Header
        isAuthenticated={true}
        userRole="farmer"
        notificationCount={2}
        onLogout={() => navigate("/landing-page")}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">

        {/* Breadcrumb */}
        <NavigationBreadcrumb className="mb-4 md:mb-6" />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Icon
                name="LayoutDashboard"
                size={20}
                color="var(--color-primary)"
              />
              <h1
                className="font-heading font-700 text-xl md:text-2xl lg:text-3xl"
                style={{ color: "var(--color-foreground)" }}
              >
                Farmer Dashboard
              </h1>
            </div>

            <p
              className="font-body text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              Welcome back{" "}
              <span
                className="font-600"
                style={{ color: "var(--color-foreground)" }}
              >
                {MOCK_FARM?.farmerName}
              </span>{" "}
              — {MOCK_FARM?.farmName} • {MOCK_FARM?.location}
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-6 md:mb-8">
          {metricCards?.map((card) => (
            <MetricCard key={card?.title} {...card} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <EmissionChart />
          <CreditRevenue />
        </div>

        {/* Sustainability + Calculation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="lg:col-span-1">
            <SustainabilityBadge
              credits={metrics?.credits}
              co2Offset={metrics?.co2Eq}
            />
          </div>

          <div className="lg:col-span-2">
            <CalculationBreakdown farmData={MOCK_FARM} />
          </div>
        </div>

        {/* Action Panel */}
        <ActionPanel
          onGenerateCertificate={handleGenerateCertificate}
          onViewMarketplace={() => navigate("/marketplace")}
          onUpdateFarm={() => navigate("/farmer-registration")}
        />
      </main>
    </div>
  );
}