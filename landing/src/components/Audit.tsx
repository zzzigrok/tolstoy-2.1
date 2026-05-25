import React from 'react';
import { Activity, ChevronRight } from 'lucide-react';
import GlassCard from './GlassCard';

interface AuditStatus {
  status: string;
  title: string;
  desc: string;
  border: string;
  bg: string;
}

const Audit: React.FC = () => {
  const statusItems: AuditStatus[] = [
    {
      status: "🟢",
      title: "Высокая связность",
      desc: "Сложные предложения, точная пунктуация и союзы.",
      border: "border-green-500/30",
      bg: "bg-green-500/5",
    },
    {
      status: "🟡",
      title: "Базовое понимание",
      desc: "Простые конструкции, возможны мелкие ошибки.",
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/5",
    },
    {
      status: "🔴",
      title: "Низкая точность",
      desc: "«Словесный салат», требуется дообучение.",
      border: "border-red-500/30",
      bg: "bg-red-500/5",
    },
  ];

  return (
    <section id="audit" className="py-24 relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <GlassCard className="p-8 md:p-16 overflow-hidden relative">
          {/* Decorative blur inside the card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="scan-target">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-sm font-semibold mb-6 border border-purple-500/30">
                <Activity className="w-4 h-4" />
                Heuristic Syntax Engine
              </div>
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Интеллектуальный <br />
                Лингво-Аудит
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Уникальный эвристический движок анализирует сгенерированный текст, определяя части речи, фразеологизмы и сложность синтаксиса без внешних NLP-библиотек.
              </p>

              <a
                href="https://github.com/zzzigrok/tolstoy-2.1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors group"
              >
                Смотреть репозиторий проекта
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid gap-4">
              {statusItems.map((item, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl border ${item.border} ${item.bg} backdrop-blur-sm flex gap-4 items-start hover:scale-[1.02] transition-transform scan-target`}
                >
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
};

export default Audit;
