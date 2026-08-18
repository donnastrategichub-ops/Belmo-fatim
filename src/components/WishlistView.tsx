import { useState, useMemo } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product, SortOption } from '../types';
import { SortDropdown } from './SortDropdown';
import { sortProducts } from '../utils/sortUtils';
import { ProductCard } from './ProductCard';

interface WishlistViewProps {
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onExplore: () => void;
}

export const WishlistView = ({
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct,
  onExplore,
}: WishlistViewProps) => {
  const [currentSort, setCurrentSort] = useState<SortOption>('recommended');

  const sortedProducts = useMemo(() => {
    return sortProducts(wishlistProducts, currentSort);
  }, [wishlistProducts, currentSort]);

  return (
    <div className="px-4 py-5 min-h-[70vh]">
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-2xs p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h1 className="text-lg font-bold text-slate-900">قائمة مفضلاتي</h1>
          </div>

          <div className="flex items-center gap-2">
            {wishlistProducts.length > 1 && (
              <SortDropdown
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                compact
              />
            )}
            <span className="text-xs text-slate-400 font-latin">
              {wishlistProducts.length} منتجات
            </span>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-3">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-300 flex items-center justify-center mx-auto">
              <Heart className="w-7 h-7" />
            </div>
            <p className="text-xs font-semibold text-slate-700">
              ما عندك حتى منتج فالمفضلة دابا
            </p>
            <p className="text-[11px] text-slate-400 max-w-[220px] mx-auto">
              اضغطي على علامة القلب ♡ على أي منتج من اختيارات فاطمة لحفظه هنا.
            </p>
            <button
              onClick={onExplore}
              className="bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-xl flex items-center gap-1.5 mx-auto"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>استكشفي اختيارات فاطمة</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={true}
                onToggleWishlist={onRemoveWishlist}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
                variant="grid"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


