import React from 'react';
import {
  Brain,
  Terminal,
  Activity,
  Database,
  Cpu,
  Code2,
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import ArchitectureVisualizer from './ArchitectureVisualizer';

interface FeatureItem {
  icon: React.ReactElement;
  color: string;
  badgeColor: string;
  bg: string;
  title: string;
  tag: string;
  desc: string;
}

const features: FeatureItem[] = [
  {
    icon: <Brain className="w-6 h-6" />,
    color: 'text-cyan-400',
    badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
    bg: 'bg-cyan-500/10',
    title: 'SimpleLLM Ядро',
    tag: 'Decoder-Only',
    desc: 'Компактный Transformer с Multi-Head Attention и Pre-LayerNorm. Работает автономно без сторонних фреймворков даже на потребительском железе.',
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    color: 'text-purple-400',
    badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
    bg: 'bg-purple-500/10',
    title: 'Rich Terminal UI',
    tag: 'Interactive CLI',
    desc: 'Премиальный интерфейс консоли с анимированными графиками функции потерь, мониторингом VRAM и интерактивным меню генерации.',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    color: 'text-emerald-400',
    badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
    bg: 'bg-emerald-500/10',
    title: 'Лингво-Аудит',
    tag: 'Heuristics',
    desc: 'Встроенный эвристический движок для оценки синтаксиса, лексического богатства (TTR) и фильтрации повторяющихся фрагментов.',
  },
  {
    icon: <Database className="w-6 h-6" />,
    color: 'text-blue-400',
    badgeColor: 'border-blue-500/30 text-blue-300 bg-blue-500/10',
    bg: 'bg-blue-500/10',
    title: 'Чистые Данные',
    tag: 'Data Pipeline',
    desc: 'Пайплайн препроцессинга автоматически устраняет опечатки OCR, артефакты сканирования и нормализует дореволюционные символы.',
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    color: 'text-amber-400',
    badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    bg: 'bg-amber-500/10',
    title: 'Аппаратное Ускорение',
    tag: 'Cross-Platform',
    desc: 'Автоматический выбор бэкенда ускорения: NVIDIA CUDA с FlashAttention, Apple Silicon Metal (MPS) и Intel XPU / CPU.',
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    color: 'text-pink-400',
    badgeColor: 'border-pink-500/30 text-pink-300 bg-pink-500/10',
    bg: 'bg-pink-500/10',
    title: 'Character Based',
    tag: 'Sub-word Free',
    desc: 'Посимвольная токенизация точно сохраняет авторский ритм, пунктуацию, тире и синтаксические конструкции русской классики.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="architecture" className="py-24 relative z-10 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-xl">
            Инженерия & Нейросети
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Архитектура Разума
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Синтез классических принципов трансформеров, математически выверенной нормализации и кастомного эвристического лингво-аудита.
          </p>
        </div>

        {/* Flagship Interactive Visualizer Component */}
        <ArchitectureVisualizer />

        {/* Grid of Spotlight Cards */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ключевые преимущества Tolstoy AI
            </h3>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">
              6 Core Capabilities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <SpotlightCard
                key={i}
                className="p-7 flex flex-col justify-between group"
                spotlightColor="rgba(34, 211, 238, 0.12)"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center border border-white/5 group-hover:scale-105 group-hover:border-white/15 transition-all duration-300`}
                    >
                      {f.icon}
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${f.badgeColor}`}>
                      {f.tag}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-cyan-300 transition-colors">
                    {f.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {f.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
