"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote: "Firuz took our product launch to the next level. His 3D motion skills are unparalleled and the attention to detail was exactly what we needed.",
    author: "Sarah Jenkins",
    role: "Marketing Director, TechNova"
  },
  {
    quote: "Working with Firuz was seamless. He understood our vision immediately and delivered a cinematic commercial that exceeded our expectations.",
    author: "David Chen",
    role: "Founder, Zenith Audio"
  },
  {
    quote: "The abstract motion graphics Firuz created for our event were mesmerizing. It became the talking point of the entire conference.",
    author: "Elena Rodriguez",
    role: "Event Coordinator, FutureSummit"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-24 bg-bg px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl font-display font-bold text-text mb-16">What Clients Say</h2>
          
          <div className="relative h-64 flex flex-col justify-center">
            {testimonials.map((test, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: index === currentIndex ? 1 : 0, 
                  scale: index === currentIndex ? 1 : 0.95,
                  zIndex: index === currentIndex ? 10 : 0,
                  pointerEvents: index === currentIndex ? 'auto' : 'none'
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <p className="text-2xl md:text-3xl text-text-muted italic mb-8">"{test.quote}"</p>
                <h4 className="text-xl font-bold text-text">{test.author}</h4>
                <span className="text-accent">{test.role}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-accent' : 'bg-surface-2 border border-border'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
