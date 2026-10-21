import { ShoppingBag, Heart } from 'lucide-react';

interface HeaderProps {
  onOpenGrocery: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header = ({ onOpenGrocery, activeTab, setActiveTab }: HeaderProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Главная' },
    { id: 'meals', label: 'Меню 7 дней' },
    { id: 'supplements', label: 'Аптечка' },
    { id: 'checkup', label: 'Анализы' },
    { id: 'rehab', label: 'Сосуды & Швы' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/80 backdrop-blur-xl border-b border-[#EAE5DC]/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Chic Brand & Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#E4DED4] shadow-xs flex items-center justify-center text-xl shrink-0">
            🌸
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-base tracking-tight text-[#1C1A17]">
                Виктория
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/50">
                <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" /> 25 лет • Москва
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#7A756C] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>1 мес. после операции</span>
              <span className="text-stone-300">•</span>
              <span className="text-emerald-700">Защита почек & цистита</span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Integrated Segmented Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/90 p-1 rounded-2xl border border-[#E4DED4] shadow-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1C1A17] text-white shadow-xs'
                    : 'text-[#6B655B] hover:text-[#1C1A17] hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Shopping Cart CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGrocery}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#1C1A17] hover:bg-[#2E2B26] text-white font-semibold text-xs transition active:scale-95 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-rose-300" />
            <span className="hidden xs:inline">Корзина покупок</span>
            <span className="xs:hidden">Покупки</span>
          </button>
        </div>
      </div>

      {/* Mobile Top Sub-bar */}
      <div className="md:hidden px-4 pb-2 pt-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-3 py-1 rounded-xl font-bold transition ${
                isActive
                  ? 'bg-[#1C1A17] text-white shadow-xs'
                  : 'bg-white border border-[#E4DED4] text-[#6B655B]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
