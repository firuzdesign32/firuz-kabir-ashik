"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Calendar, Trash2, X, Eye, MessageSquare, ExternalLink } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete message", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Customer Messages</h1>
          <p className="text-text-muted mt-1 text-sm">Review, respond, and manage inquiries from your portfolio website.</p>
        </div>
        <div className="bg-surface border border-border px-4 py-2 rounded-xl flex items-center gap-2 text-sm text-text-muted font-medium">
          <MessageSquare className="w-4 h-4 text-accent" />
          <span>Total Messages: {messages.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-text-muted flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <span>Loading messages...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl text-text-muted flex flex-col items-center gap-4 bg-surface-2/20">
          <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center border border-border">
            <MessageSquare className="w-8 h-8 text-text-muted" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text mb-1">No Inquiries Found</h3>
            <p className="text-sm">When clients submit your contact form, they will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-2 border-b border-border text-xs text-text-muted font-semibold uppercase tracking-wider">
                  <th className="p-4">Date</th>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {messages.map((msg) => (
                  <tr key={msg.id} className="text-sm hover:bg-surface-2/20 transition-colors">
                    <td className="p-4 whitespace-nowrap text-text-muted font-mono text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(msg.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-text whitespace-nowrap">{msg.name}</td>
                    <td className="p-4 text-xs space-y-1">
                      <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors">
                        <Mail className="w-3.5 h-3.5" /> {msg.email}
                      </a>
                      <a href={`tel:${msg.phone}`} className="flex items-center gap-1.5 text-text-muted hover:text-emerald-400 transition-colors">
                        <Phone className="w-3.5 h-3.5" /> {msg.phone}
                      </a>
                    </td>
                    <td className="p-4 font-medium text-text-muted max-w-xs truncate">{msg.subject}</td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedMessage(msg)}
                          className="p-2 bg-surface hover:bg-surface-2 border border-border hover:border-accent/30 text-text hover:text-accent rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="p-2 bg-surface hover:bg-surface-2 border border-border hover:border-red-500/30 text-text hover:text-red-500 rounded-lg transition-all"
                          title="Delete"
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
        </div>
      )}

      {/* Message View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6 backdrop-blur-sm">
          <div className="bg-surface border border-border w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-1">Message Details</span>
                <h3 className="text-lg font-bold text-text truncate max-w-md">{selectedMessage.subject}</h3>
              </div>
              <button 
                onClick={() => setSelectedMessage(null)} 
                className="text-text-muted hover:text-white hover:bg-surface-2 p-1.5 rounded-lg border border-transparent hover:border-border transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Contact Meta Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-2 border border-border p-4 rounded-xl">
                  <span className="text-xs text-text-muted font-medium block mb-1">Sender Name</span>
                  <span className="text-sm font-semibold text-text">{selectedMessage.name}</span>
                </div>
                <div className="bg-surface-2 border border-border p-4 rounded-xl">
                  <span className="text-xs text-text-muted font-medium block mb-1">Submitted Date</span>
                  <span className="text-sm font-medium text-text font-mono text-xs">
                    {new Date(selectedMessage.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
                <div className="bg-surface-2 border border-border p-4 rounded-xl">
                  <span className="text-xs text-text-muted font-medium block mb-1">Email Address</span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-sm font-semibold text-accent hover:underline flex items-center gap-1">
                    {selectedMessage.email} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="bg-surface-2 border border-border p-4 rounded-xl">
                  <span className="text-xs text-text-muted font-medium block mb-1">Phone Number</span>
                  <a href={`tel:${selectedMessage.phone}`} className="text-sm font-semibold text-emerald-400 hover:underline flex items-center gap-1">
                    {selectedMessage.phone} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div className="bg-surface-2 border border-border p-5 rounded-xl space-y-3">
                <span className="text-xs text-text-muted font-medium block">Message</span>
                <p className="text-text leading-relaxed text-sm whitespace-pre-wrap font-sans">{selectedMessage.message}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-border flex items-center justify-between bg-surface-2/30">
              <button
                type="button"
                onClick={() => handleDelete(selectedMessage.id)}
                className="bg-surface hover:bg-surface-2 hover:text-red-500 border border-border hover:border-red-500/30 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Delete Inquiry
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="bg-surface hover:bg-surface-2 border border-border px-5 py-2.5 rounded-xl text-sm font-medium text-text transition-colors"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" /> Reply by Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
