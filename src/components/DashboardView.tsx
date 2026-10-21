import { useState } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  HeartHandshake, 
  ArrowRight,
  Brain,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { WaterTracker } from './WaterTracker';
import { PillOrganizer } from './PillOrganizer';
import { RecipeModal } from './RecipeModal';
import { WEEKLY_MEAL_PLAN } from '../data/mealPlan';
import type { Meal } from '../types';

interface DashboardViewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardView = ({ onNavigateTab }: DashboardViewProps) => {
  const [selectedMealForRecipe, setSelectedMealForRecipe] = useState<Meal | null>(null);
  const todayPlan = WEEKLY_MEAL_PLAN[0]; // Monday as sample/default

  return (
    <div className="space-y-6 pb-8">
      {/* Personalized Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-semibold text-indigo-200 mb-3 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Индивидуальная стратегия здоровья и реабилитации
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Привет, Вика! 🌸 Твой персональный план
          </h2>
          <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed mb-5">
            Программа составлена специально с учетом твоих пожеланий: защита почек от солей и камней, профилактика цистита, бережное снижение веса, укрепление сосудов и мягкое восстановление спустя 1 месяц после уменьшения груди.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-indigo-700/50">
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
              <div className="text-[11px] text-indigo-200 font-medium">Калораж дня</div>
              <div className="text-base font-bold text-white">~1 680 ккал</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
              <div className="text-[11px] text-indigo-200 font-medium">Цель белка</div>
              <div className="text-base font-bold text-emerald-300">95–100 г</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
              <div className="text-[11px] text-indigo-200 font-medium">Норма воды</div>
              <div className="text-base font-bold text-sky-300">2.5 литра</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
              <div className="text-[11px] text-indigo-200 font-medium">Срок после операции</div>
              <div className="text-base font-bold text-rose-300">1 месяц</div>
            </div>
          </div>
        </div>

        {/* Ambient subtle decorative shape */}
        <div className="absolute right-[-40px] top-[-40px] w-80 h-80 rounded-full bg-linear-to-br from-indigo-500/20 to-purple-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Two interactive widgets: Water & Pills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <WaterTracker />
        <PillOrganizer onOpenSupplementsTab={() => onNavigateTab('supplements')} />
      </div>

      {/* 4 Pillars of Health Cards */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" /> 4 ключевых направления программы
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs hover:border-sky-300 transition">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Почки и цистит</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              D-манноза связывает кишечную палочку E. coli, брусника и клюква дезинфицируют, а цитраты лимона не дают солям превращаться в камни.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-xs hover:border-purple-300 transition">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Память и энергия</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Устранение скрытой анемии (ферритин после операции!), омега-3 для синапсов мозга, коэнзим Q10 и витамин D3 для снятия усталости.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-xs hover:border-rose-300 transition">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Сосуды и чувствительность</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Магний бисглицинат снимает спазмы сосудов и тревожность, рутин укрепляет капилляры, правила ортостатики берегут от скачков давления.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs hover:border-emerald-300 transition">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">1 мес. после маммопластики</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Достаточное количество чистого белка (индейка, рыба, творог) и цинка для эластичного рубцевания без перегрузки грудных мышц.
            </p>
          </div>
        </div>
      </div>

      {/* Today's Meals Quick Peek with Cartoon Icons & Click to Recipe */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Меню на день</span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">{todayPlan.dayName}: {todayPlan.focus}</h3>
          </div>
          <button
            onClick={() => onNavigateTab('meals')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
          >
            Все 7 дней <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {todayPlan.meals.map((meal) => (
            <div
              key={meal.id}
              onClick={() => setSelectedMealForRecipe(meal)}
              className="bg-slate-50 hover:bg-white rounded-2xl p-3.5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-sm transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2">
                  <span className="uppercase">
                    {meal.type === 'breakfast' && 'Завтрак'}
                    {meal.type === 'lunch' && 'Обед'}
                    {meal.type === 'snack' && 'Полдник'}
                    {meal.type === 'dinner' && 'Ужин'}
                  </span>
                  <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{meal.calories} ккал</span>
                </div>

                {/* Cute symbolic dish icon */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${meal.bgGradient} flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition shadow-2xs`}>
                    {meal.icon}
                  </div>
                  <h5 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition line-clamp-2">
                    {meal.title}
                  </h5>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 mb-2">{meal.description}</p>
              </div>

              <div>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span>Б: {meal.protein}г</span>
                  <span>Ж: {meal.fat}г</span>
                  <span>У: {meal.carbs}г</span>
                </div>
                <div className="mt-1.5 text-center text-[10px] font-bold text-indigo-600 bg-indigo-50/70 py-1 rounded-lg">
                  Открыть рецепт и продукты ➔
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Urgent Protocol / Prevention Notice */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed text-amber-950">
          <div className="font-bold text-sm text-amber-900 mb-1">
            Памятка при первых симптомах дискомфорта (жжение / рези / тяжесть в пояснице):
          </div>
          <p className="mb-2">
            1. Выпить 500 мл теплой воды с D-маннозой (2000 мг) + 50 капель или 2 таблетки Канефрона Н.
            2. Заварить клюквенный морс без сахара (или ромашковый чай).
            3. Ни в коем случае НЕ греть область почек или низа живота горячей грелкой без назначения врача (при инфекции тепло усиливает размножение бактерий).
            4. Сдать ОАМ (общий анализ мочи) и обратиться к урологу.
          </p>
          <div className="flex items-center gap-2 font-semibold text-amber-800">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Профилактический курс из приложения снижает риск рецидивов более чем на 80%.
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
