import { Heart, ArrowUpLeft, Sparkles, ShoppingBag, ShieldCheck, Banknote } from 'lucide-react';
import { Product } from '../types';
import { FatimasPicksSkeleton } from './Skeletons';
import { ProductCard } from './ProductCard';

interface FatimasPicksProps {
  products: Product[];
  wishlistIds: string[];
  isLoading?: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const FatimasPicks = ({
  products,
  wishlistIds,
  isLoading = false,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onViewAll,
}: FatimasPicksProps) => {
  const fatimaProducts = products.filter((p) => p.isFatimaPick);
  const featuredProduct = fatimaProducts[0] || products[0];
  const gridProducts = fatimaProducts.slice(1, 5);

  const isFeaturedWishlisted = featuredProduct ? wishlistIds.includes(featuredProduct.id) : false;

  return (
    <section id="fatima-picks-section" className="py-6 px-4 bg-[#EDF3EE]/40">
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* Section Header (Matches "For You" from Screen 2 in image) */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-latin">
                FOR YOU
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  اختيارات خاصة لكِ
                </h2>
                <Heart className="w-3.5 h-3.5 text-[#FF6B81] fill-[#FF6B81]" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              مختارة بعناية من طرف فاطمة الزهراء لبشرة زجاجية ونضرة
            </p>
          </div>

          {/* See All Button */}
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-white hover:bg-slate-100 border border-emerald-950/5 px-3.5 py-1.5 rounded-full shadow-2xs transition-colors"
          >
            <span>عرض الكل</span>
            <ArrowUpLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1. Featured "For You" Luxury Horizontal Card (Exact match to Screen 2 in image) */}
        {featuredProduct && !isLoading && (
          <div
            onClick={() => onSelectProduct(featuredProduct)}
            className="bg-white rounded-[28px] p-5 border border-emerald-950/5 shadow-[0_8px_30px_rgb(31,94,75,0.04)] relative overflow-hidden cursor-pointer hover:shadow-md transition-all group"
          >
            {/* Top row: Brand + Wishlist */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="bg-[#EAF5EF] text-[#1F5E4B] text-[10px] font-bold px-2.5 py-0.5 rounded-full font-latin uppercase">
                  {featuredProduct.brand}
                </span>
                <span className="bg-[#FFF0F3] text-[#FF4D6D] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#FF4D6D]" />
                  <span>اختيار فاطمة الأول</span>
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(featuredProduct);
                }}
                aria-label="المفضلة"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-2xs ${
                  isFeaturedWishlisted
                    ? 'bg-[#FFF0F3] text-[#FF4D6D]'
                    : 'bg-[#F8FAF8] text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Heart
                  className="w-4 h-4 stroke-[2.2]"
                  fill={isFeaturedWishlisted ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            {/* Middle & Packshot layout */}
            <div className="flex items-center justify-between gap-4">
              {/* Product Info */}
              <div className="flex-1 space-y-2 text-right">
                <h3 className="text-base sm:text-lg font-black text-slate-900 line-clamp-2 leading-tight group-hover:text-[#1F5E4B] transition-colors">
                  {featuredProduct.nameAr}
                </h3>
                
                {/* Reassurance point */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                    <ShieldCheck className="w-3 h-3 text-[#1F5E4B]" />
                    <span>كوري أصلي 100%</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span>دفع عند الاستلام</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-lg sm:text-xl font-black text-[#1F5E4B] font-latin">
                    {featuredProduct.price} DH
                  </span>
                  {featuredProduct.originalPrice && (
                    <span className="text-xs text-slate-400 line-through font-latin">
                      {featuredProduct.originalPrice} DH
                    </span>
                  )}
                </div>

                {/* Buy Now CTA (Exact style from Screen 2 in image) */}
                <div className="pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(featuredProduct);
                    }}
                    className="bg-[#162A22] hover:bg-[#1F5E4B] text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-full flex items-center gap-2 shadow-xs active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>أضيفي للسلة الآن</span>
                  </button>
                </div>
              </div>

              {/* Product Packshot Visual with Botanical Element */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-[#F4FAF6] to-[#E8F3ED] p-2 flex items-center justify-center shrink-0 border border-emerald-950/5 relative overflow-hidden">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.nameAr}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. Grid of Fatima's Curated Essentials */}
        {isLoading ? (
          <FatimasPicksSkeleton />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {gridProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                stepNumber={idx + 2}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
                variant="grid"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
