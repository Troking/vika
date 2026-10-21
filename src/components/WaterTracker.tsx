import { useState, useEffect } from 'react';
import { Droplet, Plus, Minus, RotateCcw, ShieldCheck, Sparkles, GlassWater } from 'lucide-react';

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
    <div className="card-warm rounded-3xl p-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-2xs">
              <Droplet className="w-5 h-5 fill-sky-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Питьевой баланс почек</h3>
              <p className="text-xs text-stone-500">Цель: 2 500 мл (чистая вода и некипяченый морс)</p>
            </div>
          </div>
          <button
            onClick={reset}
            title="Сбросить счетчик"
            className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-100 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Big Fluid Progress Display */}
        <div className="bg-gradient-to-br from-sky-50/70 to-blue-50/40 rounded-2xl p-4 border border-sky-100/80 mb-5">
          <div className="flex justify-between items-baseline mb-2">
            <div>
              <span className="text-3xl font-extrabold text-stone-900 tracking-tight">
                {currentMl}
              </span>
              <span className="text-sm font-semibold text-stone-500 ml-1">/ {TARGET_ML} мл</span>
            </div>
            <span className="text-xs font-bold text-sky-700 bg-white px-3 py-1 rounded-full border border-sky-200/60 shadow-2xs">
              {percentage}% нормы
            </span>
          </div>

          {/* Smooth Bar */}
          <div className="w-full bg-white h-3 rounded-full overflow-hidden p-0.5 border border-sky-200/50 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Glass Icons Grid */}
        <div className="mb-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center justify-between">
            <span>Отметки выпитых стаканов:</span>
            <span>{glasses} из {TOTAL_GLASSES}</span>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {Array.from({ length: TOTAL_GLASSES }).map((_, index) => {
              const isFilled = index < glasses;
              return (
                <button
                  key={index}
                  onClick={() => setGlasses(index + 1)}
                  className={`h-11 rounded-xl flex items-center justify-center transition-all ${
                    isFilled
                      ? 'bg-sky-500 text-white shadow-xs shadow-sky-200 scale-102'
                      : 'bg-stone-50 border border-stone-200/80 text-stone-300 hover:border-sky-300 hover:text-sky-400'
                  }`}
                  title={`Стакан ${index + 1} (250 мл)`}
                >
                  <GlassWater className={`w-4 h-4 ${isFilled ? 'text-white' : ''}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule guide */}
        <div className="space-y-1.5 text-xs text-stone-600 mb-4 bg-stone-50/60 p-3 rounded-2xl border border-stone-100">
          <div className="text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Умный график питья для Вики:
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <span>• Утро: 1 стакан теплой воды натощак</span>
            <span className="font-semibold text-stone-700">08:00</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <span>• Днем: вода с долькой лимона (цитраты)</span>
            <span className="font-semibold text-stone-700">12:00 – 16:00</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <span>• Вечер: клюквенный морс или вода с D-маннозой</span>
            <span className="font-semibold text-stone-700">21:00</span>
          </div>
        </div>
      </div>

      <div>
        {/* Quick action buttons */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100">
          <button
            onClick={removeGlass}
            disabled={glasses === 0}
            className="h-10 px-3.5 rounded-xl border border-stone-200 text-stone-600 font-medium hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs flex items-center gap-1"
          >
            <Minus className="w-3.5 h-3.5" /> -1 стакан
          </button>
          <button
            onClick={addGlass}
            className="h-10 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-xs shadow-sky-200 flex items-center gap-2 transition active:scale-95"
          >
            <Plus className="w-4 h-4" /> Выпить стакан (250 мл)
          </button>
        </div>

        {/* Clinical note */}
        <div className="mt-3.5 bg-sky-50/80 border border-sky-100 rounded-xl p-2.5 flex items-start gap-2.5 text-[11px] leading-relaxed text-sky-950">
          <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <strong>Светло-соломенная прозрачная моча</strong> — главный визуальный ориентир. При таком питьевом режиме соли оксалатов не способны слипаться в камни, а бактерии смываются до начала цистита.
          </div>
        </div>
      </div>
    </div>
  );
};
