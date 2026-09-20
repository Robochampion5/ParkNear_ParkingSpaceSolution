"use client";

import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'Renter', href: '/?role=Renter' },
    { label: 'Host', href: '/?role=Host' },
    { label: 'Admin', href: '/?role=Admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-14">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-deep-navy to-action-blue flex items-center justify-center shadow-md shadow-action-blue/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg md:text-xl font-extrabold text-deep-navy tracking-tight leading-none">
              ParkNear
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="px-4 py-2 rounded-xl text-sm font-medium text-deep-navy/80 hover:text-deep-navy hover:bg-deep-navy/[0.06] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            className="md:hidden w-10 h-10 rounded-xl bg-deep-navy/[0.05] flex items-center justify-center text-deep-navy hover:bg-deep-navy/[0.10] transition-colors active:scale-[0.95]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1 pt-2 border-t border-border/40">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 rounded-xl text-base font-medium text-deep-navy hover:bg-deep-navy/[0.06] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
