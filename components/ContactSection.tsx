"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";

interface ContactSectionProps {
  email?: string;
}

export default function ContactSection({ email }: ContactSectionProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="w-full py-24 bg-surface px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl font-display font-bold text-text mb-6">Let's Create Something Extraordinary</h2>
          <p className="text-text-muted text-lg mb-8">
            Whether you need a high-end product commercial, abstract motion graphics for your next event, or VFX compositing, I'm ready to bring your vision to life.
          </p>
          <div className="text-xl font-medium text-accent">
            {email || "hello@example.com"}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Name" 
                required
                className="bg-surface-2 border border-border p-4 rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                className="bg-surface-2 border border-border p-4 rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <input 
              type="text" 
              placeholder="Subject" 
              required
              className="bg-surface-2 border border-border p-4 rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <textarea 
              placeholder="Tell me about your project..." 
              required
              rows={5}
              className="bg-surface-2 border border-border p-4 rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
            />
            
            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className="bg-accent hover:bg-accent-hover text-white p-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
