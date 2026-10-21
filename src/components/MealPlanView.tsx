import { useState } from 'react';
import { WEEKLY_MEAL_PLAN } from '../data/mealPlan';
import type { Meal } from '../types';
import { 
  UtensilsCrossed, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  ShoppingBag, 
  Clock, 
  CheckCircle2,
  Info
} from 'lucide-react';

interface MealPlanViewProps {
  onOpenGrocery: () => void;
}

export const MealPlanView: React.FC<MealPlanViewProps> = ({ onOpenGrocery }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [activeMealFilter, setActiveMealFilter] = useState<string>('all');

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

      {/* Meals Grid */}
      <div className="grid grid-cols-1 gap-5">
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {getMealTypeLabel(meal.type)}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                    <Clock className="w-3 h-3" /> {getMealTypeTime(meal.type)}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  {meal.title}
                </h4>
              </div>

              {/* Nutrition Pill */}
              <div className="self-start sm:self-center flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
                <span className="font-extrabold text-indigo-700">{meal.calories} ккал</span>
                <span className="text-slate-300">|</span>
                <span>Б: {meal.protein}г</span>
                <span>Ж: {meal.fat}г</span>
                <span>У: {meal.carbs}г</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {meal.description}
            </p>

            {/* Ingredients & Benefits 2-Col */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Ingredients */}
              <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-100">
                <div className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-slate-500" /> Состав и точные граммовки:
                </div>
                <ul className="space-y-1.5">
                  {meal.ingredients.map((ing, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-indigo-50/40 rounded-xl p-3.5 border border-indigo-100/60">
                <div className="text-xs font-bold text-indigo-900 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Польза для здоровья Вики:
                </div>
                <ul className="space-y-1.5">
                  {meal.benefits.map((b, i) => (
                    <li key={i} className="text-xs text-indigo-950 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
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
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
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
    </div>
  );
};
