import { ShoppingBag, Activity, Heart, Shield, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenGrocery: () => void;
  activeTab?: string;
}

export const Header = ({ onOpenGrocery }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Branding & Patient Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-500 via-purple-500 to-rose-400 p-0.5 shadow-xs shadow-indigo-200">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <span className="text-xl">🌸</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                Здоровье Вики
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> 25 лет • Москва
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="hidden sm:inline">Восстановление 1 мес. после операции</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <Shield className="w-3 h-3" /> Защита почек и цистита
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGrocery}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs shadow-indigo-200 transition active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">Корзина покупок</span>
            <span className="xs:hidden">Покупки</span>
          </button>
        </div>
      </div>

      {/* Sub-bar for mobile status pills */}
      <div className="sm:hidden px-4 pb-2.5 pt-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
        <span className="shrink-0 bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> КБЖУ: ~1700 ккал
        </span>
        <span className="shrink-0 bg-sky-50 text-sky-700 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
          <Activity className="w-3 h-3 text-sky-500" /> Вода: 2.5 л
        </span>
        <span className="shrink-0 bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded-md">
          1 мес. post-op
        </span>
      </div>
    </header>
  );
};
