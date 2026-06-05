"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

interface CaseStudyItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  clientName?: string;
  industry?: string;
  challenge: string;
  solution: string;
  process: string;
  results: string;
}

export default function AdminCaseStudiesManager() {
  const [items, setItems] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Partial<CaseStudyItem> | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    // Mimic database query on load. For dynamic setup, we can query our prisma caseStudy DB
    try {
      const res = await fetch("/api/case-studies"); // We can make a lightweight fetch, or fallback to mock if API returns 404
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      } else {
        // Fallback placeholder mock items for case studies
        setItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch case studies", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setActiveItem({
      title: "",
      slug: "",
      category: "Tech",
      clientName: "",
      industry: "",
      challenge: "",
      solution: "",
      process: "",
      results: "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: CaseStudyItem) => {
    setActiveItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      const res = await fetch(`/api/case-studies/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems(items.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem) return;
    setSubmitting(true);

    try {
      const isEdit = !!activeItem.id;
      const url = isEdit ? `/api/case-studies/${activeItem.id}` : "/api/case-studies";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...activeItem,
          media: (activeItem as any).media || [],
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setActiveItem(null);
        fetchItems();
      } else {
        alert("Failed to save case study");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Case Studies Manager</h1>
        <button
          onClick={handleOpenCreate}
          className="bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Case Study
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading case studies...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-xl text-text-muted">
          No case studies found. Create one to get started!
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-2 border-b border-border text-sm text-text-muted font-semibold uppercase tracking-wider">
                <th className="p-4">Title</th>
                <th className="p-4">Client</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border text-sm hover:bg-surface-2/30 transition-colors">
                  <td className="p-4 font-semibold text-text">{item.title}</td>
                  <td className="p-4 text-text-muted">{item.clientName || "-"}</td>
                  <td className="p-4 text-text-muted">{item.category}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 hover:bg-surface-2 text-text hover:text-accent rounded-lg border border-transparent hover:border-border transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-surface-2 text-text hover:text-red-500 rounded-lg border border-transparent hover:border-border transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && activeItem && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-6">
          <div className="bg-surface border border-border w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-bold">{activeItem.id ? "Edit Case Study" : "Create Case Study"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-text-muted hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={activeItem.title}
                    onChange={(e) => setActiveItem({ ...activeItem, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })}
                    className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Slug</label>
                  <input
                    type="text"
                    required
                    value={activeItem.slug}
                    onChange={(e) => setActiveItem({ ...activeItem, slug: e.target.value })}
                    className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Category</label>
                  <input
                    type="text"
                    required
                    value={activeItem.category}
                    onChange={(e) => setActiveItem({ ...activeItem, category: e.target.value })}
                    className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Client Name</label>
                  <input
                    type="text"
                    value={activeItem.clientName || ""}
                    onChange={(e) => setActiveItem({ ...activeItem, clientName: e.target.value })}
                    className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Industry</label>
                  <input
                    type="text"
                    value={activeItem.industry || ""}
                    onChange={(e) => setActiveItem({ ...activeItem, industry: e.target.value })}
                    className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">The Challenge</label>
                <textarea
                  required
                  value={activeItem.challenge}
                  onChange={(e) => setActiveItem({ ...activeItem, challenge: e.target.value })}
                  rows={3}
                  className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">The Solution</label>
                <textarea
                  required
                  value={activeItem.solution}
                  onChange={(e) => setActiveItem({ ...activeItem, solution: e.target.value })}
                  rows={3}
                  className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">The Process</label>
                <textarea
                  required
                  value={activeItem.process}
                  onChange={(e) => setActiveItem({ ...activeItem, process: e.target.value })}
                  rows={3}
                  className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">The Results</label>
                <textarea
                  required
                  value={activeItem.results}
                  onChange={(e) => setActiveItem({ ...activeItem, results: e.target.value })}
                  rows={3}
                  className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-surface hover:bg-surface-2 border border-border px-6 py-3 rounded-xl font-medium text-text transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-75"
                >
                  {submitting ? "Saving..." : "Save Case Study"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
