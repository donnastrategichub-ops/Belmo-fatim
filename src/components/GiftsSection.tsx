import { useState } from 'react';
import { Gift, ArrowLeft, Plus, Sparkles, Heart } from 'lucide-react';

interface GiftsSectionProps {
  onAddGiftBox: (gift: { id: string; nameAr: string; brand: string; price: number; image: string }) => void;
  onExploreGifts: () => void;
}

export const GiftsSection = ({ onAddGiftBox, onExploreGifts }: GiftsSectionProps) => {
  const [selectedBudget, setSelectedBudget] = useState<'low' | 'mid' | 'high'>('high');

  const budgetBoxes = {
    low: {
      id: 'rose-berry-kit-beaute-4-pieces',
      brand: 'ROSE BERRY',
      nameAr: 'كيت التجميل 4 قطع روز بيري (Mini Glam Gift)',
      desc: 'قلم شفاه + 2 أحمر شفاه مخملي + بلاش أنيق مع كارت إهداء وتغليف راقي',
      price: 179,
      originalPrice: 230,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    },
    mid: {
      id: 'rose-berry-coffret-maquillage-complet',
      brand: 'ROSE BERRY',
      nameAr: 'كوفري المكياج الكامل روز بيري الإماراتي 🇦🇪',
      desc: 'طقم مكياج شامل للمناسبات (ظلال عيون، بودرة، بلاش، روج وماسكارا) بتغليف هدايا جذاب',
      price: 299,
      originalPrice: 390,
      image: '/src/assets/images/kbeauty_gift_box_1787069764163.jpg',
    },
    high: {
      id: 'rose-berry-coffret-prestige-3-etages',
      brand: 'ROSE BERRY VIP',
      nameAr: 'كوفري برستيج (3 طوابق) | مكياج + عطر 👑',
      desc: 'أفخم بوكس هدايا 3 طوابق يضم مكياجاً متكاملاً مع عطر نسائي جذاب، شريط ساتان وبطاقة مخصصة',
      price: 499,
      originalPrice: 690,
      image: '/src/assets/images/tombla_luxury_prize_1787069793798.jpg',
    },
  };

  const currentBox = budgetBoxes[selectedBudget];

  return (
    <section className="px-3 sm:px-4 py-4 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-[22px] sm:rounded-[28px] border border-emerald-950/5 shadow-[0_4px_25px_rgba(31,94,75,0.03)] p-3.5 sm:p-6">
        
        {/* Title */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF0F3] text-[#FF4D6D] px-3.5 py-1 rounded-full text-[11px] font-bold shadow-2xs mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>تغليف كادو فاخر فابور</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            بغيتيها كادو؟ 🎁
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            Belmo يوجّدها ليك بتغليف كادو إماراتي فاخر وكارت مخصص للأخت، الصديقة أو العروسة
          </p>
        </div>

        {/* Budget Tiers Switcher */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F8FAF8] rounded-2xl max-w-md mx-auto mb-6 border border-emerald-950/5">
          <button
            onClick={() => setSelectedBudget('low')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
              selectedBudget === 'low'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>كيت 4 قطع</span>
            <span className="block font-latin text-[10px] text-[#1F5E4B] font-bold">
              179 DH
            </span>
          </button>

          <button
            onClick={() => setSelectedBudget('mid')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
              selectedBudget === 'mid'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>كوفري كامل</span>
            <span className="block font-latin text-[#1F5E4B] font-bold text-[10px]">
              299 DH
            </span>
          </button>

          <button
            onClick={() => setSelectedBudget('high')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
              selectedBudget === 'high'
                ? 'bg-white text-[#FF4D6D] shadow-2xs ring-1 ring-rose-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>برستيج 3 طوابق</span>
            <span className="block font-latin text-[#FF4D6D] font-bold text-[10px]">
              499 DH
            </span>
          </button>
        </div>

        {/* Selected Gift Box Card */}
        <div className="bg-gradient-to-br from-[#FFF9FA] to-white rounded-2xl border border-rose-100 p-4 max-w-lg mx-auto shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="w-28 h-28 shrink-0 bg-white rounded-xl p-2 border border-rose-100 flex items-center justify-center relative overflow-hidden shadow-2xs">
            <img
              src={currentBox.image}
              alt={currentBox.nameAr}
              className="w-full h-full object-cover rounded-lg mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-1 right-1 bg-[#FF4D6D] text-white text-[8.5px] font-black px-1.5 py-0.5 rounded-full">
              هدية فاخرة
            </span>
          </div>

          <div className="flex-1 text-center sm:text-right space-y-1.5">
            <span className="font-latin text-[10px] font-bold text-[#FF4D6D] tracking-wider uppercase">
              {currentBox.brand}
            </span>
            <h3 className="text-sm font-black text-slate-900 leading-snug">
              {currentBox.nameAr}
            </h3>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              {currentBox.desc}
            </p>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-baseline gap-1.5 font-latin">
                <span className="text-base font-black text-[#1F5E4B]">
                  {currentBox.price} DH
                </span>
                <span className="text-xs text-slate-400 line-through">
                  {currentBox.originalPrice} DH
                </span>
              </div>

              <button
                onClick={() => onAddGiftBox(currentBox)}
                className="bg-[#1F5E4B] hover:bg-[#164436] text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة كـ هدية</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Button to explore all bundles */}
        <div className="text-center mt-5">
          <button
            onClick={onExploreGifts}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1F5E4B] hover:underline cursor-pointer"
          >
            <span>تصفحي جميع تشكيلات الهدايا والبوكسات الحصرية</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
