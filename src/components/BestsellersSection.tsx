import { useState, useMemo } from 'react';
import { Flame, ArrowLeft, ArrowUpLeft } from 'lucide-react';
import { Product, SortOption } from '../types';
import { BestsellersSkeleton } from './Skeletons';
import { SortDropdown } from './SortDropdown';
import { sortProducts } from '../utils/sortUtils';
import { ProductCard } from './ProductCard';

interface BestsellersSectionProps {
  products: Product[];
  wishlistIds: string[];
  isLoading?: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const BestsellersSection = ({
  products,
  wishlistIds,
  isLoading = false,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onViewAll,
}: BestsellersSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentSort, setCurrentSort] = useState<SortOption>('recommended');

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'face', label: 'الوجه' },
    { id: 'serum', label: 'سيرومات' },
    { id: 'moisturizer', label: 'مرطبات' },
    { id: 'sunscreen', label: 'واقي شمس' },
  ];

  const processedProducts = useMemo(() => {
    let list = products.filter((p) => {
      if (!p.isBestseller) return false;
      if (activeCategory === 'all') return true;
      if (activeCategory === 'face') return ['cleanser', 'toner', 'essence'].includes(p.category);
      return p.category === activeCategory;
    });

    return sortProducts(list, currentSort);
  }, [products, activeCategory, currentSort]);

  return (
    <section className="px-4 py-4">
      <div className="max-w-5xl mx-auto bg-white rounded-[28px] border border-emerald-950/5 shadow-[0_8px_30px_rgb(31,94,75,0.04)] p-5 sm:p-7">
        {/* Header with Title & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-latin">
                BESTSELLERS
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  المنتجات الأكثر مبيعاً
                </h2>
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              الأكثر طلباً وتقييماً من عاشقات الـ K-Beauty في المغرب
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <SortDropdown
              currentSort={currentSort}
              onSortChange={setCurrentSort}
              compact
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#162A22] text-white shadow-xs'
                    : 'bg-[#F8FAF8] text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Section 4: Mobile Swipe Slider with partial peek + Desktop Grid */}
        {isLoading ? (
          <BestsellersSkeleton />
        ) : (
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2 snap-slider">
            {processedProducts.map((product) => (
              <div key={product.id} className="snap-card w-[220px] sm:w-auto shrink-0 sm:shrink">
                <ProductCard
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onSelectProduct={onSelectProduct}
                  variant="grid"
                />
              </div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <button
          onClick={onViewAll}
          className="w-full mt-4 text-xs font-bold text-slate-800 hover:text-slate-950 flex items-center justify-center gap-2 py-3 border border-slate-200/80 rounded-full bg-white hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <span>عرض جميع المنتجات الأكثر مبيعاً</span>
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
        </button>
      </div>
    </section>
  );
};
