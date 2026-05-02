import React, { useEffect, useState } from 'react';
import { 
  Brain, 
  Terminal, 
  Cpu, 
  Activity, 
  Github, 
  Code2, 
  Database, 
  Sparkles, 
  ChevronRight, 
  BookOpen 
} from 'lucide-react';

// --- Изолированные CSS анимации для фона и SVG ---
const InjectStyles = () => (
  <style>
    {`
      @keyframes float-orb1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(5vw, 10vh) scale(1.1); }
      }
      @keyframes float-orb2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-5vw, -10vh) scale(1.2); }
      }
      .orb-1 { animation: float-orb1 20s ease-in-out infinite; }
      .orb-2 { animation: float-orb2 25s ease-in-out infinite reverse; }
      
      @keyframes drawPath {
        to { stroke-dashoffset: 0; }
      }
      @keyframes nodePulse {
        from { r: 1.5; opacity: 0.5; filter: drop-shadow(0 0 2px #22d3ee); }
        to { r: 3.5; opacity: 1; filter: drop-shadow(0 0 10px #22d3ee); }
      }
      @keyframes logoFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(2deg); }
      }
      .path-draw {
        stroke-dasharray: 400;
        stroke-dashoffset: 400;
        animation: drawPath 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      .node-pulse {
        animation: nodePulse 2s infinite alternate;
      }
      .logo-float {
        animation: logoFloat 6s ease-in-out infinite;
      }

      /* Гладкий скролл */
      html { scroll-behavior: smooth; }
      
      /* Анимация появления контента */
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-up {
        opacity: 0;
        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `}
  </style>
);

// --- Компоненты UI (Glassmorphism) ---
const GlassCard = ({ children, className = "", delay = "0s" }) => (
  <div 
    className={`bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-500 rounded-3xl ${className} fade-up`}
    style={{ animationDelay: delay }}
  >
    {children}
  </div>
);

const BackgroundOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020617]">
    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen orb-1" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen orb-2" />
    <div className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
  </div>
);

// --- Кастомный SVG Логотип (Перо + Нейросеть) ---
const AnimatedLogo = () => (
  <svg viewBox="0 0 512 512" className="w-full h-full max-w-[400px] max-h-[400px] drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]">
    <defs>
      <linearGradient id="netGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#a855f7" />
        <stop offset="50%" stop-color="#c084fc" />
        <stop offset="100%" stop-color="#d8b4fe" />
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
      <path d="M 130 380 L 105 345 L 90 290 M 175 335 L 135 305 L 110 230 M 220 285 L 175 250 L 145 175 M 265 235 L 220 195 L 195 125 M 310 185 L 275 145 L 255 85 M 350 140 L 325 105 L 310 60 M 385 105 L 365 75 M 105 345 L 135 305 L 175 250 L 220 195 L 275 145 L 325 105 L 365 75 M 90 290 L 110 230 L 145 175 L 195 125 L 255 85 L 310 60 M 310 60 L 365 75 M 365 75 L 400 100 M 130 380 L 135 305 M 175 335 L 175 250 M 220 285 L 220 195 M 265 235 L 275 145 M 310 185 L 325 105 M 350 140 L 365 75 M 385 105 L 400 100 M 105 345 L 110 230 M 135 305 L 145 175 M 175 250 L 195 125 M 220 195 L 255 85 M 275 145 L 310 60 M 325 105 L 310 60 M 90 290 L 80 280 M 110 230 L 95 210 M 145 175 L 130 150 M 195 125 L 180 100 M 255 85 L 235 65 M 80 280 L 95 210 L 130 150 L 180 100 L 235 65 L 310 60 M 80 280 L 110 230 M 95 210 L 145 175 M 130 150 L 195 125 M 180 100 L 255 85 M 235 65 L 310 60" stroke="url(#netGrad)" stroke-width="1.25" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" className="path-draw" />
      <path d="M 400,100 C 420,130 435,170 425,200 L 405,190 L 420,215 C 440,250 420,280 400,310 L 360,290 L 380,325 C 330,400 220,430 90,430 C 170,380 260,280 400,100 Z" fill="#ffffff" />
      <path d="M 65,455 L 90,430 C 170,380 260,280 400,100" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none" className="path-draw" />
      <g fill="#22d3ee" filter="url(#cyanGlow)">
        <circle cx="130" cy="380" r="3.5" className="node-pulse" />
        <circle cx="175" cy="335" r="3.5" className="node-pulse" style={{animationDelay: '0.2s'}} />
        <circle cx="220" cy="285" r="3.5" className="node-pulse" style={{animationDelay: '0.4s'}} />
        <circle cx="265" cy="235" r="3.5" className="node-pulse" style={{animationDelay: '0.6s'}} />
        <circle cx="310" cy="185" r="3.5" className="node-pulse" style={{animationDelay: '0.8s'}} />
        <circle cx="350" cy="140" r="3.5" className="node-pulse" style={{animationDelay: '1.0s'}} />
        <circle cx="385" cy="105" r="3.5" className="node-pulse" style={{animationDelay: '1.2s'}} />
        <circle cx="105" cy="345" r="2.5" className="node-pulse" style={{animationDelay: '1.4s'}} />
        <circle cx="135" cy="305" r="2.5" className="node-pulse" style={{animationDelay: '1.6s'}} />
        <circle cx="175" cy="250" r="2.5" className="node-pulse" style={{animationDelay: '1.8s'}} />
        <circle cx="220" cy="195" r="2.5" className="node-pulse" style={{animationDelay: '2.0s'}} />
        <circle cx="275" cy="145" r="2.5" className="node-pulse" style={{animationDelay: '2.2s'}} />
        <circle cx="325" cy="105" r="2.5" className="node-pulse" style={{animationDelay: '2.4s'}} />
        <circle cx="365" cy="75" r="2.5" className="node-pulse" style={{animationDelay: '2.6s'}} />
        <circle cx="400" cy="100" r="2" />
      </g>
    </g>
  </svg>
);


// --- Секции Лендинга ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/60 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-white/10">
            <BookOpen className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            TOLSTOY<span className="text-cyan-400">AI</span>
          </span>
          <span className="ml-2 px-2.5 py-0.5 text-xs font-semibold bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">
            v2.1
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#architecture" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Архитектура</a>
          <a href="#audit" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Аудит</a>
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
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div className="text-left z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-cyan-300 text-sm font-medium mb-8 fade-up">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Core Engine 2.1 — Посимвольная генерация
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mb-6 tracking-tight leading-[1.1] fade-up" style={{ animationDelay: '0.1s' }}>
          Искусство Кода <br /> и Слова
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl fade-up" style={{ animationDelay: '0.2s' }}>
          Легковесный Decoder-only Transformer, воссоздающий глубину классической русской литературы с математической точностью. Работает на CUDA, MPS и CPU.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 fade-up" style={{ animationDelay: '0.3s' }}>
          <a href="#architecture" className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 font-semibold transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-md group">
            <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Изучить архитектуру
          </a>
          <a href="https://github.com/zzzigrok/tolstoy-2.1" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-md">
            <Github className="w-5 h-5" />
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

const Features = () => {
  const features = [
    { icon: <Brain />, color: "text-cyan-400", bg: "bg-cyan-500/10", title: "SimpleLLM Ядро", desc: "Компактный Transformer с Multi-Head Attention и Pre-LayerNorm. Работает даже на домашнем железе." },
    { icon: <Terminal />, color: "text-purple-400", bg: "bg-purple-500/10", title: "Rich Terminal UI", desc: "Премиальный интерфейс управления через CLI с дашбордами, графиками и меню диагностики." },
    { icon: <Activity />, color: "text-green-400", bg: "bg-green-500/10", title: "Лингво-Аудит", desc: "Встроенный эвристический движок для оценки синтаксиса, TTR и выявления мусорных конструкций." },
    { icon: <Database />, color: "text-blue-400", bg: "bg-blue-500/10", title: "Чистые Данные", desc: "Автоматическая очистка корпусов текстов от артефактов парсинга и нестандартных символов." },
    { icon: <Cpu />, color: "text-orange-400", bg: "bg-orange-500/10", title: "Аппаратное ускорение", desc: "Нативная поддержка аппаратного ускорения для NVIDIA (CUDA), Apple Silicon (MPS) и Intel (XPU)." },
    { icon: <Code2 />, color: "text-pink-400", bg: "bg-pink-500/10", title: "Character Based", desc: "Посимвольная токенизация улавливает уникальный авторский ритм и точную пунктуацию." }
  ];

  return (
    <section id="architecture" className="py-24 relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Архитектура Разума</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Сочетание классических основ нейросетей и современных оптимизаций PyTorch, упакованное в элегантный стек.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <GlassCard key={i} className="p-8 group" delay={`${i * 0.1}s`}>
              <div className={`w-14 h-14 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
                {React.cloneElement(f.icon, { className: "w-7 h-7" })}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {f.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Audit = () => (
  <section id="audit" className="py-24 relative z-10 px-6">
    <div className="max-w-7xl mx-auto">
      <GlassCard className="p-8 md:p-16 overflow-hidden relative">
        {/* Декоративный фон внутри карточки */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-sm font-semibold mb-6 border border-purple-500/30">
              <Activity className="w-4 h-4" />
              Heuristic Syntax Engine
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Интеллектуальный <br />Лингво-Аудит
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Уникальный эвристический движок анализирует сгенерированный текст, определяя части речи, фразеологизмы и сложность синтаксиса без внешних NLP-библиотек.
            </p>
            
            <a href="https://github.com/zzzigrok/tolstoy-2.1" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors group">
              Смотреть репозиторий проекта
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid gap-4">
            {[
              { status: "🟢", title: "Высокая связность", desc: "Сложные предложения, точная пунктуация и союзы.", border: "border-green-500/30", bg: "bg-green-500/5" },
              { status: "🟡", title: "Базовое понимание", desc: "Простые конструкции, возможны мелкие ошибки.", border: "border-yellow-500/30", bg: "bg-yellow-500/5" },
              { status: "🔴", title: "Низкая точность", desc: "«Словесный салат», требуется дообучение.", border: "border-red-500/30", bg: "bg-red-500/5" }
            ].map((item, i) => (
              <div key={i} className={`p-5 rounded-2xl border ${item.border} ${item.bg} backdrop-blur-sm flex gap-4 items-start hover:scale-[1.02] transition-transform`}>
                <div className="text-2xl mt-1">{item.status}</div>
                <div>
                  <h4 className="text-white font-bold mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative z-10 border-t border-white/10 bg-slate-950/50 backdrop-blur-lg pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-slate-400" />
        <span className="font-bold text-slate-300 tracking-wider">TOLSTOY AI</span>
      </div>
      <p className="text-slate-500 text-sm font-medium">
        © 2026 Tolstoy AI Project. MIT License.
      </p>
      <div className="flex gap-4">
        <a href="https://github.com/zzzigrok/tolstoy-2.1" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all border border-white/10">
          <Github className="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-50 relative">
      <InjectStyles />
      <BackgroundOrbs />
      <Navbar />
      <Hero />
      <Features />
      <Audit />
      <Footer />
    </div>
  );
}