"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
}

interface PortfolioPreviewProps {
  items: PortfolioItem[];
}

export default function PortfolioPreview({ items }: PortfolioPreviewProps) {
  return (
    <section className="w-full py-24 bg-surface px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-display font-bold text-text mb-4">Selected Work</h2>
            <p className="text-text-muted text-lg max-w-xl">
              A curated selection of my recent 3D motion design and commercial projects.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link href="/portfolio" className="hidden md:inline-flex text-accent hover:text-accent-hover font-medium underline underline-offset-4">
              View All Projects
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/portfolio/${item.slug}`} className="group block relative w-full h-80 rounded-2xl overflow-hidden bg-surface-2 border border-border">
                {/* Image component used instead of img for optimization */}
                <Image 
                  src={item.thumbnail} 
                  alt={item.title} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-accent text-sm font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.category}</span>
                  <h3 className="text-white text-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/portfolio" className="inline-flex text-accent hover:text-accent-hover font-medium underline underline-offset-4">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
