import { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Check, ChevronDown, Sparkles, Star, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { SortOption } from '../types';
import { SORT_OPTIONS } from '../utils/sortUtils';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  className?: string;
  compact?: boolean;
}

export const SortDropdown = ({
  currentSort,
  onSortChange,
  className = '',
  compact = false,
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = SORT_OPTIONS.find((opt) => opt.id === currentSort) || SORT_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getSortIcon = (id: SortOption) => {
    switch (id) {
      case 'price-asc':
        return <ArrowUp className="w-3.5 h-3.5 text-slate-500" />;
      case 'price-desc':
        return <ArrowDown className="w-3.5 h-3.5 text-slate-500" />;
      case 'rating-desc':
        return <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />;
      case 'newest':
        return <Sparkles className="w-3.5 h-3.5 text-[#1F5E4B]" />;
      case 'recommended':
      default:
        return <TrendingUp className="w-3.5 h-3.5 text-[#1F5E4B]" />;
    }
  };

  return (
    <div className={`relative inline-block text-right ${className}`} ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-xl border transition-all ${
          isOpen
            ? 'border-[#1F5E4B] bg-[#EAF5EF]/40 text-[#1F5E4B] ring-2 ring-[#1F5E4B]/10'
            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
        } ${compact ? 'px-2.5 py-1.5 text-[11px]' : 'px-3 py-1.5 text-xs'}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <ArrowUpDown className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-slate-500`} />
        <span className="font-medium truncate max-w-[120px] sm:max-w-[160px]">
          {activeOption.labelAr}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-56 sm:w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>ترتيب حسب:</span>
            <span className="font-latin text-[9px] text-[#1F5E4B] font-semibold">SORT BY</span>
          </div>

          <div className="py-1" role="listbox">
            {SORT_OPTIONS.map((option) => {
              const isSelected = option.id === currentSort;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onSortChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                    isSelected
                      ? 'bg-[#EAF5EF] text-[#1F5E4B] font-bold'
                      : 'text-slate-700 hover:bg-slate-50 font-medium'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2">
                    {getSortIcon(option.id)}
                    <span>{option.labelAr}</span>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#1F5E4B] stroke-[2.5]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
