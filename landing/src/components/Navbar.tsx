import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Menu,
  X,
  ArrowUpRight,
  Layers,
  Activity,
  Sparkles,
} from 'lucide-react';
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 py-3 sm:py-4 ${
        scrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-6'
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto rounded-2xl md:rounded-3xl border transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
          scrolled || mobileMenuOpen
            ? 'bg-slate-950/85 backdrop-blur-2xl border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
            : 'bg-slate-950/45 backdrop-blur-xl border-white/5 hover:border-white/10'
        }`}
      >
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-transparent border border-white/10 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300">
            <BookOpen className="w-5 h-5 text-cyan-400 group-hover:scale-105 transition-transform" />
          </div>

          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-sans">
            TOLSTOY<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">AI</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <a
            href="#architecture"
            onClick={(e) => handleAnchorClick(e, 'architecture')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
          >
            <Layers className="w-4 h-4 text-cyan-400/80" />
            <span>Архитектура</span>
          </a>

          <a
            href="#audit"
            onClick={(e) => handleAnchorClick(e, 'audit')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
          >
            <Activity className="w-4 h-4 text-purple-400/80" />
            <span>Лингво-Аудит</span>
          </a>

          <button
            onClick={() => setCurrentPage('docs')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Документация</span>
          </button>
        </div>

        {/* Right Action Group */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com/zzzigrok/tolstoy-2.1"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 text-xs sm:text-sm font-medium text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] group"
          >
            <Github className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={() => setCurrentPage('docs')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
          >
            <span>Читать Docs</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 rounded-2xl bg-slate-950/95 border border-white/10 p-5 backdrop-blur-2xl shadow-2xl flex flex-col gap-3">
          <a
            href="#architecture"
            onClick={(e) => handleAnchorClick(e, 'architecture')}
            className="flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Архитектура</span>
          </a>

          <a
            href="#audit"
            onClick={(e) => handleAnchorClick(e, 'audit')}
            className="flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5"
          >
            <Activity className="w-4 h-4 text-purple-400" />
            <span>Лингво-Аудит</span>
          </a>

          <button
            onClick={() => {
              setCurrentPage('docs');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 text-left w-full cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Документация</span>
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://github.com/zzzigrok/tolstoy-2.1"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Репозиторий</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
