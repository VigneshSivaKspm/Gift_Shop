import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { cart, updateCartQuantity, removeFromCart, user } = useApp();

  const getItemPrice = (product: any) => {
    if (user?.role === "reseller") {
      return product.resellerPrice;
    } else if (product.onOffer && product.discountPrice) {
      return product.discountPrice;
    }
    return product.sellingPrice || product.retailPrice;
  };

  const subtotal = cart.reduce((sum, item) => {
    const price = getItemPrice(item.product);
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 999 ? 0 : 50;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-4 md:pt-6 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate("home")}
            className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="text-center">
            <div className="inline-block p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-200 mb-6 md:mb-8">
              <ShoppingBag
                size={60}
                className="md:w-20 md:h-20 text-slate-300 mx-auto"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Your cart is empty
            </h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Add some amazing gifts to your cart to get started!
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate("home")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-4 md:pt-6 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => onNavigate("home")}
            className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Shopping Cart
          </h1>
          <p className="text-slate-600 mt-1">
            {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-3 md:space-y-4">
              {cart.map((item) => {
                const price = getItemPrice(item.product);
                const retailPrice = item.product.retailPrice;

                return (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-2xl border border-slate-200 p-3 md:p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-3 md:gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <div className="min-w-0">
                            <h3 className="font-bold text-slate-900 line-clamp-2 text-sm md:text-base">
                              {item.product.name}
                            </h3>
                            <p className="text-xs md:text-sm text-slate-500">
                              {item.product.category}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                            title="Remove from cart"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between gap-2 mt-3 flex-wrap">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-slate-200 rounded-lg h-9">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              className="px-2 md:px-3 h-full hover:bg-slate-50 transition-colors flex items-center justify-center"
                              title="Decrease quantity"
                            >
                              <Minus size={16} className="text-slate-600" />
                            </button>
                            <span className="px-3 md:px-4 font-bold text-slate-900 text-sm md:text-base">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              className="px-2 md:px-3 h-full hover:bg-slate-50 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity >= item.product.stock}
                              title="Increase quantity"
                            >
                              <Plus size={16} className="text-slate-600" />
                            </button>
                          </div>

                          {/* Price Display */}
                          <div className="text-right">
                            {price !== retailPrice && (
                              <p className="text-xs text-slate-500 line-through">
                                ₹{(retailPrice * item.quantity).toFixed(2)}
                              </p>
                            )}
                            <p className="font-bold text-slate-900 text-sm md:text-base">
                              ₹{(price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 lg:sticky lg:top-24">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-medium text-slate-900">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tax (GST 18%)</span>
                  <span className="font-medium text-slate-900">
                    ₹{tax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-base md:text-lg font-bold text-slate-900 pt-3">
                  <span>Total</span>
                  <span className="text-blue-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  className="w-full bg-blue-600 hover:bg-blue-700 h-11 md:h-12 font-semibold flex items-center justify-center gap-2"
                  onClick={() => onNavigate("checkout")}
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-11 md:h-12 font-semibold"
                  onClick={() => onNavigate("home")}
                >
                  Continue Shopping
                </Button>
              </div>

              {shipping > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs md:text-sm text-green-700 font-medium">
                    Add ₹{(1000 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
