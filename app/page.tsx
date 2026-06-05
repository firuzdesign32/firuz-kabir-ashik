import prisma from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioPreview from '@/components/PortfolioPreview';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const rawSettings = await prisma.siteSettings.findMany();
  const settings = rawSettings.reduce((acc: Record<string, string>, cur: { key: string; value: string }) => {
    acc[cur.key] = cur.value;
    return acc;
  }, {} as Record<string, string>);

  const featuredPortfolio = await prisma.portfolio.findMany({
    where: { featured: true, status: 'PUBLISHED' },
    orderBy: { displayOrder: 'asc' },
    take: 6,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <HeroSection headline={settings['hero_headline']} subheadline={settings['hero_subheadline']} />
      <AboutSection 
        bio={settings['about_bio']}
        years={settings['about_years_exp']}
        projects={settings['about_projects_completed']}
        clients={settings['about_happy_clients']}
      />
      <ServicesSection />
      <PortfolioPreview items={featuredPortfolio} />
      <TestimonialsSection />
      <ContactSection email={settings['contact_email']} />
      <Footer 
        instagram={settings['social_instagram']} 
        behance={settings['social_behance']} 
      />
    </main>
  );
}
