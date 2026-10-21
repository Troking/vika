import { Home, UtensilsCrossed, Pill, Stethoscope, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: Home },
    { id: 'meals', label: 'Меню', icon: UtensilsCrossed },
    { id: 'supplements', label: 'Аптечка', icon: Pill },
    { id: 'checkup', label: 'Анализы', icon: Stethoscope },
    { id: 'rehab', label: 'Сосуды', icon: Sparkles }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-xl border-t border-[#EAE5DC] shadow-lg pb-safe">
      <div className="grid grid-cols-5 h-15">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all ${
                isActive ? 'text-[#1C1A17] font-bold' : 'text-[#8C857B] hover:text-[#1C1A17]'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-[#1C1A17] text-white shadow-xs' : ''
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
