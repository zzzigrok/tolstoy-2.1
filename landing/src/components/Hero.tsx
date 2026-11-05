import React from 'react';
import { Sparkles, Brain, ArrowRight, Terminal } from 'lucide-react';
import GithubIcon from './GithubIcon';
import SpotlightCard from './SpotlightCard';

const AnimatedLogo: React.FC = () => (
  <svg viewBox="0 0 512 512" className="w-full h-full max-w-[380px] max-h-[380px] drop-shadow-[0_0_35px_rgba(34,211,238,0.25)]">
    <defs>
      <linearGradient id="netGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="50%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#d8b4fe" />
      </linearGradient>
      <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g className="logo-float">
      <path
        d="M 130 380 L 105 345 L 90 290 M 175 335 L 135 305 L 110 230 M 220 285 L 175 250 L 145 175 M 265 235 L 220 195 L 195 125 M 310 185 L 275 145 L 255 85 M 350 140 L 325 105 L 310 60 M 385 105 L 365 75 M 105 345 L 135 305 L 175 250 L 220 195 L 275 145 L 325 105 L 365 75 M 90 290 L 110 230 L 145 175 L 195 125 L 255 85 L 310 60 M 310 60 L 365 75 M 365 75 L 400 100 M 130 380 L 135 305 M 175 335 L 175 250 M 220 285 L 220 195 M 265 235 L 275 145 M 310 185 L 325 105 M 350 140 L 365 75 M 385 105 L 400 100 M 105 345 L 110 230 M 135 305 L 145 175 M 175 250 L 195 125 M 220 195 L 255 85 M 275 145 L 310 60 M 325 105 L 310 60 M 90 290 L 80 280 M 110 230 L 95 210 M 145 175 L 130 150 M 195 125 L 180 100 M 255 85 L 235 65 M 80 280 L 95 210 L 130 150 L 180 100 L 235 65 L 310 60 M 80 280 L 110 230 M 95 210 L 145 175 M 130 150 L 195 125 M 180 100 L 255 85 M 235 65 L 310 60"
        stroke="url(#netGrad)"
        strokeWidth="1.25"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
        className="path-draw"
      />
      <path
        d="M 400,100 C 420,130 435,170 425,200 L 405,190 L 420,215 C 440,250 420,280 400,310 L 360,290 L 380,325 C 330,400 220,430 90,430 C 170,380 260,280 400,100 Z"
        fill="#ffffff"
      />
      <path
        d="M 65,455 L 90,430 C 170,380 260,280 400,100"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        className="path-draw"
      />
      <g fill="#22d3ee" filter="url(#cyanGlow)">
        <circle cx="130" cy="380" r="3.5" className="node-pulse" />
        <circle cx="175" cy="335" r="3.5" className="node-pulse" style={{ animationDelay: '0.2s' }} />
        <circle cx="220" cy="285" r="3.5" className="node-pulse" style={{ animationDelay: '0.4s' }} />
        <circle cx="265" cy="235" r="3.5" className="node-pulse" style={{ animationDelay: '0.6s' }} />
        <circle cx="310" cy="185" r="3.5" className="node-pulse" style={{ animationDelay: '0.8s' }} />
        <circle cx="350" cy="140" r="3.5" className="node-pulse" style={{ animationDelay: '1.0s' }} />
        <circle cx="385" cy="105" r="3.5" className="node-pulse" style={{ animationDelay: '1.2s' }} />
        <circle cx="105" cy="345" r="2.5" className="node-pulse" style={{ animationDelay: '1.4s' }} />
        <circle cx="135" cy="305" r="2.5" className="node-pulse" style={{ animationDelay: '1.6s' }} />
        <circle cx="175" cy="250" r="2.5" className="node-pulse" style={{ animationDelay: '1.8s' }} />
        <circle cx="220" cy="195" r="2.5" className="node-pulse" style={{ animationDelay: '2.0s' }} />
        <circle cx="275" cy="145" r="2.5" className="node-pulse" style={{ animationDelay: '2.2s' }} />
        <circle cx="325" cy="105" r="2.5" className="node-pulse" style={{ animationDelay: '2.4s' }} />
        <circle cx="365" cy="75" r="2.5" className="node-pulse" style={{ animationDelay: '2.6s' }} />
        <circle cx="400" cy="100" r="2" />
      </g>
    </g>
  </svg>
);

const metrics = [
  { value: '12.8M', label: 'Весов Модели', desc: 'Компактный Decoder' },
  { value: '256', label: 'Размер Контекста', desc: 'Character-level токены' },
  { value: '12', label: 'Transformer Блоков', desc: 'Multi-Head Attention' },
  { value: 'CUDA • MPS • CPU', label: 'Нативная Поддержка', desc: 'Zero-dep PyTorch' },
];

const Hero: React.FC = () => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Subtle top spotlight glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Block (7 cols) */}
          <div className="lg:col-span-7 text-left z-10">
            {/* Shimmer Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide mb-8 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-xl group hover:border-cyan-400 transition-all cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tolstoy Engine 2.1 — Causal Character Transformer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 mb-6 tracking-tight leading-[1.08]">
              Искусство Кода <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                и Русского Слова
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl font-normal">
              Легковесный Decoder-only Transformer на чистом PyTorch, воссоздающий глубину классической литературы с математической строгостью. Оптимизирован для видеокарт NVIDIA, чипов Apple Silicon и обычных процессоров.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#architecture"
                onClick={(e) => handleAnchorClick(e, 'architecture')}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] group cursor-pointer text-sm"
              >
                <Brain className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>Изучить архитектуру</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://github.com/zzzigrok/tolstoy-2.1"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-white/20 text-white font-semibold transition-all flex items-center justify-center gap-2.5 backdrop-blur-xl text-sm hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]"
              >
                <GithubIcon className="w-4 h-4 text-slate-300" />
                <span>GitHub Репозиторий</span>
              </a>
            </div>
          </div>

          {/* Right Visualizer Block (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center items-center z-10">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-600/15 to-transparent rounded-[3rem] blur-3xl -z-10 transform scale-95" />

            <SpotlightCard
              className="p-8 sm:p-10 w-full max-w-md aspect-square flex flex-col items-center justify-center relative overflow-hidden"
              spotlightColor="rgba(34, 211, 238, 0.2)"
            >
              <div className="w-full h-full flex items-center justify-center">
                <AnimatedLogo />
              </div>

              {/* Status pill under logo */}
              <div className="mt-4 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-white/10 flex items-center gap-2 text-xs font-mono text-slate-300 backdrop-blur-md">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>tolstoy --generate --temp 0.8</span>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Metrics Grid Strip */}
        <div className="mt-20 pt-10 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md hover:border-cyan-500/30 transition-all group"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 tracking-tight font-mono">
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-1 group-hover:text-cyan-400 transition-colors">
                  {m.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
