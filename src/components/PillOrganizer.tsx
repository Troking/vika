import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Sun, Sunset, Moon, Sparkles, AlertCircle } from 'lucide-react';
import { SUPPLEMENTS } from '../data/supplements';

interface PillOrganizerProps {
  onOpenSupplementsTab?: () => void;
}

export const PillOrganizer = ({ onOpenSupplementsTab }: PillOrganizerProps) => {
  const [selectedTiming, setSelectedTiming] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('morning');
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

  const morningPills = SUPPLEMENTS.filter((s) => s.timing === 'morning' && s.priority !== 'conditional');
  const afternoonPills = SUPPLEMENTS.filter((s) => s.timing === 'afternoon' && s.priority !== 'conditional');
  const eveningPills = SUPPLEMENTS.filter((s) => s.timing === 'evening' && s.priority !== 'conditional');

  const totalCorePills = morningPills.length + afternoonPills.length + eveningPills.length;
  const takenCount = [...morningPills, ...afternoonPills, ...eveningPills].filter((p) => checkedPills[p.id]).length;
  const pillProgress = Math.round((takenCount / totalCorePills) * 100);

  const displayGroups = [
    { id: 'morning', label: 'Утро (с завтраком)', icon: Sun, pills: morningPills },
    { id: 'afternoon', label: 'День / Обед (после еды)', icon: Sunset, pills: afternoonPills },
    { id: 'evening', label: 'Вечер (за 40 мин до сна)', icon: Moon, pills: eveningPills },
  ].filter((group) => selectedTiming === 'all' || group.id === selectedTiming);

  return (
    <div className="bento-card p-6 flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100/80 flex items-center justify-center text-rose-500 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#1C1A17]">Таблетница на день</h3>
              <p className="text-xs text-[#7A756C]">Принято: {takenCount} из {totalCorePills}</p>
            </div>
          </div>
          <span className="pill-chip bg-[#1C1A17] text-white">
            {pillProgress}% принято
          </span>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-100/80 rounded-2xl mb-4 text-xs font-semibold">
          {[
            { id: 'morning', label: '☀️ Утро (5)' },
            { id: 'afternoon', label: '⛅ Обед (2)' },
            { id: 'evening', label: '🌙 Вечер (3)' },
            { id: 'all', label: 'Все (10)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTiming(tab.id as any)}
              className={`flex-1 py-1.5 px-2 rounded-xl transition text-center ${
                selectedTiming === tab.id
                  ? 'bg-white text-[#1C1A17] shadow-xs font-bold'
                  : 'text-[#6B655B] hover:text-[#1C1A17]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pill Groups with NO text truncation */}
        <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
          {displayGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.id} className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#6B655B] px-1">
                  <GroupIcon className="w-3.5 h-3.5 text-stone-500" />
                  <span>{group.label}</span>
                </div>

                <div className="space-y-2">
                  {group.pills.map((pill) => {
                    const isDone = !!checkedPills[pill.id];
                    return (
                      <button
                        key={pill.id}
                        onClick={() => togglePill(pill.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          isDone
                            ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                            : 'bg-white hover:bg-stone-50 border-[#E8E2D8] text-[#1C1A17] shadow-2xs'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="mt-0.5 shrink-0">
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-stone-300 hover:text-stone-500 transition" />
                            )}
                          </div>
                          <div>
                            <div className={`text-xs font-bold leading-snug ${isDone ? 'line-through text-stone-400' : 'text-[#1C1A17]'}`}>
                              {pill.name}
                            </div>
                            <div className="text-[11px] text-[#7A756C] mt-0.5">
                              {pill.dosage}
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold text-[#5C564C] bg-stone-100 px-2 py-0.5 rounded-md shrink-0 border border-[#E0D9CD]">
                          {pill.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {onOpenSupplementsTab && (
        <button
          onClick={onOpenSupplementsTab}
          className="mt-4 w-full py-2.5 px-3 rounded-2xl border border-dashed border-[#D5CEC2] text-[#5C564C] text-xs font-semibold hover:bg-stone-50 transition flex items-center justify-center gap-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> Открыть полный каталог препаратов и цен в Москве ➔
        </button>
      )}
    </div>
  );
};
