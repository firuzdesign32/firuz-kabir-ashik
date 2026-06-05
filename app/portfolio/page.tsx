import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const [portfolios, rawSettings] = await Promise.all([
    prisma.portfolio.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { displayOrder: 'asc' },
    }),
    prisma.siteSettings.findMany()
  ]);

  const settings = rawSettings.reduce((acc: Record<string, string>, cur: { key: string; value: string }) => {
    acc[cur.key] = cur.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 bg-bg flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex-1">
          <h1 className="text-5xl font-display font-bold text-text mb-6">Portfolio</h1>
          <p className="text-xl text-text-muted mb-16 max-w-2xl">
            Explore my latest 3D motion design projects, commercial work, and abstract art.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((item: any) => (
              <Link key={item.id} href={`/portfolio/${item.slug}`} className="group block relative w-full h-96 rounded-2xl overflow-hidden bg-surface-2 border border-border">
                <Image 
                  src={item.thumbnail} 
                  alt={item.title} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-accent font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.category}</span>
                  <h3 className="text-white text-2xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h3>
                  <div className="mt-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    <span className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">View Project</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Footer 
          instagram={settings['social_instagram']} 
          behance={settings['social_behance']} 
        />
      </main>
    </>
  );
}
