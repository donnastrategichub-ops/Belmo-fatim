import { useState, useMemo } from 'react';
import { Sparkles, ArrowLeft, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Under200GridSkeleton } from './Skeletons';

interface Under200SectionProps {
  products: Product[];
  wishlistIds: string[];
  isLoading?: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll?: () => void;
}

export const Under200Section = ({
  products,
  wishlistIds,
  isLoading = false,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onViewAll,
}: Under200SectionProps) => {
  const [filter, setFilter] = useState<'all' | 'under150' | '150to200'>('all');

  const filteredItems = useMemo(() => {
    return products.filter((p) => {
      if (filter === 'under150') return p.price < 150;
      if (filter === '150to200') return p.price >= 150 && p.price <= 200;
      return p.price <= 200;
    });
  }, [products, filter]);

  return (
    <section className="px-4 py-4">
      <div className="max-w-5xl mx-auto bg-white rounded-[28px] border border-emerald-950/5 shadow-[0_4px_25px_rgba(31,94,75,0.03)] p-5 sm:p-7">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-right">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#EAF5EF] text-[#1F5E4B] px-3 py-1 rounded-full text-[11px] font-bold mb-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>جربي بلا ما تخلعي</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              بغيتي تجربي Belmo بلا ما تصرفي بزاف؟
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              اختيارات كورية أصلية ومضمونة بأسعار تحت 200 DH
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#F8FAF8] p-1 rounded-full border border-slate-200/80 self-start sm:self-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-[#1F5E4B] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الكل (تحت 200 DH)
            </button>

            <button
              onClick={() => setFilter('under150')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === 'under150'
                  ? 'bg-[#1F5E4B] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              أقل من 150 DH
            </button>

            <button
              onClick={() => setFilter('150to200')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === '150to200'
                  ? 'bg-[#1F5E4B] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              150 - 200 DH
            </button>
          </div>
        </div>

        {/* Section 4: Mobile Swipe Slider with partial peek + Desktop Grid */}
        {isLoading ? (
          <Under200GridSkeleton />
        ) : (
          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-x-auto no-scrollbar pb-2 snap-slider mb-4">
            {filteredItems.map((prod) => (
              <div key={prod.id} className="snap-card w-[185px] sm:w-auto shrink-0 sm:shrink">
                <ProductCard
                  product={prod}
                  isWishlisted={wishlistIds.includes(prod.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onSelectProduct={onSelectProduct}
                  variant="compact"
                />
              </div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="w-full text-xs font-bold text-slate-800 hover:text-[#1F5E4B] flex items-center justify-center gap-2 py-3 border border-slate-200/80 rounded-full bg-[#F8FAF8] hover:bg-white transition-colors cursor-pointer"
          >
            <span>شوفي جميع المنتجات المناسبة للميزانية</span>
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
          </button>
        )}
      </div>
    </section>
  );
};
