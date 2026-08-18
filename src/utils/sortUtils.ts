import { Product, SortOption, SortOptionItem } from '../types';

export const SORT_OPTIONS: SortOptionItem[] = [
  {
    id: 'recommended',
    labelAr: 'الأكثر ملاءمة وشهرة',
    labelEn: 'Featured & Popular',
  },
  {
    id: 'price-asc',
    labelAr: 'السعر: من الأقل للأعلى',
    labelEn: 'Price: Low to High',
  },
  {
    id: 'price-desc',
    labelAr: 'السعر: من الأعلى للأقل',
    labelEn: 'Price: High to Low',
  },
  {
    id: 'rating-desc',
    labelAr: 'الأعلى تقييماً',
    labelEn: 'Highest Rated',
  },
  {
    id: 'newest',
    labelAr: 'أحدث المنتجات',
    labelEn: 'Newest Arrivals',
  },
  {
    id: 'reviews-desc',
    labelAr: 'الأكثر طلباً ومراجعة',
    labelEn: 'Most Reviewed',
  },
];

export function sortProducts(products: Product[], sortOption: SortOption): Product[] {
  const list = [...products];

  switch (sortOption) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);

    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);

    case 'rating-desc':
      return list.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return b.reviewsCount - a.reviewsCount;
      });

    case 'reviews-desc':
      return list.sort((a, b) => b.reviewsCount - a.reviewsCount);

    case 'newest':
      // Return newest based on secondary attributes or reverse order
      return list.sort((a, b) => {
        // Boost newer products or reverse id comparison
        return b.id.localeCompare(a.id);
      });

    case 'recommended':
    default:
      return list.sort((a, b) => {
        // Fatima picks first, then high rating
        if (a.isFatimaPick && !b.isFatimaPick) return -1;
        if (!a.isFatimaPick && b.isFatimaPick) return 1;
        return b.rating - a.rating;
      });
  }
}
