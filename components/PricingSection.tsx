"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "project">("monthly");

  const monthlyPlans = [
    {
      name: "Basic",
      price: "$1,999",
      period: "/per month",
      description: "Ideal for ongoing 3D motion support for small brands or agencies.",
      features: [
        "One requests at a time",
        "Average 48 hours delivery",
        "Unlimited Projects",
        "Unlimited users",
        "Pause or cancel anytime",
      ],
      featured: false,
    },
    {
      name: "Standard",
      price: "$2,999",
      period: "/per month",
      description: "Our most popular plan for scaling product launches and ads.",
      features: [
        "Two requests at a time",
        "Average 48 hours delivery",
        "Unlimited Projects",
        "Unlimited users",
        "Pause or cancel anytime",
      ],
      featured: true,
    },
    {
      name: "Premium",
      price: "$3,999",
      period: "/per month",
      description: "Dedicated production speed and priority queuing for larger studios.",
      features: [
        "Three requests at a time",
        "Average 48 hours delivery",
        "Unlimited Projects",
        "Unlimited users",
        "Pause or cancel anytime",
      ],
      featured: false,
    },
  ];

  const projectPlans = [
    {
      name: "Starter Plan",
      price: "$499",
      period: "/per project",
      description: "A short 10-second high-definition product visual showcase.",
      features: [
        "A 10sec 720p Quality Video",
        "3 Days Delivery",
        "One Revision",
        "Video Editing",
        "3D Modeling",
        "Lighting & Texturing",
        "X-ray / Exploded View Included",
      ],
      featured: false,
    },
    {
      name: "Standard Plan",
      price: "$999",
      period: "/per project",
      description: "A complete 30-second full high-definition commercial.",
      features: [
        "A 30Sec 1080p Quality Video",
        "5 Days Delivery",
        "Two Revisions",
        "Video Editing",
        "3D Modeling",
        "Lighting & Texturing",
        "X-ray / Exploded View Included",
      ],
      featured: true,
    },
    {
      name: "Advanced Plan",
      price: "$1,599",
      period: "/per project",
      description: "Ultimate 4K cinematic product rendering with simulations.",
      features: [
        "A 60Sec 4K Quality Video",
        "7 Days Delivery",
        "Three Revisions",
        "Video Editing",
        "3D Modeling & Design",
        "Lighting & Texturing",
        "Advanced Physics Simulations",
        "X-ray / Exploded View Included",
      ],
      featured: false,
    },
  ];

  const activePlans = billingPeriod === "monthly" ? monthlyPlans : projectPlans;

  return (
    <section id="pricing" className="w-full bg-bg py-24 px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider block mb-3">
            Explore Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text mb-6">
            Amazing Pricing Plans
          </h2>
          <p className="text-text-muted">
            Choose the package that matches your production needs. Pause or cancel your subscription anytime.
          </p>

          {/* Toggle Tabs */}
          <div className="inline-flex bg-surface-2 p-1 rounded-full border border-border mt-10">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all relative ${
                billingPeriod === "monthly" ? "text-white" : "text-text-muted hover:text-text"
              }`}
            >
              {billingPeriod === "monthly" && (
                <motion.div
                  layoutId="billing-period-pill"
                  className="absolute inset-0 bg-accent rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Monthly Pricing</span>
            </button>
            <button
              onClick={() => setBillingPeriod("project")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all relative ${
                billingPeriod === "project" ? "text-white" : "text-text-muted hover:text-text"
              }`}
            >
              {billingPeriod === "project" && (
                <motion.div
                  layoutId="billing-period-pill"
                  className="absolute inset-0 bg-accent rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Project Based Pricing</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <AnimatePresence mode="popLayout">
            {activePlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
                  plan.featured
                    ? "bg-surface border-accent shadow-[0_0_30px_rgba(8,102,255,0.15)] md:-translate-y-4"
                    : "bg-surface-2 border-border hover:border-accent/50"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-text mb-2">{plan.name}</h3>
                  <p className="text-sm text-text-muted h-10">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-4xl md:text-5xl font-sans font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-text-muted font-medium">{plan.period}</span>
                </div>

                {/* Features List */}
                <ul className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-text">
                      <span className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" />
                      </span>
                      <span className="text-text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="/contact"
                  className={`w-full py-3.5 rounded-xl text-center font-medium transition-all ${
                    plan.featured
                      ? "bg-accent hover:bg-accent-hover text-white hover:shadow-[0_0_20px_rgba(8,102,255,0.4)]"
                      : "bg-surface hover:bg-surface-2 border border-border text-text hover:border-accent"
                  }`}
                >
                  Book A Meeting
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
