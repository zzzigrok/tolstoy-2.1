import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Cpu,
  ShieldCheck,
  Binary,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface LayerInfo {
  id: string;
  name: string;
  codeName: string;
  category: string;
  badge: string;
  tensorIn: string;
  tensorOut: string;
  formula: string;
  summary: string;
  details: string[];
  specs: { label: string; value: string }[];
}

const layers: LayerInfo[] = [
  {
    id: 'embeddings',
    name: 'Символьные и Позиционные Эмбеддинги',
    codeName: 'TokenEmbedding + PositionEmbedding',
    category: 'Входной слой',
    badge: 'Dual Embedding',
    tensorIn: '[Batch, Time]',
    tensorOut: '[Batch, Time, n_embd]',
    formula: 'X = Embedding(idx) + PosEmbedding(pos_{0..T-1})',
    summary: 'Преобразует индексы символов алфавита и их порядковые номера в плотные 768-мерные векторы скрытого пространства.',
    details: [
      'Character-level: алфавит включает буквы русского языка, знаки препинания и служебные токены',
      'Learnable Absolute Position: матрица позиций размера [256, 768] обучается вместе с весами модели',
      'Параллельное сложение: временная позиция и семантика символа объединяются без потерь размерности',
    ],
    specs: [
      { label: 'Vocabulary Size', value: '~100 символов' },
      { label: 'Block Size (Context)', value: '256 символов' },
      { label: 'Embedding Dimension', value: '768 (n_embd)' },
    ],
  },
  {
    id: 'preln',
    name: 'Pre-Layer Normalization',
    codeName: 'nn.LayerNorm(n_embd)',
    category: 'Стабилизация градиентов',
    badge: 'Pre-LN Paradigm',
    tensorIn: '[Batch, Time, 768]',
    tensorOut: '[Batch, Time, 768]',
    formula: 'y = \\frac{x - E[x]}{\\sqrt{Var[x] + \\epsilon}} \\cdot \\gamma + \\beta',
    summary: 'Нормализация применяется строго перед блоками внимания и FFN, обеспечивая стабильное распространение градиента.',
    details: [
      'Предотвращает взрыв и затухание градиентов в глубоком 12-слойном стеке',
      'Позволяет тренировать модель с более высоким Learning Rate без warmup-задержек',
      'Служит фундаментом концепции «чистого остаточного тракта» (Identity Residual Highway)',
    ],
    specs: [
      { label: 'Normalized Shape', value: '[768]' },
      { label: 'Epsilon (eps)', value: '1e-5' },
      { label: 'Learnable Weights', value: 'Gamma & Beta' },
    ],
  },
  {
    id: 'attention',
    name: 'Causal Multi-Head Self-Attention',
    codeName: 'MultiHeadAttention(12 heads)',
    category: 'Ядро внимания',
    badge: 'Scaled Dot-Product',
    tensorIn: '[Batch, Time, 768]',
    tensorOut: '[Batch, Time, 768]',
    formula: 'Attention(Q, K, V) = softmax(\\frac{QK^T}{\\sqrt{d_k}} + Mask) V',
    summary: '12 голов внимания параллельно находят смысловые и грамматические связи между символами в пределах контекста.',
    details: [
      'Causal Mask: нижнетреугольная маска гарантирует, что модель не «подглядывает» в будущие символы',
      'Hardware-Aware: использует F.scaled_dot_product_attention (FlashAttention на CUDA, Metal на Apple Silicon)',
      '12 голов по 64 измерения (head_size = 768 / 12 = 64) для параллельного анализа синтаксиса и стиля',
    ],
    specs: [
      { label: 'Number of Heads', value: '12 голов' },
      { label: 'Head Dimension (d_k)', value: '64' },
      { label: 'Causal Masking', value: 'Lower Triangular' },
    ],
  },
  {
    id: 'residual',
    name: 'Residual Connections & Projection',
    codeName: 'x = x + Sublayer(LN(x))',
    category: 'Остаточные связи',
    badge: 'Residual Highway',
    tensorIn: '[Batch, Time, 768]',
    tensorOut: '[Batch, Time, 768]',
    formula: 'x_{l+1} = x_l + Projection(Sublayer(LayerNorm(x_l)))',
    summary: 'Остаточный поток пропускает исходный сигнал сквозь все 12 слоев, предотвращая деградацию признаков.',
    details: [
      'Веса проекций инициализируются с масштабированием 1 / sqrt(2 * n_layer)',
      'Гарантирует беспрепятственное протекание градиента от выхода к начальным эмбеддингам',
      'Каждый блок содержит два независимых residual-моста: вокруг Attention и вокруг FFN',
    ],
    specs: [
      { label: 'Residual Scale', value: '1 / √(2 · 12)' },
      { label: 'Dropout Rate', value: '0.2' },
      { label: 'Stack Depth', value: '12 Transformer Blocks' },
    ],
  },
  {
    id: 'ffn',
    name: 'Feed-Forward Network (FFN)',
    codeName: 'Linear(768, 3072) -> GELU -> Linear(3072, 768)',
    category: 'Нелинейная обработка',
    badge: '4x MLP Expansion',
    tensorIn: '[Batch, Time, 768]',
    tensorOut: '[Batch, Time, 768]',
    formula: 'FFN(x) = GELU(x W_1 + b_1) W_2 + b_2',
    summary: 'Двухслойный перцептрон с четырехкратным расширением скрытого пространства сохраняет долговременную память.',
    details: [
      'Расширение до 3072 нейронов позволяет модели запоминать характерные обороты русской классики',
      'Функция активации GELU обеспечивает гладкую нелинейность без эффекта «мертвых нейронов»',
      'Применяется поячеечно (position-wise) независимо к каждому символу последовательности',
    ],
    specs: [
      { label: 'Hidden Multiplier', value: '4× (3072 dim)' },
      { label: 'Activation', value: 'GELU / Fast NewGELU' },
      { label: 'Parameter Share', value: '~65% весов блока' },
    ],
  },
  {
    id: 'audit',
    name: 'LM Head & Heuristic Engine',
    codeName: 'Linear(768, Vocab) + Heuristic Syntax Audit',
    category: 'Выход и верификация',
    badge: 'Intelligent Audit',
    tensorIn: '[Batch, Time, 768]',
    tensorOut: '[Batch, Time, Vocab] -> Next Char',
    formula: 'Logits = LMHead(LN_{final}(x)) \\implies Audit(Syntax, Coherence)',
    summary: 'Проецирует скрытые представления в логиты следующего символа и верифицирует синтаксис эвристическим движком.',
    details: [
      'Финальный LayerNorm стабилизирует амплитуду логитов перед Softmax',
      'Генерация: сэмплирование с Temperature, Top-K и вычислением кросс-энтропийного лосса',
      'Heuristic Syntax Engine: оценка лексического разнообразия (TTR), пунктуации и выявление аномалий',
    ],
    specs: [
      { label: 'Sampling Methods', value: 'Temperature, Top-K' },
      { label: 'Audit Metrics', value: 'TTR, Syntax, Coherence' },
      { label: 'Total Parameters', value: '~12.8M' },
    ],
  },
];

export const ArchitectureVisualizer: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('attention');
  const activeLayer = layers.find((l) => l.id === activeLayerId) || layers[2];

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Интерактивный Инспектор Архитектуры
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Сквозной поток тензоров Tolstoy AI
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Кликните на любой этап конвейера, чтобы изучить его математическую формулировку, размерности тензоров и параметры реализации в PyTorch.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Режим активной инспекции</span>
        </div>
      </div>

      {/* Interactive Step Navigator / Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {layers.map((layer, idx) => {
          const isActive = layer.id === activeLayerId;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayerId(layer.id)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 relative overflow-hidden group flex flex-col justify-between min-h-[90px] cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/15 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                  : 'bg-slate-900/40 hover:bg-slate-900/80 border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-[10px] font-mono font-bold tracking-wider ${isActive ? 'text-cyan-300' : 'text-slate-500'}`}>
                  0{idx + 1}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold border ${
                    isActive
                      ? 'bg-cyan-400/20 text-cyan-200 border-cyan-400/30'
                      : 'bg-white/5 text-slate-400 border-white/5'
                  }`}
                >
                  {layer.badge}
                </span>
              </div>
              <div>
                <p className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  {layer.name.split(' ')[0]} {layer.name.split(' ')[1] || ''}
                </p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5 font-mono">{layer.category}</p>
              </div>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Inspector View */}
      <SpotlightCard className="p-6 md:p-8" spotlightColor="rgba(34, 211, 238, 0.15)">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Details Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  {activeLayer.category}
                </span>
                <code className="text-xs font-mono text-cyan-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-white/10">
                  {activeLayer.codeName}
                </code>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {activeLayer.name}
              </h4>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                {activeLayer.summary}
              </p>
            </div>

            {/* Formula Block */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/20 relative group shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Binary className="w-3.5 h-3.5 text-cyan-400" />
                  Математическая формулировка
                </span>
                <span className="text-[10px] font-mono text-cyan-400/80">PyTorch Implementation</span>
              </div>
              <div className="font-mono text-sm md:text-base text-cyan-200 overflow-x-auto py-1 scrollbar-thin">
                {activeLayer.formula}
              </div>
            </div>

            {/* Key Mechanisms Checklist */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Архитектурные свойства
              </span>
              <div className="space-y-2">
                {activeLayer.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Specs Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Tensor Shapes Panel */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Трансформация тензоров
              </span>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
                  <span className="text-slate-400 font-medium">Входной тензор:</span>
                  <code className="text-cyan-300 font-mono font-semibold">{activeLayer.tensorIn}</code>
                </div>
                <div className="flex justify-center text-slate-600">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
                <div className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
                  <span className="text-slate-400 font-medium">Выходной тензор:</span>
                  <code className="text-purple-300 font-mono font-semibold">{activeLayer.tensorOut}</code>
                </div>
              </div>
            </div>

            {/* Hyperparameters Table */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Параметры Tolstoy v2.1
              </span>
              <div className="space-y-2">
                {activeLayer.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-slate-900/40 border border-white/5"
                  >
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="text-white font-mono font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Context Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-500/20 text-xs text-slate-300 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                Полностью автономная архитектура без внешних библиотек NLP — чистый PyTorch + Heuristics.
              </span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default ArchitectureVisualizer;
