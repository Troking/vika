import { useState } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  ArrowRight,
  ShieldCheck, 
  CheckCircle, 
  Droplet, 
  Flame, 
  Heart
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
      {/* Editorial Luxury Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1C1A17] text-white p-6 sm:p-9 shadow-sm border border-[#2E2B26]">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1 rounded-full text-xs font-semibold text-rose-200 mb-3 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Индивидуальная забота и реабилитация
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl tracking-tight mb-2.5 text-white">
            Привет, Вика! ✨ Твой день легкости
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-6 font-normal">
            Программа составлена специально для тебя: почечная фильтрация без солей, профилактика цистита, снижение веса, сосудистый комфорт и бережное заживление швов спустя 1 месяц после маммопластики.
          </p>

          {/* 4 Sleek Status Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-[11px] text-stone-400 font-medium flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> Калораж дня
              </div>
              <div className="text-base font-display font-extrabold text-white mt-0.5">~1 680 ккал</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-[11px] text-stone-400 font-medium flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400" /> Белок для швов
              </div>
              <div className="text-base font-display font-extrabold text-emerald-300 mt-0.5">95–100 г</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-[11px] text-stone-400 font-medium flex items-center gap-1">
                <Droplet className="w-3 h-3 text-sky-400" /> Норма воды
              </div>
              <div className="text-base font-display font-extrabold text-sky-300 mt-0.5">2.5 литра</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <div className="text-[11px] text-stone-400 font-medium">После операции</div>
              <div className="text-base font-display font-extrabold text-rose-300 mt-0.5">1 месяц</div>
            </div>
          </div>
        </div>

        {/* Ambient subtle warm glow */}
        <div className="absolute right-[-40px] top-[-40px] w-96 h-96 rounded-full bg-gradient-to-br from-rose-500/20 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* Two balanced habit widgets (Water & Pills) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        <WaterTracker />
        <PillOrganizer onOpenSupplementsTab={() => onNavigateTab('supplements')} />
      </div>

      {/* 4 Pillars of Health Bento Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-[#1C1A17] tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-stone-700" /> 4 ключевых направления программы
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bento-card p-5 hover:border-sky-300 transition">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100/80 text-sky-600 flex items-center justify-center mb-3 text-xl shadow-2xs">
              🛡️
            </div>
            <h4 className="font-display text-sm font-bold text-[#1C1A17] mb-1">Почки и цистит</h4>
            <p className="text-xs text-[#5C564C] leading-relaxed">
              D-манноза связывает кишечную палочку E. coli, брусника и клюква дезинфицируют, а цитраты лимона не дают солям превращаться в камни.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bento-card p-5 hover:border-purple-300 transition">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100/80 text-purple-600 flex items-center justify-center mb-3 text-xl shadow-2xs">
              🧠
            </div>
            <h4 className="font-display text-sm font-bold text-[#1C1A17] mb-1">Память и энергия</h4>
            <p className="text-xs text-[#5C564C] leading-relaxed">
              Устранение скрытой анемии (ферритин после операции!), омега-3 для синапсов мозга, коэнзим Q10 и витамин D3 для снятия усталости.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bento-card p-5 hover:border-rose-300 transition">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100/80 text-rose-600 flex items-center justify-center mb-3 text-xl shadow-2xs">
              🩸
            </div>
            <h4 className="font-display text-sm font-bold text-[#1C1A17] mb-1">Сосуды и тонус</h4>
            <p className="text-xs text-[#5C564C] leading-relaxed">
              Магний бисглицинат снимает спазмы сосудов и тревожность, рутин укрепляет капилляры, правила ортостатики берегут от перепадов давления.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bento-card p-5 hover:border-emerald-300 transition">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100/80 text-emerald-600 flex items-center justify-center mb-3 text-xl shadow-2xs">
              🩹
            </div>
            <h4 className="font-display text-sm font-bold text-[#1C1A17] mb-1">1 мес. после операции</h4>
            <p className="text-xs text-[#5C564C] leading-relaxed">
              Достаточное количество чистого белка (индейка, рыба, творог) и цинка для эластичного рубцевания без перегрузки грудных мышц.
            </p>
          </div>
        </div>
      </div>

      {/* Today's Meals Quick Peek with Organic Cartoon Icons */}
      <div className="bento-card p-6 sm:p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Питание дня</span>
            <h3 className="font-display text-base sm:text-lg font-bold text-[#1C1A17]">{todayPlan.dayName}: {todayPlan.focus}</h3>
          </div>
          <button
            onClick={() => onNavigateTab('meals')}
            className="text-xs font-bold text-[#1C1A17] hover:text-rose-700 flex items-center gap-1 group bg-stone-100 hover:bg-stone-200/70 px-3.5 py-1.5 rounded-xl transition"
          >
            Все 7 дней <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {todayPlan.meals.map((meal) => (
            <div
              key={meal.id}
              onClick={() => setSelectedMealForRecipe(meal)}
              className="bg-[#FAF7F2]/90 hover:bg-white rounded-2xl p-4 border border-[#E8E2D8] hover:border-stone-400 hover:shadow-sm transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-400 mb-3">
                  <span className="uppercase text-[#7A756C]">
                    {meal.type === 'breakfast' && 'Завтрак'}
                    {meal.type === 'lunch' && 'Обед'}
                    {meal.type === 'snack' && 'Полдник'}
                    {meal.type === 'dinner' && 'Ужин'}
                  </span>
                  <span className="text-[#1C1A17] bg-white px-2 py-0.5 rounded-md border border-[#E0D9CD] font-extrabold">{meal.calories} ккал</span>
                </div>

                {/* Cute symbolic dish icon with soft pastel circular framing */}
                <div className="flex items-center gap-3 mb-2.5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meal.bgGradient} flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition shadow-2xs border border-white`}>
                    {meal.icon}
                  </div>
                  <h5 className="text-xs font-bold text-[#1C1A17] group-hover:text-rose-700 transition line-clamp-2 leading-snug">
                    {meal.title}
                  </h5>
                </div>

                <p className="text-[11px] text-[#5C564C] line-clamp-2 mb-3 leading-relaxed">{meal.description}</p>
              </div>

              <div>
                <div className="pt-2.5 border-t border-[#EAE5DC] flex items-center justify-between text-[10px] text-[#7A756C] font-semibold">
                  <span>Б: {meal.protein}г</span>
                  <span>Ж: {meal.fat}г</span>
                  <span>У: {meal.carbs}г</span>
                </div>
                <div className="mt-2 text-center text-[10px] font-bold text-[#1C1A17] bg-white group-hover:bg-[#1C1A17] group-hover:text-white py-1.5 rounded-xl border border-[#DED7CB] transition">
                  Рецепт и продукты ➔
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Urgent Protocol / Prevention Notice */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-5 sm:p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 mt-0.5 shadow-2xs">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="text-xs leading-relaxed text-amber-950">
          <div className="font-bold text-sm text-amber-900 mb-1">
            Памятка при первых симптомах дискомфорта (жжение / рези / тяжесть в пояснице):
          </div>
          <p className="mb-2 text-[#5C564C]">
            1. Выпить 500 мл теплой воды с D-маннозой (2000 мг) + 50 капель или 2 таблетки Канефрона Н.
            2. Заварить клюквенный морс без сахара (или ромашковый чай).
            3. Ни в коем случае НЕ греть область почек или низа живота горячей грелкой без назначения врача.
            4. Сдать ОАМ (общий анализ мочи) и обратиться к урологу.
          </p>
          <div className="flex items-center gap-2 font-bold text-emerald-900">
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
