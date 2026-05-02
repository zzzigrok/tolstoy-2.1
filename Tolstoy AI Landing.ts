import React, { useEffect } from 'react';
import { 
  Brain, 
  Terminal, 
  Cpu, 
  Activity, 
  Github, 
  Code2,
  Database,
  Sparkles
} from 'lucide-react';

// --- Компоненты ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Brain className="w-8 h-8 text-cyan-400" />
        <span className="text-xl font-bold tracking-tight text-white">
          TOLSTOY<span className="text-cyan-400">AI</span>
        </span>
        <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-cyan-400/10 text-cyan-400 rounded border border-cyan-400/20">
          v2.1
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="#features" className="hover:text-cyan-400 transition-colors">Архитектура</a>
        <a href="#audit" className="hover:text-cyan-400 transition-colors">Лингво-аудит</a>
        <a 
          href="https://github.com/zzzigrok/tolstoy-2.1" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10"
        >
          <Github className="w-4 h-4" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
    {/* Background Effects */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] mix-blend-screen pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] mix-blend-screen pointer-events-none" />
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-8 animate-fade-in-up">
        <Sparkles className="w-4 h-4" />
        Tolstoy Core Engine 2.1 — Посимвольная генерация
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        Искусство Кода <br className="hidden md:block" /> и Слова
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        Легковесный Decoder-only Transformer, воссоздающий глубину классической русской литературы с математической точностью. Оптимизирован для CUDA, MPS и CPU.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)]">
          <Brain className="w-5 h-5" />
          Изучить архитектуру
        </a>
        <a href="https://github.com/zzzigrok/tolstoy-2.1" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 border border-slate-700 text-white font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
          <Github className="w-5 h-5" />
          Проект на GitHub
        </a>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-cyan-400" />,
      title: "SimpleLLM Ядро",
      desc: "Компактный Transformer с Multi-Head Attention и Pre-LayerNorm. Работает даже на домашнем железе."
    },
    {
      icon: <Terminal className="w-6 h-6 text-purple-400" />,
      title: "Rich Terminal UI",
      desc: "Премиальный интерфейс управления через CLI с дашбордами, графиками и меню диагностики."
    },
    {
      icon: <Activity className="w-6 h-6 text-green-400" />,
      title: "Лингво-Аудит",
      desc: "Встроенный эвристический движок для оценки синтаксиса, TTR и выявления мусорных конструкций."
    },
    {
      icon: <Database className="w-6 h-6 text-blue-400" />,
      title: "Чистые Данные",
      desc: "Автоматическая очистка корпусов текстов от артефактов парсинга и нестандартных символов."
    },
    {
      icon: <Cpu className="w-6 h-6 text-orange-400" />,
      title: "Кроссплатформенность",
      desc: "Нативная поддержка аппаратного ускорения для NVIDIA (CUDA), Apple Silicon (MPS) и Intel (XPU)."
    },
    {
      icon: <Code2 className="w-6 h-6 text-pink-400" />,
      title: "Character Based",
      desc: "Посимвольная токенизация улавливает уникальный авторский ритм и точную пунктуацию."
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Архитектура Разума</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Сочетание классических основ нейросетей и современных оптимизаций PyTorch.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AuditSection = () => (
  <section id="audit" className="py-24 bg-slate-950 border-t border-white/5 relative">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="inline-block p-3 bg-purple-500/10 rounded-2xl mb-6">
        <Activity className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Лингвистический Аудит</h2>
      <p className="text-slate-400 max-w-3xl mx-auto mb-12 text-lg">
        Уникальный эвристический движок (<code>HeuristicSyntaxEngine</code>) анализирует сгенерированный текст, определяя части речи, фразеологизмы и сложность синтаксиса без внешних NLP-библиотек.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-2xl mb-2">🟢</div>
          <h4 className="text-white font-bold mb-2">Высокая связность</h4>
          <p className="text-slate-400 text-sm">Модель строит сложные предложения, соблюдает пунктуацию и использует союзы.</p>
        </div>
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-2xl mb-2">🟡</div>
          <h4 className="text-white font-bold mb-2">Базовое понимание</h4>
          <p className="text-slate-400 text-sm">Простые конструкции, возможны мелкие ошибки в запятых или редкие галлюцинации.</p>
        </div>
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-2xl mb-2">🔴</div>
          <h4 className="text-white font-bold mb-2">Низкая точность</h4>
          <p className="text-slate-400 text-sm">"Словесный салат", модель не выучила структуру языка (требуется дообучение).</p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-950 border-t border-white/10 py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-slate-500" />
        <span className="font-bold text-slate-400">TOLSTOY AI</span>
      </div>
      <p className="text-slate-600 text-sm text-center">
        © 2026 Tolstoy AI Project. Распространяется под лицензией MIT.
      </p>
      <div className="flex gap-4">
        <a href="https://github.com/zzzigrok/tolstoy-2.1" className="text-slate-500 hover:text-white transition-colors">
          <Github className="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
);

export default function App() {
  // Добавим простую анимацию появления при скролле через CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-up {
        opacity: 0;
        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <Features />
      <AuditSection />
      <Footer />
    </div>
  );
}