import React, { useState, useEffect, useRef } from "react";
import { SearchBar } from "../ui/SearchBar";
import { ProductCard } from "./ProductCard";
import {
  getCategories,
  getProductsByCategory,
} from "../../services/firestore-service";
import { Category, Product } from "../../types";
import { FilterState, SortOption } from "./SortAndFilter";

interface CategoriesPageProps {
  onNavigate: (page: string, params?: any) => void;
  filters?: FilterState;
  sortBy?: SortOption;
}

export function CategoriesPage({
  onNavigate,
  filters,
  sortBy,
}: CategoriesPageProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const productsPanelRef = useRef<HTMLDivElement>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const cats = await getCategories();
        setCategories(cats);
        if (cats.length > 0) {
          setSelectedCategory(cats[0].name);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchProducts = async () => {
      setProductsLoading(true);
      try {
        const prods = await getProductsByCategory(selectedCategory);
        setProducts(prods);
        // Reset scroll position
        if (productsPanelRef.current) {
          productsPanelRef.current.scrollTop = 0;
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const selectedCategoryData = categories.find(
    (cat) => cat.name === selectedCategory,
  );

  const filteredAndSortedProducts = products
    .filter((product) => {
      // Search query filter (optional in categories page as top search bar is there)
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Other filters
      if (filters) {
        if (
          product.sellingPrice < filters.minPrice ||
          product.sellingPrice > filters.maxPrice
        )
          return false;
        // In categories page, category is already filtered by sidebar, but drawer can narrow it further
        if (
          filters.categories.length > 0 &&
          !filters.categories.includes(product.category)
        )
          return false;
        if (filters.ratings.length > 0) {
          const minRating = Math.min(...filters.ratings);
          if (product.rating < minRating) return false;
        }
        if (filters.onOffer && !product.onOffer) return false;
        if (filters.inStock && product.stock <= 0) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      switch (sortBy) {
        case "price-low":
          return a.sellingPrice - b.sellingPrice;
        case "price-high":
          return b.sellingPrice - a.sellingPrice;
        case "rating":
          return b.rating - a.rating;
        case "popular":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-50 to-white flex flex-col overflow-hidden">
      {/* Header with Search */}
      <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-4 bg-white border-b border-slate-200">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search categories..."
          className="w-full md:w-96"
        />
      </div>

      {/* Main Content Area - compact categories, wide products */}
      <div className="flex-1 flex min-h-0">
        {/* LEFT SIDEBAR - Categories (Fixed Width) */}
        <div className="flex flex-col w-[100px] sm:w-[120px] flex-shrink-0 border-r border-slate-200 bg-white overflow-hidden shadow-sm">
          {/* Categories List - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-2 space-y-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-slate-100 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : categories.length > 0 ? (
              <div className="p-1.5 space-y-1.5 focus:outline-none">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-200 group ${
                      selectedCategory === category.name
                        ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {category.image && (
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 transition-transform duration-200 group-active:scale-95 ${
                        selectedCategory === category.name ? "border-blue-500 shadow-sm" : "border-slate-100"
                      }`}>
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="text-center min-w-0">
                      <p className={`text-[11px] font-bold leading-tight break-words ${
                        selectedCategory === category.name ? "text-blue-600" : "text-slate-600"
                      }`}>
                        {category.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500">
                <p className="text-sm">No categories found</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - Products (2/3 width) */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Category Info - Name Only */}
          {selectedCategoryData && (
            <div className="flex-shrink-0 px-2 sm:px-4 lg:px-6 py-2 border-b border-slate-200 bg-white">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                {selectedCategoryData.name}
              </h2>
            </div>
          )}

          {/* Products Grid - Scrollable */}
          <div
            ref={productsPanelRef}
            className="flex-1 overflow-y-auto px-2 sm:px-3 lg:px-4 py-3"
          >
            {productsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-slate-200 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 pb-4">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="text-slate-300 mb-4">
                  <svg
                    className="w-20 h-20 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-slate-900 mb-2">
                  No products yet
                </p>
                <p className="text-slate-600 text-sm">
                  New items will appear here soon
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
