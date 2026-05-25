import React from 'react';
import { Sparkles, Brain } from 'lucide-react';
import GithubIcon from './GithubIcon';
import GlassCard from './GlassCard';

const AnimatedLogo: React.FC = () => (
  <svg viewBox="0 0 512 512" className="w-full h-full max-w-[400px] max-h-[400px] drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]">
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

const Hero: React.FC = () => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-cyan-300 text-sm font-medium mb-8 fade-up scan-target">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Core Engine 2.1 — Посимвольная генерация
          </div>

          <h1
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mb-6 tracking-tight leading-[1.1] fade-up scan-target"
            style={{ animationDelay: '0.1s' }}
          >
            Искусство Кода <br /> и Слова
          </h1>

          <p
            className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl fade-up scan-target"
            style={{ animationDelay: '0.2s' }}
          >
            Легковесный Decoder-only Transformer, воссоздающий глубину классической русской литературы с математической точностью. Работает на CUDA, MPS и CPU.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 fade-up" style={{ animationDelay: '0.3s' }}>
            <a
              href="#architecture"
              onClick={(e) => handleAnchorClick(e, 'architecture')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 font-semibold transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-md group"
            >
              <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Изучить архитектуру
            </a>
            <a
              href="https://github.com/zzzigrok/tolstoy-2.1"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <GithubIcon className="w-5 h-5" />
              Репозиторий
            </a>
          </div>
        </div>

        <div className="relative flex justify-center items-center z-10 fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-[3rem] blur-3xl -z-10" />
          <GlassCard className="p-12 w-full max-w-md aspect-square flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <AnimatedLogo />
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default Hero;
