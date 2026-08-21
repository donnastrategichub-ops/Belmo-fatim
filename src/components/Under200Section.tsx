import { useState, useMemo } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
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
    <section className="px-3 sm:px-4 py-4 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-2xs p-3.5 sm:p-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5 text-right">
          <div>
            <div className="inline-flex items-center gap-1 bg-[#F0F7F4] text-[#1F5E4B] px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1 shadow-2xs">
              <Sparkles className="w-3 h-3" />
              <span>جربي بلا ما تخلعي</span>
            </div>

            <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
              بغيتي تجربي Belmo بلا ما تصرفي بزاف؟
            </h2>

            <p className="text-xs text-slate-600 mt-0.5">
              اختيارات كورية أصلية ومضمونة بأسعار تحت 200 DH
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#FAF9F6] p-1 rounded-full border border-slate-200/80 self-start sm:self-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-[#1F5E4B] text-white shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الكل تحت 200 DH
            </button>

            <button
              onClick={() => setFilter('under150')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === 'under150'
                  ? 'bg-[#1F5E4B] text-white shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              أقل من 150 DH
            </button>

            <button
              onClick={() => setFilter('150to200')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === '150to200'
                  ? 'bg-[#1F5E4B] text-white shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              150 - 200 DH
            </button>
          </div>
        </div>

        {/* Responsive Controlled 2-Column Mobile Grid, 4-Column Desktop */}
        {isLoading ? (
          <Under200GridSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 w-full mb-3.5">
            {filteredItems.slice(0, 4).map((prod) => (
              <div key={prod.id} className="w-full min-w-0">
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
            className="w-full text-xs font-bold text-slate-800 hover:text-[#1F5E4B] flex items-center justify-center gap-1.5 py-2.5 border border-slate-200/80 rounded-xl bg-[#FAF9F6] hover:bg-white transition-colors cursor-pointer active:scale-98"
          >
            <span>شوفي جميع المنتجات المناسبة للميزانية</span>
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
          </button>
        )}
      </div>
    </section>
  );
};
