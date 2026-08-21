import { useState } from 'react';
import { Gift, Sparkles, Trophy, ArrowLeft, Check, Copy, RefreshCw, Star, Heart, Ticket, Truck, Tag } from 'lucide-react';

interface TomblaSectionProps {
  onOpenTomblaModal: () => void;
  onApplyGiftCode?: (code: string) => void;
}

export const TomblaSection = ({ onOpenTomblaModal, onApplyGiftCode }: TomblaSectionProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [wonPrize, setWonPrize] = useState<{
    titleAr: string;
    code: string;
    descriptionAr: string;
    icon: any;
  } | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);

  const prizes = [
    {
      titleAr: 'سيروم الجينسنغ BOJ مجاناً',
      code: 'FREE-BOJ-GLOW',
      descriptionAr: 'مع أي طلب يفوق 350 DH',
      icon: Gift,
      color: '#1F5E4B',
    },
    {
      titleAr: 'تخفيض 25% على روتين فاطمة',
      code: 'FATIMA25',
      descriptionAr: 'على جميع منتجات الروتين الكوري',
      icon: Ticket,
      color: '#D97706',
    },
    {
      titleAr: 'توصيل مجاني لباب دارك',
      code: 'LIVRAISON-GRATUITE',
      descriptionAr: 'صالحة لجميع مدن المغرب',
      icon: Truck,
      color: '#2563EB',
    },
    {
      titleAr: 'قسيمة 50 DH تخفيض فوري',
      code: 'TOMBLA50',
      descriptionAr: 'خصم مباشر عند الدفع',
      icon: Tag,
      color: '#E11D48',
    },
    {
      titleAr: 'ماسك كوري أصلي هدية',
      code: 'K-MASK-GIFT',
      descriptionAr: 'ماسك ورقي مرطب مع طلبيتك',
      icon: Sparkles,
      color: '#7C3AED',
    },
    {
      titleAr: 'تخفيض 15% إضافي',
      code: 'FATIMA-VIP',
      descriptionAr: 'على أي سلة شراء اليوم',
      icon: Heart,
      color: '#059669',
    },
  ];

  const recentWinners = [
    { name: 'سلمى البكاري', city: 'الدار البيضاء', prize: 'سيروم الجينسنغ BOJ', time: 'منذ دقيقتين' },
    { name: 'إيمان الفاسي', city: 'الرباط', prize: 'توصيل مجاني', time: 'منذ 5 دقائق' },
    { name: 'مريم التازي', city: 'مراكش', prize: 'قسيمة 50 DH', time: 'منذ 11 دقيقة' },
    { name: 'خديجة الوزاني', city: 'طنجة', prize: 'تخفيض 25% على الروتين', time: 'منذ 18 دقيقة' },
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const selected = prizes[prizeIndex];

    const segmentAngle = 360 / prizes.length;
    const targetRotation = spinRotation + 1800 + (prizes.length - prizeIndex) * segmentAngle;
    setSpinRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      setWonPrize(selected);
      if (onApplyGiftCode) {
        onApplyGiftCode(selected.code);
      }
    }, 3200);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="tombla-section" className="px-3 sm:px-4 py-5 bg-[#EDF3EE]/40 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-[22px] sm:rounded-[28px] border border-amber-200/60 shadow-[0_8px_30px_rgb(31,94,75,0.04)] p-3.5 sm:p-6 relative overflow-hidden">
        {/* Section Header */}
        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3.5 py-1 rounded-full text-xs font-bold mb-2 shadow-2xs">
            <Gift className="w-3.5 h-3.5 text-amber-700" />
            <span>طومبولا فاطمة الزهراء</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            دوري العجلة وربحي هديتك
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[340px] mx-auto leading-relaxed">
            هدايا كورية أصلية، توصيل مجاني، وقسائم فورية مع طلبيتك اليوم!
          </p>
        </div>

        {/* Interactive Tombla Wheel & Stage */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
          {/* Prize Hamper Card Preview */}
          <div className="hidden sm:flex flex-col items-center p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl max-w-[190px] text-center shrink-0">
            <div className="w-28 h-28 rounded-xl overflow-hidden shadow-2xs mb-2 border border-amber-200">
              <img
                src="/src/assets/images/tombla_luxury_prize_1787069793798.jpg"
                alt="جائزة طومبولا فاطمة الكبرى"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
              الجائزة الكبرى
            </span>
            <span className="text-xs font-black text-slate-900 mt-0.5">
              بوكس VIP الكوري
            </span>
            <span className="text-[9.5px] text-slate-500 mt-0.5">
              قيمة 650 DH مهداة
            </span>
          </div>

          {/* Tombla Wheel */}
          <div className="relative max-w-[320px] mx-auto sm:mx-0">
            {/* Wheel Pointer */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
              <div className="w-6 h-6 bg-amber-500 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold">
                ▼
              </div>
            </div>

            {/* Wheel Disc */}
            <div className="relative w-64 h-64 mx-auto rounded-full p-2 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-xl border-4 border-white">
              <div
                className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-[3200ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
                style={{ transform: `rotate(${spinRotation}deg)` }}
              >
                <div className="w-full h-full rounded-full relative bg-[#1F5E4B] text-white">
                  {prizes.map((prize, idx) => {
                    const angle = (360 / prizes.length) * idx;
                    const PrizeIcon = prize.icon;
                    return (
                      <div
                        key={idx}
                        className="absolute w-1/2 h-full top-0 right-0 origin-left flex items-center justify-end pr-3"
                        style={{
                          transform: `rotate(${angle}deg)`,
                          clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
                          backgroundColor: idx % 2 === 0 ? '#1F5E4B' : '#2A7A62',
                        }}
                      >
                        <div
                          className="transform rotate-90 text-right text-[10px] font-bold text-amber-100 flex items-center gap-1 max-w-[85px] leading-tight select-none"
                          style={{ transformOrigin: 'center' }}
                        >
                          <PrizeIcon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{prize.titleAr.split(' ')[0]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Center Spin Button Hub */}
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                aria-label="دوري عجلة الطومبولا"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-b from-[#162A22] to-[#1F5E4B] text-white font-extrabold text-xs shadow-lg border-2 border-white flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer disabled:opacity-90"
              >
                {isSpinning ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="text-[11px] font-bold">دوري</span>
                    <span className="text-[9px] text-emerald-200">الآن</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Won Prize Banner or Spin CTA */}
        {hasWonPrizeState(hasSpun, wonPrize) ? (
          <div className="bg-[#F4FAF6] rounded-2xl p-4 border border-emerald-950/5 text-center animate-in fade-in zoom-in-95 duration-300 mb-5 relative">
            <span className="text-[11px] font-bold text-[#1F5E4B] block uppercase tracking-wider">
              مبروك عليك من فاطمة الزهراء!
            </span>

            <h3 className="text-base font-black text-slate-900 mt-0.5">
              {wonPrize?.titleAr}
            </h3>

            <p className="text-xs text-slate-500 mt-0.5">
              {wonPrize?.descriptionAr}
            </p>

            {/* Coupon Box */}
            <div className="mt-3 flex items-center justify-between gap-2 bg-white border border-dashed border-emerald-300 rounded-xl p-2.5 max-w-[260px] mx-auto">
              <span className="font-mono text-xs font-bold text-slate-900 tracking-wider">
                {wonPrize?.code}
              </span>
              <button
                onClick={() => wonPrize && handleCopyCode(wonPrize.code)}
                className="flex items-center gap-1 text-[11px] font-bold bg-[#162A22] hover:bg-[#1F5E4B] text-white px-3 py-1 rounded-lg transition-colors active:scale-95"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>نسخ الكود</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mb-5">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="bg-[#162A22] hover:bg-[#1F5E4B] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-full shadow-xs transition-all active:scale-98 inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{isSpinning ? 'جاري تدوير الطومبولا...' : 'اضغطي هنا لتدوير الطومبولا'}</span>
              <ArrowLeft className="w-4 h-4 rtl:rotate-0" />
            </button>
          </div>
        )}

        {/* Live Winners Ticker */}
        <div className="border-t border-slate-100 pt-4 mt-2">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-2">
            <span className="flex items-center gap-1 font-bold text-slate-800">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              أحدث الفائزات مع فاطمة الزهراء:
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>مباشر الآن</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recentWinners.map((winner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-[11px] bg-[#F8FAF8] border border-slate-100 rounded-xl px-3 py-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px]">
                    {winner.name.charAt(0)}
                  </span>
                  <span className="font-bold text-slate-900">{winner.name}</span>
                  <span className="text-slate-400">({winner.city})</span>
                </div>
                <span className="text-amber-800 font-medium text-[10px]">
                  ربحات {winner.prize}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Full Modal Trigger */}
        <div className="mt-4 pt-3 text-center">
          <button
            onClick={onOpenTomblaModal}
            className="text-[11px] font-bold text-[#1F5E4B] hover:text-[#184C3C] underline flex items-center justify-center gap-1 mx-auto"
          >
            <span>شوفي جميع هدايا وشروط طومبولا فاطمة الزهراء</span>
            <ArrowLeft className="w-3 h-3 rtl:rotate-0" />
          </button>
        </div>
      </div>
    </section>
  );
};

function hasWonPrizeState(hasSpun: boolean, wonPrize: any): boolean {
  return Boolean(hasSpun && wonPrize);
}
