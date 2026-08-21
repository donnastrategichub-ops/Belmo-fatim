import React from 'react';
import { Sparkles, Gift, Plus, Heart, Crown, Check, ArrowDown } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface RoseBerryHeroShowcaseProps {
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onScrollToAll: () => void;
}

export const RoseBerryHeroShowcase: React.FC<RoseBerryHeroShowcaseProps> = ({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onScrollToAll,
}) => {
  // Extract the 6 official Rose Berry items in exact order
  const roseBerryProducts = PRODUCTS.filter((p) => p.brand === 'ROSE BERRY');

  const flagshipProduct = roseBerryProducts.find((p) => p.id === 'rose-berry-coffret-prestige-3-etages') || roseBerryProducts[0];
  const gridProducts = roseBerryProducts.filter((p) => p.id !== 'rose-berry-coffret-prestige-3-etages');

  return (
    <section id="rose-berry-showcase" className="px-3 sm:px-4 py-8 sm:py-10 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        
        {/* Section Header with Generous White Space */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF0F3] text-[#FF4D6D] border border-rose-200/80 px-4 py-1.5 rounded-full text-xs font-black shadow-2xs">
            <Crown className="w-3.5 h-3.5 text-[#FF4D6D]" />
            <span>ROSE BERRY ÉMIRATS 🇦🇪 • تشكيلة المكياج الفاخر</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            مجموعة روز بيري الفاخرة للهدايا والمكياج
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            البوكسات الحصرية الأكثر طلباً للهدايا والمناسبات الخاصة بتغليف إماراتي ملكي وشريط ساتان فاخر
          </p>
        </div>

        {/* 🌟 HERO FLAGSHIP SPOTLIGHT: Coffret Prestige 3 Étages */}
        {flagshipProduct && (
          <div className="bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF0F3] rounded-[28px] sm:rounded-[36px] border-2 border-rose-200/90 p-5 sm:p-8 shadow-[0_10px_35px_rgba(255,77,109,0.08)] flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            
            {/* Visual with Badge */}
            <div
              onClick={() => onSelectProduct(flagshipProduct)}
              className="w-full md:w-5/12 aspect-4/3 sm:aspect-square rounded-2xl bg-white p-3 border border-rose-100 overflow-hidden relative cursor-pointer group shadow-2xs shrink-0"
            >
              <img
                src={flagshipProduct.image}
                alt={flagshipProduct.nameAr}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 right-3 bg-[#FF4D6D] text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Gift className="w-3.5 h-3.5" />
                <span>الهدية الأكثر فخامة 👑</span>
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(flagshipProduct);
                }}
                className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  wishlistIds.includes(flagshipProduct.id)
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/90 backdrop-blur-xs text-slate-600 hover:text-rose-500 shadow-xs'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlistIds.includes(flagshipProduct.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Content & Direct Ordering */}
            <div className="w-full md:w-7/12 text-right space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-latin text-xs font-black text-[#FF4D6D] tracking-wider uppercase bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                  ROSE BERRY VIP • ÉMIRATS 🇦🇪
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  وفري 191 DH اليوم
                </span>
              </div>

              <h3
                onClick={() => onSelectProduct(flagshipProduct)}
                className="text-lg sm:text-2xl font-black text-slate-900 leading-snug cursor-pointer hover:text-[#FF4D6D] transition-colors"
              >
                {flagshipProduct.nameAr}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {flagshipProduct.descriptionAr}
              </p>

              {/* Highlights pills */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-white/80 p-2.5 rounded-xl border border-rose-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">3 طوابق مكياج كامل + عطر</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-white/80 p-2.5 rounded-xl border border-rose-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">تغليف كادو مع شريط ساتان</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-3 border-t border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-baseline gap-2 font-latin">
                  <span className="text-2xl sm:text-3xl font-black text-[#FF4D6D]">
                    {flagshipProduct.price} DH
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    {flagshipProduct.originalPrice} DH
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(flagshipProduct)}
                    className="flex-1 sm:flex-none min-h-[46px] bg-[#FF4D6D] hover:bg-[#E11D48] active:scale-98 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,77,109,0.35)] transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>اطلبي كوفري برستيج الآن</span>
                  </button>

                  <button
                    onClick={() => onSelectProduct(flagshipProduct)}
                    className="min-h-[46px] bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    تفاصيل
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 💄 THE OTHER 5 ROSE BERRY ITEMS (Clean 2-3 Column Grid with generous spacing) */}
        <div className="pt-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF4D6D]" />
              <span>باقي تشكيلة مكياج روز بيري الأكثر طلباً</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">5 منتجات مختارة</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {gridProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-rose-200 transition-all group text-right"
                >
                  <div>
                    {/* Visual */}
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="relative aspect-square rounded-xl bg-slate-50 overflow-hidden mb-2.5 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.nameAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product);
                        }}
                        className={`absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                          isWishlisted
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/80 backdrop-blur-xs text-slate-600 hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <span className="font-latin text-[9.5px] font-bold text-[#FF4D6D] tracking-wider uppercase block">
                      ROSE BERRY
                    </span>

                    <h4
                      onClick={() => onSelectProduct(product)}
                      className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mt-0.5 cursor-pointer hover:text-[#FF4D6D] transition-colors min-h-[32px]"
                    >
                      {product.nameAr}
                    </h4>
                  </div>

                  {/* Price and Add Button */}
                  <div className="pt-2.5 border-t border-slate-100 mt-2 space-y-2">
                    <div className="flex items-baseline justify-between font-latin">
                      <span className="text-sm sm:text-base font-black text-slate-900">
                        {product.price} DH
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                          {product.originalPrice} DH
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-full min-h-[36px] bg-slate-900 hover:bg-[#FF4D6D] text-white py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-98"
                    >
                      <Plus className="w-3 h-3" />
                      <span>أضيفي للسلة</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action to explore the full skincare collection below */}
        <div className="text-center pt-2">
          <button
            onClick={onScrollToAll}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/80 px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            <span>شاهدي تشكيلة العناية الكورية الأصلية بالأسفل</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
