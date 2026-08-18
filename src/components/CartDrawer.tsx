import { useState, FormEvent } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, Truck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form states for COD checkout
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('الدار البيضاء');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = (subtotal * discountPercent) / 100;
  const freeShippingThreshold = 350;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 35;
  const total = subtotal - discountAmount + shippingCost;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'FATIMA10') {
      setDiscountPercent(10);
      setPromoSuccess('تم تطبيق خصم 10% بنجاح!');
    } else if (promoCode.trim().toUpperCase() === 'BELMO') {
      setDiscountPercent(15);
      setPromoSuccess('تم تطبيق كود ترحيبي 15% بنجاح!');
    } else {
      setPromoError('كود الخصم غير صالح. جربي: FATIMA10');
    }
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setOrderComplete(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-slate-900" />
              <h2 className="text-base font-bold text-slate-900">سلة التسوق</h2>
              <span className="text-xs text-slate-400 font-latin">
                ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="bg-slate-50 p-3 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-700" />
                {isFreeShipping ? (
                  <span className="text-emerald-800 font-bold">
                    مبروك! حصلتي على التوصيل المجاني فالمغرب
                  </span>
                ) : (
                  <span>
                    بقاو ليك{' '}
                    <strong className="text-slate-900 font-latin font-bold">
                      DH {remainingForFreeShipping.toFixed(0)}
                    </strong>{' '}
                    للتوصيل المجاني!
                  </span>
                )}
              </span>
              <span className="text-[10px] text-slate-400 font-latin">350 DH</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-900 transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {orderComplete ? (
              <div className="text-center py-10 px-4 space-y-4 animate-in fade-in-50">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  شكراً لطلبك، {customerName}!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  تم تسجيل طلبك بنجاح وسنتصل بك في الرقم ({customerPhone}) لتأكيد موعد التوصيل لـ {customerCity}.
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1 text-right">
                  <div className="flex justify-between">
                    <span>المجموع للدفع عند الاستلام:</span>
                    <strong className="font-latin text-slate-900">DH {total.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>طريقة الدفع:</span>
                    <span className="font-semibold text-emerald-800">الدفع نقداً عند الاستلام</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onClearCart();
                    setOrderComplete(false);
                    setIsCheckingOut(false);
                    onClose();
                  }}
                  className="w-full bg-slate-900 text-white text-xs font-semibold py-3 rounded-xl hover:bg-slate-950"
                >
                  متابعة التسوق
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3 text-slate-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  سلتك فارغة حالياً
                </h3>
                <p className="text-xs text-slate-400 mb-5">
                  اكتشفي اختيارات فاطمة والمنتجات الكورية الأكثر مبيعاً وأضيفيها لسلتك!
                </p>
                <button
                  onClick={onClose}
                  className="bg-slate-900 text-white text-xs font-medium px-5 py-2.5 rounded-xl hover:bg-slate-950"
                >
                  تصفح المنتجات
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form onSubmit={handlePlaceOrder} className="space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    معلومات التوصيل (الدفع عند الاستلام)
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-sky-800 hover:underline"
                  >
                    تعديل السلة
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سارة بناني"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    رقم الهاتف (للتوصيل والواتساب) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="06 XX XX XX XX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-latin text-right"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    المدينة *
                  </label>
                  <select
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  >
                    <option value="الدار البيضاء">الدار البيضاء (Casablanca)</option>
                    <option value="الرباط">الرباط (Rabat)</option>
                    <option value="مراكش">مراكش (Marrakech)</option>
                    <option value="طنجة">طنجة (Tanger)</option>
                    <option value="أكادير">أكادير (Agadir)</option>
                    <option value="فاس">فاس (Fès)</option>
                    <option value="مكناس">مكناس (Meknès)</option>
                    <option value="وجدة">وجدة (Oujda)</option>
                    <option value="مدينة أخرى">مدينة أخرى بالمغرب</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    العنوان بالتفصيل
                  </label>
                  <textarea
                    rows={2}
                    placeholder="الحي، الإقامة، رقم الشقة..."
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] text-slate-600 leading-tight">
                    الدفع نقداً عند استلام طلبيتك وفحصها. لا توجد أي رسوم مخفية.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>تأكيد الطلب — DH {total.toFixed(2)}</span>
                  <Check className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Items List */
              <>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 p-2.5 bg-slate-50/70 rounded-xl border border-slate-100"
                    >
                      <div className="w-14 h-14 bg-white rounded-lg p-1 shrink-0 border border-slate-200/60 shadow-2xs flex items-center justify-center overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.nameAr}
                          className="w-full h-full object-contain mix-blend-multiply"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase font-latin block">
                          {item.product.brand}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.product.nameAr}
                        </h4>
                        <span className="text-xs font-bold text-slate-900 font-latin block mt-0.5">
                          DH {item.product.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold font-latin w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="كود الخصم (جربي FATIMA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs uppercase font-latin placeholder:normal-case placeholder:font-arabic text-right"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-slate-950"
                    >
                      تطبيق
                    </button>
                  </div>
                  {promoSuccess && (
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">
                      {promoSuccess}
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1">
                      {promoError}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer / Summary */}
          {cartItems.length > 0 && !orderComplete && !isCheckingOut && (
            <div className="p-4 border-t border-slate-100 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>المجموع الفرعي</span>
                  <span className="font-latin font-semibold">
                    DH {subtotal.toFixed(2)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>خصم الكود ({discountPercent}%)</span>
                    <span className="font-latin">- DH {discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>التوصيل</span>
                  <span className="font-latin">
                    {isFreeShipping ? (
                      <strong className="text-emerald-800 font-bold">فابور (مجاني)</strong>
                    ) : (
                      `DH ${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>المجموع الإجمالي</span>
                  <span className="font-latin">DH {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.99] shadow-sm"
              >
                <span>متابعة الطلب والدفع عند الاستلام</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
