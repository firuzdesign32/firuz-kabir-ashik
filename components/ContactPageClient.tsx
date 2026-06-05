"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Check, Send, Loader2, ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ContactPageClientProps {
  settings: Record<string, string>;
}

export default function ContactPageClient({ settings }: ContactPageClientProps) {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  // Extract variables with fallbacks
  const email = settings["contact_email"] || "info@firuzkabirashik.com";
  const whatsapp = "+8801733734776";
  const address = "71-75 Shelton Street, London, United Kingdom, WC2H 9JQ";
  const instagram = settings["social_instagram"] || "";
  const behance = settings["social_behance"] || "";

  const socialLinks = [
    { name: "Facebook", url: "https://www.facebook.com/firuzdesign32", color: "hover:text-blue-500 hover:border-blue-500/30" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/firuzdesign32/", color: "hover:text-blue-400 hover:border-blue-400/30" },
    { name: "YouTube", url: "https://www.youtube.com/channel/UCr_-h0CAV9l023UZ0vCJZNw", color: "hover:text-red-500 hover:border-red-500/30" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 bg-bg flex flex-col items-center">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-24">
          
          {/* Header & Benefits */}
          <section className="text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-accent text-sm font-semibold tracking-wider uppercase bg-accent/10 px-4 py-1.5 rounded-full"
            >
              Book a Meeting
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold text-text leading-tight"
            >
              Book a strategic consultation for free
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-3xl"
            >
              {[
                "Estimated ROI calculation",
                "Several video concepts",
                "Video Marketing Blueprint"
              ].map((benefit, i) => (
                <div 
                  key={benefit}
                  className="bg-surface-2 border border-border/80 px-6 py-4 rounded-2xl flex items-center gap-3 text-left transition-all hover:border-accent/30 hover:bg-surface-2/80"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted font-semibold block uppercase tracking-wider">Bonus {i + 1}</span>
                    <span className="text-text font-medium text-sm">{benefit}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Google Calendar Iframe Integration */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full bg-surface-2 border border-border/60 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent to-accent-hover" />
            <div className="p-4 border-b border-border/40 flex items-center justify-between bg-surface-2/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-text-muted font-mono">calendar.google.com/appointments</span>
              <div className="w-12" />
            </div>
            
            <div className="w-full min-h-[800px] md:min-h-[1000px] lg:min-h-[1200px] xl:min-h-[1400px] relative">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3TibRNBO8STnPwAWOn26gsCe29_Uk_lP82InolRIUFybx03s9vTIx4yU6GTKysR76g3wnFBm2k?gv=true"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full border-0 bg-[#ffffff]"
                title="Book a meeting with Firuz Kabir Ashik"
              />
            </div>
          </motion.section>

          {/* Split Section: Get in Touch Info & Contact Form */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Contact Info Cards */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col gap-8"
            >
              <div>
                <span className="text-accent text-sm font-semibold uppercase tracking-wider block mb-2">Get In Touch</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">Let’s Talk For your Next Projects</h2>
                <p className="text-text-muted text-base">Let’s create 3d content that converts. Reach out via email, whatsapp, or send a quick message using the form.</p>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-4">
                {/* Email Card */}
                <a 
                  href={`mailto:${email}`}
                  className="group bg-surface border border-border hover:border-accent/40 rounded-2xl p-6 flex gap-5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-2 group-hover:bg-accent/10 flex items-center justify-center text-text-muted group-hover:text-accent border border-border/50 group-hover:border-accent/20 transition-colors shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1">Email Address</span>
                    <span className="text-text font-medium group-hover:text-accent transition-colors block break-all">{email}</span>
                  </div>
                </a>

                {/* WhatsApp Card */}
                <a 
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-surface border border-border hover:border-emerald-500/40 rounded-2xl p-6 flex gap-5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-2 group-hover:bg-emerald-500/10 flex items-center justify-center text-text-muted group-hover:text-emerald-400 border border-border/50 group-hover:border-emerald-500/20 transition-colors shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1">WhatsApp Chat</span>
                    <span className="text-text font-medium group-hover:text-emerald-400 transition-colors block">{whatsapp}</span>
                  </div>
                </a>

                {/* Address Card */}
                <a 
                  href="https://maps.app.goo.gl/xyS3F3WSZJdssXYM8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-surface border border-border hover:border-accent/40 rounded-2xl p-6 flex gap-5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-2 group-hover:bg-accent/10 flex items-center justify-center text-text-muted group-hover:text-accent border border-border/50 group-hover:border-accent/20 transition-colors shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1">Office Location</span>
                    <span className="text-text font-medium text-sm leading-relaxed block">{address}</span>
                  </div>
                </a>
              </div>

              {/* Social Follow */}
              <div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-4">Follow Me</span>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-5 py-2.5 rounded-full border border-border bg-surface text-sm font-medium text-text-muted transition-all duration-300 ${social.color}`}
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>

            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-surface-2 border border-border/80 rounded-3xl p-8 shadow-xl relative"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text">Full Name <span className="text-accent">*</span></label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Richard D. Hammond" 
                      required
                      className="bg-bg border border-border px-5 py-3.5 rounded-xl text-text placeholder:text-text-muted/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all text-sm"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text">Email Address <span className="text-accent">*</span></label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="support@gmail.com" 
                      required
                      className="bg-bg border border-border px-5 py-3.5 rounded-xl text-text placeholder:text-text-muted/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text">Phone Number <span className="text-accent">*</span></label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 (123) 456 88" 
                      required
                      className="bg-bg border border-border px-5 py-3.5 rounded-xl text-text placeholder:text-text-muted/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all text-sm"
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text">Subject <span className="text-accent">*</span></label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="I would like to discuss a 3D animation project" 
                      required
                      className="bg-bg border border-border px-5 py-3.5 rounded-xl text-text placeholder:text-text-muted/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">Message <span className="text-accent">*</span></label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write message..." 
                    required
                    rows={6}
                    className="bg-bg border border-border px-5 py-3.5 rounded-xl text-text placeholder:text-text-muted/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all text-sm resize-none"
                  />
                </div>

                {/* Status Banners */}
                {status === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium flex items-center gap-3"
                  >
                    <Check className="w-5 h-5 shrink-0" />
                    <span>Your message has been sent successfully! I will contact you shortly.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full bg-accent hover:bg-accent-hover disabled:bg-accent/70 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Us Message
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

          </section>

        </div>
      </main>
      <Footer 
        instagram={instagram}
        behance={behance}
      />
    </>
  );
}
