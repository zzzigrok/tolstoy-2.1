import React from 'react';
import {
  Brain,
  Terminal,
  Activity,
  Database,
  Cpu,
  Code2,
} from 'lucide-react';
import GlassCard from './GlassCard';

interface FeatureItem {
  icon: React.ReactElement<any>;
  color: string;
  bg: string;
  title: string;
  desc: string;
}

const Features: React.FC = () => {
  const features: FeatureItem[] = [
    {
      icon: <Brain />,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      title: "SimpleLLM Ядро",
      desc: "Компактный Transformer с Multi-Head Attention и Pre-LayerNorm. Работает даже на домашнем железе.",
    },
    {
      icon: <Terminal />,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      title: "Rich Terminal UI",
      desc: "Премиальный интерфейс управления через CLI с дашбордами, графиками и меню диагностики.",
    },
    {
      icon: <Activity />,
      color: "text-green-400",
      bg: "bg-green-500/10",
      title: "Лингво-Аудит",
      desc: "Встроенный эвристический движок для оценки синтаксиса, TTR и выявления мусорных конструкций.",
    },
    {
      icon: <Database />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      title: "Чистые Данные",
      desc: "Автоматическая очистка корпусов текстов от артефактов парсинга и нестандартных символов.",
    },
    {
      icon: <Cpu />,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      title: "Аппаратное ускорение",
      desc: "Нативная поддержка аппаратного ускорения для NVIDIA (CUDA), Apple Silicon (MPS) и Intel (XPU).",
    },
    {
      icon: <Code2 />,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      title: "Character Based",
      desc: "Посимвольная токенизация улавливает уникальный авторский ритм и точную пунктуацию.",
    },
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
            <GlassCard key={i} className="p-8 group scan-target" delay={`${i * 0.1}s`}>
              <div
                className={`w-14 h-14 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5`}
              >
                {React.cloneElement(f.icon, { className: "w-7 h-7" })}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
