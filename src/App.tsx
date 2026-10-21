import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { MealPlanView } from './components/MealPlanView';
import { SupplementsView } from './components/SupplementsView';
import { CheckupView } from './components/CheckupView';
import { RehabView } from './components/RehabView';
import { GroceryModal } from './components/GroceryModal';
import { Heart } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isGroceryOpen, setIsGroceryOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1D1A] flex flex-col font-sans pb-20 md:pb-10 selection:bg-rose-200 selection:text-rose-900">
      {/* Sleek Floating Top Header */}
      <Header 
        onOpenGrocery={() => setIsGroceryOpen(true)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-5 sm:pt-7">
        {activeTab === 'dashboard' && (
          <DashboardView onNavigateTab={(tab) => setActiveTab(tab)} />
        )}
        {activeTab === 'meals' && (
          <MealPlanView onOpenGrocery={() => setIsGroceryOpen(true)} />
        )}
        {activeTab === 'supplements' && (
          <SupplementsView />
        )}
        {activeTab === 'checkup' && (
          <CheckupView />
        )}
        {activeTab === 'rehab' && (
          <RehabView />
        )}
      </main>

      {/* Mobile Bottom Dock */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Chic Minimalist Footer */}
      <footer className="mt-16 py-8 border-t border-[#EAE5DC]/80 bg-white/40 text-xs text-[#7A756C]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span>С любовью для Вики</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span className="text-stone-300">•</span>
            <span>Москва • 2026</span>
          </div>
          <div className="text-[11px] text-[#8C857B]">
            Персональная программа здоровья • Реактивное SPA
          </div>
        </div>
      </footer>

      {/* Weekly Grocery Modal */}
      <GroceryModal 
        isOpen={isGroceryOpen} 
        onClose={() => setIsGroceryOpen(false)} 
      />
    </div>
  );
}

export default App;
