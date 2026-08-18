import { useState, FormEvent } from 'react';
import { Mail, Gift, Check, Send, Lock } from 'lucide-react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubscribed(true);
    }
  };

  return (
    <section className="px-4 py-5 mb-6">
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-2xs p-5 relative overflow-hidden">
        {/* Subtle decorative gift icon */}
        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mx-auto mb-3">
          <Mail className="w-5 h-5 stroke-[1.75]" />
        </div>

        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            اشتركي في نشرتنا!
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-[260px] mx-auto leading-relaxed">
            كوني أول وحدة تعرفي على العروض الجديدة، المنتجات الحصرية ونصائح فاطمة للعناية بالبشرة.
          </p>
        </div>

        {subscribed ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3.5 text-center flex items-center justify-center gap-2 animate-in fade-in-50">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold">
              شكراً لاشتراكك! كود الخصم وصل لبريدك: FATIMA10
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخلي بريدك الإلكتروني"
                required
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-right"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-950 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] text-xs shadow-xs"
            >
              <span>اشتركي الآن</span>
              <Send className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <span className="text-[10px] text-slate-400 inline-flex items-center gap-1 justify-center">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>خصوصيتك محمية 100%، يمكنك إلغاء الاشتراك في أي وقت.</span>
          </span>
        </div>
      </div>
    </section>
  );
};
