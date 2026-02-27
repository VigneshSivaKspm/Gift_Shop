import React, { useState, useEffect } from "react";
import { auth } from "./services/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { isProfileComplete } from "./services/firestore-service";

// Customer Components
import { Navbar } from "./components/customer/Navbar";
import { BottomNavBar } from "./components/customer/BottomNavBar";
import { HomePage } from "./components/customer/HomePage";
import { CategoriesPage } from "./components/customer/CategoriesPage";
import { ProductListPage } from "./components/customer/ProductListPage";
import { ProductDetailPage } from "./components/customer/ProductDetailPage";
import { CartPage } from "./components/customer/CartPage";
import { CheckoutPage } from "./components/customer/CheckoutPage";
import { OrderSuccessPage } from "./components/customer/OrderSuccessPage";
import { AccountPage } from "./components/customer/AccountPage";
import { TrackOrderPage } from "./components/customer/TrackOrderPage";
import { WishlistPage } from "./components/customer/WishlistPage";
import { ContactPage } from "./components/customer/ContactPage";
import { StaticPage } from "./components/customer/StaticPage";
import { ProfileCompletionPage } from "./components/customer/ProfileCompletionPage";
import {
  SortAndFilter,
  FilterTrigger,
  FilterState,
  SortOption,
} from "./components/customer/SortAndFilter";
import { useApp } from "./context/AppContext";

// Auth Components
import { LoginPage } from "./components/auth/LoginPage";

// Policy Components
import { PrivacyPolicyPage } from "./components/customer/policies/PrivacyPolicyPage";
import { TermsAndConditionsPage } from "./components/customer/policies/TermsAndConditionsPage";
import { ReturnPolicyPage } from "./components/customer/policies/ReturnPolicyPage";
import { RefundPolicyPage } from "./components/customer/policies/RefundPolicyPage";
import { CancellationPolicyPage } from "./components/customer/policies/CancellationPolicyPage";
import { ShippingPolicyPage } from "./components/customer/policies/ShippingPolicyPage";
import { FAQPage } from "./components/customer/policies/FAQPage";

type Page = {
  name: string;
  params?: any;
};

export default function App() {
  const { categories, products } = useApp();
  const [currentPage, setCurrentPage] = useState<Page>({ name: "home" });
  const [checkingProfile, setCheckingProfile] = useState(false);

  // Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 10000,
    categories: [],
    ratings: [],
    onOffer: false,
    inStock: false,
  });
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const maxPriceLimit =
    products.length > 0
      ? Math.max(...products.map((p) => p.sellingPrice))
      : 10000;

  useEffect(() => {
    // If maxPrice is still 10000 but our products have higher prices, update it
    if (filters.maxPrice === 10000 && maxPriceLimit > 10000) {
      setFilters((prev) => ({ ...prev, maxPrice: maxPriceLimit }));
    }
  }, [maxPriceLimit]);

  useEffect(() => {
    // Check if user is logged in and if profile is complete
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setCheckingProfile(true);
        try {
          const isComplete = await isProfileComplete(firebaseUser.uid);
          // If profile is incomplete and user is not on profile-completion page, redirect them
          if (!isComplete && currentPage.name !== "profile-completion") {
            setCurrentPage({ name: "profile-completion" });
          }
        } catch (error) {
          console.error("Error checking profile:", error);
        } finally {
          setCheckingProfile(false);
        }
      }
    });

    return () => unsubscribe();
  }, [currentPage.name]);

  useEffect(() => {
    // Handle initial route
    const path = window.location.pathname.replace("/", "");
    if (path && path !== "home") {
      setCurrentPage({ name: path });
    }

    // Handle browser back/forward
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.name) {
        setCurrentPage(event.state);
      } else {
        setCurrentPage({ name: "home" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (pageName: string, params?: any) => {
    const newPage = { name: pageName, params };
    setCurrentPage(newPage);
    window.scrollTo(0, 0);

    // Update URL without full page reload
    const path = pageName === "home" ? "/" : `/${pageName}`;
    window.history.pushState(newPage, "", path);
  };

  const handleLogout = async () => {
    await signOut(auth);
    handleNavigate("home");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage.name} />

      <main className="flex-1 pb-28 md:pb-0">
        {currentPage.name === "home" && (
          <HomePage
            onNavigate={handleNavigate}
            filters={filters}
            sortBy={sortBy}
          />
        )}
        {currentPage.name === "categories" && (
          <CategoriesPage
            onNavigate={handleNavigate}
            filters={filters}
            sortBy={sortBy}
          />
        )}
        {currentPage.name === "products" && (
          <ProductListPage onNavigate={handleNavigate} />
        )}
        {currentPage.name === "product-detail" && (
          <ProductDetailPage
            productId={currentPage.params?.productId}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage.name === "cart" && (
          <CartPage onNavigate={handleNavigate} />
        )}
        {currentPage.name === "checkout" && (
          <CheckoutPage onNavigate={handleNavigate} />
        )}
        {currentPage.name === "order-success" && (
          <OrderSuccessPage
            orderId={currentPage.params?.orderId}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage.name === "account" && (
          <AccountPage onNavigate={handleNavigate} />
        )}
        {currentPage.name === "track-order" && (
          <TrackOrderPage onNavigate={handleNavigate} />
        )}
        {currentPage.name === "wishlist" && (
          <WishlistPage onNavigate={handleNavigate} />
        )}
        {currentPage.name === "login" && (
          <LoginPage onNavigate={handleNavigate} />
        )}
        {currentPage.name === "profile-completion" && (
          <ProfileCompletionPage onNavigate={handleNavigate} />
        )}
        {currentPage.name === "search" && (
          <ProductListPage onNavigate={handleNavigate} />
        )}
        {currentPage.name === "orders" && (
          <AccountPage onNavigate={handleNavigate} />
        )}

        {/* Static Pages */}
        {currentPage.name === "about" && (
          <StaticPage
            pageId="about"
            defaultTitle="About Blue Bell Gifts"
            defaultContent="<p>Welcome to Blue Bell Gifts...</p>"
          />
        )}

        {currentPage.name === "contact" && <ContactPage />}

        {/* Policy Pages */}
        {currentPage.name === "terms" && <TermsAndConditionsPage />}
        {currentPage.name === "privacy" && <PrivacyPolicyPage />}
        {currentPage.name === "refund" && <RefundPolicyPage />}
        {currentPage.name === "return" && <ReturnPolicyPage />}
        {currentPage.name === "cancellation" && <CancellationPolicyPage />}
        {currentPage.name === "shipping" && <ShippingPolicyPage />}
        {currentPage.name === "faq" && <FAQPage />}
      </main>

      {/* Filter Trigger Button - Only for Home and Categories */}
      {(currentPage.name === "home" || currentPage.name === "categories") && (
        <>
          <FilterTrigger
            onClick={() => {
              setIsFilterOpen(true);
            }}
            isOpen={isFilterOpen}
            activeFiltersCount={
              (filters.categories.length > 0 ? 1 : 0) +
              (filters.ratings.length > 0 ? 1 : 0) +
              (filters.minPrice > 0 || filters.maxPrice < 10000 ? 1 : 0) +
              (filters.onOffer ? 1 : 0) +
              (filters.inStock ? 1 : 0)
            }
          />
        </>
      )}

      {/* Sort & Filter Drawer */}
      <SortAndFilter
        isOpen={isFilterOpen}
        onOpenChange={(newOpen) => {
          setIsFilterOpen(newOpen);
        }}
        filters={filters}
        onFiltersChange={setFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories}
        maxPriceLimit={Math.max(1000, maxPriceLimit)}
      />

      {/* Bottom Mobile Navigation */}
      <BottomNavBar
        onNavigate={handleNavigate}
        currentPage={currentPage.name}
      />
    </div>
  );
}
