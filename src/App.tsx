import { useState, useEffect } from 'react';
import { PRODUCTS, GIFT_BUNDLES, CURATED_ROUTINES } from './data/products';
import { Product, CartItem, GiftBundle, CuratedRoutine } from './types';

// Components
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustBarStrip } from './components/TrustBarStrip';
import { RoseBerryHeroShowcase } from './components/RoseBerryHeroShowcase';
import { GiftBundlesSection } from './components/GiftBundlesSection';
import { RoutinesSection } from './components/RoutinesSection';
import { KBeautyNewInSection } from './components/KBeautyNewInSection';
import { BestsellersSection } from './components/BestsellersSection';
import { WhatsAppTestimonialsSection } from './components/WhatsAppTestimonialsSection';
import {
  MarqueeTickerDivider,
  GiftingPerksBanner,
  SeoulAuthenticityBanner,
  WhatsAppConsultationBanner,
} from './components/SectionDividerBanners';
import { TrustReassuranceStrip } from './components/TrustReassuranceStrip';
import { NewsletterSection } from './components/NewsletterSection';
import { FloatingActions } from './components/FloatingActions';
import { InstantAddedSheet } from './components/InstantAddedSheet';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { MenuDrawer } from './components/MenuDrawer';
import { SkinAIScanModal } from './components/SkinAIScanModal';
import { BelmoAIModal } from './components/BelmoAIModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { WishlistView } from './components/WishlistView';
import { AccountView } from './components/AccountView';
import { Toast } from './components/Toast';

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAIScanModalOpen, setIsAIScanModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedProductForSheet, setAddedProductForSheet] = useState<Product | null>(null);
  const [isInstantSheetOpen, setIsInstantSheetOpen] = useState(false);

  // Initial Shimmer Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'cart' | 'wishlist' | 'info' | 'gift' } | null>(null);

  const showToast = (message: string, type: 'cart' | 'wishlist' | 'info' | 'gift' = 'cart') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1, openSheet = true) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    if (openSheet) {
      setAddedProductForSheet(product);
      setIsInstantSheetOpen(true);
    } else {
      showToast(`تمت إضافة ${product.nameAr} للسلة بنجاح`, 'cart');
    }
  };

  const handleAddGiftBundleObject = (bundle: GiftBundle) => {
    const bundleProduct: Product = {
      id: bundle.id,
      brand: 'ROSE BERRY × BELMO',
      nameAr: bundle.nameAr,
      nameEn: bundle.nameEn,
      category: 'gift-bundle',
      price: bundle.price,
      originalPrice: bundle.originalPrice,
      rating: bundle.rating,
      reviewsCount: bundle.reviewsCount,
      image: bundle.image,
      descriptionAr: bundle.taglineAr,
      howToUseAr: 'بوكس هدايا فاخر مجهز ومغلف بشريط ساتان وبطاقة إهداء مخصصة مجاناً.',
    };
    handleAddToCart(bundleProduct, 1, true);
    showToast(`تمت إضافة ${bundle.nameAr} للسلة بنجاح! 🎁`, 'gift');
  };

  const handleAddCuratedRoutine = (routine: CuratedRoutine) => {
    const routineProduct: Product = {
      id: routine.id,
      brand: 'BELMO PROTOCOL',
      nameAr: routine.nameAr,
      nameEn: routine.nameEn,
      category: 'routine-set',
      price: routine.price,
      originalPrice: routine.originalPrice,
      rating: 4.9,
      reviewsCount: 112,
      image: routine.steps[0]?.image || '/src/assets/images/skincare_routine_line_1787165422879.jpg',
      descriptionAr: routine.clinicalNoteAr,
      howToUseAr: 'يتبع التسلسل العلاجي المرقم من 1 إلى 4 يومياً.',
    };
    handleAddToCart(routineProduct, 1, true);
    showToast(`تمت إضافة ${routine.nameAr} كاملة لسلتك مع توفير ${routine.savings} DH! ✨`, 'cart');
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('تم حذف المنتج من السلة', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`تمت إزالة ${product.nameAr} من المفضلة`, 'wishlist');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`تمت إضافة ${product.nameAr} للمفضلة`, 'wishlist');
        return [...prev, product.id];
      }
    });
  };

  // Scroll to section manually when requested
  const handleScrollToSection = (sectionId: string) => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Filter products based on selected category pill
  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        if (activeCategory === 'korean-skin') return p.brand !== 'ROSE BERRY';
        if (activeCategory === 'rose-berry') return p.brand === 'ROSE BERRY';
        if (activeCategory === 'gift-sets') return p.category === 'gift' || p.category === 'gift-bundle' || p.nameAr.includes('كوفري') || p.nameAr.includes('كيت') || p.nameAr.includes('باك');
        if (activeCategory === 'serums') return p.category === 'serum' || p.nameAr.includes('سيروم') || p.nameAr.includes('إيسنس') || p.nameAr.includes('أمبولة');
        if (activeCategory === 'cleanser') return p.category === 'cleanser' || p.nameAr.includes('غسول') || p.nameAr.includes('تنظيف') || p.nameAr.includes('بلسم') || p.nameAr.includes('زيت');
        if (activeCategory === 'sunscreen') return p.category === 'sunscreen' || p.nameAr.includes('شمس');
        if (activeCategory === 'moisturizer') return p.category === 'moisturizer' || p.category === 'mask' || p.nameAr.includes('كريم') || p.nameAr.includes('ماسك');
        if (activeCategory === 'under-200') return p.price < 200 || p.isUnder200;
        return true;
      });

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F7F9F8] flex justify-center selection:bg-emerald-100 selection:text-[#1F5E4B] w-full max-w-full overflow-x-hidden">
      {/* Responsive Canvas Container with High-End Whitespace */}
      <div className="w-full max-w-5xl bg-white min-h-screen shadow-sm relative flex flex-col pb-12 border-x border-slate-100 overflow-x-hidden">
        
        {/* Top Header */}
        <Header
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
          activeTab={activeTab}
          activeCategory={activeCategory}
          onTabChange={(tab) => {
            setActiveTab(tab);
          }}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
          }}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenFilter={() => setIsSearchOpen(true)}
          onOpenScanner={() => setIsAIScanModalOpen(true)}
        />

        {/* Floating Toast notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* MAIN BODY CONTENT */}
        <main className="flex-1 space-y-4 sm:space-y-8">
          {activeTab === 'home' && (
            <>
              {/* 1. HERO — Full-width Campaign Visual with Direct CTA */}
              <HeroSection
                onDiscoverRoseBerry={() => handleScrollToSection('rose-berry-showcase')}
                onDiscoverGifts={() => handleScrollToSection('gift-bundles-section')}
              />

              {/* 2. OFFICIAL COLLABORATION & INTEGRATED VIDEO REELS */}
              <TrustBarStrip
                onAddToCart={(p) => handleAddToCart(p, 1, true)}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />

              {/* 🌟 DIVIDER BANNER 1: Dynamic Infinite Ticker Ribbon */}
              <MarqueeTickerDivider />

              {/* 3. 🌟 ROSE BERRY SHOWCASE — Official 6 Products Spotlight */}
              <RoseBerryHeroShowcase
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={(p) => handleAddToCart(p, 1, true)}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onScrollToAll={() => handleScrollToSection('kbeauty-new-section')}
              />

              {/* 🎁 DIVIDER BANNER 2: Royal Gifting & Packaging Perks */}
              <GiftingPerksBanner
                onExploreGifts={() => handleScrollToSection('gift-bundles-section')}
              />

              {/* 5. GIFT BUNDLES — Curated Luxury Sets */}
              <GiftBundlesSection
                onAddGiftBundle={handleAddGiftBundleObject}
              />

              {/* 6. ROUTINES — Clinical Protocols */}
              <RoutinesSection
                onAddRoutine={handleAddCuratedRoutine}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />

              {/* 🇰🇷 DIVIDER BANNER 3: Seoul Direct Import & Clinical Authenticity */}
              <SeoulAuthenticityBanner
                onOpenScanner={() => setIsAIScanModalOpen(true)}
              />

              {/* 7. K-BEAUTY EDIT — Seoul Viral Trends */}
              <KBeautyNewInSection
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={(p) => handleAddToCart(p, 1, true)}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />

              {/* 8. COMPLETE PRODUCT CATALOG */}
              <div id="bestsellers-section">
                <BestsellersSection
                  products={filteredProducts}
                  wishlistIds={wishlistIds}
                  isLoading={isLoading}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={(p) => handleAddToCart(p, 1, true)}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onViewAll={() => setIsSearchOpen(true)}
                />
              </div>

              {/* 💬 DIVIDER BANNER 4: WhatsApp VIP Skin Advice & Consultation */}
              <WhatsAppConsultationBanner
                onOpenConsultation={() => setIsAIModalOpen(true)}
              />

              {/* 9. CUSTOMER TESTIMONIALS & AUDIO NOTES */}
              <div id="testimonials-section">
                <WhatsAppTestimonialsSection
                  onOpenConsultation={() => setIsAIModalOpen(true)}
                />
              </div>

              {/* 8. TRUST REASSURANCE */}
              <TrustReassuranceStrip />

              {/* 9. NEWSLETTER */}
              <NewsletterSection />
            </>
          )}

          {activeTab === 'wishlist' && (
            <WishlistView
              wishlistProducts={wishlistProducts}
              onRemoveWishlist={handleToggleWishlist}
              onAddToCart={(p) => handleAddToCart(p, 1, true)}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onExplore={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'account' && (
            <AccountView
              onOpenAI={() => setIsAIModalOpen(true)}
              onOpenWishlist={() => setActiveTab('wishlist')}
            />
          )}
        </main>

        {/* FLOATING ACTIONS */}
        <FloatingActions />

        {/* INSTANT ADDED TO CART UPSELL BOTTOM SHEET */}
        <InstantAddedSheet
          product={addedProductForSheet}
          isOpen={isInstantSheetOpen}
          onClose={() => setIsInstantSheetOpen(false)}
          onViewCart={() => setIsCartOpen(true)}
          onAddComplementary={(comp) => {
            handleAddToCart(comp, 1, false);
            showToast(`تمت إضافة ${comp.nameAr} لسلتك! ✨`, 'cart');
            setIsCartOpen(true);
          }}
        />

        {/* MODALS & DRAWERS */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1, true)}
        />

        <MenuDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onNavigateSection={handleScrollToSection}
          onOpenAI={() => setIsAIModalOpen(true)}
        />

        {/* Facial Biometric AI Scan */}
        <SkinAIScanModal
          isOpen={isAIScanModalOpen}
          onClose={() => setIsAIScanModalOpen(false)}
          onAddToCart={(p) => handleAddToCart(p, 1, true)}
          onAddRoutine={(prods) => {
            prods.forEach((p) => handleAddToCart(p, 1, false));
            showToast('تمت إضافة الروتين الكوري المخصص لسلتك!', 'cart');
            setIsCartOpen(true);
          }}
        />

        <BelmoAIModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          onAddToCart={(p) => handleAddToCart(p, 1, true)}
          onAddRoutine={(prods) => {
            prods.forEach((p) => handleAddToCart(p, 1, false));
            showToast('تمت إضافة الروتين الكوري المخصص لسلتك!', 'cart');
            setIsCartOpen(true);
          }}
        />

        <ProductQuickViewModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
          onToggleWishlist={handleToggleWishlist}
          onAddToCartWithQty={handleAddToCart}
        />
      </div>
    </div>
  );
}
