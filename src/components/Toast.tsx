import { Check, Heart, ShoppingBag, Gift } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'cart' | 'wishlist' | 'info' | 'gift';
  onClose: () => void;
}

export const Toast = ({ message, type }: ToastProps) => {
  return (
    <div className="fixed top-16 inset-x-4 z-50 max-w-sm mx-auto animate-in slide-in-from-top-4 duration-300">
      <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            {type === 'cart' && <ShoppingBag className="w-3.5 h-3.5 text-sky-400" />}
            {type === 'wishlist' && <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />}
            {type === 'info' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            {type === 'gift' && <Gift className="w-3.5 h-3.5 text-amber-400" />}
          </div>
          <span className="text-xs font-semibold">{message}</span>
        </div>
      </div>
    </div>
  );
};

