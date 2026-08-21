import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Check, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
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
        className="bg-white rounded-[20px] sm:rounded-[24px] p-2.5 sm:p-3.5 border border-emerald-950/5 hover:border-emerald-950/15 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden h-full w-full"
      >
        <div>
          {/* Top Row: Brand & Wishlist */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="font-latin text-[9px] sm:text-[9.5px] font-black text-[#1F5E4B] uppercase tracking-wider truncate">
              {product.brand}
            </span>

            {hasDiscount ? (
              <span className="bg-[#FFF4E5] text-[#B45309] font-latin text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                وفر {discountAmount} DH
              </span>
            ) : (
              <div className="flex items-center gap-0.5 text-amber-500 font-bold font-latin text-[10px]">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          {/* Packshot Image */}
          <div className="w-full aspect-square bg-[#F4FAF6] rounded-xl sm:rounded-2xl p-2 flex items-center justify-center mb-2 relative overflow-hidden">
            <img
              src={imgSrc}
              alt={product.nameAr}
              onError={handleImageError}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Name & Benefit */}
          <div className="space-y-0.5 text-right">
            <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#1F5E4B] transition-colors leading-snug">
              {product.nameAr}
            </h3>
            {product.benefitAr && (
              <p className="text-[9.5px] text-emerald-800 font-medium bg-[#EAF5EF] px-1.5 py-0.5 rounded line-clamp-1 inline-block">
                ✨ {product.benefitAr}
              </p>
            )}
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1">
          <div className="text-right">
            <span className="text-xs sm:text-sm font-black text-[#1F5E4B] font-latin block">
              {product.price.toFixed(0)} DH
            </span>
            {hasDiscount && (
              <span className="text-[9.5px] text-slate-400 line-through font-latin block">
                {product.originalPrice?.toFixed(0)} DH
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            aria-label={`أضيفي ${product.nameAr} للسلة`}
            className={`min-h-[36px] min-w-[36px] px-2.5 rounded-full font-bold text-[10.5px] flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer shrink-0 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[#162A22] hover:bg-[#1F5E4B] text-white shadow-2xs'
            }`}
          >
            {isAdded ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                <span>أضيفي</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Default Grid / Card Variant
  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="bg-white rounded-[20px] sm:rounded-[24px] p-2.5 sm:p-3.5 border border-emerald-950/5 hover:border-emerald-950/15 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden h-full w-full"
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <div className="flex items-center gap-1 min-w-0">
            {typeof stepNumber === 'number' ? (
              <div className="flex items-center gap-1 bg-[#1F5E4B] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full font-latin truncate">
                <span>خطوة {stepNumber}</span>
              </div>
            ) : hasDiscount ? (
              <span className="bg-[#FFF4E5] text-[#B45309] font-latin text-[9px] sm:text-[9.5px] font-black px-2 py-0.5 rounded-full truncate">
                وفر {discountAmount} DH
              </span>
            ) : product.isFatimaPick ? (
              <span className="bg-[#FFF0F3] text-[#FF4D6D] text-[9px] sm:text-[9.5px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 truncate">
                <Heart className="w-2.5 h-2.5 text-[#FF4D6D] fill-[#FF4D6D]" />
                <span>اختيار فاطمة</span>
              </span>
            ) : (
              <span className="bg-[#EAF5EF] text-[#1F5E4B] text-[9px] sm:text-[9.5px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 truncate">
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
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer shrink-0 ${
                isWishlisted
                  ? 'text-[#FF4D6D] bg-[#FFF0F3] shadow-2xs'
                  : 'text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <Heart
                className="w-3.5 h-3.5"
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </button>
          )}
        </div>

        {/* Square Packshot Box */}
        <div className="w-full aspect-square bg-[#F4FAF6] rounded-xl sm:rounded-2xl p-2.5 flex items-center justify-center mb-2 relative overflow-hidden">
          <img
            src={imgSrc}
            alt={product.nameAr}
            onError={handleImageError}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Subtle Authentic Seal */}
          <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 bg-white/90 backdrop-blur-xs border border-emerald-950/5 rounded-full px-1.5 py-0.2 text-[8px] font-bold text-slate-700 shadow-2xs">
            <ShieldCheck className="w-2.5 h-2.5 text-[#1F5E4B]" />
            <span>أصلي</span>
          </div>
        </div>

        {/* Brand, Rating, Name */}
        <div className="space-y-1 text-right">
          <div className="flex items-center justify-between gap-1">
            <span className="font-latin text-[9.5px] font-black text-[#1F5E4B] uppercase tracking-wider block truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 font-bold font-latin text-[10.5px] shrink-0">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1 group-hover:text-[#1F5E4B] transition-colors leading-snug">
            {product.nameAr}
          </h3>

          {/* One Clear Benefit Line */}
          {product.benefitAr && (
            <p className="text-[9.5px] sm:text-[10px] text-emerald-900 font-medium bg-[#EAF5EF] px-2 py-0.5 rounded-md line-clamp-1">
              ✨ {product.benefitAr}
            </p>
          )}
        </div>
      </div>

      {/* Pricing & Add to Cart & Tap-to-Reveal */}
      <div className="mt-2.5 pt-2 border-t border-slate-100">
        <div className="flex items-baseline justify-between gap-1 mb-1.5">
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-base font-black text-[#1F5E4B] font-latin">
              {product.price.toFixed(0)} DH
            </span>
            {hasDiscount && (
              <span className="text-[10px] text-slate-400 line-through font-latin">
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
            className="text-[9.5px] font-bold text-[#1F5E4B] hover:text-[#162A22] flex items-center gap-0.5 py-0.5 px-1.5 rounded bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <span>تفاصيل</span>
            {isExpanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Expandable In-Place Details */}
        {isExpanded && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-1.5 p-2 bg-gradient-to-br from-[#F4FAF6] to-[#EAF5EF] rounded-xl border border-emerald-950/5 text-right text-xs space-y-1 animate-in fade-in zoom-in-95 duration-150"
          >
            <p className="text-[10px] text-slate-700 leading-relaxed font-medium">
              {product.descriptionAr}
            </p>
            {product.howToUseAr && (
              <p className="text-[9px] text-slate-600">
                <strong className="text-[#1F5E4B]">الاستعمال:</strong> {product.howToUseAr}
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          aria-label={`أضيفي ${product.nameAr} للسلة`}
          className={`w-full min-h-[38px] sm:min-h-[42px] font-black text-xs py-2 px-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-98 cursor-pointer ${
            isAdded
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-[#162A22] hover:bg-[#1F5E4B] text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>تمت الإضافة!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>أضيفي للسلة</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
