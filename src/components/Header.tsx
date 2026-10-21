import { ShoppingBag, Heart, Shield, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenGrocery: () => void;
  activeTab?: string;
}

export const Header = ({ onOpenGrocery }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 bg-[#fbf9f5]/90 backdrop-blur-md border-b border-stone-200/60 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Branding & Patient Profile */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-rose-100 via-orange-50 to-amber-100 p-0.5 border border-rose-200/50 shadow-xs flex items-center justify-center text-2xl">
            🌸
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                Забота о здоровье Вики
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50/80 px-2.5 py-0.5 rounded-full border border-rose-200/60">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" /> 25 лет • Москва
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
              <span className="font-medium text-stone-600">1 мес. после маммопластики</span>
              <span className="text-stone-300">•</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-600" /> Защита почек и цистита
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenGrocery}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm shadow-xs transition active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-rose-300" />
            <span className="hidden xs:inline">Список продуктов</span>
            <span className="xs:hidden">Покупки</span>
          </button>
        </div>
      </div>

      {/* Mobile status banner */}
      <div className="sm:hidden px-4 pb-2.5 pt-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
        <span className="shrink-0 bg-white border border-stone-200/60 text-stone-700 font-medium px-2.5 py-0.5 rounded-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> Рацион: ~1680 ккал
        </span>
        <span className="shrink-0 bg-white border border-stone-200/60 text-sky-700 font-medium px-2.5 py-0.5 rounded-lg">
          Норма воды: 2.5 л
        </span>
        <span className="shrink-0 bg-rose-50 border border-rose-100 text-rose-800 font-medium px-2.5 py-0.5 rounded-lg">
          Укрепление сосудов
        </span>
      </div>
    </header>
  );
};
