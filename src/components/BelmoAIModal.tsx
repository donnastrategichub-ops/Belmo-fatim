import { useState } from 'react';
import { X, Sparkles, Bot, Check, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface BelmoAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddRoutine: (products: Product[]) => void;
}

export const BelmoAIModal = ({
  isOpen,
  onClose,
  onAddToCart,
  onAddRoutine,
}: BelmoAIModalProps) => {
  const [step, setStep] = useState<number>(1);
  const [skinType, setSkinType] = useState<string>('combination');
  const [mainConcern, setMainConcern] = useState<string>('acne');
  const [budgetTier, setBudgetTier] = useState<string>('full');
  const [showIndividualProducts, setShowIndividualProducts] = useState(false);

  if (!isOpen) return null;

  const skinTypes = [
    { id: 'oily', title: 'بشرة دهنية', desc: 'لمعان ومسام واضحة' },
    { id: 'dry', title: 'بشرة جافة', desc: 'مشدودة وتحتاج ترطيب عميق' },
    { id: 'combination', title: 'بشرة مختلطة', desc: 'دهنية فالوسط وجافة فالخدود' },
    { id: 'sensitive', title: 'بشرة حساسة', desc: 'سريعة الاحمرار والتهيج' },
  ];

  const concerns = [
    { id: 'acne', title: 'حب الشباب وآثاره', desc: 'تنقية المسام وتهدئة الحبوب' },
    { id: 'dark-spots', title: 'البقع والتصبغات', desc: 'توحيد اللون والنضارة' },
    { id: 'dryness', title: 'الجفاف وفقدان النضارة', desc: 'ترطيب وحاجز واقي' },
    { id: 'glow', title: 'باغة غير Glow ونضارة', desc: 'روتين يومي بسيط ومشرق' },
  ];

  const budgetOptions = [
    { id: 'starter', title: 'روتين الأساسي (أقل من 300 DH)', desc: 'غسول + مرطب' },
    { id: 'full', title: 'روتين كامل ومتكامل (عرض خاص 549 DH)', desc: '4 خطوات احترافية كورية' },
  ];

  // 4 Curated Steps
  const step1Cleanser = PRODUCTS.find((p) => p.category === 'cleanser') || PRODUCTS[0];
  const step2Treatment = PRODUCTS.find((p) => p.category === 'serum' || p.category === 'toner') || PRODUCTS[1];
  const step3Moisturizer = PRODUCTS.find((p) => p.category === 'moisturizer') || PRODUCTS[2];
  const step4Sunscreen = PRODUCTS.find((p) => p.category === 'sunscreen') || PRODUCTS[3];

  const fullRoutineProducts = [step1Cleanser, step2Treatment, step3Moisturizer, step4Sunscreen];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // results
    }
  };

  const handleReset = () => {
    setStep(1);
    setShowIndividualProducts(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative z-10 bg-white max-w-lg w-full rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-emerald-950/5">
        {/* Header */}
        <div className="p-4 bg-[#162A22] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="text-right">
              <h3 className="text-xs sm:text-sm font-black font-latin">Belmo Skincare Assistant</h3>
              <p className="text-[10px] text-emerald-200">تشخيص الروتين الكوري الساهل</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="w-7 h-7 rounded-full bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#F4FAF6] px-4 py-2 flex items-center justify-between text-[11px] font-bold text-slate-700 border-b border-slate-100">
          <span>{step <= 3 ? `السؤال ${step} من 3` : '✨ روتينك الكوري المقترح'}</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  step >= i ? 'w-6 bg-[#1F5E4B]' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* Question 1: Skin Type */}
          {step === 1 && (
            <div className="space-y-4 text-right animate-in fade-in-50 duration-200">
              <div>
                <span className="text-[10.5px] font-bold text-[#1F5E4B] uppercase block">الخطوة 1</span>
                <h4 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                  شنو هو نوع بشرتك؟
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  باش نختارو ليك منتجات تحافظ على توازن وجهك.
                </p>
              </div>

              <div className="space-y-2">
                {skinTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSkinType(type.id)}
                    className={`w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      skinType === type.id
                        ? 'border-[#1F5E4B] bg-[#F4FAF6] shadow-2xs font-bold'
                        : 'border-slate-100 bg-[#F9FAF9] text-slate-700 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${skinType === type.id ? 'border-[#1F5E4B] bg-[#1F5E4B] text-white' : 'border-slate-300'}`}>
                        {skinType === type.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="text-xs font-black block text-slate-900">{type.title}</span>
                        <span className="text-[10.5px] text-slate-500 font-normal">{type.desc}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Concern */}
          {step === 2 && (
            <div className="space-y-4 text-right animate-in fade-in-50 duration-200">
              <div>
                <span className="text-[10.5px] font-bold text-[#1F5E4B] uppercase block">الخطوة 2</span>
                <h4 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                  شنو هو أكبر مشكل باغة تعالجيه؟
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  كنركزو على علاج المشكل الأساسي أولاً.
                </p>
              </div>

              <div className="space-y-2">
                {concerns.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setMainConcern(c.id)}
                    className={`w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      mainConcern === c.id
                        ? 'border-[#1F5E4B] bg-[#F4FAF6] shadow-2xs font-bold'
                        : 'border-slate-100 bg-[#F9FAF9] text-slate-700 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${mainConcern === c.id ? 'border-[#1F5E4B] bg-[#1F5E4B] text-white' : 'border-slate-300'}`}>
                        {mainConcern === c.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="text-xs font-black block text-slate-900">{c.title}</span>
                        <span className="text-[10.5px] text-slate-500 font-normal">{c.desc}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3: Budget Preference */}
          {step === 3 && (
            <div className="space-y-4 text-right animate-in fade-in-50 duration-200">
              <div>
                <span className="text-[10.5px] font-bold text-[#1F5E4B] uppercase block">الخطوة 3</span>
                <h4 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                  شحال الميزانية المفضلة عندك؟
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Belmo كيقترح عليك أفضل حل على قد جيبك.
                </p>
              </div>

              <div className="space-y-2">
                {budgetOptions.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBudgetTier(b.id)}
                    className={`w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      budgetTier === b.id
                        ? 'border-[#1F5E4B] bg-[#F4FAF6] shadow-2xs font-bold'
                        : 'border-slate-100 bg-[#F9FAF9] text-slate-700 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${budgetTier === b.id ? 'border-[#1F5E4B] bg-[#1F5E4B] text-white' : 'border-slate-300'}`}>
                        {budgetTier === b.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="text-xs font-black block text-slate-900">{b.title}</span>
                        <span className="text-[10.5px] text-slate-500 font-normal">{b.desc}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Results & Proposed Routine */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in-50 duration-200 text-right">
              <div className="bg-[#F4FAF6] p-3.5 rounded-2xl border border-emerald-950/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">روتينك المقترح من Belmo</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      4 خطوات كورية متناسقة تعطي نضارة فورية
                    </p>
                  </div>
                  <span className="bg-emerald-100 text-[#1F5E4B] text-[10px] font-bold px-2.5 py-1 rounded-full">
                    مخصص لبشرتك
                  </span>
                </div>
              </div>

              {/* 4 Connected Step Pills */}
              <div className="grid grid-cols-2 gap-2">
                {fullRoutineProducts.map((prod, idx) => (
                  <div
                    key={prod.id}
                    className="bg-[#F8FAF8] rounded-xl p-2.5 border border-slate-100 flex items-center gap-2 text-right"
                  >
                    <div className="w-11 h-11 bg-white rounded-lg p-1 shrink-0 border border-slate-100 flex items-center justify-center">
                      <img
                        src={prod.image}
                        alt={prod.nameAr}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold text-[#1F5E4B] block">
                        {idx + 1}. {idx === 0 ? 'تنظيف' : idx === 1 ? 'علاج' : idx === 2 ? 'ترطيب' : 'حماية'}
                      </span>
                      <h5 className="text-[11px] font-bold text-slate-900 truncate">
                        {prod.nameAr}
                      </h5>
                      <span className="text-[10px] font-latin font-bold text-slate-600 block">
                        {prod.price} DH
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bundle Pricing Card */}
              <div className="bg-gradient-to-r from-[#162A22] to-[#1F5E4B] text-white p-4 rounded-2xl shadow-sm text-right space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    وفري 207 DH
                  </span>
                  <span className="text-xs font-bold text-emerald-200">عرض الروتين الكامل</span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black font-latin">549 DH</span>
                    <span className="text-xs text-slate-300 line-through font-latin">756 DH</span>
                  </div>
                  <span className="text-[11px] text-emerald-100">4 منتجات + توصيل مجاني</span>
                </div>

                <button
                  onClick={() => {
                    onAddRoutine(fullRoutineProducts);
                    onClose();
                  }}
                  className="w-full bg-white hover:bg-slate-50 text-slate-900 font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer mt-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#1F5E4B]" />
                  <span>خدي الروتين كامل — 549 DH</span>
                </button>
              </div>

              {/* Secondary Option: Browse individually */}
              <div className="text-center pt-1">
                <button
                  onClick={() => setShowIndividualProducts(!showIndividualProducts)}
                  className="text-xs text-slate-600 font-bold hover:text-[#1F5E4B] underline cursor-pointer"
                >
                  {showIndividualProducts ? 'إخفاء المنتجات الفردية' : 'نشوف المنتجات وحدة بوحدة'}
                </button>
              </div>

              {/* Individual Products List if toggled */}
              {showIndividualProducts && (
                <div className="space-y-2 pt-2 border-t border-slate-100 animate-in fade-in-50">
                  {fullRoutineProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={prod.image}
                          alt={prod.nameAr}
                          className="w-10 h-10 object-contain"
                        />
                        <div className="text-right">
                          <h6 className="text-xs font-bold text-slate-900">{prod.nameAr}</h6>
                          <span className="text-[11px] font-latin font-bold text-[#1F5E4B]">
                            {prod.price} DH
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onAddToCart(prod)}
                        className="bg-[#162A22] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-[#1F5E4B] transition-colors"
                      >
                        أضيفي للسلة
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {step <= 3 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-white"
              >
                رجوع
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="bg-[#162A22] hover:bg-[#1F5E4B] text-white text-xs font-black px-6 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span>{step === 3 ? 'شوفي روتينك' : 'التالي'}</span>
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
