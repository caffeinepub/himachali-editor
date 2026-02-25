import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, Video } from 'lucide-react';
import LoginButton from './LoginButton';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'About', href: '#about' },
  ];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-1/90 backdrop-blur-md border-b border-gold-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-gold flex items-center justify-center shadow-gold">
              <Video className="w-5 h-5 text-background" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl text-gold tracking-widest">HIMACHALI</span>
              <span className="font-display text-sm text-foreground/70 tracking-[0.3em]">EDITOR</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-foreground/70 hover:text-gold transition-colors tracking-wide uppercase"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/dashboard"
              className="text-sm font-medium text-foreground/70 hover:text-gold transition-colors tracking-wide uppercase"
            >
              Dashboard
            </Link>
          </nav>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-4">
            <LoginButton />
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-foreground/70 hover:text-gold transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface-1 border-t border-gold-dim px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left text-sm font-medium text-foreground/70 hover:text-gold transition-colors tracking-wide uppercase py-2"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium text-foreground/70 hover:text-gold transition-colors tracking-wide uppercase py-2"
          >
            Dashboard
          </Link>
          <div className="pt-2">
            <LoginButton />
          </div>
        </div>
      )}
    </header>
  );
}
