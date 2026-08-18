import { useState, useEffect } from 'react';
import { PRODUCTS, FATIMA_ROUTINE_STEPS } from './data/products';
import { Product, CartItem, VideoItem, RoutineStep } from './types';

// Components
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustBenefits } from './components/TrustBenefits';
import { SkinConcernSection } from './components/SkinConcernSection';
import { BelmoAISection } from './components/BelmoAISection';
import { FatimaWhyBelmo } from './components/FatimaWhyBelmo';
import { FatimasRoutine } from './components/FatimasRoutine';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { SwipeToDiscover } from './components/SwipeToDiscover';
import { BestsellersSection } from './components/BestsellersSection';
import { BuildRoutineByBudget } from './components/BuildRoutineByBudget';
import { Under200Section } from './components/Under200Section';
import { GiftsSection } from './components/GiftsSection';
import { WhatsAppTestimonialsSection } from './components/WhatsAppTestimonialsSection';
import { TomblaSection } from './components/TomblaSection';
import { TrustReassuranceStrip } from './components/TrustReassuranceStrip';
import { NewsletterSection } from './components/NewsletterSection';
import { FloatingActions } from './components/FloatingActions';
import { BottomNav } from './components/BottomNav';
import { StickyBottomCart } from './components/StickyBottomCart';
import { InstantAddedSheet } from './components/InstantAddedSheet';
import { InstagramStoryModal } from './components/InstagramStoryModal';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { MenuDrawer } from './components/MenuDrawer';
import { SkinAIScanModal } from './components/SkinAIScanModal';
import { BelmoAIModal } from './components/BelmoAIModal';
import { TomblaModal } from './components/TomblaModal';
import { VideoModal } from './components/VideoModal';
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
  const [isTomblaModalOpen, setIsTomblaModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedProductForSheet, setAddedProductForSheet] = useState<Product | null>(null);
  const [isInstantSheetOpen, setIsInstantSheetOpen] = useState(false);

  // Initial Shimmer Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['boj-ginseng-serum']);

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

  const handleAddRoutineBundle = () => {
    FATIMA_ROUTINE_STEPS.forEach((step) => {
      const matched = PRODUCTS.find((p) => p.nameAr.includes(step.brand) || p.brand === step.brand) || PRODUCTS[0];
      handleAddToCart(matched, 1, false);
    });
    showToast('تمت إضافة روتين فاطمة كاملاً بخصم خاص (وفّرتي DH 207)!', 'cart');
    setIsCartOpen(true);
  };

  const handleAddRoutineList = (productsToAdd: Product[]) => {
    productsToAdd.forEach((p) => handleAddToCart(p, 1, false));
    showToast(`تمت إضافة ${productsToAdd.length} منتجات لسلتك بنجاح!`, 'cart');
    setIsCartOpen(true);
  };

  const handleAddGiftBox = (gift: { id: string; nameAr: string; brand: string; price: number; image: string }) => {
    const giftProduct: Product = {
      id: gift.id,
      brand: gift.brand,
      nameAr: gift.nameAr,
      nameEn: 'Gift Box Set',
      category: 'gift',
      price: gift.price,
      rating: 5.0,
      reviewsCount: 89,
      image: gift.image,
      descriptionAr: 'بوكس هدايا فاخر مجهز بأجود منتجات العناية الكورية مع بطاقة إهداء مخصصة.',
      howToUseAr: 'هدية جاهزة للتقديم مباشرة.',
    };
    handleAddToCart(giftProduct, 1, true);
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

  // Scroll to section smoothly
  const handleScrollToSection = (sectionId: string) => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Filter products based on selected category pill
  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        if (activeCategory === 'serums') return p.category === 'serum' || p.nameAr.includes('سيروم') || p.nameAr.includes('أمبولة');
        if (activeCategory === 'sunscreen') return p.category === 'sunscreen' || p.nameAr.includes('شمس');
        if (activeCategory === 'moisturizer') return p.category === 'cream' || p.nameAr.includes('كريم') || p.nameAr.includes('مرطب');
        if (activeCategory === 'face') return p.category === 'cleanser' || p.category === 'toner' || p.category === 'serum';
        return true;
      });

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#E5EFE8] flex justify-center selection:bg-[#EAF5EF] selection:text-[#1F5E4B]">
      {/* Responsive Canvas Container */}
      <div className="w-full max-w-5xl bg-[#EDF3EE] min-h-screen shadow-xl relative flex flex-col pb-28 md:pb-12 border-x border-emerald-950/10">
        
        {/* Top Header with Greeting, Search & Category Pills */}
        <Header
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
          activeTab={activeTab}
          activeCategory={activeCategory}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            handleScrollToSection('bestsellers-section');
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
        <main className="flex-1">
          {activeTab === 'home' && (
            <>
              {/* 1. RESULT-FOCUSED MOROCCAN HERO */}
              <HeroSection
                onStartDiagnosis={() => setIsAIModalOpen(true)}
                onExploreFatima={() => handleScrollToSection('routine-section')}
              />

              {/* 2. REASSURANCE TRUST BENEFITS (6 Points) */}
              <TrustBenefits />

              {/* 3. SKIN CONCERN DISCOVERY (5 Moroccan Concerns) */}
              <div id="concerns-section">
                <SkinConcernSection
                  isLoading={isLoading}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, 1, true)}
                  onConsultAI={() => setIsAIModalOpen(true)}
                />
              </div>

              {/* 4. BELMO AI 3-STEP SHOPPING ADVISOR */}
              <BelmoAISection
                onOpenAI={() => setIsAIModalOpen(true)}
              />

              {/* 5. FATIMA'S INSTAGRAM STORY DISCOVERY REEL */}
              <div id="fatima-why-section">
                <FatimaWhyBelmo
                  onPlayVideo={() => setIsStoryModalOpen(true)}
                  onScrollToRoutine={() => handleScrollToSection('routine-section')}
                />
              </div>

              {/* 6. FATIMA'S 4-STEP MOROCCAN ROUTINE BUNDLE */}
              <div id="routine-section">
                <FatimasRoutine
                  isLoading={isLoading}
                  onAddRoutineBundle={handleAddRoutineBundle}
                  onSelectStepProduct={(step: RoutineStep) => {
                    const matched = PRODUCTS.find((p) => p.nameAr.includes(step.brand) || p.brand === step.brand) || PRODUCTS[0];
                    setSelectedProduct(matched);
                  }}
                  onAddToCart={(p) => handleAddToCart(p, 1, true)}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                />
              </div>

              {/* 7. INTERACTIVE BEFORE / AFTER SKIN TRANSFORMATION SLIDER (Section 11) */}
              <BeforeAfterSlider />

              {/* 8. SWIPE-TO-DISCOVER SOCIAL EXPERIENCE (Section 15) */}
              <SwipeToDiscover
                onAddToCart={(p) => handleAddToCart(p, 1, true)}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />

              {/* 9. BEST SELLERS & FILTERED PICKS */}
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

              {/* 10. BUILD ROUTINE BY BUDGET (150 / 300 / 500+ DH) */}
              <BuildRoutineByBudget
                onAddRoutine={handleAddRoutineList}
              />

              {/* 9. UNDER 200 DH ENTRY-LEVEL PICKS */}
              <div id="under200-section">
                <Under200Section
                  products={PRODUCTS}
                  wishlistIds={wishlistIds}
                  isLoading={isLoading}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={(p) => handleAddToCart(p, 1, true)}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onViewAll={() => setIsSearchOpen(true)}
                />
              </div>

              {/* 10. LUXURY CADEAU / GIFTS SECTION */}
              <div id="gifts-section">
                <GiftsSection
                  onAddGiftBox={handleAddGiftBox}
                  onExploreGifts={() => setIsSearchOpen(true)}
                />
              </div>

              {/* 11. WHATSAPP REAL AUDIO & CHAT TESTIMONIALS + CONVERSION CTA */}
              <div id="testimonials-section">
                <WhatsAppTestimonialsSection
                  onOpenConsultation={() => setIsAIModalOpen(true)}
                />
              </div>

              {/* 12. TOMBOLA VIP REWARD DISCOVERY */}
              <div id="tombla-section">
                <TomblaSection
                  onOpenTomblaModal={() => setIsTomblaModalOpen(true)}
                  onApplyGiftCode={(code) => {
                    showToast(`مبروك! تم تفعيل كود الهدية: ${code}`, 'gift');
                  }}
                />
              </div>

              {/* 13. TRUST REASSURANCE STRIP */}
              <TrustReassuranceStrip />

              {/* 14. NEWSLETTER */}
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

        {/* STICKY BOTTOM CART BAR (Shows when items > 0) */}
        <StickyBottomCart
          items={cartItems}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* FLOATING ACTIONS (WhatsApp quick chat) */}
        <FloatingActions />

        {/* CAPSULE ISLAND BOTTOM NAVIGATION */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            if (tab === 'scan') {
              setIsAIModalOpen(true);
            } else if (tab === 'cart') {
              setIsCartOpen(true);
            } else if (tab === 'routine') {
              handleScrollToSection('routine-section');
            } else {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
          onOpenScanner={() => setIsAIModalOpen(true)}
        />

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

        <TomblaModal
          isOpen={isTomblaModalOpen}
          onClose={() => setIsTomblaModalOpen(false)}
          onApplyGiftCode={(code) => {
            showToast(`مبروك! تم تفعيل كود الهدية: ${code}`, 'gift');
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

        <VideoModal
          video={activeVideo}
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1, true)}
        />

        <ProductQuickViewModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
          onToggleWishlist={handleToggleWishlist}
          onAddToCartWithQty={handleAddToCart}
        />

        {/* Instagram-Style Story Modal (Section 3) */}
        <InstagramStoryModal
          isOpen={isStoryModalOpen}
          onClose={() => setIsStoryModalOpen(false)}
          onAddToCart={(p) => handleAddToCart(p, 1, true)}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      </div>
    </div>
  );
}
