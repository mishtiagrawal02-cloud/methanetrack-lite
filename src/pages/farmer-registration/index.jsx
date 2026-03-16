import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "components/ui/Header";
import NavigationBreadcrumb from "components/ui/NavigationBreadcrumb";
import Icon from "components/AppIcon";
import Image from "components/AppImage";

import RegistrationProgress from "./components/RegistrationProgress";
import EmissionPreview from "./components/EmissionPreview";
import RegistrationForm from "./components/RegistrationForm";
import SuccessModal from "./components/SuccessModal";

const INITIAL_FORM = {
  farmName: "",
  farmType: "",
  landSize: "",
  livestockCount: "",
  state: "",
};

function validate(formData) {
  const errs = {};

  if (!formData?.farmName?.trim())
    errs.farmName = "Farm name is required.";
  else if (formData?.farmName?.trim()?.length < 3)
    errs.farmName = "Farm name must be at least 3 characters.";

  if (!formData?.farmType)
    errs.farmType = "Please select a farm type.";

  if (formData?.farmType === "Dairy") {
    if (!formData?.livestockCount)
      errs.livestockCount = "Livestock count is required for dairy farms.";
    else if (parseFloat(formData?.livestockCount) < 1)
      errs.livestockCount = "Must have at least 1 animal.";
  }

  if (formData?.farmType === "Rice" || formData?.farmType === "Waste") {
    if (!formData?.landSize)
      errs.landSize = "Land size is required.";
    else if (parseFloat(formData?.landSize) <= 0)
      errs.landSize = "Value must be greater than 0.";
  }

  if (!formData?.state)
    errs.state = "Please select your state.";

  return errs;
}

function isFormValid(formData) {
  return Object.keys(validate(formData)).length === 0;
}

const TRUST_BADGES = [
  { icon: "ShieldCheck", label: "Govt. Verified", color: "var(--color-primary)" },
  { icon: "Award", label: "ISO 14064 Aligned", color: "var(--color-secondary)" },
  { icon: "Lock", label: "Data Secure", color: "var(--color-accent)" },
];

export default function FarmerRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleSelectChange = useCallback((name, value) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "farmType") {
        next.landSize = "";
        next.livestockCount = "";
      }

      return next;
    });

    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const errs = validate(formData);

      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }

      setIsSubmitting(true);

      await new Promise((r) => setTimeout(r, 1200));

      setIsSubmitting(false);
      setShowSuccess(true);
    },
    [formData]
  );

  const handleGoToDashboard = () => {
    setShowSuccess(false);
    navigate("/farmer-dashboard");
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setFormData(INITIAL_FORM);
    setErrors({});
    setTouched({});
  };

  const valid = isFormValid(formData);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
      <Header />

      {/* HERO */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* FIXED HERE */}
        <NavigationBreadcrumb className="mb-4" />

        <h1 className="text-3xl font-bold mb-2">Register Your Farm</h1>

        <p className="text-sm text-gray-400 mb-6">
          Provide your farm details to calculate methane emissions.
        </p>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* FORM */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <RegistrationProgress formData={formData} errors={errors} />

            <RegistrationForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onSelectChange={handleSelectChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isValid={valid}
            />
          </motion.div>

          {/* SIDEBAR */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <EmissionPreview formData={formData} />

            <div className="rounded-xl p-4 border">

              <div className="flex items-center gap-2 mb-4">

                {/* FIXED HERE */}
                <Icon
                  name="HelpCircle"
                  size={16}
                  color="var(--color-secondary)"
                />

                <span className="font-semibold text-sm">
                  How It Works
                </span>

              </div>

              <p className="text-xs text-gray-400">
                Register your farm, calculate methane emissions,
                and generate carbon credits.
              </p>

            </div>

            <div className="rounded-xl overflow-hidden h-40">
              <Image
                src="https://images.unsplash.com/photo-1531213470611-76c3f8aba917"
                alt="farm"
                className="w-full h-full object-cover"
              />
            </div>

            <button
              onClick={() => navigate("/farmer-dashboard")}
              className="text-sm text-green-400"
            >
              Go to Dashboard →
            </button>

          </motion.div>

        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        farmName={formData?.farmName}
        onGoToDashboard={handleGoToDashboard}
        onClose={handleCloseSuccess}
      />
    </div>
  );
}