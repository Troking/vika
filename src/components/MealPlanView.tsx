import { useState } from 'react';
import { WEEKLY_MEAL_PLAN } from '../data/mealPlan';
import type { Meal } from '../types';
import { RecipeModal } from './RecipeModal';
import { 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  ShoppingBag, 
  Clock, 
  CheckCircle2,
  Info,
  BookOpen
} from 'lucide-react';

interface MealPlanViewProps {
  onOpenGrocery: () => void;
}

export const MealPlanView = ({ onOpenGrocery }: MealPlanViewProps) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [activeMealFilter, setActiveMealFilter] = useState<string>('all');
  const [selectedMealForRecipe, setSelectedMealForRecipe] = useState<Meal | null>(null);

  const currentDay = WEEKLY_MEAL_PLAN[selectedDayIndex];

  const filteredMeals = activeMealFilter === 'all'
    ? currentDay.meals
    : currentDay.meals.filter((m) => m.type === activeMealFilter);

  const getMealTypeLabel = (type: Meal['type']) => {
    switch (type) {
      case 'breakfast': return 'Завтрак';
      case 'lunch': return 'Обед';
      case 'snack': return 'Полдник';
      case 'dinner': return 'Ужин';
    }
  };

  const getMealTypeTime = (type: Meal['type']) => {
    switch (type) {
      case 'breakfast': return '08:00 – 09:30';
      case 'lunch': return '13:00 – 14:30';
      case 'snack': return '16:30 – 17:30';
      case 'dinner': return '19:00 – 20:30';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Grocery CTA */}
      <div className="card-warm rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full mb-2 border border-emerald-200/60">
            <Sparkles className="w-3.5 h-3.5" /> Сбалансированное меню для почек, сосудов и заживления
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Рацион питания на 7 дней
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            1 650 – 1 750 ккал • Достаточно белка (95–100 г) • Без оксалатных перегрузок • Защита от цистита
          </p>
        </div>
        <button
          onClick={onOpenGrocery}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm shadow-xs transition"
        >
          <ShoppingBag className="w-4 h-4 text-rose-300" />
          Список продуктов на неделю
        </button>
      </div>

      {/* Days Tabs (Scrollable on iOS) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {WEEKLY_MEAL_PLAN.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDayIndex(idx)}
              className={`shrink-0 px-4 py-2.5 rounded-2xl font-semibold text-xs sm:text-sm transition-all flex flex-col items-center min-w-[76px] ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-xs scale-102'
                  : 'bg-white text-stone-600 hover:bg-stone-100/70 border border-stone-200/80'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider opacity-70">День {day.dayNumber}</span>
              <span>{day.dayName}</span>
            </button>
          );
        })}
      </div>

      {/* Day Overview Banner */}
      <div className="bg-gradient-to-r from-stone-100 via-stone-50 to-amber-50/50 rounded-3xl p-5 sm:p-6 border border-stone-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Фокус дня:</div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900">{currentDay.focus}</h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-stone-700 bg-white p-3 rounded-2xl border border-stone-200/70 shadow-2xs">
            <span className="flex items-center gap-1 text-amber-600">
              <Flame className="w-4 h-4" /> {currentDay.totalCalories} ккал
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-emerald-700">Белки: {currentDay.totalProtein} г</span>
            <span className="text-stone-300">•</span>
            <span className="text-sky-700">Жиры: {currentDay.totalFat} г</span>
            <span className="text-stone-300">•</span>
            <span className="text-purple-700">Углеводы: {currentDay.totalCarbs} г</span>
          </div>
        </div>
      </div>

      {/* Filter by Meal Type */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {[
          { id: 'all', label: 'Все приемы пищи (4)' },
          { id: 'breakfast', label: '🍳 Завтрак' },
          { id: 'lunch', label: '🍲 Обед' },
          { id: 'snack', label: '🫐 Полдник' },
          { id: 'dinner', label: '🥗 Ужин' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveMealFilter(btn.id)}
            className={`shrink-0 px-3.5 py-2 rounded-xl font-medium transition ${
              activeMealFilter === btn.id
                ? 'bg-stone-900 text-white shadow-xs font-semibold'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Meals Grid with Cartoonish Visuals */}
      <div className="grid grid-cols-1 gap-5">
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            className="card-warm rounded-3xl p-6 sm:p-7 space-y-4"
          >
            {/* Header: Visual Cartoon Icon + Title */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-100 pb-4">
              <div className="flex items-start gap-4">
                {/* Clickable Symbolic Cartoon Dish Box */}
                <button
                  onClick={() => setSelectedMealForRecipe(meal)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${meal.bgGradient} flex items-center justify-center text-3xl sm:text-4xl shadow-xs border border-white shrink-0 hover:scale-105 active:scale-95 transition cursor-pointer group relative`}
                  title="Нажмите, чтобы открыть рецепт"
                >
                  <span>{meal.icon}</span>
                  <div className="absolute -bottom-1.5 inset-x-1 bg-white/95 text-[9px] font-bold text-stone-700 py-0.5 rounded shadow-xs text-center border border-stone-200 opacity-90 group-hover:opacity-100">
                    Рецепт
                  </div>
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-lg border border-stone-200/60">
                      {getMealTypeLabel(meal.type)}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-stone-400">
                      <Clock className="w-3 h-3" /> {getMealTypeTime(meal.type)}
                    </span>
                    <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                      {meal.cookTime}
                    </span>
                  </div>
                  <h4 
                    onClick={() => setSelectedMealForRecipe(meal)}
                    className="text-base sm:text-lg font-bold text-stone-900 hover:text-rose-700 cursor-pointer transition"
                  >
                    {meal.title}
                  </h4>
                </div>
              </div>

              {/* Nutrition & Recipe Button */}
              <div className="flex items-center gap-2.5 self-start sm:self-center">
                <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700">
                  <span className="font-extrabold text-stone-900">{meal.calories} ккал</span>
                  <span className="text-stone-300">|</span>
                  <span>Б: {meal.protein}г</span>
                  <span>Ж: {meal.fat}г</span>
                  <span>У: {meal.carbs}г</span>
                </div>

                <button
                  onClick={() => setSelectedMealForRecipe(meal)}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs border border-stone-200/80"
                >
                  <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">Рецепт</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {meal.description}
            </p>

            {/* Products Used (Cartoon Product Badges) */}
            <div className="bg-stone-50/70 rounded-2xl p-4 border border-stone-100">
              <div className="text-xs font-bold text-stone-700 mb-2.5 flex items-center justify-between">
                <span>Используемые продукты в блюде:</span>
                <span className="text-[11px] font-medium text-stone-400">Нажмите на блюдо для рецепта</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {meal.products.map((prod, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedMealForRecipe(meal)}
                    className="bg-white hover:bg-stone-100/60 p-2 pr-3 rounded-xl border border-stone-200/80 text-xs font-medium text-stone-700 flex items-center gap-2 cursor-pointer transition shadow-2xs"
                  >
                    <span className="text-base p-1 bg-stone-50 rounded-lg">{prod.icon}</span>
                    <span>{prod.name}</span>
                    <span className="text-[10px] font-bold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded">
                      {prod.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-100">
              <div className="text-xs font-bold text-stone-800 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Польза для Вики:
              </div>
              <div className="flex flex-wrap gap-2">
                {meal.benefits.map((b, i) => (
                  <span key={i} className="text-xs text-stone-700 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-stone-200/60">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Kidney & Stone Prevention Note */}
            {meal.kidneySafetyNote && (
              <div className="bg-emerald-50/60 border border-emerald-100/80 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Почки и цистит: </span>
                  {meal.kidneySafetyNote}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Nutrition Rules summary footer */}
      <div className="bg-[#282B30] text-white rounded-3xl p-6 shadow-sm">
        <h4 className="text-base font-bold mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-rose-300" />
          5 золотых правил питания для Вики
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300 leading-relaxed">
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <span className="font-bold text-white block mb-0.5">1. Не отказываться от молочного кальция:</span>
            Кальций из творога и сыра связывает оксалаты прямо в просвете кишечника, предотвращая их попадание в почки.
          </div>
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <span className="font-bold text-white block mb-0.5">2. Ограничить скрытую соль:</span>
            Избыток натрия (колбасы, чипсы, соленья) заставляет почки усиленно выводить кальций в мочу, формируя песок.
          </div>
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <span className="font-bold text-white block mb-0.5">3. Белок для заживления груди:</span>
            95–100 г полноценного белка в день обеспечивают строительный материал (пролин, лизин) для эластичных рубцов.
          </div>
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <span className="font-bold text-white block mb-0.5">4. Цитратный морс без сахара:</span>
            Клюкву и бруснику разминать теплой водой — цитраты препятствуют кристаллизации оксалата кальция.
          </div>
        </div>
      </div>

      {/* Recipe Modal */}
      <RecipeModal
        meal={selectedMealForRecipe}
        onClose={() => setSelectedMealForRecipe(null)}
      />
    </div>
  );
};
