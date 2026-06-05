"use client";

import { motion } from "framer-motion";

interface AboutSectionProps {
  bio?: string;
  years?: string;
  projects?: string;
  clients?: string;
}

export default function AboutSection({ bio, years, projects, clients }: AboutSectionProps) {
  return (
    <section className="w-full py-24 bg-surface px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Profile Image placeholder */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full h-[500px] bg-surface-2 rounded-2xl border border-border flex items-center justify-center overflow-hidden"
        >
          <div className="text-text-muted">Profile Image Placeholder</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8"
        >
          <div>
            <h2 className="text-4xl font-display font-bold text-text mb-6">About Me</h2>
            <div 
              className="text-text-muted prose prose-invert max-w-none text-lg"
              dangerouslySetInnerHTML={{ __html: bio || '<p>Default Bio</p>' }}
            />
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-accent font-display">{years || "0"}+</span>
              <span className="text-sm text-text-muted mt-2 uppercase tracking-wider">Years Experience</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-accent font-display">{projects || "0"}+</span>
              <span className="text-sm text-text-muted mt-2 uppercase tracking-wider">Projects Completed</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-accent font-display">{clients || "0"}</span>
              <span className="text-sm text-text-muted mt-2 uppercase tracking-wider">Happy Clients</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
