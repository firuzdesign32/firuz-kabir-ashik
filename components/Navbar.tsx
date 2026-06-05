"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu items based on the existing site firuzkabirashik.com
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Shop", href: "/store" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-display font-bold text-text tracking-wide hover:opacity-90 transition-opacity"
        >
          FIRUZ KABIR <span className="text-accent">ASHIK</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href.split("#")[0]) && item.href !== "/";
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`text-base font-semibold tracking-wide transition-colors hover:text-accent ${
                      isActive ? "text-accent font-bold" : "text-text/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all hover:scale-105 inline-block"
          >
            Book A Meeting
          </Link>
        </div>

        {/* Mobile Menu Toggler */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text hover:text-accent focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-bg z-40 border-t border-border flex flex-col p-6 animate-fade-in">
          <nav className="flex-1 mb-8">
            <ul className="flex flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-display font-semibold text-text hover:text-accent transition-colors block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="pb-8">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-accent hover:bg-accent-hover text-white py-4 rounded-full font-medium block transition-all"
            >
              Book A Meeting
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
