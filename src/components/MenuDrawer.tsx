import { X, Sparkles, Gift, Flame, Tag, HelpCircle, Phone, Heart, ShoppingBag, ShieldCheck, ArrowLeft, MessageSquare } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAI: () => void;
}

export const MenuDrawer = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenAI,
}: MenuDrawerProps) => {
  if (!isOpen) return null;

  const menuLinks = [
    {
      id: 'fatima-picks-section',
      label: 'اختيارات فاطمة',
      badge: 'حصري',
      icon: Sparkles,
    },
    {
      id: 'routine-section',
      label: 'روتين فاطمة الكامل (4 خطوات)',
      badge: 'وفرّي DH 207',
      icon: Heart,
    },
    {
      id: 'testimonials-section',
      label: 'رسائل وأوديوات واتساب (تجارب حقيقية)',
      badge: 'صوت وسكرينات',
      icon: MessageSquare,
    },
    {
      id: 'tombla-section',
      label: 'طومبولا فاطمة الزهراء',
      badge: 'هدايا وجوائز',
      icon: Gift,
    },
    {
      id: 'bestsellers-section',
      label: 'المنتجات الأكثر مبيعاً',
      icon: Flame,
    },
    {
      id: 'gifts-section',
      label: 'بوكسات الهدايا والتغليف الفاخر',
      badge: 'جديد',
      icon: Gift,
    },
    {
      id: 'concerns-section',
      label: 'شنو محتاجة بشرتك؟ (استشارة)',
      icon: HelpCircle,
    },
    {
      id: 'under200-section',
      label: 'Beauty Finds تحت 200 DH',
      icon: Tag,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-latin tracking-tight text-xl font-bold text-slate-900 lowercase">
                belmo
              </span>
              <span className="text-[9.5px] text-slate-400 font-arabic">
                skincare friend, not a store
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Belmo AI Promo Card inside Drawer */}
          <div className="p-4 pb-0">
            <div
              onClick={() => {
                onClose();
                onOpenAI();
              }}
              className="bg-slate-900 text-white rounded-xl p-3.5 cursor-pointer hover:bg-slate-950 transition-colors relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold font-latin">Belmo AI Skincare</span>
              </div>
              <p className="text-[11px] text-slate-300">
                تشخيص ذكي مجاني يختار لك روتينك المناسب فـ دقيقة واحدة
              </p>
            </div>
          </div>

          {/* Links List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
              التصفح السريع
            </span>

            {menuLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigateSection(link.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-800 hover:text-slate-950 transition-colors text-right"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold">{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] font-bold bg-sky-50 text-sky-800 px-2 py-0.5 rounded-full border border-sky-200/50">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Brands Divider */}
            <div className="pt-4 mt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
                أشهر الماركات الكورية
              </span>
              <div className="grid grid-cols-2 gap-1.5 px-1 font-latin text-[11px] font-semibold text-slate-700">
                <span className="p-1.5 bg-slate-50 rounded-lg">ANUA</span>
                <span className="p-1.5 bg-slate-50 rounded-lg">BEAUTY OF JOSEON</span>
                <span className="p-1.5 bg-slate-50 rounded-lg">COSRX</span>
                <span className="p-1.5 bg-slate-50 rounded-lg">SKIN1004</span>
              </div>
            </div>
          </div>

          {/* Footer Assistance */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-2">
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>مستشارة Belmo عبر الواتساب</span>
              </div>
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
              <ShieldCheck className="w-3 h-3 text-sky-800" />
              <span>منتجات كورية أصلية 100% مستوردة مباشرة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
