import { useState, useEffect } from 'react';
import { CHECKUP_ITEMS } from '../data/checkup';
import { 
  Stethoscope, 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  Calendar, 
  ExternalLink
} from 'lucide-react';

export const CheckupView: React.FC = () => {
  const [completedTests, setCompletedTests] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('vika_checkup_completed');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('vika_checkup_completed', JSON.stringify(completedTests));
  }, [completedTests]);

  const toggleTest = (id: string) => {
    setCompletedTests((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(completedTests).filter(Boolean).length;
  const totalCount = CHECKUP_ITEMS.length;

  return (
    <div className="space-y-6 pb-12">
      {/* Intro Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md mb-2">
          <Stethoscope className="w-3.5 h-3.5" /> Лабораторный скрининг причин слабости и забывчивости
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Чек-ап диагностика для Вики (Москва)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Утомляемость, забывчивость и лишний вес в 25 лет почти всегда имеют конкретные биохимические триггеры. Сдав эти ключевые показатели в Инвитро или Гемотесте, вы сразу поймете причину и скорректируете терапию точно в цель.
        </p>

        {/* Progress Tracker */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-500">
            Пройдено исследований: <span className="text-slate-900 font-bold">{completedCount}</span> из {totalCount}
          </div>
          <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.round((completedCount / totalCount) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Why Brain Fog & Fatigue banner */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5">
        <h3 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Почему Вика забывчивая и быстро устает?
        </h3>
        <p className="text-xs text-amber-950 leading-relaxed">
          1. <strong>Скрытый железодефицит:</strong> 1 месяц назад была пластическая операция с кровопотерей. Если запасы ферритина упали ниже 35–40 нг/мл, ткани мозга недополучают кислород. Это вызывает так называемый «мозговой туман», забывчивость и упадок сил.<br />
          2. <strong>Щитовидная железа:</strong> Субклинический гипотиреоз замедляет обмен веществ, приводит к набору лишнего веса и вялости.<br />
          3. <strong>Дефицит Витамина D:</strong> В Москве осенью-зимой без суплементации уровень падает до критических значений, выключая митохондрии.
        </p>
      </div>

      {/* Tests Checklist */}
      <div className="space-y-4">
        {CHECKUP_ITEMS.map((test) => {
          const isDone = !!completedTests[test.id];
          return (
            <div
              key={test.id}
              className={`bg-white rounded-2xl p-5 border transition-all ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200/80 shadow-xs hover:border-sky-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <button
                  onClick={() => toggleTest(test.id)}
                  className="flex items-start gap-3 text-left group"
                >
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 group-hover:text-sky-500 transition" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-base font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {test.title}
                      </h4>
                      {test.urgency === 'critical' && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                          Критично сдать
                        </span>
                      )}
                    </div>
                    {test.code && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        Артикул: {test.code}
                      </span>
                    )}
                  </div>
                </button>

                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                    {test.labPriceMoscow}
                  </span>
                </div>
              </div>

              {/* Explanation & Target values */}
              <div className="mt-3 pl-8 space-y-2 text-xs">
                <p className="text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Зачем Вике: </strong>
                  {test.why}
                </p>

                <div className="bg-sky-50/60 rounded-xl p-2.5 text-sky-900 border border-sky-100">
                  <span className="font-bold">Целевой оптимум для здоровья: </span>
                  {test.targetValues}
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span><strong>Подготовка:</strong> {test.preparation}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lab links in Moscow */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span className="font-bold text-slate-800 block mb-0.5">Где сдать в Москве:</span>
          Любое удобное отделение лабораторий «Инвитро», «Гемотест» или «Хеликс». Результаты обычно готовы за 24 часа.
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://invitro.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
          >
            Инвитро <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://gemotest.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
          >
            Гемотест <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
