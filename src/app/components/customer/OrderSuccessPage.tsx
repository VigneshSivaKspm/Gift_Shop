import React from "react";
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { useApp } from "../../context/AppContext";

interface OrderSuccessPageProps {
  orderId: string;
  onNavigate: (page: string) => void;
}

export function OrderSuccessPage({
  orderId,
  onNavigate,
}: OrderSuccessPageProps) {
  const { user, orders } = useApp();
  const order = orders.find((o) => o.id === orderId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24 pt-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2
              size={44}
              className="text-green-500"
              strokeWidth={1.8}
            />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Order Placed!
          </h1>
          <p className="text-slate-500 text-sm">
            Thank you,{" "}
            <span className="font-semibold text-slate-700">
              {order?.customerName?.split(" ")[0] || user?.name || "Customer"}
            </span>
            . Your order has been received.
          </p>
          <span className="mt-3 inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
            Order ID: #{orderId.slice(-8).toUpperCase()}
          </span>
        </div>

        {/* Order Summary Card */}
        {order && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Package size={18} className="text-blue-600" />
              <h2 className="font-bold text-slate-800 text-sm">
                Order Summary
              </h2>
            </div>

            <div className="space-y-3 mb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-slate-900 flex-shrink-0">
                    ₹
                    {(
                      (item.product.sellingPrice || item.product.retailPrice) *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-slate-200 pt-3 space-y-1.5">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>₹{(order.total / 1.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>GST (18%)</span>
                <span>₹{(order.total - order.total / 1.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-1">
                <span>Total Paid</span>
                <span className="text-blue-600">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Shipping Info */}
        {order?.shippingAddress && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Delivering To
            </p>
            <p className="text-sm font-semibold text-slate-800">
              {order.shippingAddress.name}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              {order.shippingAddress.addressLine1}
              {order.shippingAddress.addressLine2 &&
                `, ${order.shippingAddress.addressLine2}`}
              , {order.shippingAddress.city}, {order.shippingAddress.state} –{" "}
              {order.shippingAddress.pincode}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => onNavigate("home")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Button>
          <button
            onClick={() => onNavigate("track-order")}
            className="w-full flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm hover:underline py-2"
          >
            Track My Order <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
