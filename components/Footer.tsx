import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface FooterProps {
  instagram?: string;
  behance?: string;
}

export default function Footer({ instagram, behance }: FooterProps) {
  return (
    <footer className="w-full bg-bg py-12 px-6 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="text-text font-display font-bold text-xl tracking-wide">
          FIRUZ KABIR ASHIK
        </div>

        <div className="flex gap-8">
          <Link href="/portfolio" className="text-text-muted hover:text-accent transition-colors">Portfolio</Link>
          <Link href="/store" className="text-text-muted hover:text-accent transition-colors">Store</Link>
          <Link href="/contact" className="text-text-muted hover:text-accent transition-colors">Contact</Link>
          <Link href="/admin" className="text-text-muted hover:text-accent transition-colors">Client Login</Link>
        </div>

        <div className="flex items-center gap-4">
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center text-text-muted hover:text-accent hover:bg-surface border border-border transition-all">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          {behance && (
            <a href={behance} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center text-text-muted hover:text-accent hover:bg-surface border border-border transition-all">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

      </div>
      <div className="max-w-7xl mx-auto text-center mt-12 text-sm text-text-muted opacity-50">
        &copy; {new Date().getFullYear()} Firuz Kabir Ashik. All rights reserved.
      </div>
    </footer>
  );
}
