import { useState } from 'react';
import { X, Gift, Sparkles, Trophy, Check, Copy, RefreshCw, Star, Heart, ArrowLeft, Ticket, Truck, Tag, ShoppingBag } from 'lucide-react';

interface TomblaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGiftCode?: (code: string) => void;
}

export const TomblaModal = ({ isOpen, onClose, onApplyGiftCode }: TomblaModalProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<{
    titleAr: string;
    code: string;
    descriptionAr: string;
    icon: any;
  } | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);

  if (!isOpen) return null;

  const prizes = [
    {
      titleAr: 'سيروم الجينسنغ BOJ مجاناً',
      code: 'FREE-BOJ-GLOW',
      descriptionAr: 'سيروم كوري أصلي مع أي طلب يفوق 350 DH',
      icon: Gift,
    },
    {
      titleAr: 'تخفيض 25% على روتين فاطمة',
      code: 'FATIMA25',
      descriptionAr: 'خصم ربع القيمة على الروتين الرباعي',
      icon: Ticket,
    },
    {
      titleAr: 'توصيل مجاني لباب دارك',
      code: 'LIVRAISON-GRATUITE',
      descriptionAr: 'توصيل سريع مجاني لجميع المدن المغربية',
      icon: Truck,
    },
    {
      titleAr: 'قسيمة 50 DH تخفيض فوري',
      code: 'TOMBLA50',
      descriptionAr: 'تخفيض مباشر على طلبيتك اليوم',
      icon: Tag,
    },
    {
      titleAr: 'ماسك كوري أصلي هدية',
      code: 'K-MASK-GIFT',
      descriptionAr: 'ماسك مرطب للبشرة من اختيارات فاطمة',
      icon: Sparkles,
    },
    {
      titleAr: 'تخفيض 15% إضافي',
      code: 'FATIMA-VIP',
      descriptionAr: 'تخفيض حصري لزبونات بلّمو وفاطمة الزهراء',
      icon: Heart,
    },
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const selected = prizes[prizeIndex];

    const segmentAngle = 360 / prizes.length;
    const targetRotation = spinRotation + 2160 + (prizes.length - prizeIndex) * segmentAngle;
    setSpinRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selected);
      if (onApplyGiftCode) {
        onApplyGiftCode(selected.code);
      }
    }, 3500);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end sm:justify-center items-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative z-10 bg-gradient-to-b from-[#FAF4EB] via-white to-[#F0F7F3] max-w-md w-full rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto border border-amber-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 text-slate-500 hover:text-slate-900 border border-slate-200 flex items-center justify-center shadow-2xs z-20"
          aria-label="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center pt-2 mb-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-[11px] font-bold mb-2">
            <Gift className="w-3.5 h-3.5 text-amber-700" />
            <span>طومبولا فاطمة الزهراء الكبرى</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            دوري الطومبولا وربحي هديتك!
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            كل طومبولا فيها جائزة مضمونة مقدمة من فاطمة الزهراء و Belmo
          </p>
        </div>

        {/* Wheel Graphic */}
        <div className="relative w-60 h-60 mx-auto my-4">
          {/* Wheel Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
            <div className="w-6 h-6 bg-amber-500 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold">
              ▼
            </div>
          </div>

          <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-xl border-4 border-white">
            <div
              className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-[3500ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
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
                        className="transform rotate-90 text-right text-[10px] font-bold text-amber-100 flex items-center gap-1 max-w-[80px] leading-tight select-none"
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

            {/* Center Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 text-white font-extrabold text-[11px] shadow-lg border-4 border-white flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer disabled:opacity-90"
            >
              {isSpinning ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>دوري</span>
                  <span className="text-[9px] text-amber-100">دابا</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Won State */}
        {wonPrize && (
          <div className="bg-white rounded-2xl p-4 border border-amber-300 shadow-md text-center animate-in fade-in zoom-in-95 duration-300 mt-4 mb-2">
            {wonPrize.icon && (
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2 shadow-2xs">
                {(() => {
                  const PrizeIcon = wonPrize.icon;
                  return <PrizeIcon className="w-5 h-5 text-amber-700" />;
                })()}
              </div>
            )}
            <span className="text-[11px] font-bold text-[#1F5E4B] block uppercase">
              مبروك! ربحتي من فاطمة الزهراء:
            </span>
            <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
              {wonPrize.titleAr}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">{wonPrize.descriptionAr}</p>

            <div className="mt-3 flex items-center justify-between gap-2 bg-amber-50/80 border border-dashed border-amber-300 rounded-xl p-2.5 max-w-[260px] mx-auto">
              <span className="font-mono text-xs font-bold text-slate-900 tracking-wider">
                {wonPrize.code}
              </span>
              <button
                onClick={() => handleCopyCode(wonPrize.code)}
                className="flex items-center gap-1 text-[11px] font-bold bg-slate-900 hover:bg-slate-950 text-white px-2.5 py-1 rounded-lg transition-colors active:scale-95"
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
        )}

        {/* Action Button */}
        <div className="mt-4">
          <button
            onClick={() => {
              if (!wonPrize) {
                handleSpin();
              } else {
                onClose();
              }
            }}
            className="w-full bg-[#1F5E4B] hover:bg-[#184C3C] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs shadow-sm"
          >
            {wonPrize ? (
              <span className="flex items-center gap-1.5 justify-center">
                <ShoppingBag className="w-4 h-4" />
                <span>تسوقي الآن واستعملي الكود</span>
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isSpinning ? 'جاري السحب...' : 'دوري العجلة واربحي هديتك'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
