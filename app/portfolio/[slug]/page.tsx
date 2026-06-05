import prisma from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolio = await prisma.portfolio.findUnique({
    where: { slug, status: 'PUBLISHED' }
  });

  if (!portfolio) {
    notFound();
  }

  const tags = (portfolio.tags as string[]) || [];
  const galleryImages = (portfolio.galleryImages as string[]) || [];

  return (
    <main className="min-h-screen bg-bg">
      {/* Hero Cover */}
      <div className="relative w-full h-[60vh] md:h-[80vh]">
        <Image 
          src={portfolio.coverImage} 
          alt={portfolio.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <div className="max-w-7xl mx-auto">
            <span className="text-accent font-semibold tracking-wider uppercase mb-4 block">{portfolio.category}</span>
            <h1 className="text-4xl md:text-7xl font-display font-bold text-text mb-6">{portfolio.title}</h1>
            <div className="flex flex-wrap gap-8 text-text-muted">
              {portfolio.clientName && (
                <div>
                  <span className="block text-sm uppercase tracking-wider mb-1">Client</span>
                  <strong className="text-text">{portfolio.clientName}</strong>
                </div>
              )}
              {portfolio.projectDate && (
                <div>
                  <span className="block text-sm uppercase tracking-wider mb-1">Date</span>
                  <strong className="text-text">{new Date(portfolio.projectDate).toLocaleDateString()}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-display font-bold text-text mb-8">About The Project</h2>
          <div 
            className="prose prose-invert prose-lg max-w-none text-text-muted"
            dangerouslySetInnerHTML={{ __html: portfolio.description }}
          />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-text mb-6 border-b border-border pb-4">Tags</h3>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag: string) => (
              <span key={tag} className="bg-surface-2 border border-border px-4 py-2 rounded-full text-sm text-text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((img: string, i: number) => (
              <div key={i} className={`relative w-full ${i % 3 === 0 ? 'md:col-span-2 h-[600px]' : 'h-[400px]'} rounded-2xl overflow-hidden bg-surface-2`}>
                <Image src={img} alt={`Gallery image ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
