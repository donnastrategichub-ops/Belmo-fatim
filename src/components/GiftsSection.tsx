import { useState } from 'react';
import { Gift, ArrowLeft, Plus, Sparkles, Heart } from 'lucide-react';

interface GiftsSectionProps {
  onAddGiftBox: (gift: { id: string; nameAr: string; brand: string; price: number; image: string }) => void;
  onExploreGifts: () => void;
}

export const GiftsSection = ({ onAddGiftBox, onExploreGifts }: GiftsSectionProps) => {
  const [selectedBudget, setSelectedBudget] = useState<'low' | 'mid' | 'high'>('mid');

  const budgetBoxes = {
    low: {
      id: 'gift-box-starter',
      brand: 'BELMO CADEAU',
      nameAr: 'بوكس الهدية اللطيفة (Mini Glow)',
      desc: 'غسول كوري + ماسك ترطيب وتغليف أنيق مع كارت إهداء',
      price: 149,
      originalPrice: 190,
      image: '/src/assets/images/kbeauty_gift_box_1787069764163.jpg',
    },
    mid: {
      id: 'gift-box-selfcare',
      brand: 'BELMO CADEAU',
      nameAr: 'بوكس العناية والتألق (Self-Care Box)',
      desc: 'سيروم التوهج + تونر مهدئ + مرطب مع كارت إهداء وتغليف حريري فاخر',
      price: 289,
      originalPrice: 380,
      image: '/src/assets/images/kbeauty_gift_box_1787069764163.jpg',
    },
    high: {
      id: 'gift-box-vip',
      brand: 'BELMO VIP',
      nameAr: 'بوكس العروسة وVIP Glass Skin',
      desc: 'روتين كوري كامل 4 قطع + حقيبة مستحضرات Belmo المخملية مجاناً',
      price: 499,
      originalPrice: 650,
      image: '/src/assets/images/kbeauty_gift_box_1787069764163.jpg',
    },
  };

  const currentBox = budgetBoxes[selectedBudget];

  return (
    <section className="px-4 py-4">
      <div className="max-w-5xl mx-auto bg-white rounded-[28px] border border-emerald-950/5 shadow-[0_4px_25px_rgba(31,94,75,0.03)] p-5 sm:p-7">
        
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
            Belmo يوجّدها ليك بتغليف زوين وكارت مخصص للأخت، الصديقة أو العروسة
          </p>
        </div>

        {/* Budget Tiers */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          <button
            type="button"
            onClick={() => setSelectedBudget('low')}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer min-h-[44px] ${
              selectedBudget === 'low'
                ? 'border-[#1F5E4B] bg-[#162A22] text-white shadow-xs'
                : 'border-slate-200/80 bg-[#F8FAF8] hover:bg-white text-slate-800'
            }`}
          >
            <span className="block text-xs font-black font-latin">
              أقل من 150 DH
            </span>
            <span className={`block text-[10px] mt-0.5 ${selectedBudget === 'low' ? 'text-emerald-200' : 'text-slate-500'}`}>
              كادو رمزي زوين
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedBudget('mid')}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer min-h-[44px] ${
              selectedBudget === 'mid'
                ? 'border-[#1F5E4B] bg-[#162A22] text-white shadow-xs'
                : 'border-slate-200/80 bg-[#F8FAF8] hover:bg-white text-slate-800'
            }`}
          >
            <span className="block text-xs font-black font-latin">
              150 - 300 DH
            </span>
            <span className={`block text-[10px] mt-0.5 ${selectedBudget === 'mid' ? 'text-emerald-200' : 'text-slate-500'}`}>
              الأكثر طلباً
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedBudget('high')}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer min-h-[44px] ${
              selectedBudget === 'high'
                ? 'border-[#1F5E4B] bg-[#162A22] text-white shadow-xs'
                : 'border-slate-200/80 bg-[#F8FAF8] hover:bg-white text-slate-800'
            }`}
          >
            <span className="block text-xs font-black font-latin">
              كادو VIP (+300 DH)
            </span>
            <span className={`block text-[10px] mt-0.5 ${selectedBudget === 'high' ? 'text-emerald-200' : 'text-slate-500'}`}>
              روتين العروسة
            </span>
          </button>
        </div>

        {/* Featured Gift Box Card */}
        <div className="bg-[#F4FAF6] rounded-2xl border border-emerald-950/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl p-1 shrink-0 border border-emerald-950/5 shadow-2xs flex items-center justify-center overflow-hidden">
              <img
                src={currentBox.image}
                alt={currentBox.nameAr}
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-right flex-1 min-w-0">
              <span className="text-[10px] font-bold text-[#1F5E4B] font-latin uppercase block">
                {currentBox.brand}
              </span>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                {currentBox.nameAr}
              </h3>
              <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                {currentBox.desc}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm sm:text-base font-black text-[#1F5E4B] font-latin">
                  {currentBox.price} DH
                </span>
                <span className="text-xs text-slate-400 line-through font-latin">
                  {currentBox.originalPrice} DH
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              onAddGiftBox({
                id: currentBox.id,
                nameAr: currentBox.nameAr,
                brand: currentBox.brand,
                price: currentBox.price,
                image: currentBox.image,
              })
            }
            className="w-full sm:w-auto bg-[#162A22] hover:bg-[#1F5E4B] text-white font-bold text-xs py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-2xs active:scale-95 transition-all cursor-pointer shrink-0 min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>أضيفي هاد الكادو للسلة</span>
          </button>
        </div>
      </div>
    </section>
  );
};
