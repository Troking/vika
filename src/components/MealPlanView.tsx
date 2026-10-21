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
      case 'snack': return 'Полдник / Перекус';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Сбалансированное меню для почек, сосудов и заживления
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Рацион питания на 7 дней
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            1 650 – 1 750 ккал • Достаточно белка (95–100 г) • Без оксалатных перегрузок • Защита от цистита
          </p>
        </div>
        <button
          onClick={onOpenGrocery}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs shadow-indigo-200 transition"
        >
          <ShoppingBag className="w-4 h-4" />
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
              className={`shrink-0 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex flex-col items-center min-w-[72px] ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-200 scale-102'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider opacity-80">День {day.dayNumber}</span>
              <span>{day.dayName}</span>
            </button>
          );
        })}
      </div>

      {/* Day Overview Banner */}
      <div className="bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-4 sm:p-5 border border-indigo-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">Фокус дня:</div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900">{currentDay.focus}</h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-700 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-indigo-100/70">
            <span className="flex items-center gap-1 text-amber-600">
              <Flame className="w-4 h-4" /> {currentDay.totalCalories} ккал
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700">Белки: {currentDay.totalProtein} г</span>
            <span className="text-slate-300">•</span>
            <span className="text-sky-700">Жиры: {currentDay.totalFat} г</span>
            <span className="text-slate-300">•</span>
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
            className={`shrink-0 px-3 py-1.5 rounded-lg font-semibold transition ${
              activeMealFilter === btn.id
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
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
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4"
          >
            {/* Header: Visual Cartoon Icon + Title */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-start gap-4">
                {/* Clickable Symbolic Cartoon Dish Box */}
                <button
                  onClick={() => setSelectedMealForRecipe(meal)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br ${meal.bgGradient} flex items-center justify-center text-3xl sm:text-4xl shadow-xs border border-white shrink-0 hover:scale-105 active:scale-95 transition cursor-pointer group relative`}
                  title="Нажмите, чтобы открыть рецепт"
                >
                  <span>{meal.icon}</span>
                  <div className="absolute -bottom-1.5 inset-x-1 bg-white/95 text-[9px] font-bold text-slate-700 py-0.5 rounded shadow-xs text-center border border-slate-200 opacity-90 group-hover:opacity-100">
                    Рецепт
                  </div>
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                      {getMealTypeLabel(meal.type)}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <Clock className="w-3 h-3" /> {getMealTypeTime(meal.type)}
                    </span>
                    <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {meal.cookTime}
                    </span>
                  </div>
                  <h4 
                    onClick={() => setSelectedMealForRecipe(meal)}
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition"
                  >
                    {meal.title}
                  </h4>
                </div>
              </div>

              {/* Nutrition & Recipe Button */}
              <div className="flex items-center gap-2.5 self-start sm:self-center">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
                  <span className="font-extrabold text-indigo-700">{meal.calories} ккал</span>
                  <span className="text-slate-300">|</span>
                  <span>Б: {meal.protein}г</span>
                  <span>Ж: {meal.fat}г</span>
                  <span>У: {meal.carbs}г</span>
                </div>

                <button
                  onClick={() => setSelectedMealForRecipe(meal)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Рецепт</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {meal.description}
            </p>

            {/* Products Used (Cartoon Product Badges) */}
            <div className="bg-slate-50/70 rounded-2xl p-3.5 border border-slate-100">
              <div className="text-xs font-extrabold text-slate-700 mb-2 flex items-center justify-between">
                <span>Используемые продукты в блюде:</span>
                <span className="text-[11px] font-medium text-slate-400">Нажмите на блюдо для рецепта</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {meal.products.map((prod, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedMealForRecipe(meal)}
                    className="bg-white hover:bg-indigo-50/60 p-1.5 pr-2.5 rounded-xl border border-slate-200/70 text-xs font-medium text-slate-700 flex items-center gap-1.5 cursor-pointer transition shadow-xs"
                  >
                    <span className="text-base p-1 bg-slate-50 rounded-lg">{prod.icon}</span>
                    <span>{prod.name}</span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1 rounded">
                      {prod.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-indigo-50/40 rounded-xl p-3.5 border border-indigo-100/60">
              <div className="text-xs font-bold text-indigo-900 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Польза для Вики:
              </div>
              <div className="flex flex-wrap gap-2">
                {meal.benefits.map((b, i) => (
                  <span key={i} className="text-xs text-indigo-950 flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-lg border border-indigo-100/50">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Kidney & Stone Prevention Note */}
            {meal.kidneySafetyNote && (
              <div className="bg-emerald-50/60 border border-emerald-100/80 rounded-xl p-3 flex items-start gap-2 text-xs text-emerald-900">
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
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md">
        <h4 className="text-base font-bold mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-400" />
          5 золотых правил питания для Вики
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 leading-relaxed">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="font-bold text-white block mb-0.5">1. Не отказываться от молочного кальция:</span>
            Кальций из творога и сыра связывает оксалаты прямо в просвете кишечника, предотвращая их попадание в почки.
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="font-bold text-white block mb-0.5">2. Ограничить скрытую соль:</span>
            Избыток натрия (колбасы, чипсы, соленья) заставляет почки усиленно выводить кальций в мочу, формируя песок.
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="font-bold text-white block mb-0.5">3. Белок для заживления груди:</span>
            95–100 г полноценного белка в день обеспечивают строительный материал (пролин, лизин) для эластичных рубцов.
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
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
