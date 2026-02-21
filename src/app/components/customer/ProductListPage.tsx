import React, { useState, useEffect } from "react";
import { Filter, X, Loader2 } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Button } from "../ui/button";
import { SearchBar } from "../ui/SearchBar";
import { Card, CardContent } from "../ui/card";
import { useApp } from "../../context/AppContext";

interface ProductListPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function ProductListPage({ onNavigate }: ProductListPageProps) {
  const { products, categories, loadProducts, loadCategories, isLoading } =
    useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const occasions = [
    "Birthday",
    "Wedding",
    "Anniversary",
    "Corporate",
    "Festival",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.retailPrice >= priceRange[0] &&
      product.retailPrice <= priceRange[1];
    const matchesRating = product.rating >= minRating;
    const matchesOccasion =
      selectedOccasions.length === 0 ||
      selectedOccasions.some((occ) => product.tags.includes(occ.toLowerCase()));

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesRating &&
      matchesOccasion
    );
  });

  const toggleOccasion = (occasion: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occasion)
        ? prev.filter((o) => o !== occasion)
        : [...prev, occasion],
    );
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 10000]);
    setSelectedOccasions([]);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-4 md:pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111827] mb-4">
            All Products
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search products..."
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter size={20} className="mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <Card>
              <CardContent className="py-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[#111827]">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#2563EB] hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#111827] mb-3">Category</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === "all"}
                        onChange={() => setSelectedCategory("all")}
                        className="mr-2"
                      />
                      <span className="text-sm text-[#111827]">
                        All Categories
                      </span>
                    </label>
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.name}
                          onChange={() => setSelectedCategory(category.name)}
                          className="mr-2"
                        />
                        <span className="text-sm text-[#111827]">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#111827] mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([Number(e.target.value), priceRange[1]])
                        }
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm"
                        placeholder="Min"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>

                {/* Occasions */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#111827] mb-3">Occasions</h4>
                  <div className="space-y-2">
                    {occasions.map((occasion) => (
                      <label key={occasion} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedOccasions.includes(occasion)}
                          onChange={() => toggleOccasion(occasion)}
                          className="mr-2"
                        />
                        <span className="text-sm text-[#111827]">
                          {occasion}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#111827] mb-3">
                    Minimum Rating
                  </h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="mr-2"
                        />
                        <span className="text-sm text-[#111827]">
                          {rating}+ ⭐
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <Card>
                <CardContent className="py-16 text-center flex justify-center items-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-[#6B7280]">
                    Showing {filteredProducts.length} products
                  </p>
                </div>

                {filteredProducts.length === 0 ? (
                  <Card>
                    <CardContent className="py-16 text-center">
                      <p className="text-lg text-[#6B7280]">
                        No products found matching your criteria.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onNavigate={onNavigate}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
