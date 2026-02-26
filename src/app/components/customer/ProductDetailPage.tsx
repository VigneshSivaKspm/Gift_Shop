import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Check,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { ProductCard } from "./ProductCard";
import { useApp } from "../../context/AppContext";

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, params?: any) => void;
}

export function ProductDetailPage({
  productId,
  onNavigate,
}: ProductDetailPageProps) {
  const { addToCart, user, products } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 pt-4 md:pt-6 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Product not found
          </h1>
          <Button onClick={() => onNavigate("products")} className="mt-4">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

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
  const showResellerPrice = user?.role === "reseller";
  const showOfferPrice =
    !showResellerPrice && product.onOffer && product.discountPrice;
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const productImages = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-slate-50 pt-4 md:pt-6 pb-8 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate("home")}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          title="Back to Home"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        {/* Breadcrumb - Clean */}
        <nav className="flex items-center text-sm text-slate-500 mb-8 font-medium">
          <button
            onClick={() => onNavigate("home")}
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <span className="mx-2 text-slate-300">/</span>
          <button
            onClick={() => onNavigate("products")}
            className="hover:text-blue-600 transition-colors"
          >
            Products
          </button>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-900 line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Images Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-xl shadow-slate-200/50 relative group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-slate-600 hover:text-red-500 transition-all hover:scale-110">
                <Heart size={20} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-blue-600 ring-4 ring-blue-50"
                      : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
                {product.category}
              </span>
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-2 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold text-slate-900">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                {product.reviews > 0 && (
                  <>
                    <span>•</span>
                    <span className="underline decoration-slate-300 underline-offset-4">
                      {product.reviews} review{product.reviews !== 1 ? "s" : ""}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 mb-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">
                    ₹{displayPrice.toLocaleString()}
                  </span>
                  <span className="text-sm md:text-base text-slate-400 line-through decoration-slate-400">
                    ₹{product.retailPrice.toLocaleString()}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="px-3 py-1 bg-red-50 text-red-600 text-sm font-bold rounded-lg whitespace-nowrap">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {product.stock > 10 ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                      <Check size={14} strokeWidth={3} /> In Stock & Ready to
                      Ship
                    </span>
                  ) : product.stock > 0 ? (
                    <span className="flex items-center gap-1.5 text-amber-600 text-sm font-medium bg-amber-50 px-2 py-0.5 rounded-md">
                      Only {product.stock} items left
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8 prose prose-slate text-slate-600 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-slate-200 rounded-full h-12 w-fit bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 h-full hover:bg-slate-50 rounded-l-full transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="px-4 h-full hover:bg-slate-50 rounded-r-full transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex flex-1 gap-2 items-center">
                <Button
                  variant="primary"
                  className="flex-1 bg-blue-600 text-white rounded-2xl h-12 text-base font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart size={20} className="mr-2" /> Add to Cart
                </Button>
                <button
                  className="h-12 w-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600 hover:text-blue-600"
                  title="Share Product"
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: product.name,
                          text: `Check out ${product.name} on Blue Bell Gifts!`,
                          url: window.location.href,
                        })
                        .catch((err) => console.log("Error sharing:", err));
                    } else {
                      // Fallback: copy to clipboard
                      navigator.clipboard
                        .writeText(window.location.href)
                        .then(() => {
                          alert("Product link copied to clipboard!");
                        });
                    }
                  }}
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              {[
                {
                  icon: Truck,
                  label: "Free Delivery",
                  sub: "On orders > ₹999",
                },
                {
                  icon: Shield,
                  label: "Secure Payment",
                  sub: "100% Protected",
                },
                { icon: RotateCcw, label: "Easy Returns", sub: "7 Day Policy" },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl mb-1">
                    <feat.icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">
                      {feat.label}
                    </p>
                    <p className="text-xs text-slate-500">{feat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-slate-200 pt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
