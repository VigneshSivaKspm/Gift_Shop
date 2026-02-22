import React from "react";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { ProductCard } from "./ProductCard";
import { useApp } from "../../context/AppContext";

interface WishlistPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function WishlistPage({ onNavigate }: WishlistPageProps) {
  const { addToCart, wishlist, removeFromWishlist, products } = useApp();
  const wishlistItems = wishlist;

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] pt-4 md:pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#eff6ff] rounded-lg flex items-center justify-center">
              <Heart size={20} className="md:w-6 md:h-6 text-[#0066cc]" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#1a2332]">
                My Saved Items
              </h1>
              <p className="text-xs md:text-sm text-[#6b7280] mt-0.5">
                {wishlistItems.length} item
                {wishlistItems.length !== 1 ? "s" : ""} in your wishlist
              </p>
            </div>
          </div>
        </div>

        {wishlistItems.length > 0 ? (
          <>
            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-12">
              {wishlistItems.filter(Boolean).map((product) => (
                <div key={product?.id} className="relative group">
                  <ProductCard product={product} onNavigate={onNavigate} />

                  {/* Remove Button - Overlay on Hover */}
                  <button
                    onClick={() =>
                      product?.id && handleRemoveFromWishlist(product.id)
                    }
                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-[#ef4444] text-[#ef4444] hover:text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Continue Shopping Section */}
            <div className="bg-gradient-to-r from-[#eff6ff] to-white border border-[#0066cc]/20 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a2332] mb-2">
                    Ready to buy?
                  </h2>
                  <p className="text-[#6b7280] max-w-md">
                    You have {wishlistItems.length} amazing item
                    {wishlistItems.length !== 1 ? "s" : ""} ready to purchase.
                    Proceed to cart and complete your order.
                  </p>
                </div>
                <Button
                  onClick={() => onNavigate("cart")}
                  className="bg-[#0066cc] hover:bg-[#0055aa] text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 whitespace-nowrap"
                >
                  View Cart
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>

            {/* Browse More Section */}
            <div className="mt-8 md:mt-12">
              <h3 className="text-xl md:text-2xl font-bold text-[#1a2332] mb-4 md:mb-6">
                You might also like
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {products
                  .filter((p) => p && !wishlistItems.find((w) => w.id === p.id))
                  .slice(0, 5)
                  .map((product) =>
                    product ? (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onNavigate={onNavigate}
                      />
                    ) : null,
                  )
                  .filter(Boolean)}
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="py-16 text-center">
            <div className="inline-block p-8 bg-white rounded-2xl shadow-sm mb-6">
              <Heart size={64} className="text-[#d1d5db] mx-auto mb-4" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a2332] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-[#6b7280] mb-8 max-w-md mx-auto">
              Start adding your favorite products to your wishlist. Click the
              heart icon on any product to save it for later.
            </p>
            <Button
              onClick={() => onNavigate("products")}
              className="bg-[#0066cc] hover:bg-[#0055aa] text-white px-8 py-3 rounded-lg font-bold inline-flex items-center gap-2"
            >
              Start Shopping
              <ArrowRight size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
