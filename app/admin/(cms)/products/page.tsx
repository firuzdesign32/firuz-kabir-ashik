"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Eye, EyeOff } from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  description: string;
  category: string;
  productFileUrl: string;
  previewFileUrl?: string;
  type: "PDF" | "TEMPLATE" | "LUT" | "PRESET" | "COURSE_RESOURCE" | "ASSET_PACK" | "ZIP";
  status: "PUBLISHED" | "DRAFT";
}

export default function AdminProductsManager() {
  const [items, setItems] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Partial<ProductItem> | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setActiveItem({
      name: "",
      slug: "",
      thumbnail: "",
      price: 0,
      discountPrice: undefined,
      description: "",
      category: "Assets",
      productFileUrl: "",
      previewFileUrl: "",
      type: "ASSET_PACK",
      status: "DRAFT",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: ProductItem) => {
    setActiveItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems(items.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem) return;
    setSubmitting(true);

    try {
      const isEdit = !!activeItem.id;
      const url = isEdit ? `/api/products/${activeItem.id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...activeItem,
          price: parseFloat(activeItem.price?.toString() || "0"),
          discountPrice: activeItem.discountPrice ? parseFloat(activeItem.discountPrice.toString()) : null,
          gallery: (activeItem as any).gallery || [],
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setActiveItem(null);
        fetchItems();
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.error || "Failed to save product"}`);
      }
    } catch (error) {
      console.error("Error saving product", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products Manager</h1>
        <button
          onClick={handleOpenCreate}
          className="bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Product
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading products...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-xl text-text-muted">
          No products found. Create one to get started!
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-2 border-b border-border text-sm text-text-muted font-semibold uppercase tracking-wider">
                <th className="p-4">Thumbnail</th>
                <th className="p-4">Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border text-sm hover:bg-surface-2/30 transition-colors">
                  <td className="p-4">
                    <img src={item.thumbnail} alt={item.name} className="w-16 h-12 object-cover rounded-lg bg-surface-2 border border-border" />
                  </td>
                  <td className="p-4 font-semibold text-text">{item.name}</td>
                  <td className="p-4 text-text-muted">{item.type}</td>
                  <td className="p-4 text-text font-medium">
                    {item.discountPrice ? (
                      <div className="flex items-center gap-2">
                        <span>${item.discountPrice.toFixed(2)}</span>
                        <span className="text-xs text-text-muted line-through">${item.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span>${item.price.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {item.status === "PUBLISHED" ? (
                      <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit">
                        <Eye className="w-3.5 h-3.5" /> Published
                      </span>
                    ) : (
                      <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit">
                        <EyeOff className="w-3.5 h-3.5" /> Draft
                      </span>
                    )}
                  </td>
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

      {/* Modal Dialog */}
      {modalOpen && activeItem && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-6">
          <div className="bg-surface border border-border w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-bold">{activeItem.id ? "Edit Product" : "Create Product"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-text-muted hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={activeItem.name}
                    onChange={(e) => setActiveItem({ ...activeItem, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })}
                    className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Slug</label>
                  <input
                    type="text"
                    required
                    value={activeItem.slug}
                    onChange={(e) => setActiveItem({ ...activeItem, slug: e.target.value })}
                    className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={activeItem.price}
                    onChange={(e) => setActiveItem({ ...activeItem, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Discount Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={activeItem.discountPrice || ""}
                    onChange={(e) => setActiveItem({ ...activeItem, discountPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                    placeholder="None"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Type</label>
                  <select
                    value={activeItem.type}
                    onChange={(e) => setActiveItem({ ...activeItem, type: e.target.value as any })}
                    className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="LUT">LUT</option>
                    <option value="PRESET">Preset</option>
                    <option value="TEMPLATE">Template</option>
                    <option value="ASSET_PACK">Asset Pack</option>
                    <option value="PDF">PDF Guide</option>
                    <option value="ZIP">ZIP Archive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-text-muted mb-2">Status</label>
                  <select
                    value={activeItem.status}
                    onChange={(e) => setActiveItem({ ...activeItem, status: e.target.value as any })}
                    className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Thumbnail URL</label>
                <input
                  type="text"
                  required
                  value={activeItem.thumbnail}
                  onChange={(e) => setActiveItem({ ...activeItem, thumbnail: e.target.value })}
                  className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Download File URL</label>
                <input
                  type="text"
                  required
                  value={activeItem.productFileUrl}
                  onChange={(e) => setActiveItem({ ...activeItem, productFileUrl: e.target.value })}
                  className="w-full bg-surface-2 border border-border p-3 rounded-xl text-text focus:outline-none focus:border-accent transition-colors"
                  placeholder="https://r2-bucket.com/files/presets.zip"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Description</label>
                <textarea
                  required
                  value={activeItem.description}
                  onChange={(e) => setActiveItem({ ...activeItem, description: e.target.value })}
                  rows={4}
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
                  {submitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
