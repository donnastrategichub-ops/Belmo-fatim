import React, { useState } from 'react';
import { Product } from '../types';
import { Sparkles, ShoppingBag, Star, Heart, CheckCircle2 } from 'lucide-react';

interface ShopByConcernSectionProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ShopByConcernSection: React.FC<ShopByConcernSectionProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const [activeConcern, setActiveConcern] = useState<string>('cleansing');

  const concerns = [
    {
      id: 'cleansing',
      labelAr: 'تنظيف البشرة',
      descAr: 'غسولات وزيوت لإزالة الدهون والرؤوس السوداء والمكياج بلطف.',
      productIds: [
        'anua-heartleaf-quercetinol-cleansing-foam',
        'skin1004-centella-light-cleansing-oil',
        'skin1004-centella-ampoule-foam',
        'dr-althea-pure-grinding-cleansing-balm',
      ],
    },
    {
      id: 'barrier',
      labelAr: 'الترطيب وإصلاح الحاجز',
      descAr: 'كريمات وماسكات علاجية لإعادة بناء حاجز البشرة وترميمها.',
      productIds: [
        'dr-althea-345-relief-cream',
        'medicube-collagen-night-wrapping-mask',
      ],
    },
    {
      id: 'glow',
      labelAr: 'الإشراقة والتصبغات',
      descAr: 'سيرومات تصحيح البقع الداكنة وتوحيد لون الوجه وإعطاء النضارة.',
      productIds: [
        'boj-glow-serum-propolis-niacinamide',
        'anua-niacinamide-10-txa-4-serum',
      ],
    },
    {
      id: 'sensitive',
      labelAr: 'الاحمرار والبشرة الحساسة',
      descAr: 'مستخلصات السنتيلا وحمض الأزيليك لتهدئة التهيجات وعلاج الوردية.',
      productIds: [
        'cos-de-baha-azelaic-acid-10',
        'skin1004-centella-light-cleansing-oil',
        'dr-althea-345-relief-cream',
      ],
    },
    {
      id: 'sunscreen',
      labelAr: 'الحماية من الشمس',
      descAr: 'واقيات شمس خفيفة كالماء لا تترك أثراً أبيض أو لمعاناً دهنياً.',
      productIds: [
        'boj-relief-sun-aqua-fresh-rice-b5',
      ],
    },
  ];

  const currentConcern = concerns.find((c) => c.id === activeConcern) || concerns[0];
  const activeProducts = currentConcern.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <section id="shop-by-concern" className="px-3 sm:px-4 py-8 w-full max-w-full overflow-hidden bg-[#FAF9F6] border-y border-slate-200/50">
      <div className="w-full max-w-5xl mx-auto space-y-5">
        
        {/* Section Header */}
        <div className="text-right space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F5E4B] bg-[#F0F7F4] px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOLUTIONS BY SKIN NEED</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            تسوقي حسب احتياج بشرتك 🎯
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
            اختاري مشكلة بشرتك لاكتشاف المنتجات الكورية الأكثر فعالية والمثبتة سريرياً.
          </p>
        </div>

        {/* Concern Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {concerns.map((concern) => {
            const isActive = activeConcern === concern.id;
            return (
              <button
                key={concern.id}
                type="button"
                onClick={() => setActiveConcern(concern.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#1F5E4B] text-white shadow-2xs font-black'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{concern.labelAr}</span>
              </button>
            );
          })}
        </div>

        {/* Concern Context Banner */}
        <div className="bg-white rounded-xl p-3.5 border border-emerald-100 flex items-center justify-between gap-3 text-right">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#1F5E4B]">
              {currentConcern.labelAr}
            </span>
            <p className="text-[11px] text-slate-600">
              {currentConcern.descAr}
            </p>
          </div>
          <CheckCircle2 className="w-4 h-4 text-[#1F5E4B] shrink-0" />
        </div>

        {/* Active Concern Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {activeProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="font-latin text-[10px] font-bold text-slate-500 uppercase truncate">
                      {product.brand}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      aria-label="المفضلة"
                      className="w-6 h-6 rounded-full flex items-center justify-center text-slate-300 hover:text-[#FF4D6D]"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#FF4D6D] text-[#FF4D6D]' : ''}`}
                      />
                    </button>
                  </div>

                  <div className="w-full aspect-square rounded-xl bg-slate-50 p-2.5 flex items-center justify-center mb-2.5 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.nameAr}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1 text-right">
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#1F5E4B] transition-colors leading-snug">
                      {product.nameAr}
                    </h3>
                    <p className="text-[10px] text-slate-500 line-clamp-1">
                      {product.benefitAr}
                    </p>

                    <div className="flex items-center gap-1 pt-0.5 font-latin text-[10px] text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                  <span className="text-xs sm:text-sm font-black text-[#1F5E4B] font-latin">
                    {product.price} DH
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    aria-label={`أضيفي ${product.nameAr}`}
                    className="min-h-[32px] px-3 bg-slate-900 hover:bg-[#1F5E4B] text-white rounded-xl text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    <ShoppingBag className="w-3 h-3 stroke-[2]" />
                    <span>أضيفي</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
