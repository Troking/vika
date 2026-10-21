import { useEffect } from 'react';
import type { Meal } from '../types';
import { 
  X, 
  Clock, 
  ChefHat, 
  Sparkles, 
  ShieldCheck, 
  Utensils, 
  Flame,
  CheckCircle2
} from 'lucide-react';

interface RecipeModalProps {
  meal: Meal | null;
  onClose: () => void;
}

export const RecipeModal = ({ meal, onClose }: RecipeModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (meal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [meal, onClose]);

  if (!meal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200"
        role="dialog"
      >
        {/* Top Visual Banner */}
        <div className={`relative p-6 sm:p-7 bg-gradient-to-r ${meal.bgGradient} border-b border-stone-100 flex items-start justify-between gap-4`}>
          <div className="flex items-center gap-4">
            {/* Big Cartoonish / Symbolic Dish Visual */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/95 shadow-md flex items-center justify-center text-4xl sm:text-5xl shrink-0 border border-white/80 animate-in zoom-in-75 duration-300">
              {meal.icon}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-800 bg-white/90 px-2.5 py-0.5 rounded-full border border-stone-200/60 shadow-2xs">
                  {meal.type === 'breakfast' && '🍳 Завтрак'}
                  {meal.type === 'lunch' && '🍲 Обед'}
                  {meal.type === 'snack' && '🫐 Полдник'}
                  {meal.type === 'dinner' && '🥗 Ужин'}
                </span>
                <span className="text-[11px] font-semibold text-stone-600 bg-white/90 px-2.5 py-0.5 rounded-full border border-stone-200/60 flex items-center gap-1 shadow-2xs">
                  <Clock className="w-3 h-3 text-stone-500" /> {meal.cookTime}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-tight">
                {meal.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-800 rounded-full bg-white/90 hover:bg-white shadow-2xs transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
          {/* Macronutrients Bar */}
          <div className="flex items-center justify-around bg-stone-50 p-3.5 rounded-2xl border border-stone-200/70 text-center">
            <div>
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Калории</div>
              <div className="text-base font-extrabold text-amber-600 flex items-center justify-center gap-0.5">
                <Flame className="w-4 h-4" /> {meal.calories}
              </div>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div>
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Белки</div>
              <div className="text-base font-extrabold text-emerald-700">{meal.protein} г</div>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div>
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Жиры</div>
              <div className="text-base font-extrabold text-sky-700">{meal.fat} г</div>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div>
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Углеводы</div>
              <div className="text-base font-extrabold text-purple-700">{meal.carbs} г</div>
            </div>
          </div>

          {/* Visual Products / Ingredients Section */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-rose-500" />
              Используемые продукты для готовки:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {meal.products.map((prod, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50/80 hover:bg-stone-100/70 p-2.5 rounded-2xl border border-stone-200/80 transition flex items-center gap-2.5 shadow-2xs"
                >
                  <span className="text-2xl shrink-0 p-1.5 bg-white rounded-xl shadow-2xs border border-stone-100">
                    {prod.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-800 truncate">{prod.name}</div>
                    <div className="text-[11px] font-semibold text-stone-600">{prod.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Cooking Steps */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-emerald-600" />
              Пошаговый рецепт приготовления:
            </h4>
            <div className="space-y-3">
              {meal.recipeSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50/60 border border-stone-150 hover:border-stone-300 transition"
                >
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chef Tip for Vika's health */}
          {meal.chefTip && (
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-amber-950">
                <span className="font-bold text-amber-900 block mb-0.5">
                  Секрет шефа для здоровья Вики:
                </span>
                {meal.chefTip}
              </div>
            </div>
          )}

          {/* Kidney & Cystitis Note */}
          {meal.kidneySafetyNote && (
            <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-sky-950">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Почки и цистит: </span>
                {meal.kidneySafetyNote}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <div className="text-xs text-stone-500 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Время готовки: <strong className="text-stone-800">{meal.cookTime}</strong> • Сложность: <strong className="text-stone-800">{meal.difficulty}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition shadow-xs"
          >
            Понятно, закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
