import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Star, Sparkles, Heart, ArrowLeft } from 'lucide-react';

interface KoreanSkinBestsellersSectionProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onDiscoverMore?: () => void;
}

export const KoreanSkinBestsellersSection: React.FC<KoreanSkinBestsellersSectionProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onDiscoverMore,
}) => {
  // Top 4 Korean Skincare Bestsellers specifically requested
  const targetIds = [
    'dr-althea-345-relief-cream',
    'boj-glow-serum-propolis-niacinamide',
    'boj-relief-sun-aqua-fresh-rice-b5',
    'skin1004-centella-light-cleansing-oil',
  ];

  const top4Products = targetIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <section id="korean-skin-bestsellers" className="px-3 sm:px-4 py-6 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-5">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 text-right">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F5E4B] bg-[#F0F7F4] px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SEOUL VIRAL ESSENTIALS 🇰🇷</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              الأكثر طلباً في Korean Skin 🌿
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
              المنتجات الأكثر مبيعاً وتقييماً من كبرى علامات العناية الكورية الأصلية 100%.
            </p>
          </div>

          {onDiscoverMore && (
            <button
              type="button"
              onClick={onDiscoverMore}
              className="self-start sm:self-auto text-xs font-bold text-[#1F5E4B] hover:text-[#164336] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>اكتشفي العناية الكورية</span>
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
            </button>
          )}
        </div>

        {/* 4 Clean Premium Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {top4Products.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="font-latin text-[10px] font-bold text-[#1F5E4B] bg-[#F0F7F4] px-2 py-0.5 rounded-md uppercase truncate">
                      {product.brand}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      aria-label="المفضلة"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-slate-300 hover:text-[#FF4D6D] transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? 'fill-[#FF4D6D] text-[#FF4D6D]' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Product Packshot Image */}
                  <div className="w-full aspect-square rounded-xl bg-slate-50 p-3 flex items-center justify-center mb-3 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.nameAr}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info: Name, Short benefit, Rating */}
                  <div className="space-y-1 text-right">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-[#1F5E4B] transition-colors leading-snug">
                      {product.nameAr}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {product.benefitAr}
                    </p>

                    <div className="flex items-center gap-1 pt-1 font-latin text-[11px] text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Price and Add to Cart Button */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5">
                  <div className="flex items-baseline gap-1 font-latin text-right">
                    <span className="text-sm sm:text-base font-black text-[#1F5E4B]">
                      {product.price} DH
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through">
                        {product.originalPrice} DH
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    aria-label={`أضيفي ${product.nameAr} للسلة`}
                    className="min-h-[36px] px-3.5 bg-slate-900 hover:bg-[#1F5E4B] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
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
