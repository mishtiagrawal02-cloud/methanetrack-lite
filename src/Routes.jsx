import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import FarmerRegistration from './pages/farmer-registration';
import FarmerDashboard from './pages/farmer-dashboard';
import LandingPage from './pages/landing-page';
import RegionalMethaneOverview from './pages/regional-methane-overview';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<FarmerDashboard />} />
        <Route path="/farmer-registration" element={<FarmerRegistration />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/regional-methane-overview" element={<RegionalMethaneOverview />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
