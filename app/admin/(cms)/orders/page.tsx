"use client";

import { useState, useEffect } from "react";

interface OrderItem {
  id: string;
  customerName: string;
  customerEmail: string;
  items: any; // Json items details
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentId?: string;
  downloadToken?: string;
  createdAt: string;
}

export default function AdminOrdersManager() {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/orders"); // We can make a lightweight fetch, or fallback to mock if API returns 404
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      } else {
        // Fallback mock items
        setItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Orders & Sales</h1>
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading orders...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-xl text-text-muted">
          No orders found yet.
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-2 border-b border-border text-sm text-text-muted font-semibold uppercase tracking-wider">
                <th className="p-4">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Method</th>
                <th className="p-4">Status</th>
                <th className="p-4">Download Token</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border text-sm hover:bg-surface-2/30 transition-colors">
                  <td className="p-4 text-text-muted">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-text">{item.customerName}</div>
                    <div className="text-xs text-text-muted">{item.customerEmail}</div>
                  </td>
                  <td className="p-4 text-text font-medium">${item.totalAmount.toFixed(2)}</td>
                  <td className="p-4 text-text-muted uppercase text-xs">{item.paymentMethod}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.paymentStatus === "PAID" || item.paymentStatus === "completed"
                        ? "bg-green-500/10 text-green-500 border border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                    }`}>
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs text-text-muted">
                    {item.downloadToken || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
