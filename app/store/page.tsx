import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Download, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StorePage() {
  const [products, rawSettings] = await Promise.all([
    prisma.product.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.siteSettings.findMany(),
  ]);

  const settings = rawSettings.reduce((acc: Record<string, string>, cur: { key: string; value: string }) => {
    acc[cur.key] = cur.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 bg-bg flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex-1 mb-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider block mb-3 animate-fade-in">
              Digital Assets Store
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-6">
              Creator Store
            </h1>
            <p className="text-text-muted">
              Enhance your 3D motion design workflow with production-ready resources, materials, assets, and Redshift lighting presets.
            </p>
          </div>

          {/* Categories/Filters Grid */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {["All Items", "Presets", "Assets", "Materials", "Templates"].map((cat) => (
              <button
                key={cat}
                className={`px-6 py-2.5 rounded-full text-sm font-medium border transition-all ${
                  cat === "All Items"
                    ? "bg-accent border-accent text-white"
                    : "bg-surface-2 border-border text-text-muted hover:text-text hover:border-accent/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border rounded-2xl bg-surface-2">
              <ShoppingCart className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-40" />
              <h3 className="text-xl font-bold text-text mb-2">No products available</h3>
              <p className="text-text-muted max-w-sm mx-auto">
                Our digital asset store is being prepared. Check back shortly for premium 3D assets!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const discountAmount = product.discountPrice 
                  ? product.price - product.discountPrice 
                  : 0;
                
                return (
                  <div
                    key={product.id}
                    className="group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(8,102,255,0.06)]"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full h-64 bg-surface-2 overflow-hidden">
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Product Type Tag */}
                      <span className="absolute top-4 left-4 bg-[#0A0A0A]/80 backdrop-blur-sm border border-border px-3 py-1 rounded-full text-xs font-semibold text-accent uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        {product.type}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-text mb-3 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <div
                        className="text-text-muted text-sm line-clamp-3 mb-6 prose prose-invert"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />

                      <div className="mt-auto pt-6 border-t border-border flex items-center justify-between gap-4">
                        {/* Price */}
                        <div>
                          {product.discountPrice ? (
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-extrabold text-white">
                                ${product.discountPrice.toFixed(2)}
                              </span>
                              <span className="text-sm text-text-muted line-through">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-2xl font-extrabold text-white">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Buy/Download CTA Button */}
                        <Link
                          href={`/#contact`}
                          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                        >
                          <Download className="w-4 h-4" />
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Footer
          instagram={settings["social_instagram"]}
          behance={settings["social_behance"]}
        />
      </main>
    </>
  );
}
