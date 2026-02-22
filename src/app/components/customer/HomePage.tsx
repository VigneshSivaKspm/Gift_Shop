import React, { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { products, loadProducts, isLoading } = useApp();
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await loadProducts();
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Featured Products
          </h1>
          <p className="text-lg text-slate-600">
            Discover our amazing collection of gift items
          </p>
        </div>

        {/* Products Grid */}
        {isLoadingProducts || isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <p className="text-slate-600">Loading products...</p>
            </div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-lg text-slate-600 mb-4">
                No products available
              </p>
              <p className="text-sm text-slate-500">
                Check back soon for new items!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
