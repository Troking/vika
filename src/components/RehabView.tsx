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

export const RehabView = () => {
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
      <div className="card-warm rounded-3xl p-6 sm:p-7">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-full mb-2 border border-rose-200/60">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Восстановление и вегетативный комфорт
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          Сосуды, нервная система и маммопластика
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
          Практический гид по бережной поддержке сосудистого тонуса при чувствительном психотипе и правила реабилитации на сроке 1 месяц после уменьшения груди.
        </p>
      </div>

      {/* Interactive 4-7-8 Breathing Guide for sensitive psychotype */}
      <div className="bg-[#282B30] text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-300 bg-white/10 px-3 py-1 rounded-full mb-3 backdrop-blur-xs border border-white/10">
            <Wind className="w-3.5 h-3.5 text-rose-300" /> Антиспазм сосудов и успокоение нервной системы
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1 text-white">
            Дыхательный тренажер 4–7–8 для блуждающего нерва
          </h3>
          <p className="text-xs text-stone-300 mb-6 leading-relaxed">
            Мгновенно снимает вегетативный спазм сосудов, восстанавливает кровообращение мозга и снижает тревожность без седативных средств.
          </p>

          {/* Animated Circle */}
          <div className="relative w-44 h-44 flex items-center justify-center mb-6">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                breathPhase === 'inhale'
                  ? 'bg-rose-500/20 scale-110 border-2 border-rose-400'
                  : breathPhase === 'hold'
                  ? 'bg-amber-500/20 scale-105 border-2 border-amber-300'
                  : 'bg-teal-500/15 scale-95 border-2 border-teal-400/50'
              }`}
            />
            <div className="flex flex-col items-center justify-center z-10">
              <span className="text-4xl font-extrabold tracking-tight text-white">
                {secondsLeft}s
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-200 mt-1">
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
              className="px-5 py-2.5 rounded-xl bg-white text-stone-900 font-bold text-xs sm:text-sm hover:bg-stone-100 transition flex items-center gap-2 shadow-xs active:scale-95"
            >
              {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-rose-600" />}
              {breathingActive ? 'Пауза' : 'Начать упражнение'}
            </button>
            <button
              onClick={resetBreathing}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/10"
              title="Сброс"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 text-[11px] text-stone-400">
            Завершено циклов: <span className="font-bold text-white">{cycleCount}</span> (рекомендуется 4 цикла за подход)
          </div>
        </div>
      </div>

      {/* Mammoplasty Section (1 month post-op) */}
      <div className="card-warm rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {REHAB_MAMMOPLASTY.phase}
            </h3>
            <p className="text-xs text-stone-500">Ключевые медицинские правила безопасности</p>
          </div>
        </div>

        <div className="bg-rose-50/60 rounded-2xl p-4 text-xs text-rose-950 border border-rose-200/60 leading-relaxed">
          <strong className="text-rose-900">Что происходит сейчас: </strong>
          {REHAB_MAMMOPLASTY.keyNote}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {REHAB_MAMMOPLASTY.rules.map((rule, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-stone-200/80 bg-stone-50/60 hover:bg-white hover:border-stone-300 transition"
            >
              <div className="flex items-center gap-2 mb-1.5">
                {rule.status === 'restricted' && (
                  <span className="text-[10px] font-bold text-rose-800 bg-rose-100/80 px-2.5 py-0.5 rounded-md">
                    Ограничение
                  </span>
                )}
                {rule.status === 'allowed' && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                    Рекомендовано
                  </span>
                )}
                {rule.status === 'attention' && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                    Важный нюанс
                  </span>
                )}
                <h4 className="text-xs font-bold text-stone-900">{rule.title}</h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{rule.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vascular Protocol Section */}
      <div className="card-warm rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-700">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {VASCULAR_PROTOCOL.title}
            </h3>
            <p className="text-xs text-stone-500">{VASCULAR_PROTOCOL.subtitle}</p>
          </div>
        </div>

        <div className="space-y-3">
          {VASCULAR_PROTOCOL.practices.map((practice, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-stone-200/70 bg-stone-50/50 flex items-start gap-3.5 hover:bg-white transition"
            >
              <div className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900 mb-0.5">{practice.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{practice.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
