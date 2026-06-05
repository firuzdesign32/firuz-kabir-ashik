import prisma from "@/lib/prisma";
import ContactPageClient from "@/components/ContactPageClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact – Firuz Kabir Ashik",
  description: "Book a strategic consultation for free and get in touch for your next 3D motion graphics and design projects.",
};

export default async function ContactPage() {
  const rawSettings = await prisma.siteSettings.findMany();
  
  const settings = rawSettings.reduce((acc, cur) => {
    acc[cur.key] = cur.value;
    return acc;
  }, {} as Record<string, string>);

  return <ContactPageClient settings={settings} />;
}
