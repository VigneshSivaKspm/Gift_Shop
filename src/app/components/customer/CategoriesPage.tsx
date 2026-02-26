import React, { useState, useEffect, useRef } from "react";
import { SearchBar } from "../ui/SearchBar";
import { ProductCard } from "./ProductCard";
import {
  getCategories,
  getProductsByCategory,
} from "../../services/firestore-service";
import { Category, Product } from "../../types";

interface CategoriesPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function CategoriesPage({ onNavigate }: CategoriesPageProps) {
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

      {/* Main Content Area - 1/3 categories, 2/3 products */}
      <div className="flex-1 flex min-h-0">
        {/* LEFT SIDEBAR - Categories (1/3 width) */}
        <div className="flex flex-col w-1/3 flex-shrink-0 border-r border-slate-200 bg-white overflow-hidden">
          {/* Categories List - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-slate-100 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : categories.length > 0 ? (
              <div className="p-3 space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left rounded-xl transition-all duration-200 group overflow-hidden ${
                      selectedCategory === category.name
                        ? "ring-2 ring-blue-500 shadow-md"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex flex-col">
                      {category.image && (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-24 object-cover"
                        />
                      )}
                      <div className="p-3">
                        <p className="text-sm font-semibold truncate text-slate-900">
                          {category.name}
                        </p>
                      </div>
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
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 pb-4">
                {products.map((product) => (
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
