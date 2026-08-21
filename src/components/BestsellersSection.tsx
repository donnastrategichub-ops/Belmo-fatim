import { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
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
}: BestsellersSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentSort, setCurrentSort] = useState<SortOption>('recommended');

  const categories = [
    { id: 'all', label: 'الكل (All)' },
    { id: 'korean', label: 'العناية الكورية 🇰🇷' },
    { id: 'rose-berry', label: 'مكياج روز بيري 🇦🇪' },
    { id: 'serums', label: 'سيرومات' },
    { id: 'cleansers', label: 'غسول وتنظيف' },
    { id: 'gifts', label: 'بوكسات وهدايا 🎁' },
  ];

  const processedProducts = useMemo(() => {
    let list = products.filter((p) => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'korean') return p.brand !== 'ROSE BERRY';
      if (activeCategory === 'rose-berry') return p.brand === 'ROSE BERRY';
      if (activeCategory === 'serums') return p.category === 'serum' || p.nameAr.includes('سيروم') || p.nameAr.includes('أمبولة') || p.nameAr.includes('إيسنس');
      if (activeCategory === 'cleansers') return p.category === 'cleanser' || p.nameAr.includes('غسول') || p.nameAr.includes('تنظيف') || p.nameAr.includes('زيت') || p.nameAr.includes('بلسم');
      if (activeCategory === 'gifts') return p.category === 'gift' || p.category === 'gift-bundle' || p.nameAr.includes('كوفري') || p.nameAr.includes('كيت') || p.nameAr.includes('باك');
      return true;
    });

    return sortProducts(list, currentSort);
  }, [products, activeCategory, currentSort]);

  return (
    <section id="catalog-section" className="px-3 sm:px-4 py-8 sm:py-12 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header with Title & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-right">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>تشكيلة المنتجات الأصلية 100%</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              جميع المنتجات المختارة
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              مكياج روز بيري الإماراتي الفاخر وأجود منتجات العناية بالبشرة الكورية
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

        {/* Filter Tabs with Ample Spacing */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none w-full">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid with Generous Spacing and White Space */}
        {isLoading ? (
          <BestsellersSkeleton />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {processedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
