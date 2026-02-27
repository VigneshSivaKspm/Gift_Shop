import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ScrollArea } from "../ui/scroll-area";
import { Slider } from "../ui/slider";
import { X, ChevronUp, Star, Filter, ArrowUpDown } from "lucide-react";
import { Category } from "../../types";

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  categories: string[];
  ratings: number[];
  onOffer: boolean;
  inStock: boolean;
}

export type SortOption =
  | "newest"
  | "price-low"
  | "price-high"
  | "rating"
  | "popular";

interface SortAndFilterProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  categories: Category[];
  maxPriceLimit: number;
}

export function SortAndFilter({
  isOpen,
  onOpenChange,
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  categories,
  maxPriceLimit = 10000,
}: SortAndFilterProps) {
  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const toggleRating = (rating: number) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating];
    onFiltersChange({ ...filters, ratings: newRatings });
  };

  const clearFilters = () => {
    onFiltersChange({
      minPrice: 0,
      maxPrice: maxPriceLimit,
      categories: [],
      ratings: [],
      onOffer: false,
      inStock: false,
    });
    onSortChange("newest");
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction="bottom">
      <DrawerContent className="relative flex flex-col h-full">
        {/* Hidden for visual design but required for accessibility */}
        <DrawerTitle className="sr-only">Sort & Filter</DrawerTitle>
        <DrawerDescription className="sr-only">
          Refine your product search with sorting and filtering options
        </DrawerDescription>

        {/* Sticky Close Button */}
        <div className="sticky top-0 z-20 flex justify-end p-4 bg-white border-b border-slate-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="text-slate-500 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-5 py-5 overflow-hidden">
          <div className="space-y-6 pb-24">
            {/* Sort Section */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <ArrowUpDown className="h-3 w-3" /> Sort By
              </h3>
              <RadioGroup
                value={sortBy}
                onValueChange={(val) => onSortChange(val as SortOption)}
                className="grid grid-cols-2 gap-2"
              >
                {[
                  { id: "newest", label: "Newest" },
                  { id: "price-low", label: "Price: Low to High" },
                  { id: "price-high", label: "Price: High to Low" },
                  { id: "rating", label: "Rating" },
                  { id: "popular", label: "Popularity" },
                ].map((option) => (
                  <div key={option.id}>
                    <RadioGroupItem
                      value={option.id}
                      id={`sort-${option.id}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`sort-${option.id}`}
                      className="flex items-center justify-center px-3 py-2 rounded-lg border-2 border-slate-100 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-600 peer-data-[state=checked]:text-white cursor-pointer transition-all hover:bg-slate-50 text-slate-600 font-bold"
                    >
                      <span className="text-xs font-bold">{option.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </section>

            {/* Price Range */}
            <section>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Price Range
                </h3>
                <span className="text-xs font-bold text-blue-600">
                  ₹{filters.minPrice} - ₹{filters.maxPrice}
                </span>
              </div>
              <div className="px-2">
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  max={maxPriceLimit}
                  step={100}
                  onValueChange={(vals) =>
                    onFiltersChange({
                      ...filters,
                      minPrice: vals[0],
                      maxPrice: vals[1],
                    })
                  }
                  className="mb-2"
                />
              </div>
            </section>

            {/* Categories */}
            {categories.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.name)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        filters.categories.includes(cat.name)
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Ratings */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Customer Rating
              </h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={filters.ratings.includes(rating)}
                      onCheckedChange={() => toggleRating(rating)}
                    />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="text-xs font-medium flex items-center gap-0.5 cursor-pointer"
                    >
                      {rating}+ Stars
                      <div className="flex ml-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-2.5 w-2.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                          />
                        ))}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </section>

            {/* Additional Options */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Preferences
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">On Offer</span>
                    <span className="text-[11px] text-slate-500">
                      Only discounted
                    </span>
                  </div>
                  <Checkbox
                    checked={filters.onOffer}
                    onCheckedChange={(checked) =>
                      onFiltersChange({ ...filters, onOffer: !!checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">In Stock</span>
                    <span className="text-[11px] text-slate-500">
                      Ready to ship
                    </span>
                  </div>
                  <Checkbox
                    checked={filters.inStock}
                    onCheckedChange={(checked) =>
                      onFiltersChange({ ...filters, inStock: !!checked })
                    }
                  />
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>

        <DrawerFooter className="border-t bg-slate-50 border-slate-200 flex flex-row gap-2 p-4 sticky bottom-0">
          <Button
            variant="outline"
            className="flex-1 rounded-lg h-10 bg-white text-sm"
            onClick={clearFilters}
          >
            Clear All
          </Button>
          <Button
            className="flex-[2] rounded-lg h-10 bg-blue-600 hover:bg-blue-700 text-sm"
            onClick={() => onOpenChange(false)}
          >
            Show Results
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface FilterTriggerProps {
  onClick: () => void;
  activeFiltersCount: number;
  isOpen: boolean;
}

export function FilterTrigger({
  onClick,
  activeFiltersCount,
  isOpen,
}: FilterTriggerProps) {
  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[110] md:hidden">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white px-5 py-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
      >
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 ? (
            <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold">
              {activeFiltersCount}
            </div>
          ) : (
            <Filter className="h-4 w-4" />
          )}
          <span className="text-sm font-bold">Sort & Filter</span>
          <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-lg -z-10 group-hover:bg-blue-600/30" />
      </button>
    </div>
  );
}
