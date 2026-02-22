import React, { useRef, useState } from "react";
import {
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Banknote,
  Check,
  User,
  Camera,
  Loader2,
  X,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Order } from "../../types";
import { uploadOrderCustomerPhoto } from "../../services/storage-service";
import { createOrder } from "../../services/firestore-service";

interface CheckoutPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cart, user, clearCart } = useApp();
  const [selectedPayment, setSelectedPayment] = useState<string>("upi");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Customization state: { [productId]: { customerName, photoFile, photoPreview } }
  const [customizations, setCustomizations] = useState<{
    [productId: string]: {
      customerName: string;
      photoFile: File | null;
      photoPreview: string | null;
    };
  }>(() => {
    const init: any = {};
    cart.forEach((item) => {
      if (item.product.needsCustomerName || item.product.needsCustomerPhoto) {
        init[item.product.id] = {
          customerName: "",
          photoFile: null,
          photoPreview: null,
        };
      }
    });
    return init;
  });

  const fileInputRefs = useRef<{
    [productId: string]: HTMLInputElement | null;
  }>({});

  const itemsNeedingCustomization = cart.filter(
    (item) => item.product.needsCustomerName || item.product.needsCustomerPhoto,
  );

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

  const getItemPrice = (product: any) => {
    if (user?.role === "reseller") return product.resellerPrice;
    if (product.onOffer && product.discountPrice) return product.discountPrice;
    return product.sellingPrice || product.retailPrice;
  };

  const subtotal = cart.reduce((sum, item) => {
    return sum + getItemPrice(item.product) * item.quantity;
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

  const handleCustomizationName = (productId: string, name: string) => {
    setCustomizations((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], customerName: name },
    }));
  };

  const handleCustomizationPhoto = (productId: string, file: File) => {
    const preview = URL.createObjectURL(file);
    setCustomizations((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        photoFile: file,
        photoPreview: preview,
      },
    }));
  };

  const removeCustomizationPhoto = (productId: string) => {
    setCustomizations((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], photoFile: null, photoPreview: null },
    }));
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const storagePathId = `order-${Date.now()}`;

      // Upload photos and build customized cart items
      const enrichedItems = await Promise.all(
        cart.map(async (item) => {
          const custom = customizations[item.product.id];
          if (!custom) return item;

          let customerPhotoUrl: string | undefined;
          if (item.product.needsCustomerPhoto && custom.photoFile) {
            customerPhotoUrl = await uploadOrderCustomerPhoto(
              storagePathId,
              item.product.id,
              custom.photoFile,
            );
          }

          return {
            ...item,
            customization: {
              customerName: item.product.needsCustomerName
                ? custom.customerName
                : undefined,
              customerPhotoUrl,
            },
          };
        }),
      );

      const hasCustomizations = enrichedItems.some((i) => i.customization);

      const orderData: Omit<Order, "id"> = {
        customerId: user?.id || "guest",
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        items: enrichedItems,
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
        hasCustomizations,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const firestoreOrderId = await createOrder(orderData);
      clearCart();
      onNavigate("order-success", { orderId: firestoreOrderId });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
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

            {/* Personalization Details */}
            {itemsNeedingCustomization.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-[#111827]">
                    Personalization Details
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Some products require additional info to personalize your
                    order.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {itemsNeedingCustomization.map((item) => {
                    const custom = customizations[item.product.id] || {};
                    return (
                      <div
                        key={item.product.id}
                        className="border border-slate-200 rounded-xl p-4"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-bold text-slate-900 text-sm">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {/* Customer Name */}
                          {item.product.needsCustomerName && (
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">
                                <User size={14} className="inline mr-1" />
                                Name to print on this item *
                              </label>
                              <input
                                type="text"
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the name to personalise"
                                value={custom.customerName || ""}
                                onChange={(e) =>
                                  handleCustomizationName(
                                    item.product.id,
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          )}

                          {/* Customer Photo */}
                          {item.product.needsCustomerPhoto && (
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">
                                <Camera size={14} className="inline mr-1" />
                                Photo for this item *
                              </label>
                              {custom.photoPreview ? (
                                <div className="relative inline-block">
                                  <img
                                    src={custom.photoPreview}
                                    alt="Preview"
                                    className="w-24 h-24 rounded-xl object-cover border-2 border-blue-500"
                                  />
                                  <button
                                    onClick={() =>
                                      removeCustomizationPhoto(item.product.id)
                                    }
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    fileInputRefs.current[
                                      item.product.id
                                    ]?.click()
                                  }
                                  className="flex items-center gap-2 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-600 hover:text-blue-600 transition-colors w-full justify-center"
                                >
                                  <Camera size={18} />
                                  Tap to upload photo
                                </button>
                              )}
                              <input
                                ref={(el) => {
                                  fileInputRefs.current[item.product.id] = el;
                                }}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file)
                                    handleCustomizationPhoto(
                                      item.product.id,
                                      file,
                                    );
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

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
                    const price = getItemPrice(item.product);
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
                  className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                >
                  {isPlacingOrder ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
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
