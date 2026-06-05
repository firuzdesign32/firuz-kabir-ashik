"use client";

import { motion } from "framer-motion";
import { MonitorPlay, Box, Clapperboard } from "lucide-react";

const services = [
  {
    icon: <MonitorPlay className="w-8 h-8 text-accent" />,
    title: "Product Commercials",
    description: "High-end, hyper-realistic 3D product animations that highlight features and elevate your brand's perceived value.",
    price: "From $2,500"
  },
  {
    icon: <Box className="w-8 h-8 text-accent" />,
    title: "Abstract Motion",
    description: "Visually striking abstract loops and sequences perfect for events, stage backgrounds, and social media campaigns.",
    price: "From $1,500"
  },
  {
    icon: <Clapperboard className="w-8 h-8 text-accent" />,
    title: "VFX & Compositing",
    description: "Seamless integration of 3D elements into live-action footage for commercials and short films.",
    price: "From $3,000"
  }
];

export default function ServicesSection() {
  return (
    <section className="w-full py-24 bg-bg px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-text mb-4">Services</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Comprehensive 3D motion design solutions tailored to your brand's unique needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface border border-border p-8 rounded-2xl hover:border-accent transition-colors group"
            >
              <div className="w-16 h-16 bg-surface-2 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-text mb-4">{service.title}</h3>
              <p className="text-text-muted mb-8 line-clamp-3">
                {service.description}
              </p>
              <div className="text-accent font-semibold tracking-wide">
                {service.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
