"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
}

export default function HeroSection({ headline, subheadline }: HeroSectionProps) {
  const displayHeadline = headline || "Elevating Brands Through 3D Motion";
  const displaySubheadline = subheadline || "I craft cinematic 3D animations and motion graphics for forward-thinking tech and FMCG brands worldwide.";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-bg overflow-hidden pt-20">
      {/* Background Particles / Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent opacity-20 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-accent-hover opacity-10 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="z-10 text-center max-w-4xl px-6"
      >
        <motion.h1 
          variants={item}
          className="text-5xl md:text-7xl font-bold font-display tracking-tight text-text mb-6"
        >
          {displayHeadline}
        </motion.h1>
        
        <motion.p 
          variants={item}
          className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto"
        >
          {displaySubheadline}
        </motion.p>
        
        <motion.div variants={item} className="flex items-center justify-center gap-4">
          <Link href="/portfolio" className="group flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105">
            View My Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/contact" className="px-8 py-4 rounded-full border border-border hover:bg-surface-2 text-text font-medium transition-all">
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
