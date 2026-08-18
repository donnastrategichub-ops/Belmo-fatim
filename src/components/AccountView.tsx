import { User, Package, MapPin, Sparkles, Phone, ShieldCheck, Heart, LogOut, ChevronLeft } from 'lucide-react';

interface AccountViewProps {
  onOpenAI: () => void;
  onOpenWishlist: () => void;
}

export const AccountView = ({ onOpenAI, onOpenWishlist }: AccountViewProps) => {
  return (
    <div className="px-4 py-5 min-h-[70vh]">
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-2xs p-5 space-y-4">
        {/* Profile Info */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-14 h-14 rounded-full bg-slate-900 text-white font-latin font-bold text-lg flex items-center justify-center border-2 border-slate-100 shadow-xs">
            FB
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-slate-900">سارة بناني</h2>
              <span className="text-[10px] bg-sky-50 text-sky-800 font-bold px-2 py-0.5 rounded-full border border-sky-200/50">
                عضو VIP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-latin mt-0.5">
              +212 661-XXXXXX • الدار البيضاء
            </p>
          </div>
        </div>

        {/* Belmo Skincare AI Card */}
        <div
          onClick={onOpenAI}
          className="bg-slate-900 text-white rounded-xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-950 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <div>
              <span className="text-xs font-bold block">ملف بشرتي الذكي (Belmo AI)</span>
              <span className="text-[10px] text-slate-300">مختلطة • روتين النضارة والتهدئة</span>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </div>

        {/* Account Menu Items */}
        <div className="space-y-1 pt-2">
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-right transition-colors">
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-semibold text-slate-800">طلباتي السابقة وتتبع الشحن</span>
            </div>
            <span className="text-[11px] font-latin font-bold text-sky-800">1 جاري التوصيل</span>
          </button>

          <button
            onClick={onOpenWishlist}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-right transition-colors"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-semibold text-slate-800">قائمة مفضلاتي</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-right transition-colors">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-semibold text-slate-800">عناوين التوصيل المحفوظة</span>
            </div>
            <span className="text-[11px] text-slate-400">Casablanca</span>
          </button>

          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-right transition-colors"
          >
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-800">استشارة مجانية مع خبيرة Belmo</span>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
              واتساب متصل
            </span>
          </a>
        </div>

        {/* Guarantee footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-800" />
          <span>belmo maroc — منتجات كورية أصلية 100% مضمونة</span>
        </div>
      </div>
    </div>
  );
};
