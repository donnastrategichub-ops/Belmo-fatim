import { useState } from 'react';
import { X, Star, Heart, Plus, Minus, ShoppingBag, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCartWithQty: (product: Product, qty: number) => void;
}

export const ProductQuickViewModal = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCartWithQty,
}: ProductQuickViewModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'howTo'>('desc');

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative z-10 bg-white max-w-md w-full rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[88vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
        {/* Top bar with close & wishlist */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={() => onToggleWishlist(product)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isWishlisted ? 'text-rose-500 bg-rose-50' : 'text-slate-400 bg-slate-100'
            }`}
          >
            <Heart
              className="w-4 h-4"
              fill={isWishlisted ? 'currentColor' : 'none'}
            />
          </button>

          <span className="font-latin text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {product.brand}
          </span>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Main Product Packshot */}
          <div className="w-full h-52 bg-slate-50 rounded-2xl flex items-center justify-center p-4 border border-slate-100 relative">
            {product.tag && (
              <span className="absolute top-3 right-3 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs">
                {product.tag}
              </span>
            )}
            <img
              src={product.image}
              alt={product.nameAr}
              className="w-full h-full object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Title & Brand */}
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              {product.nameAr}
            </h2>
            <p className="text-xs text-slate-400 font-latin mt-0.5">
              {product.nameEn}
            </p>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-900 font-latin">
                  {product.rating}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                ({product.reviewsCount} تقييم حقيقي بالمغرب)
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-baseline justify-between">
            <span className="text-xs text-slate-500 font-medium">السعر شامل الضريبة:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900 font-latin">
                DH {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-latin">
                  DH {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Tabs: Description vs How to use */}
          <div>
            <div className="flex border-b border-slate-100 mb-3">
              <button
                onClick={() => setActiveTab('desc')}
                className={`flex-1 py-2 text-xs font-bold transition-colors border-b-2 ${
                  activeTab === 'desc'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                علاش كتحبه فاطمة؟
              </button>
              <button
                onClick={() => setActiveTab('howTo')}
                className={`flex-1 py-2 text-xs font-bold transition-colors border-b-2 ${
                  activeTab === 'howTo'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                طريقة الاستعمال الصحيحة
              </button>
            </div>

            {activeTab === 'desc' ? (
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.descriptionAr}
              </p>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {product.howToUseAr}
              </p>
            )}
          </div>

          {/* Authenticity Badge */}
          <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100/80 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-800 shrink-0" />
            <span className="text-[11px] text-sky-950 font-medium">
              ضمان أصالة المنتج 100% مع باركود التتبع الكوري الأصلي.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
          {/* Quantity selector */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1.5 shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-5 text-center font-bold text-xs font-latin">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={() => {
              onAddToCartWithQty(product, quantity);
              onClose();
            }}
            className="flex-1 bg-slate-900 hover:bg-slate-950 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs active:scale-[0.99]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>إضافة للسلة — DH {(product.price * quantity).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
