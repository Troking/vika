import { useState } from 'react';
import { SUPPLEMENTS } from '../data/supplements';
import type { CategoryType, Supplement } from '../types';
import { 
  Pill, 
  Search, 
  ExternalLink, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  Check, 
  MapPin,
  Sparkles
} from 'lucide-react';

export const SupplementsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'Все препараты' },
    { id: 'kidney_bladder', label: '🛡️ Почки и цистит' },
    { id: 'brain_energy', label: '🧠 Мозг и энергия' },
    { id: 'vessels', label: '🩸 Сосуды' },
    { id: 'post_op', label: '🩹 После операции' }
  ];

  const filteredSupplements = SUPPLEMENTS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tradeNames.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.instructions.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTimingBadge = (timing: Supplement['timing']) => {
    switch (timing) {
      case 'morning':
        return <span className="bg-amber-50 text-amber-800 border border-amber-200/60 px-2 py-0.5 rounded-md text-[11px] font-bold">☀️ Утро</span>;
      case 'afternoon':
        return <span className="bg-orange-50 text-orange-800 border border-orange-200/60 px-2 py-0.5 rounded-md text-[11px] font-bold">⛅ День / Обед</span>;
      case 'evening':
        return <span className="bg-indigo-50 text-indigo-800 border border-indigo-200/60 px-2 py-0.5 rounded-md text-[11px] font-bold">🌙 Вечер</span>;
      case 'as_needed':
        return <span className="bg-rose-50 text-rose-800 border border-rose-200/60 px-2 py-0.5 rounded-md text-[11px] font-bold">⚡ По потребности</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md mb-2">
          <Pill className="w-3.5 h-3.5" /> Фармацевтический гид и нутрицевтики
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Аптечка Вики: Препараты и цены в Москве
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Доказанные средства для профилактики камней и цистита, укрепления сосудов и снятия усталости с ориентировочными ценами (Еаптека, Аптека.ру, Горздрав).
        </p>

        {/* Search Input */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию, симптому (цистит, почки, сосуды, память)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`shrink-0 px-3.5 py-2 rounded-xl font-bold transition ${
              selectedCategory === cat.id
                ? 'bg-purple-600 text-white shadow-xs shadow-purple-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Supplements Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSupplements.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-purple-200 hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Card Top: Badges & Title */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md">
                  {item.badge}
                </span>
                {getTimingBadge(item.timing)}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                {item.name}
              </h3>

              {/* Trade Names */}
              <div className="text-[11px] text-slate-400 mb-3 flex flex-wrap gap-1">
                <span className="font-medium text-slate-500">Торговые марки:</span>
                {item.tradeNames.map((t, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>

              {/* Target / Why Vika needs this */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-3">
                <div className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Зачем принимать Вике:
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.target}
                </p>
              </div>

              {/* Dosage & Instructions */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Дозировка: </span>
                    {item.dosage}
                  </div>
                </div>

                <div className="flex items-start gap-2 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Как принимать: </span>
                    {item.instructions}
                  </div>
                </div>

                {item.notes && (
                  <div className="flex items-start gap-2 text-slate-500 text-[11px] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{item.notes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Card Footer: Price & Direct Search */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <MapPin className="w-3 h-3" /> {item.pharmacyExample}
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  {item.priceMoscow}
                </div>
              </div>

              {item.searchUrl && (
                <a
                  href={item.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition"
                >
                  <span>Найти в аптеке</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Safety Notice */}
      <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="text-xs text-rose-950 leading-relaxed">
          <span className="font-bold block mb-1">Медицинский дисклеймер и безопасность:</span>
          Данные рекомендации сформированы с учетом современной доказательной нутрициологии и фармакологии. Перед приемом препаратов железа необходимо обязательно сдать анализ крови на ферритин. Если вы принимаете рецептурные медикаменты, назначенные лечащим хирургом или терапевтом, согласуйте схему приема.
        </div>
      </div>
    </div>
  );
};
