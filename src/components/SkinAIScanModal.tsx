import { useState, useEffect } from 'react';
import { X, Sparkles, Scan, ArrowLeft, ArrowRight, ShieldCheck, Check, ShoppingBag, RotateCcw, Droplets, Sun, Flame, Zap } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SkinAIScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddRoutine: (products: Product[]) => void;
}

export const SkinAIScanModal = ({
  isOpen,
  onClose,
  onAddToCart,
  onAddRoutine,
}: SkinAIScanModalProps) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'metrics' | 'routine'>('metrics');
  
  // Biometric Skin Metrics matching Screen 3
  const [metrics, setMetrics] = useState({
    skinAge: 22,
    acne: 28,
    dryness: 42,
    moisture: 78,
    glow: 86,
  });

  // Simulated scan animation
  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      setScanProgress(0);
      setActiveTab('metrics');

      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            return 100;
          }
          return prev + 15;
        });
      }, 120);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const recommendedProducts = PRODUCTS.slice(0, 3);
  const totalPrice = recommendedProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4 animate-in fade-in-50 duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0F2018]/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container with Rounded-3xl Styling */}
      <div className="relative z-10 bg-[#EDF3EE] max-w-sm sm:max-w-md w-full rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-white/40">
        
        {/* Top Header Bar */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between z-20">
          <button
            onClick={onClose}
            aria-label="رجوع"
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-2xs transition-colors"
          >
            <ArrowRight className="w-5 h-5 rtl:rotate-0" />
          </button>

          {/* Skin Age Floating Pill Badge (Exact match to Screen 3) */}
          <div className="bg-white/95 backdrop-blur-sm border border-emerald-950/10 text-slate-900 px-4 py-1.5 rounded-full shadow-2xs text-xs font-bold font-latin flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#1F5E4B]" />
            <span>Skin Age: {metrics.skinAge}</span>
          </div>

          <div className="w-10 h-10" />
        </div>

        {/* Scan Body Area */}
        <div className="overflow-y-auto flex-1 px-4 pb-5 space-y-3.5 no-scrollbar">
          
          {/* Holographic Face Biometric Scan Screen (Exact visual match to Screen 3) */}
          <div className="relative w-full aspect-[4/3.8] rounded-[26px] overflow-hidden bg-gradient-to-b from-[#E2EAE4] to-[#D5E2D9] border border-white/60 shadow-sm flex items-center justify-center">
            {/* Model Facial Image */}
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80"
              alt="AI Facial Analysis Scan"
              className="w-full h-full object-cover object-top filter brightness-[1.02]"
            />

            {/* Glowing Holographic Biometric Grid Lines (SVG overlay on face) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Jawline and cheek mesh */}
              <path
                d="M 90 140 Q 150 200 210 140"
                stroke="#68D391"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                className="opacity-70 animate-pulse"
              />
              <path
                d="M 100 160 Q 150 220 200 160"
                stroke="#48BB78"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                className="opacity-80"
              />
              <path
                d="M 115 180 Q 150 240 185 180"
                stroke="#38A169"
                strokeWidth="1.5"
                className="opacity-90"
              />
              <path
                d="M 130 200 Q 150 255 170 200"
                stroke="#2F855A"
                strokeWidth="1.5"
              />

              {/* Vertical connecting cyber mesh lines */}
              <line x1="120" y1="130" x2="135" y2="245" stroke="#48BB78" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
              <line x1="150" y1="120" x2="150" y2="260" stroke="#38A169" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.8" />
              <line x1="180" y1="130" x2="165" y2="245" stroke="#48BB78" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />

              {/* Glowing biometric node dots */}
              <circle cx="150" cy="180" r="3" fill="#FFFFFF" stroke="#38A169" strokeWidth="2" className="animate-ping" />
              <circle cx="130" cy="160" r="2.5" fill="#68D391" />
              <circle cx="170" cy="160" r="2.5" fill="#68D391" />
              <circle cx="150" cy="225" r="3" fill="#FFFFFF" stroke="#2F855A" strokeWidth="2" />
            </svg>

            {/* Scanning Laser Line (when active) */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#25D366] to-transparent shadow-[0_0_12px_#25D366] animate-bounce top-1/3" />
            )}

            {/* Live Scan indicator pill */}
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400'}`} />
              <span>{isScanning ? `جاري الفحص ${scanProgress}%` : 'تحليل بيومتري مكتمل'}</span>
            </div>
          </div>

          {/* Results Diagnostic Card (Exact match to Screen 3 bottom container) */}
          {activeTab === 'metrics' ? (
            <div className="bg-white rounded-[26px] p-4 sm:p-5 border border-emerald-950/5 shadow-md space-y-3">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-black text-slate-900">
                  مؤشرات تحليل البشرة الحيوية
                </h4>
                <span className="text-[11px] font-bold text-[#1F5E4B] bg-[#EAF5EF] px-2.5 py-0.5 rounded-full font-latin">
                  AI PRECISION 99%
                </span>
              </div>

              {/* 1. Acne Metric Bar */}
              <div className="bg-[#F8FAF8] rounded-2xl p-3 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">حب الشباب والمسامات (Acne)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${metrics.acne}%` }} />
                  </div>
                  <span className="text-xs font-black text-slate-900 font-latin w-8 text-left">{metrics.acne}%</span>
                </div>
              </div>

              {/* 2. Dryness Metric Bar */}
              <div className="bg-[#F8FAF8] rounded-2xl p-3 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <Flame className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">الجفاف السطحي (Dryness)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-400 h-full rounded-full" style={{ width: `${metrics.dryness}%` }} />
                  </div>
                  <span className="text-xs font-black text-slate-900 font-latin w-8 text-left">{metrics.dryness}%</span>
                </div>
              </div>

              {/* 3. Moisture / Hydration Metric Bar */}
              <div className="bg-[#F8FAF8] rounded-2xl p-3 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">مستوى الترطيب (Moisture)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#1F5E4B] h-full rounded-full" style={{ width: `${metrics.moisture}%` }} />
                  </div>
                  <span className="text-xs font-black text-slate-900 font-latin w-8 text-left">{metrics.moisture}%</span>
                </div>
              </div>

              {/* Bottom AI Recommendation Action Pill (Exact match to Screen 3) */}
              <button
                onClick={() => setActiveTab('routine')}
                className="w-full bg-[#1F5E4B] hover:bg-[#184C3C] text-white font-bold py-3.5 px-5 rounded-2xl text-xs sm:text-sm flex items-center justify-between shadow-md active:scale-98 transition-all mt-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white fill-white/40" />
                  </div>
                  <span>توليد توصية الروتين الكوري الذكي</span>
                </div>
                <ArrowLeft className="w-4 h-4 rtl:rotate-0" />
              </button>
            </div>
          ) : (
            /* Tailored AI Routine Recommendation View */
            <div className="bg-white rounded-[26px] p-4 sm:p-5 border border-emerald-950/5 shadow-md space-y-3 animate-in fade-in-50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div>
                  <h4 className="text-sm font-black text-slate-900">
                    الروتين الموصى به لبشرتك
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    3 منتجات مستهدفة لرفع الترطيب وعلاج الجفاف
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('metrics')}
                  className="text-xs font-bold text-[#1F5E4B] hover:underline"
                >
                  عرض الفحص
                </button>
              </div>

              {/* Recommended products list */}
              <div className="space-y-2">
                {recommendedProducts.map((prod, idx) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-2.5 bg-[#F8FAF8] rounded-2xl border border-slate-100 gap-2.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-white p-1 border border-slate-200/80 shrink-0 flex items-center justify-center">
                        <img
                          src={prod.image}
                          alt={prod.nameAr}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase font-latin block truncate">
                          {prod.brand}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 truncate">
                          {prod.nameAr}
                        </h5>
                        <span className="text-[10px] text-[#1F5E4B] font-bold">
                          {prod.price} DH
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(prod)}
                      className="bg-white hover:bg-[#EAF5EF] text-[#1F5E4B] border border-[#CDE5D8] px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 shadow-2xs transition-colors"
                    >
                      أضف
                    </button>
                  </div>
                ))}
              </div>

              {/* Total & Add all CTA */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">المجموع الكامل:</span>
                  <span className="text-base font-black text-slate-900 font-latin">
                    {totalPrice} DH
                  </span>
                </div>

                <button
                  onClick={() => {
                    onAddRoutine(recommendedProducts);
                    onClose();
                  }}
                  className="bg-[#1F5E4B] hover:bg-[#184C3C] text-white font-bold py-3 px-5 rounded-2xl text-xs flex items-center gap-2 shadow-sm active:scale-98 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>إضافة الباقة كاملة للسلة</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
