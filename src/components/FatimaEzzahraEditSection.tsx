import React from 'react';
import { Sparkles, ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface FatimaEzzahraEditSectionProps {
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onShopFullRoutine?: () => void;
  products: Product[];
}

export const FatimaEzzahraEditSection: React.FC<FatimaEzzahraEditSectionProps> = ({
  onAddToCart,
  onSelectProduct,
  onShopFullRoutine,
  products,
}) => {
  const lipPack = products.find((p) => p.id === 'rose-berry-pack-levres-trio') || products[1];
  const kitBeaute = products.find((p) => p.id === 'rose-berry-kit-beaute-4-pieces') || products[0];
  const coffretComplet = products.find((p) => p.id === 'rose-berry-coffret-maquillage-complet') || products[3];

  const steps = [
    {
      number: '01',
      titleAr: 'تحديد الشفاه',
      subtitleEn: 'Rose Berry Lip Contour',
      descAr: 'رسم حدود الشفاه بدقة لإعطاء امتلاء طبيعي يدوم لساعات طويلة بدون تلطخ.',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80',
      product: lipPack,
    },
    {
      number: '02',
      titleAr: 'لون الشفاه',
      subtitleEn: 'Rose Berry Lipstick',
      descAr: 'تطبيق اللون المخملي المطفي الغني بالصباغ الذي لا يجفف الشفاه إطلاقاً.',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80',
      product: lipPack,
    },
    {
      number: '03',
      titleAr: 'اللمسة النهائية',
      subtitleEn: 'Rose Berry Gloss',
      descAr: 'لمسة غلوس لامعة في منتصف الشفاه لمظهر ممتلئ وجذاب كالفيلر الطبيعي.',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80',
      product: kitBeaute,
    },
    {
      number: '04',
      titleAr: 'الإطلالة الكاملة',
      subtitleEn: 'Rose Berry Makeup Collection',
      descAr: 'بلاش مخملي خفيف وإضاءة ناعمة على الوجنتين مع لمسة فاونديشن خفيفة متناسقة.',
      image: '/src/assets/images/kbeauty_gift_box_1787069764163.jpg',
      product: coffretComplet,
    },
  ];

  return (
    <section id="fatima-routine-section" className="px-3 sm:px-4 py-8 w-full max-w-full overflow-hidden bg-[#FAF9F6] border-y border-slate-200/50">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-right">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4D6D] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EDITORIAL BEAUTY TUTORIAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              روتين فاطمة الزهراء ✨
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
              اكتشفي اختيارات فاطمة الزهراء لإطلالة Rose Berry كاملة خطوة بخطوة.
            </p>
          </div>

          <button
            type="button"
            onClick={onShopFullRoutine}
            className="self-start sm:self-auto text-xs font-bold text-[#1F5E4B] hover:text-[#164336] flex items-center gap-1.5 bg-white border border-emerald-100 shadow-2xs px-3.5 py-2 rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            <span>تسوقي الروتين كاملاً</span>
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
          </button>
        </div>

        {/* Routine Steps Grid (4 Visual Editorial Steps) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Step number badge & Subtitle */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <span className="font-latin text-sm font-black text-[#FF4D6D] bg-[#FFF0F3] w-7 h-7 rounded-lg flex items-center justify-center">
                    {step.number}
                  </span>
                  <span className="font-latin text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate">
                    {step.subtitleEn}
                  </span>
                </div>

                {/* Step Visual Image */}
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative">
                  <img
                    src={step.image}
                    alt={step.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    <Check className="w-3 h-3 text-[#FF4D6D]" />
                    <span>{step.titleAr}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="text-right space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {step.titleAr}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.descAr}
                  </p>
                </div>
              </div>

              {/* Product quick action */}
              {step.product && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-right min-w-0">
                    <span className="text-xs font-bold text-[#1F5E4B] font-latin block">
                      {step.product.price} DH
                    </span>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {step.product.nameAr}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(step.product!)}
                    aria-label={`أضيفي ${step.product.nameAr}`}
                    className="min-h-[34px] px-3 bg-slate-900 hover:bg-[#1F5E4B] text-white rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 transition-colors cursor-pointer active:scale-95"
                  >
                    <ShoppingBag className="w-3 h-3 stroke-[2]" />
                    <span>أضيفي</span>
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Editorial Footnote & Primary Action */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#FF4D6D] block">
              نصيحة فاطمة الزهراء للثبات:
            </span>
            <p className="text-xs text-slate-700">
              "السر هو دمج محدد الشفاه مع الروج الكريمي ووضع مسحة غلوس بالوسط فقط لشفاه ممتلئة وأنيقة طوال اليوم."
            </p>
          </div>

          <button
            type="button"
            onClick={onShopFullRoutine}
            className="w-full sm:w-auto min-h-[42px] px-6 bg-[#1F5E4B] hover:bg-[#164336] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <span>تسوقي روتين فاطمة الزهراء</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-0" />
          </button>
        </div>

      </div>
    </section>
  );
};
