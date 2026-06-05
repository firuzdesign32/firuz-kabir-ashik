import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, Phone, ExternalLink, CheckCircle2, MessageSquare, Sparkles, ArrowRight, Video } from "lucide-react";

export const dynamic = "force-dynamic";

function renderVideoPlayer(url: string) {
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be") || url.includes("embed");
  const isVimeo = url.includes("vimeo.com");
  
  if (isYouTube) {
    let embedUrl = url;
    if (url.includes("watch?v=")) {
      embedUrl = url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    }
    // Make sure it has parameters
    if (!embedUrl.includes("?")) {
      embedUrl += "?rel=0";
    }
    return (
      <iframe
        src={embedUrl}
        className="w-full h-full border-0 absolute inset-0 rounded-2xl shadow-xl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Project Video Showcase"
      />
    );
  } else if (isVimeo) {
    return (
      <iframe
        src={url}
        className="w-full h-full border-0 absolute inset-0 rounded-2xl shadow-xl"
        allowFullScreen
        title="Project Video Showcase"
      />
    );
  } else {
    return (
      <video
        src={url}
        controls
        className="w-full h-full object-cover absolute inset-0 rounded-2xl bg-[#0d0d0d] shadow-xl"
      />
    );
  }
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const [portfolio, rawSettings] = await Promise.all([
    prisma.portfolio.findUnique({
      where: { slug, status: "PUBLISHED" }
    }),
    prisma.siteSettings.findMany()
  ]);

  if (!portfolio) {
    notFound();
  }

  const settings = rawSettings.reduce((acc: Record<string, string>, cur: { key: string; value: string }) => {
    acc[cur.key] = cur.value;
    return acc;
  }, {} as Record<string, string>);

  const tags = (portfolio.tags as string[]) || [];
  const galleryImages = (portfolio.galleryImages as string[]) || [];
  const videos = (portfolio.videos as string[]) || [];

  // Fetch 3 related projects
  const relatedPortfolios = await prisma.portfolio.findMany({
    where: {
      status: "PUBLISHED",
      NOT: { id: portfolio.id }
    },
    orderBy: { displayOrder: "asc" },
    take: 3
  });

  const email = settings["contact_email"] || "info@firuzkabirashik.com";
  const whatsapp = "+8801733734776";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg flex flex-col pt-16">
        
        {/* Banner Section */}
        <section className="relative w-full h-[35vh] md:h-[50vh] flex items-end overflow-hidden bg-[#0F0F0F]">
          <div className="absolute inset-0 z-0">
            <Image 
              src={portfolio.coverImage} 
              alt={portfolio.title}
              fill
              className="object-cover opacity-20 blur-[2px]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/65 to-transparent" />
          </div>
          <div className="max-w-7xl mx-auto w-full px-6 pb-12 relative z-10 flex flex-col gap-3">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase bg-accent/10 px-4 py-1 w-fit rounded-full">
              {portfolio.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-text max-w-4xl leading-tight">
              {portfolio.title}
            </h1>
          </div>
        </section>

        {/* Main Showcase Video */}
        {videos.length > 0 && (
          <section className="max-w-7xl mx-auto w-full px-6 -mt-8 relative z-20">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#0d0d0d] border border-border/60 shadow-2xl">
              {renderVideoPlayer(videos[0])}
            </div>
          </section>
        )}

        {/* Details Grid: Left metadata/contacts, Right Description/Milestones */}
        <section className="max-w-7xl mx-auto w-full px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Metadata / Contacts */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {/* Meta Data Box */}
            <div className="bg-surface-2 border border-border/80 rounded-2xl p-6 space-y-5 shadow-sm">
              <h3 className="text-lg font-bold text-text border-b border-border/60 pb-3 font-display">Project Info</h3>
              <div className="space-y-4">
                {portfolio.clientName && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Client Name</span>
                    <strong className="text-text font-medium text-sm">{portfolio.clientName}</strong>
                  </div>
                )}
                {portfolio.projectDate && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Release Date</span>
                    <strong className="text-text font-medium text-sm">
                      {new Date(portfolio.projectDate).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
                    </strong>
                  </div>
                )}
                {tags.length > 0 && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-text-muted block mb-2">Deliverables</span>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="text-xs bg-bg border border-border px-2.5 py-1 rounded-full text-text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Contacts Link */}
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Contact For Your Project</h4>
              <p className="text-xs text-text-muted leading-relaxed">Interested in creating similar high-converting 3D visuals for your brand? Reach out now.</p>
              <div className="flex flex-col gap-2">
                <a 
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-sm font-semibold transition-all shadow-md"
                >
                  <Phone className="w-4 h-4" /> Message on WhatsApp
                </a>
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center justify-center gap-2 bg-surface-2 hover:bg-surface border border-border text-text py-3 rounded-xl text-sm font-semibold transition-all"
                >
                  <Mail className="w-4 h-4" /> Send Email Inquiry
                </a>
              </div>
            </div>
          </div>

          {/* Right Description / Workflows */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-text">Overview & Objectives</h2>
              <div 
                className="prose prose-invert prose-lg max-w-none text-text-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: portfolio.description }}
              />
            </div>

            {/* Workflow Milestones checklist */}
            <div className="bg-surface-2 border border-border/80 rounded-3xl p-8 space-y-6 shadow-md">
              <div>
                <span className="text-accent text-xs font-semibold uppercase tracking-wider block mb-1">Production Details</span>
                <h3 className="text-2xl font-display font-bold text-text">How This Project Was Crafted</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Project Research", desc: "Understanding the product specifications, competitor benchmarks, and target demographics." },
                  { title: "Storyboarding", desc: "Plotting camera moves, lighting changes, pacing, and visual transitions sequentially." },
                  { title: "Animatic Pre-Vis", desc: "Assembling a low-res structural draft to align on rhythm, key frames, and composition." },
                  { title: "Final Rendering & Compositing", desc: "Setting high-fidelity textures, complex lighting pipelines, and post VFX polish." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-3 bg-bg border border-border p-4 rounded-2xl hover:border-accent/20 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-text mb-1">{step.title}</h4>
                      <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Videos Grid */}
        {videos.length > 1 && (
          <section className="bg-surface py-20 px-6 border-t border-b border-border/60">
            <div className="max-w-7xl mx-auto w-full space-y-12">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-accent text-sm font-semibold uppercase tracking-wider block mb-2">Process Rehearsal</span>
                <h3 className="text-3xl font-display font-bold text-text">Behind the Scenes & Alternates</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.slice(1).map((vid, i) => (
                  <div key={i} className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#0d0d0d] border border-border shadow-lg">
                    {renderVideoPlayer(vid)}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Platform Marketing Checklist */}
        <section className="max-w-7xl mx-auto w-full px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider block">Marketing Distribution</span>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-text">Where You Can Use This Kind of Video</h3>
            <p className="text-text-muted leading-relaxed">High-fidelity 3D animations are powerful visual tools that scale marketing performance across multiple distribution funnels.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Social Media Reels & Posts",
              "YouTube & Meta Ad Campaigns",
              "Website Hero sections",
              "Email Newsletter content",
              "E-commerce product showcases",
              "LinkedIn presentation uploads",
              "Kickstarter crowdfunding pages",
              "Event background mockups"
            ].map((useCase) => (
              <div key={useCase} className="flex items-center gap-3 bg-surface-2 border border-border/80 px-5 py-4 rounded-xl">
                <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm text-text font-medium">{useCase}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery / Mockups Grid */}
        {galleryImages.length > 0 && (
          <section className="bg-surface py-20 px-6 border-t border-border/60">
            <div className="max-w-7xl mx-auto w-full space-y-12">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-accent text-sm font-semibold uppercase tracking-wider block mb-2">High Resolution Renders</span>
                <h3 className="text-3xl font-display font-bold text-text">Visual Showcase & Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {galleryImages.map((img, i) => (
                  <div 
                    key={i} 
                    className={`relative w-full ${i % 3 === 0 ? "md:col-span-2 h-[500px] md:h-[650px]" : "h-[350px] md:h-[450px]"} rounded-2xl overflow-hidden bg-surface border border-border group`}
                  >
                    <Image 
                      src={img} 
                      alt={`Gallery view ${i + 1}`} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-102"
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <section className="w-full bg-[#070707] py-24 px-6 relative border-t border-border/60 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase bg-accent/10 px-4 py-1.5 rounded-full">
              Get Started
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text leading-tight max-w-3xl mx-auto">
              Ready to make your product stand out? Let’s create 3D content that converts.
            </h2>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              Book your strategic consultation call now or write a detailed message describing your campaign parameters.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-accent/25 flex items-center gap-2 group w-full sm:w-auto justify-center"
              >
                Book A Strategic Meeting <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Projects Grid */}
        {relatedPortfolios.length > 0 && (
          <section className="bg-bg py-24 px-6 border-t border-border/60">
            <div className="max-w-7xl mx-auto w-full space-y-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-accent text-sm font-semibold uppercase tracking-wider block mb-2">Design Gallery</span>
                  <h3 className="text-3xl font-display font-bold text-text">Other Creative Works</h3>
                </div>
                <Link href="/portfolio" className="text-accent hover:text-accent-hover text-sm font-bold flex items-center gap-1.5 transition-colors">
                  Explore Full Portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPortfolios.map((item) => (
                  <Link 
                    key={item.id} 
                    href={`/portfolio/${item.slug}`} 
                    className="group block relative w-full h-80 rounded-2xl overflow-hidden bg-surface-2 border border-border/80 hover:border-accent/40 transition-all duration-300"
                  >
                    <Image 
                      src={item.thumbnail} 
                      alt={item.title} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-accent text-xs font-semibold mb-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        {item.category}
                      </span>
                      <h4 className="text-white text-lg font-bold transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer 
          instagram={settings["social_instagram"]} 
          behance={settings["social_behance"]} 
        />
      </main>
    </>
  );
}
