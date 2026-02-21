import React, { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Banknote,
  Check,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Order } from "../../types";

interface CheckoutPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cart, user, clearCart, addOrder } = useApp();
  const [selectedPayment, setSelectedPayment] = useState<string>("upi");

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

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
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const paymentMethods = [
    { id: "upi", name: "UPI", icon: <Smartphone size={24} /> },
    { id: "card", name: "Credit/Debit Card", icon: <CreditCard size={24} /> },
    { id: "netbanking", name: "Net Banking", icon: <Building size={24} /> },
    { id: "wallet", name: "Wallet", icon: <Wallet size={24} /> },
    { id: "cod", name: "Cash on Delivery", icon: <Banknote size={24} /> },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      customerId: user?.id || "guest",
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      items: cart,
      total,
      status: "pending",
      paymentMethod:
        paymentMethods.find((pm) => pm.id === selectedPayment)?.name || "UPI",
      shippingAddress: {
        id: `addr-${Date.now()}`,
        name: formData.fullName,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        isDefault: false,
      },
      orderType: user?.role === "reseller" ? "reseller" : "online",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addOrder(newOrder);
    clearCart();
    onNavigate("order-success", { orderId: newOrder.id });
  };

  if (cart.length === 0) {
    onNavigate("cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-4 md:pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111827] mb-6 md:mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-[#111827]">
                  Contact Information
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                    className="md:col-span-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-[#111827]">
                  Shipping Address
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    label="Address Line 1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="Street address, P.O. box"
                    required
                  />
                  <Input
                    label="Address Line 2 (Optional)"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, unit, building, floor, etc."
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      required
                    />
                    <Input
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      required
                    />
                    <Input
                      label="Pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-[#111827]">
                  Payment Method
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? "border-[#2563EB] bg-[#EFF6FF]"
                          : "border-[#E5E7EB] hover:border-[#2563EB]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-[#2563EB]">{method.icon}</div>
                      <span className="flex-1 font-medium text-[#111827]">
                        {method.name}
                      </span>
                      {selectedPayment === method.id && (
                        <Check size={20} className="text-[#2563EB]" />
                      )}
                    </label>
                  ))}
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
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {cart.map((item) => {
                    const price =
                      user?.role === "reseller"
                        ? item.product.resellerPrice
                        : item.product.retailPrice;
                    return (
                      <div key={item.product.id} className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-[#111827] mb-1">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-[#6B7280]">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-[#111827]">
                            ₹{price * item.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Subtotal</span>
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
                  className="w-full"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>

                <p className="text-xs text-[#6B7280] text-center mt-4">
                  By placing this order, you agree to our Terms & Conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
