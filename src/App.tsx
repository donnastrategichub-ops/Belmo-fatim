import { useState } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, CuratedRoutine } from './types';
import { FatimaVideoReel } from './data/videos';

// Components (13 Ordered Homepage Sections)
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustBarCompact } from './components/TrustBarCompact';
import { RoseBerryCollectionSection } from './components/RoseBerryCollectionSection';
import { FatimaEzzahraEditSection } from './components/FatimaEzzahraEditSection';
import { FatimaCampaignMediaSection } from './components/FatimaCampaignMediaSection';
import { OfficialCollaborationSection } from './components/OfficialCollaborationSection';
import { RealCustomerProofSection } from './components/RealCustomerProofSection';
import { TransitionToKoreanSkinBanner } from './components/TransitionToKoreanSkinBanner';
import { KoreanSkinBestsellersSection } from './components/KoreanSkinBestsellersSection';
import { ShopByConcernSection } from './components/ShopByConcernSection';
import { KoreanSkinRoutinesSection } from './components/KoreanSkinRoutinesSection';
import { FinalWhatsAppConsultationSection } from './components/FinalWhatsAppConsultationSection';

// Supporting Components
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
import { FatimaVideoModal } from './components/FatimaVideoModal';
import { WishlistView } from './components/WishlistView';
import { AccountView } from './components/AccountView';
import { Toast } from './components/Toast';

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAIScanModalOpen, setIsAIScanModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVideoReel, setSelectedVideoReel] = useState<FatimaVideoReel | null>(null);
  const [addedProductForSheet, setAddedProductForSheet] = useState<Product | null>(null);
  const [isInstantSheetOpen, setIsInstantSheetOpen] = useState(false);

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

  const handleAddCuratedRoutine = (routine: CuratedRoutine) => {
    // Add all products of this routine to cart
    routine.productIds.forEach((pId) => {
      const prod = PRODUCTS.find((p) => p.id === pId);
      if (prod) {
        handleAddToCart(prod, 1, false);
      }
    });
    showToast(`تمت إضافة ${routine.nameAr} لسلتك مع خصم ${routine.savings} DH! 🎁`, 'gift');
    setIsCartOpen(true);
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
    showToast('تم إفراغ السلة', 'info');
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`تمت إزالة ${product.nameAr} من المفضلة`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`تمت إضافة ${product.nameAr} إلى المفضلة ❤️`, 'wishlist');
        return [...prev, product.id];
      }
    });
  };

  // Smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F7F9F8] flex justify-center selection:bg-emerald-100 selection:text-[#1F5E4B] w-full max-w-full overflow-x-hidden">
      {/* Responsive Canvas Container */}
      <div className="w-full max-w-5xl bg-white min-h-screen shadow-sm relative flex flex-col pb-12 border-x border-slate-100 overflow-x-hidden">
        
        {/* 01 — HEADER */}
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
            if (cat === 'rose-berry' || cat === 'makeup' || cat === 'gift-boxes') {
              handleScrollToSection('rose-berry-collection');
            } else if (cat === 'k-beauty' || cat === 'skincare') {
              handleScrollToSection('korean-skin-bestsellers');
            } else if (cat === 'routines') {
              handleScrollToSection('korean-skin-routines');
            }
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
            <div className="space-y-2 sm:space-y-4">
              {/* 02 — HERO: ROSE BERRY × FATIMA EZZAHRA */}
              <HeroSection
                onDiscoverRoseBerry={() => handleScrollToSection('rose-berry-collection')}
              />

              {/* 03 — TRUST BAR */}
              <TrustBarCompact />

              {/* 04 — ROSE BERRY COLLECTION */}
              <RoseBerryCollectionSection
                products={PRODUCTS}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={(p) => handleAddToCart(p, 1, true)}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />

              {/* 05 — FATIMA EZZAHRA EDIT */}
              <FatimaEzzahraEditSection
                products={PRODUCTS}
                onAddToCart={(p) => handleAddToCart(p, 1, true)}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onShopFullRoutine={() => handleScrollToSection('rose-berry-collection')}
              />

              {/* 06 — FATIMA EZZAHRA CAMPAIGN CONTENT */}
              <FatimaCampaignMediaSection
                onSelectReel={(reel) => setSelectedVideoReel(reel)}
              />

              {/* 07 — OFFICIAL COLLABORATION */}
              <OfficialCollaborationSection
                onDiscoverCollection={() => handleScrollToSection('rose-berry-collection')}
              />

              {/* 08 — REAL CUSTOMER PROOF */}
              <RealCustomerProofSection
                onOpenConsultation={() => setIsAIModalOpen(true)}
              />

              {/* 09 — TRANSITION TO KOREAN SKIN */}
              <TransitionToKoreanSkinBanner
                onScrollToKoreanSkin={() => handleScrollToSection('korean-skin-bestsellers')}
              />

              {/* 10 — KOREAN SKIN BESTSELLERS */}
              <KoreanSkinBestsellersSection
                products={PRODUCTS}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={(p) => handleAddToCart(p, 1, true)}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onDiscoverMore={() => handleScrollToSection('shop-by-concern')}
              />

              {/* 11 — SHOP BY SKIN CONCERN */}
              <ShopByConcernSection
                products={PRODUCTS}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={(p) => handleAddToCart(p, 1, true)}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />

              {/* 12 — KOREAN SKIN ROUTINES */}
              <KoreanSkinRoutinesSection
                onAddRoutine={handleAddCuratedRoutine}
              />

              {/* 13 — FINAL WHATSAPP CONSULTATION */}
              <FinalWhatsAppConsultationSection />

              {/* TRUST REASSURANCE STRIP */}
              <TrustReassuranceStrip />

              {/* NEWSLETTER */}
              <NewsletterSection />
            </div>
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

        {/* Campaign Video Reel Player Modal */}
        <FatimaVideoModal
          reel={selectedVideoReel}
          isOpen={!!selectedVideoReel}
          onClose={() => setSelectedVideoReel(null)}
        />
      </div>
    </div>
  );
}
