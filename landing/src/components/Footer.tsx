import React from 'react';
import {
  BookOpen,
  ArrowUp,
  Cpu,
  Layers,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import GithubIcon from './GithubIcon';

interface FooterProps {
  setCurrentPage?: (page: 'home' | 'docs') => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDocs = (e: React.MouseEvent) => {
    e.preventDefault();
    if (setCurrentPage) {
      setCurrentPage('docs');
    } else {
      window.location.hash = '#/docs';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/5 bg-slate-950/80 backdrop-blur-2xl pt-20 pb-12 overflow-hidden">
      {/* Decorative top lighting and gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/5 blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/5">
          {/* Col 1: Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className="flex items-center gap-3 cursor-pointer select-none group inline-flex"
              onClick={scrollToTop}
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-transparent border border-white/10 group-hover:border-cyan-400/40 transition-colors">
                <BookOpen className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-extrabold text-white tracking-wider text-lg">
                TOLSTOY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">AI</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Легковесный Decoder-only Transformer, воссоздающий глубину и многосложность классической русской прозы на чистом PyTorch без тяжелых зависимостей.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Python 3.10+</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">PyTorch 2.x</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">MIT License</span>
            </div>
          </div>

          {/* Col 2: Архитектура (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Архитектура Модели
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="#architecture"
                  onClick={(e) => scrollToSection(e, 'architecture')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 transition-colors" />
                  <span>Causal Multi-Head Attention</span>
                </a>
              </li>
              <li>
                <a
                  href="#architecture"
                  onClick={(e) => scrollToSection(e, 'architecture')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 transition-colors" />
                  <span>Pre-LayerNorm & Residuals</span>
                </a>
              </li>
              <li>
                <a
                  href="#architecture"
                  onClick={(e) => scrollToSection(e, 'architecture')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 transition-colors" />
                  <span>Position-wise FFN (3072 dim)</span>
                </a>
              </li>
              <li>
                <a
                  href="#architecture"
                  onClick={(e) => scrollToSection(e, 'architecture')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 transition-colors" />
                  <span>Посимвольная токенизация</span>
                </a>
              </li>
              <li>
                <a
                  href="#architecture"
                  onClick={(e) => scrollToSection(e, 'architecture')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 transition-colors" />
                  <span>FlashAttention & SDPA</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Инструменты & CLI (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              Инструменты & CLI
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="#audit"
                  onClick={(e) => scrollToSection(e, 'audit')}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-400/60 group-hover:bg-purple-400 transition-colors" />
                  <span>Heuristic Syntax Engine</span>
                </a>
              </li>
              <li>
                <a
                  href="#audit"
                  onClick={(e) => scrollToSection(e, 'audit')}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-400/60 group-hover:bg-purple-400 transition-colors" />
                  <span>Оценка лексики (TTR Метрики)</span>
                </a>
              </li>
              <li>
                <button
                  onClick={openDocs}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1.5 group text-left cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-400/60 group-hover:bg-purple-400 transition-colors" />
                  <span>Rich Terminal Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openDocs}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1.5 group text-left cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-400/60 group-hover:bg-purple-400 transition-colors" />
                  <span>Пайплайн очистки датасетов</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openDocs}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1.5 group text-left cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-400/60 group-hover:bg-purple-400 transition-colors" />
                  <span>Экспорт чекпоинтов PyTorch</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Документация (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Документация
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={openDocs}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Быстрый старт</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openDocs}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Спецификация MODEL</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openDocs}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Подготовка корпуса</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openDocs}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Отладка и инференс</span>
                </button>
              </li>
              <li className="pt-2">
                <a
                  href="https://github.com/zzzigrok/tolstoy-2.1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-all border border-white/10 text-[11px] group"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repo</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Hardware Platform Badges */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500 text-[11px] uppercase tracking-wider">Поддержка платформ:</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-cyan-300">
              NVIDIA CUDA (FlashAttn)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-purple-300">
              Apple Silicon (MPS Metal)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300">
              CPU (AVX2 / MKL)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-amber-300">
              Intel XPU
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold cursor-pointer group"
            >
              <span>Наверх</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Rights */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © 2026 Tolstoy AI Project. Лицензия MIT. Создано для исследователей и ценителей русской классики.
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Character-Level</span>
            <span>•</span>
            <span>Zero-Dependency</span>
            <span>•</span>
            <span>Heuristic Syntax</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
