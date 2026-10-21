import { Home, UtensilsCrossed, Pill, Stethoscope, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: Home },
    { id: 'meals', label: 'Меню 7 дней', icon: UtensilsCrossed },
    { id: 'supplements', label: 'Аптечка', icon: Pill },
    { id: 'checkup', label: 'Анализы', icon: Stethoscope },
    { id: 'rehab', label: 'Сосуды & Швы', icon: Sparkles }
  ];

  return (
    <>
      {/* Desktop Navigation: Floating Segmented Control */}
      <div className="hidden md:flex items-center justify-center py-3 sticky top-[68px] z-20 pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-stone-200/80 flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs scale-102'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-rose-300' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Navigation with iPhone Safe Area */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-lg border-t border-stone-200/80 shadow-lg pb-safe">
        <div className="grid grid-cols-5 h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 transition-all ${
                  isActive ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <div
                  className={`p-1 rounded-xl transition-all ${
                    isActive ? 'bg-stone-900 text-white shadow-xs' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
