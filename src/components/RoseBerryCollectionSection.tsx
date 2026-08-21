import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Star, Sparkles, Heart } from 'lucide-react';

interface RoseBerryCollectionSectionProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const RoseBerryCollectionSection: React.FC<RoseBerryCollectionSectionProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  // Filter the 6 Rose Berry products
  const roseBerryProducts = products.filter((p) => p.brand === 'ROSE BERRY');

  // Featured luxury coffrets (Coffret Prestige & Coffret Maquillage Complet)
  const prestigeBox = roseBerryProducts.find((p) => p.id === 'rose-berry-coffret-prestige-3-etages') || roseBerryProducts[4];
  const completBox = roseBerryProducts.find((p) => p.id === 'rose-berry-coffret-maquillage-complet') || roseBerryProducts[3];

  // Standard items
  const standardItems = roseBerryProducts.filter(
    (p) => p.id !== prestigeBox?.id && p.id !== completBox?.id
  );

  return (
    <section id="rose-berry-collection" className="px-3 sm:px-4 py-6 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-5">
        
        {/* Section Header */}
        <div className="text-right space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4D6D] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مكياج إماراتي فاخر 🇦🇪</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            اختيارات Rose Berry ✨
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
            التشكيلة الرسمية المعتمدة لإطلالة ساحرة وبوكسات هدايا راقية مع تغليف فاخر مجاناً.
          </p>
        </div>

        {/* 1. HERO SPOTLIGHT: COFFRET PRESTIGE 3 ÉTAGES (Visually Prioritized) */}
        {prestigeBox && (
          <div
            onClick={() => onSelectProduct(prestigeBox)}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-200 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              
              {/* Product Packshot Image */}
              <div className="w-full sm:w-56 aspect-square sm:aspect-auto sm:h-56 rounded-xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-center shrink-0 relative overflow-hidden">
                <img
                  src={prestigeBox.image}
                  alt={prestigeBox.nameAr}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {/* Single Important Badge */}
                <div className="absolute top-2 right-2 bg-[#FF4D6D] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                  الهدية الملكية VIP 👑
                </div>
              </div>

              {/* Product Details & Action */}
              <div className="flex-1 text-right space-y-2.5 w-full">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-latin text-xs font-bold text-[#FF4D6D] tracking-wider uppercase">
                    ROSE BERRY ÉMIRATS
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(prestigeBox);
                    }}
                    aria-label="المفضلة"
                    className="w-8 h-8 rounded-full bg-slate-50 hover:bg-[#FFF0F3] text-slate-400 hover:text-[#FF4D6D] flex items-center justify-center transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlistIds.includes(prestigeBox.id) ? 'fill-[#FF4D6D] text-[#FF4D6D]' : ''
                      }`}
                    />
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#FF4D6D] transition-colors">
                  {prestigeBox.nameAr}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {prestigeBox.descriptionAr}
                </p>

                <div className="flex items-center gap-2 pt-1 font-latin text-xs text-amber-500 font-bold">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{prestigeBox.rating}</span>
                  </div>
                  <span className="text-slate-400 font-normal">({prestigeBox.reviewsCount} تقييم)</span>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
                  <div className="flex items-baseline gap-1.5 font-latin text-right">
                    <span className="text-lg sm:text-xl font-black text-[#1F5E4B]">
                      {prestigeBox.price} DH
                    </span>
                    {prestigeBox.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {prestigeBox.originalPrice} DH
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(prestigeBox);
                    }}
                    className="min-h-[40px] px-5 bg-slate-900 hover:bg-[#1F5E4B] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
                    <span>أضيفي للسلة</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 2. SECOND PRIORITIZED COFFRET: COFFRET MAQUILLAGE COMPLET */}
        {completBox && (
          <div
            onClick={() => onSelectProduct(completBox)}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              
              <div className="w-full sm:w-48 aspect-square sm:aspect-auto sm:h-48 rounded-xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-center shrink-0 relative overflow-hidden">
                <img
                  src={completBox.image}
                  alt={completBox.nameAr}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                  الأكثر طلباً 🎁
                </div>
              </div>

              <div className="flex-1 text-right space-y-2 w-full">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-latin text-xs font-bold text-slate-500 uppercase">
                    ROSE BERRY
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(completBox);
                    }}
                    aria-label="المفضلة"
                    className="w-8 h-8 rounded-full bg-slate-50 hover:bg-[#FFF0F3] text-slate-400 hover:text-[#FF4D6D] flex items-center justify-center transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlistIds.includes(completBox.id) ? 'fill-[#FF4D6D] text-[#FF4D6D]' : ''
                      }`}
                    />
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#1F5E4B] transition-colors">
                  {completBox.nameAr}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {completBox.benefitAr}
                </p>

                <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
                  <div className="flex items-baseline gap-1.5 font-latin">
                    <span className="text-lg font-black text-[#1F5E4B]">
                      {completBox.price} DH
                    </span>
                    {completBox.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {completBox.originalPrice} DH
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(completBox);
                    }}
                    className="min-h-[38px] px-4 bg-slate-900 hover:bg-[#1F5E4B] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
                    <span>أضيفي للسلة</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 3. 4 STANDARD ROSE BERRY PRODUCTS IN REFINED 2-COLUMN GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {standardItems.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="font-latin text-[9.5px] font-bold text-slate-500 uppercase truncate">
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

                  {/* Image container */}
                  <div className="w-full aspect-square rounded-xl bg-slate-50 p-2 flex items-center justify-center mb-2 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.nameAr}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Title & Short benefit */}
                  <div className="space-y-1 text-right">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#1F5E4B] transition-colors leading-snug">
                      {product.nameAr}
                    </h4>
                    {product.benefitAr && (
                      <p className="text-[10px] text-slate-500 line-clamp-1">
                        {product.benefitAr}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                  <div className="flex items-baseline gap-1 font-latin">
                    <span className="text-sm font-black text-[#1F5E4B]">
                      {product.price} DH
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    aria-label={`أضيفي ${product.nameAr} للسلة`}
                    className="min-h-[34px] px-3 bg-slate-900 hover:bg-[#1F5E4B] text-white rounded-xl font-bold text-[11px] flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer shrink-0"
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
