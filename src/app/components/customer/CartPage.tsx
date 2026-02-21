import React, { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { cart, updateCartQuantity, removeFromCart, user } = useApp();
  const [couponCode, setCouponCode] = useState("");

  const subtotal = cart.reduce((sum, item) => {
    let price = item.product.retailPrice;
    if (user?.role === "reseller") {
      price = item.product.resellerPrice;
    } else if (item.product.onOffer && item.product.discountPrice) {
      price = item.product.discountPrice;
    }
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 999 ? 0 : 50;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] pt-4 md:pt-6 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag
            size={60}
            className="md:w-20 md:h-20 text-[#E5E7EB] mx-auto mb-4 md:mb-6"
          />
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111827] mb-2 md:mb-4">
            Your cart is empty
          </h1>
          <p className="text-sm md:text-base text-[#6B7280] mb-6 md:mb-8">
            Add some amazing gifts to your cart to get started!
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate("products")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-4 md:pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111827] mb-6 md:mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-[#E5E7EB]">
                  {cart.map((item) => {
                    let price = item.product.retailPrice;
                    let isOnOffer = false;

                    if (user?.role === "reseller") {
                      price = item.product.resellerPrice;
                    } else if (
                      item.product.onOffer &&
                      item.product.discountPrice
                    ) {
                      price = item.product.discountPrice;
                      isOnOffer = true;
                    }

                    return (
                      <div key={item.product.id} className="p-6 flex gap-6">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-[#111827] mb-1">
                                {item.product.name}
                              </h3>
                              <p className="text-sm text-[#6B7280]">
                                {item.product.category}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-[#E5E7EB] rounded-xl">
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                  )
                                }
                                className="px-3 py-1 hover:bg-[#F9FAFB] transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-4 py-1 font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                  )
                                }
                                className="px-3 py-1 hover:bg-[#F9FAFB] transition-colors"
                                disabled={item.quantity >= item.product.stock}
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <div className="text-right">
                              {(user?.role === "reseller" || isOnOffer) && (
                                <p className="text-xs text-[#64748b] line-through">
                                  ₹{item.product.retailPrice * item.quantity}
                                </p>
                              )}
                              <p
                                className={`text-lg font-bold ${isOnOffer ? "text-[#dc2626]" : "text-[#111827]"}`}
                              >
                                ₹{(price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Coupon Section */}
            <Card className="mt-6">
              <CardContent className="py-6">
                <h3 className="font-semibold text-[#111827] mb-4">
                  Apply Coupon Code
                </h3>
                <div className="flex gap-4">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <h2 className="text-xl font-bold text-[#111827]">
                  Order Summary
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Tax (GST 18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#E5E7EB] pt-3 flex justify-between text-lg font-bold text-[#111827]">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full mb-4"
                  onClick={() => onNavigate("checkout")}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2" size={20} />
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onNavigate("products")}
                >
                  Continue Shopping
                </Button>

                {shipping > 0 && (
                  <p className="text-sm text-[#22C55E] text-center mt-4">
                    Add ₹{(1000 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
