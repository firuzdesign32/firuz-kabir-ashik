import prisma from '@/lib/prisma';


export default async function DashboardPage() {
  const [projectCount, productCount, orderCount] = await Promise.all([
    prisma.portfolio.count(),
    prisma.product.count(),
    prisma.order.count(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface border border-border p-6 rounded-xl">
          <h3 className="text-text-muted text-sm uppercase tracking-wider mb-2">Total Projects</h3>
          <p className="text-4xl font-display font-bold text-white">{projectCount}</p>
        </div>
        
        <div className="bg-surface border border-border p-6 rounded-xl">
          <h3 className="text-text-muted text-sm uppercase tracking-wider mb-2">Digital Products</h3>
          <p className="text-4xl font-display font-bold text-white">{productCount}</p>
        </div>
        
        <div className="bg-surface border border-border p-6 rounded-xl">
          <h3 className="text-text-muted text-sm uppercase tracking-wider mb-2">Total Orders</h3>
          <p className="text-4xl font-display font-bold text-white">{orderCount}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {/* Table placeholder */}
        <div className="p-6 text-text-muted text-center">
          No recent orders to display.
        </div>
      </div>
    </div>
  );
}
