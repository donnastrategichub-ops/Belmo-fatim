export interface Product {
  id: string;
  brand: string;
  nameAr: string;
  nameEn: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isFatimaPick?: boolean;
  isBestseller?: boolean;
  isUnder200?: boolean;
  isVideoFeatured?: boolean;
  concerns?: string[];
  descriptionAr: string;
  howToUseAr: string;
  benefitAr?: string;
  tag?: string;
}

export interface RoutineStep {
  stepNumber: number;
  stepNameAr: string;
  stepNameEn: string;
  brand: string;
  productNameAr: string;
  productNameEn: string;
  price: number;
  image: string;
  keyIngredient: string;
}

export interface Review {
  id: string;
  authorName: string;
  city: string;
  rating: number;
  commentAr: string;
  productName: string;
  verified: boolean;
  date: string;
}

export interface VideoItem {
  id: string;
  titleAr: string;
  tag: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  views: string;
  productIds: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SkinConcern {
  id: string;
  titleAr: string;
  subtitleAr: string;
  iconName: string;
  recommendedProductIds: string[];
}

export type SortOption =
  | 'recommended'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'newest'
  | 'reviews-desc';

export interface SortOptionItem {
  id: SortOption;
  labelAr: string;
  labelEn: string;
  iconName?: string;
}

export interface WhatsAppMessage {
  id: string;
  sender: 'customer' | 'support';
  text?: string;
  time: string;
  isAudio?: boolean;
  audioDuration?: string;
  isImage?: boolean;
  imageUrl?: string;
  caption?: string;
}

export interface WhatsAppTestimonial {
  id: string;
  customerName: string;
  customerCity: string;
  avatar: string;
  phoneMasked: string;
  type: 'audio' | 'screenshot' | 'chat';
  date: string;
  time: string;
  productPurchased: string;
  verifiedPurchase: boolean;
  tagAr: string;
  rating: number;
  // Audio specific
  audioDuration?: string;
  audioDurationSec?: number;
  audioSummaryAr?: string;
  audioTranscriptionAr?: string;
  // Screenshot / Chat specific
  previewTextAr?: string;
  screenshotUrl?: string;
  messages?: WhatsAppMessage[];
}
