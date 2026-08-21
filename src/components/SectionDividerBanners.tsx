import React from 'react';
import {
  Sparkles,
  Gift,
  ShieldCheck,
  Truck,
  MessageCircle,
  Award,
  Clock,
  Heart,
  ChevronLeft,
  Crown,
  CheckCircle2,
  PhoneCall,
  QrCode,
  Flame
} from 'lucide-react';

/**
 * 1. Marquee Ticker Divider
 * Infinite smooth moving ribbon with luxury micro-badges
 */
export const MarqueeTickerDivider: React.FC = () => {
  const items = [
    { text: 'مستحضرات روز بيري الإماراتية الأصلية 100%', icon: Crown, color: 'text-amber-300' },
    { text: 'توصيل مجاني وسريع لجميع مدن المغرب', icon: Truck, color: 'text-emerald-300' },
    { text: 'الدفع عند الاستلام مع إمكانية معاينة الطلبية', icon: ShieldCheck, color: 'text-sky-300' },
    { text: 'هدايا وعينات كورية فاخرة مع كل طلب', icon: Gift, color: 'text-rose-300' },
    { text: 'شراكة حصرية مع الفنانة فاطمة الزهراء لحرش', icon: Sparkles, color: 'text-amber-300' },
    { text: 'استشارة مجانية عبر واتساب لتحديد روتين بشرتك', icon: MessageCircle, color: 'text-emerald-300' },
  ];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-slate-950 via-[#164336] to-slate-950 text-white py-3 my-8 border-y border-emerald-900/40 shadow-inner select-none">
      <div className="flex w-max animate-marquee gap-8 items-center text-xs sm:text-sm font-black">
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5 shrink-0 px-2">
              <Icon className={`w-4 h-4 ${item.color}`} />
              <span className="tracking-wide text-white/95">{item.text}</span>
              <span className="text-white/30 text-xs mr-4">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * 2. Gifting & Royal Packaging Divider Banner
 * Luxurious champagne gold & emerald banner placed before Gift Bundles / Routines
 */
interface GiftingPerksBannerProps {
  onExploreGifts?: () => void;
}

export const GiftingPerksBanner: React.FC<GiftingPerksBannerProps> = ({ onExploreGifts }) => {
  return (
    <div className="px-3 sm:px-4 py-8 my-8 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#164336] via-[#1F5E4B] to-[#12362C] p-5 sm:p-7 text-white shadow-xl border border-emerald-500/20">
          
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF4D6D]/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 text-right">
            
            {/* Right: Badges & Title */}
            <div className="space-y-2 text-center md:text-right">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black text-amber-200 border border-amber-300/30 shadow-xs">
                <Gift className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                <span>خدمة الإهداء الملكي المجانية • BELMO VIP</span>
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-snug">
                باغي تهدي كادو كيحمر الوجه؟ <span className="text-amber-300">التغليف الفاخر وبطاقة الإهداء مجاناً!</span>
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100/85 max-w-2xl font-medium">
                كنغلفو ليك البوكس بأفخم الورود والشرائط الحريرية مع كتابة رسالتك الخاصة بخط عربي أنيق في كارت هدية فاخر.
              </p>
            </div>

            {/* Left: Perks & CTA Button */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 shrink-0">
              <div className="flex items-center gap-3 bg-black/25 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-xs">
                <div className="flex items-center gap-1.5 text-amber-200 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>تغليف حريري</span>
                </div>
                <span className="text-white/20">|</span>
                <div className="flex items-center gap-1.5 text-emerald-200 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>كارت مخصص</span>
                </div>
              </div>

              {onExploreGifts && (
                <button
                  type="button"
                  onClick={onExploreGifts}
                  className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <span>اختاري بوكس الهدايا</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

/**
 * 3. Seoul Direct Import & Clinical Authenticity Divider Banner
 * High-tech clinical look for K-Beauty section separation
 */
interface SeoulAuthenticityBannerProps {
  onOpenScanner?: () => void;
}

export const SeoulAuthenticityBanner: React.FC<SeoulAuthenticityBannerProps> = ({ onOpenScanner }) => {
  return (
    <div className="px-3 sm:px-4 py-8 my-8 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-5 sm:p-7 text-white shadow-xl border border-slate-800">
          
          {/* Subtle Grid Accent Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 text-right">
            
            {/* Visual Icon Group */}
            <div className="flex items-center gap-4 text-right order-2 md:order-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-sky-400/20 to-emerald-400/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-inner shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 justify-end md:justify-start">
                  <span className="bg-sky-500/20 text-sky-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-sky-400/30">
                    DIRECT FROM SEOUL 🇰🇷
                  </span>
                  <span className="text-slate-400 text-xs font-mono">AUTHENTICITY 100%</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white">
                  منتجات أصلية مستوردة مباشرة من كوريا الجنوبية
                </h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  جميع العبوات تحمل الباركود والختم الرسمي للشركة المصنعة (Skin1004, Beauty of Joseon, Anua, Dr.Althea).
                </p>
              </div>
            </div>

            {/* Quick Actions / Interactive Scan Prompt */}
            <div className="flex items-center gap-3 shrink-0 order-1 md:order-2">
              {onOpenScanner && (
                <button
                  type="button"
                  onClick={onOpenScanner}
                  className="bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <QrCode className="w-4 h-4 text-sky-300" />
                  <span>فحص كود الأصالة</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

/**
 * 4. WhatsApp VIP Consultation & Skin Advisor Divider Banner
 * High-conversion divider before testimonials & checkout
 */
interface WhatsAppConsultationBannerProps {
  onOpenConsultation?: () => void;
}

export const WhatsAppConsultationBanner: React.FC<WhatsAppConsultationBannerProps> = ({
  onOpenConsultation,
}) => {
  return (
    <div className="px-3 sm:px-4 py-8 my-8 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#25D366]/15 via-emerald-50 to-[#128C7E]/10 p-5 sm:p-7 border border-[#25D366]/30 shadow-md">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-right">
            
            {/* Right: Advisor Info */}
            <div className="flex items-center gap-3.5 text-right w-full md:w-auto">
              <div className="relative shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <MessageCircle className="w-7 h-7 fill-current" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="bg-[#25D366] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                    مستشارة التجميل أونلاين 🟢
                  </span>
                  <span className="text-slate-500 text-xs font-medium">إجابة فورية</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  حائرة في اختيار المنتجات المناسبة لنوع بشرتك؟
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  تحدثي مع خبيرات العناية لتحديد مشاكل البشرة (تصبغات، مسام، حبوب) وبناء روتينك المناسب.
                </p>
              </div>
            </div>

            {/* Left: Direct WhatsApp Action */}
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end shrink-0">
              <a
                href="https://wa.me/212660000000?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AD%D9%88%D9%84%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%20%D8%A8%D9%8A%D9%84%D9%85%D9%88%20%D9%88%D8%B1%D9%88%D8%B2%20%D8%A8%D9%8A%D8%B1%D9%8A"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] active:scale-95 text-white px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>مراسلة عبر واتساب</span>
              </a>

              {onOpenConsultation && (
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="bg-white hover:bg-slate-50 active:scale-95 text-slate-800 border border-slate-200 px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>استشارة AI الذكية</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
