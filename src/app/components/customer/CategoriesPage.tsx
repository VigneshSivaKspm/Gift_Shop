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

interface CategoryWithProducts {
  category: Category;
  products: Product[];
}

export function CategoriesPage({
  onNavigate,
  filters,
  sortBy,
}: CategoriesPageProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<
    CategoryWithProducts[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const productsPanelRef = useRef<HTMLDivElement>(null);

  // Fetch all categories and their products on mount
  useEffect(() => {
    const fetchAllCategoriesAndProducts = async () => {
      try {
        setLoading(true);
        const cats = await getCategories();
        setCategories(cats);

        // Fetch products for all categories
        const categoriesWithProds: CategoryWithProducts[] = [];
        for (const cat of cats) {
          try {
            const prods = await getProductsByCategory(cat.name);
            categoriesWithProds.push({
              category: cat,
              products: prods,
            });
          } catch (error) {
            console.error(`Error fetching products for ${cat.name}:`, error);
            categoriesWithProds.push({
              category: cat,
              products: [],
            });
          }
        }
        setCategoriesWithProducts(categoriesWithProds);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategoriesAndProducts();
  }, []);

  const filterAndSortProducts = (prods: Product[]): Product[] => {
    return prods
      .filter((product) => {
        // Search query filter
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Other filters
        if (filters) {
          if (
            product.sellingPrice < filters.minPrice ||
            product.sellingPrice > filters.maxPrice
          )
            return false;
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
  };

  // Get filtered categories with their filtered products
  const filteredCategoriesWithProducts = categoriesWithProducts
    .map((item) => ({
      ...item,
      products: filterAndSortProducts(item.products),
    }))
    .filter((item) => item.products.length > 0);

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

      {/* Main Content Area - Full width continuous scroll */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Products Continuous Scroll */}
        <div
          ref={productsPanelRef}
          className="flex-1 overflow-y-auto px-2 sm:px-3 lg:px-4 py-6"
        >
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-slate-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : filteredCategoriesWithProducts.length > 0 ? (
            <div className="space-y-8">
              {filteredCategoriesWithProducts.map((item) => (
                <div key={item.category.id}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4 px-1">
                    {item.category.image && (
                      <img
                        src={item.category.image}
                        alt={item.category.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">
                      {item.category.name}
                    </h3>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-200 to-transparent"></div>
                  </div>

                  {/* Products Grid for this category */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 pb-6">
                    {item.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onNavigate={onNavigate}
                      />
                    ))}
                  </div>
                </div>
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
                No products found
              </p>
              <p className="text-slate-600 text-sm">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
