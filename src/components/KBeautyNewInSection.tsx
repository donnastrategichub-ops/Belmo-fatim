import { useRef } from 'react';
import { Sparkles, Plus, Heart, Flame } from 'lucide-react';
import { KBEAUTY_NEW_ARRIVALS } from '../data/products';
import { Product } from '../types';

interface KBeautyNewInSectionProps {
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const KBeautyNewInSection = ({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}: KBeautyNewInSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="kbeauty-new-section" className="px-3 sm:px-4 py-8 sm:py-10 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-5 sm:space-y-6">
        
        {/* Section Header with Generous White Space */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-right">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#1F5E4B] border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-bold mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>SEOUL TRENDS • جديد العناية الكورية 🇰🇷</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              أحدث المنتجات الكورية الأصلية
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              تركيبات كورية مثبتة لعلاج التصبغات، ترميم الحاجز وتحقيق النضارة الزجاجية
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>منتجات أصلية 100% مستوردة</span>
          </div>
        </div>

        {/* Clean, Non-Autoscrolling Horizontal Scroll / Snap Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {KBEAUTY_NEW_ARRIVALS.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="w-[185px] sm:w-[220px] shrink-0 snap-start bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-emerald-200/60 transition-all group"
              >
                <div>
                  {/* Image & Badges */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-square rounded-xl bg-slate-50 overflow-hidden mb-3 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {product.tag && (
                      <span className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {product.tag.split('•')[0]}
                      </span>
                    )}

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

                  {/* Brand & Name */}
                  <span className="font-latin text-[10px] font-bold text-[#1F5E4B] tracking-wider uppercase block">
                    {product.brand}
                  </span>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mt-1 cursor-pointer hover:text-[#1F5E4B] transition-colors"
                  >
                    {product.nameAr}
                  </h3>
                </div>

                {/* Price & Add Button */}
                <div className="pt-3 border-t border-slate-100 mt-2 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1 font-latin">
                      <span className="text-sm sm:text-base font-black text-[#1F5E4B]">
                        {product.price} DH
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                          {product.originalPrice} DH
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-slate-900 hover:bg-[#1F5E4B] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-98"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>أضيفي للسلة</span>
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
