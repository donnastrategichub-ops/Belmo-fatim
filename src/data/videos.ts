import { VideoItem } from '../types';

export interface FatimaVideoReel extends VideoItem {
  influencerName: string;
  category: 'rose-berry' | 'k-beauty' | 'gifting';
  likes: string;
  shares: string;
  quoteAr: string;
  reviewNoteAr: string;
}

export const FATIMA_VIDEO_REELS: FatimaVideoReel[] = [
  {
    id: 'fatima-roseberry-prestige-unboxing',
    titleAr: 'أنبوكسينغ وتجربة كوفري برستيج روز بيري (3 طوابق)',
    tag: 'Rose Berry Prestige 👑',
    category: 'rose-berry',
    duration: '0:54',
    thumbnail: '/src/assets/images/fatima_ambassador_story_1787069751769.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    views: '84.2K',
    likes: '12.4K',
    shares: '3.1K',
    influencerName: 'فاطمة الزهراء لحرش',
    productIds: ['rose-berry-coffret-prestige-3-etages'],
    quoteAr: 'هاد الكوفري هو أفخم كادو ممكن تهديه أو تشريه لراسك.. 3 طوابق مكياج وعطر كيحمق!',
    reviewNoteAr: 'شوفي كيفاش طوابق الكوفري كيتفتحو والألوان الثابتة ديال أحمر الشفاه والباليت.'
  },
  {
    id: 'fatima-roseberry-lip-routine',
    titleAr: 'تحديد الشفاه ورسمة الفيلر بباك روز بيري 4 قطع',
    tag: 'Lip Contour & Glow 💄',
    category: 'rose-berry',
    duration: '0:38',
    thumbnail: '/src/assets/images/kbeauty_hero_gift_1787165413585.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    views: '62.9K',
    likes: '9.8K',
    shares: '2.4K',
    influencerName: 'فاطمة الزهراء لحرش',
    productIds: ['rose-berry-kit-beaute-4-pieces', 'rose-berry-pack-levres'],
    quoteAr: 'اللون كيبقى لاصق ومات بلا ما ينشف الشفايف نهائياً.. الدرجة المفضلة عندي!',
    reviewNoteAr: 'طريقة دمج محدد الشفاه مع الروج والملمع للحصول على شفايف ممتلئة وجذابة.'
  },
  {
    id: 'fatima-glass-skin-kbeauty',
    titleAr: 'روتين النضارة الزجاجية (Glass Skin) الصباحي الكوري',
    tag: 'Korean Glass Skin ✨',
    category: 'k-beauty',
    duration: '0:48',
    thumbnail: '/src/assets/images/skincare_routine_line_1787165422879.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    views: '97.5K',
    likes: '18.3K',
    shares: '4.7K',
    influencerName: 'فاطمة الزهراء لحرش',
    productIds: ['anua-cleansing-foam', 'boj-glow-serum-propolis', 'dr-althea-345-relief-cream'],
    quoteAr: 'هاد السيروم مع كريم دكتور الثيا بدلو ليا ملمس بشرتي 180 درجة!',
    reviewNoteAr: 'تسلسل خطوات ترطيب وتهدئة البشرة للحصول على لمعان صحي طبيعي طيلة اليوم.'
  },
  {
    id: 'fatima-skin-barrier-rescue',
    titleAr: 'علاج الاحمرار وآثار الحبوب وترميم الحاجز الجلدي',
    tag: 'Barrier Repair 🌿',
    category: 'k-beauty',
    duration: '0:42',
    thumbnail: '/src/assets/images/skin_before_after_1787069777078.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    views: '53.1K',
    likes: '7.9K',
    shares: '1.8K',
    influencerName: 'فاطمة الزهراء لحرش',
    productIds: ['skin1004-cleansing-oil', 'cosdebaha-azelaic-acid-10', 'dr-althea-345-relief-cream'],
    quoteAr: 'لبنات لي عندهم الحبوب تحت الجلد أو الاحمرار.. هادو المنقذين ديالي!',
    reviewNoteAr: 'كيفاش تخلصت من التهيج والمسام الواسعة باستعمال زيت سينتيلا وحمض الأزيليك.'
  }
];
