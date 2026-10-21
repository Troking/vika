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

  const addGlass = (count: number = 1) => {
    setGlasses((prev) => Math.min(prev + count, TOTAL_GLASSES + 4));
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
    <div className="bento-card p-6 flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100/80 flex items-center justify-center text-sky-600 shadow-2xs">
              <Droplet className="w-5 h-5 fill-sky-500" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#1C1A17]">Гидратация почек</h3>
              <p className="text-xs text-[#7A756C]">Цель: 2 500 мл (вода и некипяченый морс)</p>
            </div>
          </div>
          <button
            onClick={reset}
            title="Сбросить счетчик"
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-50 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Circular / Liquid Progress Gauge */}
        <div className="bg-[#F4F9FC] rounded-2xl p-5 border border-sky-100/70 mb-5 relative overflow-hidden">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2830] tracking-tight">
                {currentMl}
              </span>
              <span className="text-sm font-semibold text-[#5A7580] ml-1.5">/ {TARGET_ML} мл</span>
            </div>
            <span className="pill-chip bg-white text-sky-800 border border-sky-200/60 shadow-2xs">
              <Sparkles className="w-3 h-3 text-sky-500" />
              {percentage}% цели
            </span>
          </div>

          {/* Smooth Fluid Gauge Bar */}
          <div className="w-full bg-white h-3.5 rounded-full overflow-hidden p-0.5 border border-sky-200/50 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Interactive Glasses Matrix */}
        <div className="mb-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A756C] mb-2 flex items-center justify-between">
            <span>Стаканы за день:</span>
            <span className="font-semibold text-[#1C1A17]">{glasses} из {TOTAL_GLASSES}</span>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
            {Array.from({ length: TOTAL_GLASSES }).map((_, index) => {
              const isFilled = index < glasses;
              return (
                <button
                  key={index}
                  onClick={() => setGlasses(index + 1)}
                  className={`h-10 rounded-xl flex items-center justify-center transition-all ${
                    isFilled
                      ? 'bg-sky-500 text-white shadow-xs scale-102 font-bold'
                      : 'bg-stone-50 border border-[#E8E2D8] text-stone-300 hover:border-sky-300 hover:text-sky-400'
                  }`}
                  title={`Стакан ${index + 1} (250 мл)`}
                >
                  <Droplet className={`w-3.5 h-3.5 ${isFilled ? 'fill-white' : ''}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Schedule Tips */}
        <div className="space-y-1.5 text-xs text-[#5C564C] bg-stone-50/80 p-3.5 rounded-2xl border border-[#EAE5DC] mb-4">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium">• Утро: 1 стакан теплой воды натощак</span>
            <span className="font-bold text-[#1C1A17]">08:00</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium">• Днем: вода с долькой лимона (цитраты)</span>
            <span className="font-bold text-[#1C1A17]">12:00 – 16:00</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium">• Вечер: стакан морса или вода с D-маннозой</span>
            <span className="font-bold text-[#1C1A17]">21:00</span>
          </div>
        </div>
      </div>

      <div>
        {/* Buttons */}
        <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-[#EAE5DC]">
          <button
            onClick={removeGlass}
            disabled={glasses === 0}
            className="h-10 px-3 rounded-xl border border-[#DED7CB] text-[#5C564C] font-semibold hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed text-xs flex items-center gap-1"
          >
            <Minus className="w-3.5 h-3.5" /> -1 стакан
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => addGlass(1)}
              className="h-10 px-4 rounded-xl bg-[#1C1A17] hover:bg-[#2E2B26] text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition active:scale-95"
            >
              <Plus className="w-4 h-4 text-sky-400" /> +250 мл воды
            </button>
          </div>
        </div>

        {/* Clinical Note */}
        <div className="mt-3 bg-sky-50/80 border border-sky-100 rounded-xl p-2.5 flex items-start gap-2.5 text-[11px] leading-relaxed text-[#0F2830]">
          <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <strong>Светло-соломенная прозрачная моча</strong> — главный ориентир. При таком питье оксалаты не слипаются в микролиты, а бактерии не успевают закрепиться на стенках пузыря.
          </div>
        </div>
      </div>
    </div>
  );
};
