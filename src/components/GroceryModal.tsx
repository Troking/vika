import { useState, useEffect } from 'react';
import { GROCERY_LIST } from '../data/groceryList';
import { 
  X, 
  ShoppingBag, 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  Store,
  Sparkles
} from 'lucide-react';

interface GroceryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroceryModal = ({ isOpen, onClose }: GroceryModalProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('vika_grocery_checked');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('vika_grocery_checked', JSON.stringify(checkedItems));
  }, [checkedItems]);

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetAll = () => {
    if (window.confirm('Сбросить все отметки в списке покупок?')) {
      setCheckedItems({});
    }
  };

  const categories = [
    { id: 'all', label: 'Все продукты' },
    { id: 'vegetables', label: '🥦 Овощи и зелень' },
    { id: 'protein', label: '🥩 Мясо и рыба' },
    { id: 'dairy', label: '🧀 Молочное' },
    { id: 'fruits_berries', label: '🫐 Ягоды' },
    { id: 'grains', label: '🌾 Крупы' },
    { id: 'healthy_fats', label: '🥑 Жиры' },
    { id: 'beverages', label: '💧 Вода' }
  ];

  const filteredItems = activeCategory === 'all'
    ? GROCERY_LIST
    : GROCERY_LIST.filter((item) => item.category === activeCategory);

  const totalItems = GROCERY_LIST.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200"
        role="dialog"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-900">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Корзина продуктов на неделю (Москва)
              </h3>
              <p className="text-xs text-stone-500">
                Куплено: <strong className="text-stone-900 font-bold">{checkedCount}</strong> из {totalItems} позиций
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              title="Сбросить все галочки"
              className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-100 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="px-5 py-2.5 bg-stone-50 border-b border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl font-semibold transition ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200/60 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grocery Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
          {filteredItems.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  isChecked
                    ? 'bg-emerald-50/40 border-emerald-200/80 text-emerald-950'
                    : 'bg-white hover:bg-stone-50/80 border-stone-200/80 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-1.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300" />
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-200/60 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs sm:text-sm font-bold ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                        {item.name}
                      </span>
                      <span className="text-xs font-semibold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md shrink-0">
                        {item.amount}
                      </span>
                    </div>

                    {item.note && (
                      <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                        {item.note}
                      </p>
                    )}

                    <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-1">
                      <Store className="w-3 h-3" />
                      <span>{item.storeTip}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-stone-900">
                    {item.estPrice}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-stone-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Ориентировочный бюджет недели (Москва): <strong className="text-stone-900 font-extrabold">~4 800 – 6 500 ₽</strong>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-stone-900 text-white font-bold hover:bg-stone-800 transition shadow-xs"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
