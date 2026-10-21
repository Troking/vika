import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Sun, Sunset, Moon, Sparkles, AlertCircle } from 'lucide-react';
import { SUPPLEMENTS } from '../data/supplements';

interface PillOrganizerProps {
  onOpenSupplementsTab?: () => void;
}

export const PillOrganizer = ({ onOpenSupplementsTab }: PillOrganizerProps) => {
  const [checkedPills, setCheckedPills] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('vika_checked_pills');
    const savedDate = localStorage.getItem('vika_pills_date');
    const today = new Date().toDateString();

    if (savedDate === today && saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('vika_checked_pills', JSON.stringify(checkedPills));
    localStorage.setItem('vika_pills_date', new Date().toDateString());
  }, [checkedPills]);

  const togglePill = (id: string) => {
    setCheckedPills((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Group high priority daily supplements by timing
  const morningPills = SUPPLEMENTS.filter((s) => s.timing === 'morning' && s.priority !== 'conditional');
  const afternoonPills = SUPPLEMENTS.filter((s) => s.timing === 'afternoon' && s.priority !== 'conditional');
  const eveningPills = SUPPLEMENTS.filter((s) => s.timing === 'evening' && s.priority !== 'conditional');

  const totalCorePills = morningPills.length + afternoonPills.length + eveningPills.length;
  const takenCount = [...morningPills, ...afternoonPills, ...eveningPills].filter((p) => checkedPills[p.id]).length;
  const pillProgress = Math.round((takenCount / totalCorePills) * 100);

  return (
    <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Таблетница на сегодня</h3>
            <p className="text-xs text-slate-500">Помощник против забывчивости • {takenCount} из {totalCorePills} принято</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
            {pillProgress}% принято
          </span>
        </div>
      </div>

      {/* Timing Blocks */}
      <div className="space-y-4">
        {/* Morning */}
        <div className="bg-amber-50/40 rounded-xl p-3 border border-amber-100/60">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Утро (во время сытного завтрака)</span>
          </div>
          <div className="space-y-1.5">
            {morningPills.map((pill) => {
              const isDone = !!checkedPills[pill.id];
              return (
                <button
                  key={pill.id}
                  onClick={() => togglePill(pill.id)}
                  className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-all ${
                    isDone
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/70'
                      : 'bg-white hover:bg-amber-50/80 text-slate-700 border border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className={`text-xs font-bold truncate ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {pill.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{pill.dosage}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded shrink-0">
                    {pill.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Afternoon / Lunch */}
        <div className="bg-orange-50/40 rounded-xl p-3 border border-orange-100/60">
          <div className="flex items-center gap-2 mb-2">
            <Sunset className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-900">День / Обед (после еды)</span>
          </div>
          <div className="space-y-1.5">
            {afternoonPills.map((pill) => {
              const isDone = !!checkedPills[pill.id];
              return (
                <button
                  key={pill.id}
                  onClick={() => togglePill(pill.id)}
                  className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-all ${
                    isDone
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/70'
                      : 'bg-white hover:bg-orange-50/80 text-slate-700 border border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className={`text-xs font-bold truncate ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {pill.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{pill.dosage}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded shrink-0">
                    {pill.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Evening */}
        <div className="bg-indigo-50/40 rounded-xl p-3 border border-indigo-100/60">
          <div className="flex items-center gap-2 mb-2">
            <Moon className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">Вечер (за 40 мин до сна)</span>
          </div>
          <div className="space-y-1.5">
            {eveningPills.map((pill) => {
              const isDone = !!checkedPills[pill.id];
              return (
                <button
                  key={pill.id}
                  onClick={() => togglePill(pill.id)}
                  className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-all ${
                    isDone
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/70'
                      : 'bg-white hover:bg-indigo-50/80 text-slate-700 border border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className={`text-xs font-bold truncate ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {pill.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{pill.dosage}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded shrink-0">
                    {pill.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {onOpenSupplementsTab && (
        <button
          onClick={onOpenSupplementsTab}
          className="mt-4 w-full py-2.5 px-3 rounded-xl border border-dashed border-purple-200 text-purple-700 text-xs font-semibold hover:bg-purple-50 transition flex items-center justify-center gap-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5" /> Открыть полный справочник лекарств и цен Москвы
        </button>
      )}
    </div>
  );
};
