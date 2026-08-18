import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Check, ShieldCheck, ChevronDown, ChevronUp, Sparkles, Droplets, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

const FALLBACK_PRODUCT_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" fill="none"><rect width="400" height="400" fill="%23F4F7F5" rx="24"/><path d="M160 140h80v180c0 11-9 20-20 20h-40c-11 0-20-9-20-20V140z" fill="%23FFFFFF" stroke="%231F5E4B" stroke-width="6"/><rect x="180" y="80" width="40" height="60" rx="8" fill="%231F5E4B"/><path d="M175 190h50M175 220h50M175 250h30" stroke="%23A5C9B9" stroke-width="4" stroke-linecap="round"/><circle cx="200" cy="110" r="4" fill="%23FFFFFF"/><text x="200" y="370" font-family="sans-serif" font-size="14" font-weight="bold" fill="%231F5E4B" text-anchor="middle">BELMO K-BEAUTY</text></svg>`;

export interface ProductCardProps {
  key?: React.Key;
  product: Product;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  variant?: 'grid' | 'list' | 'compact';
  stepNumber?: number;
  showCodBadge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  variant = 'grid',
  stepNumber,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(product.image || FALLBACK_PRODUCT_IMAGE);
  const [imgError, setImgError] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);
  const discountAmount = hasDiscount ? Math.round(product.originalPrice! - product.price) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(FALLBACK_PRODUCT_IMAGE);
    }
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <div
        onClick={() => onSelectProduct(product)}
        className="bg-white rounded-[24px] p-3 sm:p-3.5 border border-emerald-950/5 hover:border-emerald-950/15 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden h-full"
      >
        <div>
          {/* Top Row: Brand & Wishlist */}
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="font-latin text-[9.5px] font-black text-[#1F5E4B] uppercase tracking-wider truncate">
              {product.brand}
            </span>

            {hasDiscount ? (
              <span className="bg-[#FFF4E5] text-[#B45309] font-latin text-[9.5px] font-bold px-2 py-0.5 rounded-full">
                وفري {discountAmount} DH
              </span>
            ) : (
              <div className="flex items-center gap-1 text-amber-500 font-bold font-latin text-[10px]">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          {/* Packshot Image */}
          <div className="w-full aspect-square bg-[#F4FAF6] rounded-2xl p-2.5 flex items-center justify-center mb-2.5 relative overflow-hidden">
            <img
              src={imgSrc}
              alt={product.nameAr}
              onError={handleImageError}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Name & Single Benefit */}
          <div className="space-y-1 text-right">
            <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#1F5E4B] transition-colors">
              {product.nameAr}
            </h3>
            {product.benefitAr && (
              <p className="text-[10px] text-emerald-800 font-medium bg-[#EAF5EF] px-2 py-0.5 rounded-md line-clamp-1 inline-block">
                ✨ {product.benefitAr}
              </p>
            )}
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="text-right">
            <span className="text-sm font-black text-[#1F5E4B] font-latin block">
              {product.price.toFixed(0)} DH
            </span>
            {hasDiscount && (
              <span className="text-[10px] text-slate-400 line-through font-latin block">
                {product.originalPrice?.toFixed(0)} DH
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            aria-label={`أضيفي ${product.nameAr} للسلة`}
            className={`min-h-[44px] min-w-[44px] px-3.5 rounded-full font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer shrink-0 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[#162A22] hover:bg-[#1F5E4B] text-white shadow-2xs'
            }`}
          >
            {isAdded ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>أضيفي</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Default Grid / Card Variant with Tap-to-Reveal Details
  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="bg-white rounded-[26px] p-3.5 sm:p-4 border border-emerald-950/5 hover:border-emerald-950/15 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden h-full"
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-1.5 mb-2.5">
          <div className="flex items-center gap-1">
            {typeof stepNumber === 'number' ? (
              <div className="flex items-center gap-1 bg-[#1F5E4B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full font-latin">
                <span>خطوة {stepNumber}</span>
              </div>
            ) : hasDiscount ? (
              <span className="bg-[#FFF4E5] text-[#B45309] font-latin text-[10px] font-black px-2.5 py-0.5 rounded-full">
                وفري {discountAmount} DH
              </span>
            ) : product.isFatimaPick ? (
              <span className="bg-[#FFF0F3] text-[#FF4D6D] text-[9.5px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 text-[#FF4D6D] fill-[#FF4D6D]" />
                <span>اختيار فاطمة</span>
              </span>
            ) : (
              <span className="bg-[#EAF5EF] text-[#1F5E4B] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-[#1F5E4B]" />
                <span>كوري أصلي</span>
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          {onToggleWishlist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product);
              }}
              aria-label={isWishlisted ? 'حذف من المفضلة' : 'إضافة للمفضلة'}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
                isWishlisted
                  ? 'text-[#FF4D6D] bg-[#FFF0F3] shadow-2xs scale-105'
                  : 'text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <Heart
                className="w-4 h-4 stroke-[2.2]"
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </button>
          )}
        </div>

        {/* Square Packshot Box */}
        <div className="w-full aspect-square bg-[#F4FAF6] rounded-2xl p-3 flex items-center justify-center mb-3 relative overflow-hidden">
          <img
            src={imgSrc}
            alt={product.nameAr}
            onError={handleImageError}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-106 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Subtle Authentic Seal */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-xs border border-emerald-950/5 rounded-full px-2 py-0.5 text-[8.5px] font-bold text-slate-700 shadow-2xs">
            <ShieldCheck className="w-2.5 h-2.5 text-[#1F5E4B]" />
            <span>100% كوري</span>
          </div>
        </div>

        {/* Brand, Rating, Name, Single Benefit */}
        <div className="space-y-1.5 text-right">
          <div className="flex items-center justify-between">
            <span className="font-latin text-[10px] font-black text-[#1F5E4B] uppercase tracking-wider block truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold font-latin text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1 group-hover:text-[#1F5E4B] transition-colors">
            {product.nameAr}
          </h3>

          {/* One Clear Benefit Line */}
          {product.benefitAr && (
            <p className="text-[10.5px] text-emerald-900 font-medium bg-[#EAF5EF] px-2.5 py-1 rounded-lg line-clamp-1">
              ✨ {product.benefitAr}
            </p>
          )}
        </div>
      </div>

      {/* Pricing & Add to Cart & Tap-to-Reveal */}
      <div className="mt-3 pt-2.5 border-t border-slate-100">
        <div className="flex items-baseline justify-between gap-1 mb-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-[#1F5E4B] font-latin">
              {product.price.toFixed(0)} DH
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through font-latin">
                {product.originalPrice?.toFixed(0)} DH
              </span>
            )}
          </div>

          {/* Tap-to-Reveal trigger button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-[10.5px] font-bold text-[#1F5E4B] hover:text-[#162A22] flex items-center gap-0.5 py-1 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <span>علاش غادي يعجبك؟</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Smooth Expandable In-Place Details (Section 6) */}
        {isExpanded && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-2 p-3 bg-gradient-to-br from-[#F4FAF6] to-[#EAF5EF] rounded-2xl border border-emerald-950/5 text-right text-xs space-y-2 animate-in fade-in zoom-in-95 duration-200"
          >
            <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
              {product.descriptionAr}
            </p>

            {product.howToUseAr && (
              <div className="pt-1.5 border-t border-emerald-950/5 text-[10px] text-slate-600 flex items-start gap-1">
                <span className="font-bold text-[#1F5E4B] shrink-0">طريقة الاستعمال:</span>
                <span>{product.howToUseAr}</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1 text-[9.5px] font-bold text-[#1F5E4B]">
              <span className="bg-white px-2 py-0.5 rounded-full shadow-2xs">✓ مناسب لجميع أنواع البشرة</span>
              <span className="bg-white px-2 py-0.5 rounded-full shadow-2xs">✓ أصلي 100%</span>
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          aria-label={`أضيفي ${product.nameAr} للسلة`}
          className={`w-full min-h-[44px] font-black text-xs py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-98 cursor-pointer ${
            isAdded
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-[#162A22] hover:bg-[#1F5E4B] text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>تمت الإضافة!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              <span>أضيفي للسلة</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
