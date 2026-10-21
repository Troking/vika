import { useState, useEffect } from 'react';
import { Droplet, Plus, Minus, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

export const WaterTracker = () => {
  const GLASS_SIZE = 250; // ml
  const TARGET_ML = 2500; // 2.5 L recommended for kidney stone & cystitis prevention
  const TOTAL_GLASSES = Math.ceil(TARGET_ML / GLASS_SIZE); // 10 glasses

  const [glasses, setGlasses] = useState<number>(() => {
    const saved = localStorage.getItem('vika_water_glasses');
    const savedDate = localStorage.getItem('vika_water_date');
    const today = new Date().toDateString();

    if (savedDate === today && saved !== null) {
      return parseInt(saved, 10);
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('vika_water_glasses', glasses.toString());
    localStorage.setItem('vika_water_date', new Date().toDateString());
  }, [glasses]);

  const currentMl = glasses * GLASS_SIZE;
  const percentage = Math.min(100, Math.round((currentMl / TARGET_ML) * 100));

  const addGlass = () => {
    setGlasses((prev) => Math.min(prev + 1, TOTAL_GLASSES + 4));
  };

  const removeGlass = () => {
    setGlasses((prev) => Math.max(0, prev - 1));
  };

  const reset = () => {
    if (window.confirm('Сбросить счетчик воды за сегодня?')) {
      setGlasses(0);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
            <Droplet className="w-5 h-5 fill-sky-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Гидратация для почек и мочевого</h3>
            <p className="text-xs text-slate-500">Цель: 2 500 мл (10 стаканов)</p>
          </div>
        </div>
        <button
          onClick={reset}
          title="Сбросить счетчик"
          className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar & Amount */}
      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-2xl font-extrabold text-sky-900 tracking-tight">
            {currentMl} <span className="text-sm font-semibold text-slate-500">/ {TARGET_ML} мл</span>
          </span>
          <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
            {percentage}% нормы
          </span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Glass Icons Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4">
        {Array.from({ length: TOTAL_GLASSES }).map((_, index) => {
          const isFilled = index < glasses;
          return (
            <button
              key={index}
              onClick={() => setGlasses(index + 1)}
              className={`h-10 rounded-xl flex items-center justify-center transition-all ${
                isFilled
                  ? 'bg-sky-500 text-white shadow-xs shadow-sky-200 scale-105'
                  : 'bg-slate-50 border border-dashed border-slate-200 text-slate-300 hover:border-sky-300'
              }`}
              title={`Стакан ${index + 1} (250 мл)`}
            >
              <Droplet className={`w-4 h-4 ${isFilled ? 'fill-white' : ''}`} />
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <button
            onClick={removeGlass}
            disabled={glasses === 0}
            className="h-9 px-3 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs flex items-center gap-1"
          >
            <Minus className="w-3.5 h-3.5" /> -1 стакан
          </button>
          <button
            onClick={addGlass}
            className="h-9 px-4 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-xs shadow-sky-200 flex items-center gap-1.5 transition active:scale-95"
          >
            <Plus className="w-4 h-4" /> Выпить стакан (250 мл)
          </button>
        </div>

        {percentage >= 100 && (
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
            <Sparkles className="w-3.5 h-3.5" /> Норма выполнена!
          </div>
        )}
      </div>

      {/* Clinical notice */}
      <div className="mt-3.5 bg-sky-50/70 border border-sky-100 rounded-xl p-2.5 flex items-start gap-2.5 text-[11px] leading-relaxed text-sky-900">
        <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Почему это критично для Вики:</span> При регулярном поступлении жидкости моча не концентрируется, соли (оксалаты/ураты) не слипаются в микролиты, а бактерии не успевают закрепиться на стенках мочевого пузыря.
        </div>
      </div>
    </div>
  );
};
