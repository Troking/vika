import { useState, useEffect } from 'react';
import { REHAB_MAMMOPLASTY, VASCULAR_PROTOCOL } from '../data/rehab';
import { 
  Heart, 
  Play, 
  Pause, 
  RotateCcw,
  Wind,
  Footprints,
  Sparkles
} from 'lucide-react';

export const RehabView: React.FC = () => {
  // 4-7-8 breathing timer state
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let timer: number;
    if (breathingActive) {
      timer = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 1) return prev - 1;

          // Transition to next phase
          if (breathPhase === 'inhale') {
            setBreathPhase('hold');
            return 7;
          } else if (breathPhase === 'hold') {
            setBreathPhase('exhale');
            return 8;
          } else {
            setBreathPhase('inhale');
            setCycleCount((c) => c + 1);
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [breathingActive, breathPhase]);

  const toggleBreathing = () => {
    if (!breathingActive) {
      setBreathPhase('inhale');
      setSecondsLeft(4);
    }
    setBreathingActive(!breathingActive);
  };

  const resetBreathing = () => {
    setBreathingActive(false);
    setBreathPhase('inhale');
    setSecondsLeft(4);
    setCycleCount(0);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Intro Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md mb-2">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Восстановление и вегетативный комфорт
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Сосуды, нервная система и маммопластика
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Практический гид по бережной поддержке сосудистого тонуса при чувствительном психотипе и правила реабилитации на сроке 1 месяц после уменьшения груди.
        </p>
      </div>

      {/* Interactive 4-7-8 Breathing Guide for sensitive psychotype */}
      <div className="bg-linear-to-br from-indigo-900 to-purple-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 bg-indigo-800/60 px-3 py-1 rounded-full mb-3 backdrop-blur-xs">
            <Wind className="w-3.5 h-3.5" /> Антиспазм сосудов и успокоение нервной системы
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1">
            Дыхательный тренажер 4–7–8 для блуждающего нерва
          </h3>
          <p className="text-xs text-indigo-200 mb-6 leading-relaxed">
            Мгновенно снимает вегетативный спазм сосудов, восстанавливает кровообращение мозга и снижает тревожность без успокоительных.
          </p>

          {/* Animated Circle */}
          <div className="relative w-44 h-44 flex items-center justify-center mb-6">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                breathPhase === 'inhale'
                  ? 'bg-sky-500/20 scale-110 border-2 border-sky-400'
                  : breathPhase === 'hold'
                  ? 'bg-purple-500/30 scale-105 border-2 border-purple-400'
                  : 'bg-indigo-500/10 scale-95 border-2 border-indigo-400/50'
              }`}
            />
            <div className="flex flex-col items-center justify-center z-10">
              <span className="text-4xl font-extrabold tracking-tight">
                {secondsLeft}s
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 mt-1">
                {breathPhase === 'inhale' && 'Вдох носом (4с)'}
                {breathPhase === 'hold' && 'Задержка дыхания (7с)'}
                {breathPhase === 'exhale' && 'Плавный выдох ртом (8с)'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleBreathing}
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs sm:text-sm hover:bg-indigo-50 transition flex items-center gap-2 shadow-xs active:scale-95"
            >
              {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {breathingActive ? 'Пауза' : 'Начать упражнение'}
            </button>
            <button
              onClick={resetBreathing}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              title="Сброс"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 text-[11px] text-indigo-300">
            Завершено циклов: <span className="font-bold text-white">{cycleCount}</span> (рекомендуется 4 цикла за подход)
          </div>
        </div>
      </div>

      {/* Mammoplasty Section (1 month post-op) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {REHAB_MAMMOPLASTY.phase}
            </h3>
            <p className="text-xs text-slate-500">Ключевые медицинские правила безопасности</p>
          </div>
        </div>

        <div className="bg-rose-50/60 rounded-xl p-3 text-xs text-rose-950 border border-rose-100 leading-relaxed">
          <strong className="text-rose-900">Что происходит сейчас: </strong>
          {REHAB_MAMMOPLASTY.keyNote}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {REHAB_MAMMOPLASTY.rules.map((rule, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-slate-200 transition"
            >
              <div className="flex items-center gap-2 mb-1.5">
                {rule.status === 'restricted' && (
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded">
                    Ограничение
                  </span>
                )}
                {rule.status === 'allowed' && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                    Рекомендовано
                  </span>
                )}
                {rule.status === 'attention' && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded">
                    Важный нюанс
                  </span>
                )}
                <h4 className="text-xs font-bold text-slate-800">{rule.title}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{rule.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vascular Protocol Section */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {VASCULAR_PROTOCOL.title}
            </h3>
            <p className="text-xs text-slate-500">{VASCULAR_PROTOCOL.subtitle}</p>
          </div>
        </div>

        <div className="space-y-3">
          {VASCULAR_PROTOCOL.practices.map((practice, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-sky-100/80 bg-sky-50/30 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-0.5">{practice.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{practice.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
