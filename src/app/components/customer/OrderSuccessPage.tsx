import React, { useRef } from "react";
import {
  Check,
  Printer,
  Download,
  Share2,
  Mail,
  Sparkles,
  Package,
  ArrowRight,
} from "lucide-react";
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
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // Calculate points based on total (e.g., 1 point per rupee)
  const loyaltyPoints = order ? Math.floor(order.total) : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-4 md:pt-6 pb-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50">
      {/* Printable Invoice (Hidden from UI, visible in Print) */}
      <div className="hidden print:block print:p-8" id="invoice">
        <div className="max-w-4xl mx-auto bg-white p-12 border border-slate-100 shadow-sm">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                  <Sparkles size={24} className="fill-white/20" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    GiftShop
                  </h1>
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-600 mt-1">
                    Premium Gifting
                  </p>
                </div>
              </div>
              <p className="text-slate-500 text-sm">GSTIN: 27AABCG1234F1Z5</p>
              <p className="text-slate-500 text-sm">
                Mumbai, Maharashtra, India
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-light text-slate-300 uppercase tracking-widest mb-2">
                Invoice
              </h2>
              <p className="font-bold text-slate-900">#{orderId}</p>
              <p className="text-slate-500 text-sm">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 mb-12 border-y border-slate-100 py-8">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Billed To
              </p>
              <p className="font-bold text-slate-900">
                {order?.customerName || "Customer"}
              </p>
              <p className="text-slate-500 text-sm">{order?.customerEmail}</p>
              <p className="text-slate-500 text-sm">{order?.customerPhone}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Shipping Address
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {order?.shippingAddress.addressLine1},<br />
                {order?.shippingAddress.addressLine2 && (
                  <>
                    {order.shippingAddress.addressLine2},<br />
                  </>
                )}
                {order?.shippingAddress.city}, {order?.shippingAddress.state} -{" "}
                {order?.shippingAddress.pincode}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-12">
            <thead>
              <tr className="border-b-2 border-slate-900 text-left">
                <th className="py-4 font-bold text-slate-900">Description</th>
                <th className="py-4 font-bold text-slate-900 text-center">
                  Qty
                </th>
                <th className="py-4 font-bold text-slate-900 text-right">
                  Price
                </th>
                <th className="py-4 font-bold text-slate-900 text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {order?.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-6">
                    <p className="font-bold text-slate-800">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      SKU: {item.product.sku || "N/A"}
                    </p>
                  </td>
                  <td className="py-6 text-center text-slate-600">
                    {item.quantity}
                  </td>
                  <td className="py-6 text-right text-slate-600">
                    ₹{item.product.retailPrice.toLocaleString()}
                  </td>
                  <td className="py-6 text-right font-bold text-slate-900">
                    ₹
                    {(
                      item.product.retailPrice * item.quantity
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end pt-8">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{(order?.total || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (18%)</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-900 text-xl font-black text-slate-900">
                <span>Total</span>
                <span>₹{(order?.total || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs">
            <p>
              Thank you for shopping with GiftShop Premium. This is a computer
              generated invoice.
            </p>
          </div>
        </div>
      </div>

      {/* Main UI Popup Card */}
      <div className="max-w-lg w-full bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden relative border border-slate-100 animate-in fade-in zoom-in duration-500">
        {/* Success Gradient Top */}
        <div className="h-32 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
            <Check className="text-emerald-500" size={32} strokeWidth={4} />
          </div>
        </div>

        <div className="p-8 text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Payment Successful
          </h1>
          <p className="text-sm md:text-base text-slate-500 mb-8 font-medium">
            Invoice created for{" "}
            <span className="text-slate-900 font-bold">
              {order?.customerName.split(" ")[0] || "Member"}
            </span>
          </p>

          {/* Loyalty Points Banner */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-8 flex items-center justify-center gap-3 group hover:scale-[1.02] transition-transform cursor-default">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-indigo-900 font-black text-lg leading-none">
                Earned {loyaltyPoints} Points
              </p>
              <p className="text-indigo-500 text-xs font-bold uppercase tracking-tight mt-1">
                Total Rewards Earned
              </p>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={handlePrint}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Printer size={24} />
              </div>
              <span className="text-sm font-bold text-slate-700">
                Print Bill
              </span>
            </button>
            <button
              onClick={handlePrint}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Download size={24} />
              </div>
              <span className="text-sm font-bold text-slate-700">
                Digital Copy
              </span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-all group">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Share2 size={24} />
              </div>
              <span className="text-sm font-bold text-slate-700">WhatsApp</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-all group">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <span className="text-sm font-bold text-slate-700">
                Email Bill
              </span>
            </button>
          </div>

          {/* Final Action */}
          <div className="space-y-4">
            <Button
              onClick={() => onNavigate("home")}
              className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl py-6 text-lg font-black shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Close & Finish
            </Button>

            <button
              onClick={() => onNavigate("track-order")}
              className="flex items-center justify-center gap-2 text-blue-600 font-bold text-sm hover:underline mx-auto"
            >
              Track Shipment <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 blur-3xl rounded-full translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-100/30 blur-3xl rounded-full translate-x-[50%] translate-y-[50%]"></div>
      </div>
    </div>
  );
}
