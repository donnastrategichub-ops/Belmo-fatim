import { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, SortOption } from '../types';
import { SortDropdown } from './SortDropdown';
import { sortProducts } from '../utils/sortUtils';
import { ProductCard } from './ProductCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentSort, setCurrentSort] = useState<SortOption>('recommended');

  if (!isOpen) return null;

  const popularTags = [
    'اختيارات فاطمة',
    'ANUA',
    'BEAUTY OF JOSEON',
    'COSRX',
    'واقي شمس',
    'سيروم النضارة',
    'حب الشباب',
    'سنتيلا',
  ];

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'cleanser', label: 'تنظيف' },
    { id: 'serum', label: 'سيرومات' },
    { id: 'moisturizer', label: 'ترطيب' },
    { id: 'sunscreen', label: 'واقي شمس' },
    { id: 'toner', label: 'تونر' },
  ];

  const processedProducts = useMemo(() => {
    // 1. Filter by text query
    let list = PRODUCTS.filter((p) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        p.nameAr.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.descriptionAr.toLowerCase().includes(q)
      );
    });

    // 2. Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 3. Sort by chosen SortOption
    return sortProducts(list, currentSort);
  }, [query, selectedCategory, currentSort]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-start">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative z-10 bg-white max-w-md w-full mx-auto shadow-2xl rounded-b-3xl max-h-[90vh] flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              autoFocus
              placeholder="ابحثي عن ماركة، منتج، أو مشكل بالبشرة..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-8 pr-10 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1F5E4B] text-right"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute left-2.5 text-slate-400 hover:text-slate-600 p-1"
                aria-label="مسح البحث"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            إلغاء
          </button>
        </div>

        {/* Popular Tags / Category Filters */}
        <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 space-y-2">
          {!query ? (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                الأكثر بحثاً:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(tag === 'اختيارات فاطمة' ? 'فاطمة' : tag)}
                    className="bg-white border border-slate-200/80 hover:border-[#1F5E4B] text-slate-700 text-[11px] px-2.5 py-1 rounded-full transition-colors font-medium shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Categories bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#1F5E4B] text-white shadow-2xs'
                      : 'bg-white text-slate-600 border border-slate-200/70 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Toolbar with Count & Sorting Dropdown */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span>النتائج ({processedProducts.length})</span>
            {query && (
              <span className="text-[11px] text-slate-400 truncate max-w-[120px]">
                لـ "{query}"
              </span>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              الترتيب:
            </span>
            <SortDropdown
              currentSort={currentSort}
              onSortChange={setCurrentSort}
              compact
            />
          </div>
        </div>

        {/* Results 2-Column Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {processedProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <p className="text-xs">لم نجد أي منتج يطابق خيارات البحث الحالية.</p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('all');
                  setCurrentSort('recommended');
                }}
                className="text-xs font-semibold text-[#1F5E4B] hover:underline"
              >
                إعادة ضبط الفلاتر والبحث
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5">
              {processedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelectProduct={(p) => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  onAddToCart={onAddToCart}
                  variant="grid"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

