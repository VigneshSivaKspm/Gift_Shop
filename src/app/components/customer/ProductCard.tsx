import React from "react";
import { ShoppingCart, Heart, Flame } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Product } from "../../types";
import { useApp } from "../../context/AppContext";

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, params?: any) => void;
}

export function ProductCard({ product, onNavigate }: ProductCardProps) {
  const { addToCart, user, addToWishlist, removeFromWishlist, isInWishlist } =
    useApp();
  const isWishlisted = isInWishlist(product.id);

  const getPrice = () => {
    if (user?.role === "reseller") return product.resellerPrice;
    if (product.onOffer && product.discountPrice) return product.discountPrice;
    return product.sellingPrice || product.retailPrice;
  };

  const getDiscount = () => {
    if (product.retailPrice && product.sellingPrice) {
      return Math.round(
        ((product.retailPrice - product.sellingPrice) / product.retailPrice) *
          100,
      );
    }
    if (product.onOffer && product.retailPrice && product.discountPrice) {
      return Math.round(
        ((product.retailPrice - product.discountPrice) / product.retailPrice) *
          100,
      );
    }
    return product.discount || 0;
  };

  const displayPrice = getPrice();
  const discountPercentage = getDiscount();
  const showResellerBadge = user?.role === "reseller";
  const showOfferPrice =
    !showResellerBadge && product.onOffer && product.discountPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div
      className="cursor-pointer group h-full flex flex-col"
      onClick={() => onNavigate("product-detail", { productId: product.id })}
    >
      {/* Card Container - Fully Responsive */}
      <Card className="overflow-hidden border border-slate-200/40 hover:border-blue-600/50 hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 h-full bg-white/50 backdrop-blur-sm md:group-hover:-translate-y-2 flex flex-col">
        {/* Image Section - Responsive */}
        <div className="relative overflow-hidden aspect-square sm:aspect-[4/5] bg-slate-100 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            loading="lazy"
          />

          {/* Overlay on Hover - Desktop only */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Badges - Responsive positioning */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1.5 sm:gap-2 z-10">
            {discountPercentage > 0 && (
              <Badge
                variant="error"
                className="font-bold shadow-lg backdrop-blur-md bg-destructive/90 text-white px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-xs uppercase tracking-wider"
              >
                {discountPercentage}% OFF
              </Badge>
            )}
            {product.onOffer && (
              <Badge className="bg-amber-500/90 text-white font-bold shadow-lg backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-xs uppercase tracking-wider flex items-center gap-1">
                <Flame size={8} className="sm:w-2 fill-current" />
                Deal
              </Badge>
            )}
          </div>

          {/* Wishlist Button - Responsive size */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10 border border-white/50"
            title="Add to Wishlist"
          >
            <Heart
              size={16}
              className={`sm:w-[18px] sm:h-[18px] transition-colors ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-slate-600"
              }`}
            />
          </button>
        </div>

        {/* Content Section - Responsive padding and grows to fill */}
        <CardContent className="p-2.5 sm:p-3 md:p-4 flex flex-col flex-grow bg-white relative">
          {/* Product Name - Responsive text size */}
          <h3 className="font-bold text-slate-900 mb-1 sm:mb-1.5 line-clamp-2 text-sm sm:text-base leading-tight group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Description Preview - Hidden on mobile, shown on tablet+ */}
          {product.description && (
            <p className="hidden sm:block text-[10px] sm:text-xs text-slate-600 line-clamp-2 mb-1 sm:mb-1.5">
              {product.description}
            </p>
          )}

          {/* Tags Display - Responsive */}
          {product.tags && product.tags.length > 0 && (
            <div className="hidden sm:flex flex-wrap gap-0.5 mb-1 sm:mb-1.5">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-100 text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Price & Stock Section - Responsive */}
          <div className="mt-auto pt-1.5 sm:pt-2 border-t border-slate-200 space-y-1.5 sm:space-y-2">
            {/* Price Row */}
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900">
                ₹{displayPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-[9px] sm:text-xs text-slate-600 line-through decoration-slate-400">
                ₹{product.retailPrice.toLocaleString("en-IN")}
              </span>
              {showResellerBadge && (
                <span className="text-[8px] sm:text-[10px] font-bold text-amber-600 uppercase tracking-tight ml-auto">
                  Reseller
                </span>
              )}
            </div>

            {/* Add to Cart Button - Responsive size and padding */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full h-8 sm:h-9 md:h-10 text-xs sm:text-sm"
            >
              <ShoppingCart size={14} className="sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </span>
              <span className="sm:hidden">
                {product.stock === 0 ? "OOS" : "Add"}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
