import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, ShoppingBag, Settings, LogOut, FileText, Ticket, MessageSquare } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  if (!['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(session.user.role)) {
    return <div className="p-8 text-center text-red-500">Access Denied</div>;
  }

  return (
    <div className="flex h-screen bg-bg text-text">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold font-display text-accent">CMS Panel</h2>
          <p className="text-sm text-text-muted mt-1">{session.user.name}</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-white hover:bg-surface-2 rounded-lg transition-colors">
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/portfolio" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-white hover:bg-surface-2 rounded-lg transition-colors">
                <ImageIcon className="w-5 h-5" /> Portfolio
              </Link>
            </li>
            <li>
              <Link href="/admin/case-studies" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-white hover:bg-surface-2 rounded-lg transition-colors">
                <FileText className="w-5 h-5" /> Case Studies
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-white hover:bg-surface-2 rounded-lg transition-colors">
                <ShoppingBag className="w-5 h-5" /> Store Products
              </Link>
            </li>
            <li>
              <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-white hover:bg-surface-2 rounded-lg transition-colors">
                <Ticket className="w-5 h-5" /> Orders
              </Link>
            </li>
            <li>
              <Link href="/admin/messages" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-white hover:bg-surface-2 rounded-lg transition-colors">
                <MessageSquare className="w-5 h-5" /> Customer Messages
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-white hover:bg-surface-2 rounded-lg transition-colors">
                <Settings className="w-5 h-5" /> Site Settings
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-border">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-surface-2 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-bg p-8">
        {children}
      </main>
    </div>
  );
}
