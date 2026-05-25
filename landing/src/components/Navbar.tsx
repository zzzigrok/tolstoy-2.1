import React, { useEffect, useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import Github from './GithubIcon';

interface NavbarProps {
  setCurrentPage: (page: 'home' | 'docs') => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-white/10">
            <BookOpen className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white cursor-pointer" onClick={() => setCurrentPage('home')}>
            TOLSTOY<span className="text-cyan-400">AI</span>
          </span>
          <span className="ml-2 px-2.5 py-0.5 text-xs font-semibold bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">
            v2.1
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#architecture"
            onClick={(e) => handleAnchorClick(e, 'architecture')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Архитектура
          </a>
          <a
            href="#audit"
            onClick={(e) => handleAnchorClick(e, 'audit')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Аудит
          </a>
          <button
            onClick={() => setCurrentPage('docs')}
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors bg-transparent border-none cursor-pointer"
          >
            Документация
          </button>
          <a
            href="https://github.com/zzzigrok/tolstoy-2.1"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 text-sm font-medium text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-400 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-white/10 px-6 py-4 flex flex-col gap-4 backdrop-blur-xl">
          <a
            href="#architecture"
            onClick={(e) => handleAnchorClick(e, 'architecture')}
            className="text-sm font-medium text-slate-300 hover:text-white py-1 block"
          >
            Архитектура
          </a>
          <a
            href="#audit"
            onClick={(e) => handleAnchorClick(e, 'audit')}
            className="text-sm font-medium text-slate-300 hover:text-white py-1 block"
          >
            Аудит
          </a>
          <button
            onClick={() => {
              setCurrentPage('docs');
              setMobileMenuOpen(false);
            }}
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 text-left py-1 block w-full bg-transparent border-none cursor-pointer"
          >
            Документация
          </button>
          <a
            href="https://github.com/zzzigrok/tolstoy-2.1"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 text-sm font-medium text-white"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
