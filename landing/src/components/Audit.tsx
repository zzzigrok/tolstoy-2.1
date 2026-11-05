import React from 'react';
import { Activity, ChevronRight, Terminal } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface AuditStatus {
  indicator: React.ReactElement;
  statusLabel: string;
  badgeClass: string;
  title: string;
  desc: string;
  metrics: string;
}

const statusItems: AuditStatus[] = [
  {
    indicator: (
      <span className="relative flex h-3 w-3 mt-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
      </span>
    ),
    statusLabel: 'Coherent • 0.90+',
    badgeClass: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
    title: 'Высокая связность',
    desc: 'Сложные синтаксические конструкции, длинные толстовские периоды, точная пунктуация и верное согласование падежей.',
    metrics: 'TTR > 0.65 | Спеллчек: 99.2%',
  },
  {
    indicator: (
      <span className="relative flex h-3 w-3 mt-1">
        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
      </span>
    ),
    statusLabel: 'Developing • 0.65-0.89',
    badgeClass: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
    title: 'Базовое понимание',
    desc: 'Простые предложения без грамматических срывов. Возможны повторы лексики и шероховатости в деепричастных оборотах.',
    metrics: 'TTR ~ 0.50 | Спеллчек: 92.4%',
  },
  {
    indicator: (
      <span className="relative flex h-3 w-3 mt-1">
        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
      </span>
    ),
    statusLabel: 'Divergent • < 0.65',
    badgeClass: 'text-rose-300 border-rose-500/30 bg-rose-500/10',
    title: 'Низкая точность',
    desc: 'Символьный или словесный хаос, частые обрывы предложений. Сигнализирует о необходимости продолжения обучения или снижения температуры.',
    metrics: 'TTR < 0.35 | Спеллчек: < 80%',
  },
];

const Audit: React.FC = () => {
  return (
    <section id="audit" className="py-24 relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <SpotlightCard className="p-8 md:p-14 overflow-hidden relative" spotlightColor="rgba(168, 85, 247, 0.15)">
          {/* Subtle purple background ambient */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none -z-10" />

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 text-purple-300 text-xs font-semibold border border-purple-500/30">
                <Activity className="w-3.5 h-3.5 text-purple-400" />
                Heuristic Syntax Engine v2.1
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Интеллектуальный <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">
                  Лингво-Аудит
                </span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Собственный эвристический модуль оценивает генерируемый текст в реальном времени: проверяет согласование падежей, богатство словарного запаса (Type-Token Ratio) и структуру сложноподчинённых предложений без тяжелых внешних NLP-библиотек.
              </p>

              {/* Terminal Snippet */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-white/10 font-mono text-xs text-slate-300 space-y-1.5 shadow-inner">
                <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    audit_diagnostic.py
                  </span>
                  <span className="text-emerald-400">PASSED</span>
                </div>
                <div className="text-slate-400 pt-1">
                  [17:20:04] Evaluating generated sequence (L=256)...
                </div>
                <div className="text-cyan-300">
                  {'>'} Metric: TTR = 0.72 | Syntactic Score: 96.4/100
                </div>
                <div className="text-purple-300">
                  {'>'} Style match: Lev Tolstoy period structure detected
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://github.com/zzzigrok/tolstoy-2.1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer"
                >
                  <span>Подробнее об эвристиках в репозитории</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: Status Cards (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {statusItems.map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col sm:flex-row sm:items-start gap-4 group"
                >
                  <div className="pt-1">{item.indicator}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className="text-white font-bold text-base tracking-tight group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${item.badgeClass}`}>
                        {item.statusLabel}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="pt-1 text-[11px] font-mono text-slate-500">
                      {item.metrics}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};

export default Audit;
