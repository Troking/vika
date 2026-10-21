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

export const GroceryModal: React.FC<GroceryModalProps> = ({ isOpen, onClose }) => {
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
    { id: 'dairy', label: '🧀 Молочное (кальций)' },
    { id: 'fruits_berries', label: '🫐 Ягоды (антицистит)' },
    { id: 'grains', label: '🌾 Крупы и бакалея' },
    { id: 'healthy_fats', label: '🥑 Полезные жиры' },
    { id: 'beverages', label: '💧 Минеральная вода' }
  ];

  const filteredItems = activeCategory === 'all'
    ? GROCERY_LIST
    : GROCERY_LIST.filter((item) => item.category === activeCategory);

  const totalItems = GROCERY_LIST.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100"
        role="dialog"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Корзина продуктов на неделю (Москва)
              </h3>
              <p className="text-xs text-slate-500">
                Куплено: <span className="text-indigo-600 font-bold">{checkedCount}</span> из {totalItems} позиций
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              title="Сбросить все галочки"
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg font-bold transition ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
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
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs sm:text-sm font-bold ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {item.name}
                      </span>
                      <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md shrink-0">
                        {item.amount}
                      </span>
                    </div>

                    {item.note && (
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.note}
                      </p>
                    )}

                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                      <Store className="w-3 h-3" />
                      <span>{item.storeTip}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-slate-800">
                    {item.estPrice}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Ориентировочный бюджет недели (Москва): <strong className="text-slate-900 font-extrabold">~4 800 – 6 500 ₽</strong>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
