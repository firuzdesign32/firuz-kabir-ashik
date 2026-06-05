"use client";

import { useState, useEffect } from "react";

interface SettingItem {
  id?: string;
  key: string;
  value: string;
}

export default function AdminSettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({
    hero_headline: "",
    hero_subheadline: "",
    about_bio: "",
    about_years_exp: "0",
    about_projects_completed: "0",
    about_happy_clients: "0",
    contact_email: "",
    social_instagram: "",
    social_behance: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings"); // We can make a lightweight fetch, or fallback to mock
      if (res.ok) {
        const data = await res.json();
        // convert array [ { key, value } ] to Record
        const record = data.reduce((acc: any, cur: any) => {
          acc[cur.key] = cur.value;
          return acc;
        }, {});
        setSettings({ ...settings, ...record });
      }
    } catch (error) {
      console.error("Failed to fetch settings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      // Send updates to settings API
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      if (res.ok) {
        setMessage("Settings updated successfully!");
      } else {
        alert("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-text-muted mt-1">Manage dynamic content and configurations for your homepage.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading settings...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {message && (
            <div className="bg-green-500/10 border border-green-500 text-green-500 p-4 rounded-xl text-sm font-medium">
              {message}
            </div>
          )}

          {/* Hero Section */}
          <div className="bg-surface border border-border p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold border-b border-border pb-2 text-text">Hero Section</h3>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Headline</label>
              <input
                type="text"
                value={settings.hero_headline}
                onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
                className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Subheadline</label>
              <textarea
                value={settings.hero_subheadline}
                onChange={(e) => setSettings({ ...settings, hero_subheadline: e.target.value })}
                rows={3}
                className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* About Section */}
          <div className="bg-surface border border-border p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold border-b border-border pb-2 text-text">About Section</h3>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Bio Description (HTML / Paragraph)</label>
              <textarea
                value={settings.about_bio}
                onChange={(e) => setSettings({ ...settings, about_bio: e.target.value })}
                rows={4}
                className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Years of Experience</label>
                <input
                  type="text"
                  value={settings.about_years_exp}
                  onChange={(e) => setSettings({ ...settings, about_years_exp: e.target.value })}
                  className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Projects Completed</label>
                <input
                  type="text"
                  value={settings.about_projects_completed}
                  onChange={(e) => setSettings({ ...settings, about_projects_completed: e.target.value })}
                  className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Happy Clients</label>
                <input
                  type="text"
                  value={settings.about_happy_clients}
                  onChange={(e) => setSettings({ ...settings, about_happy_clients: e.target.value })}
                  className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Socials & Contact */}
          <div className="bg-surface border border-border p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold border-b border-border pb-2 text-text">Socials & Contact Info</h3>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Contact Email</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Instagram URL</label>
                <input
                  type="text"
                  value={settings.social_instagram}
                  onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                  className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Behance URL</label>
                <input
                  type="text"
                  value={settings.social_behance}
                  onChange={(e) => setSettings({ ...settings, social_behance: e.target.value })}
                  className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-75"
            >
              {submitting ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
