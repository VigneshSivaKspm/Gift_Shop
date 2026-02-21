import React from "react";
import { Ban, AlertCircle, Clock } from "lucide-react";

export function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-16">
        {/* Header */}
        <div className="mb-16 flex items-center gap-4">
          <div className="p-4 bg-red-100 rounded-2xl">
            <Ban size={32} className="text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Return Policy
            </h1>
            <p className="text-slate-600 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mb-8 bg-red-50 border-l-4 border-red-600 rounded-r-2xl p-8">
          <div className="flex gap-4">
            <AlertCircle className="text-red-600 flex-shrink-0" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-red-900 mb-2">
                No Returns Policy
              </h2>
              <p className="text-red-800 leading-relaxed">
                GiftShop operates on a <strong>FINAL SALE BASIS</strong>. Once
                an order has been delivered and marked as completed, NO RETURNS
                are accepted under any circumstances.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Overview
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              GiftShop does not accept returns on any orders after they have
              been delivered and marked as completed. This policy applies to all
              products, regardless of condition, packaging, or reason.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We recommend that customers thoroughly review product
              descriptions, specifications, and images before placing an order.
            </p>
          </section>

          {/* When You Can Report Issues */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              2. Reporting Issues - Limited Window
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
              <div className="flex items-start gap-3">
                <Clock className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    24-Hour Reporting Window
                  </h3>
                  <p className="text-slate-700">
                    Issues must be reported within <strong>24 hours</strong> of
                    delivery. After this period, no claims will be considered.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              If you receive a defective, damaged, or incorrect product, you
              must:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Contact us within 24 hours of delivery</li>
              <li>• Provide photographic evidence of the issue</li>
              <li>• Keep the product and packaging intact</li>
              <li>• Provide your order number and date</li>
            </ul>
          </section>

          {/* Defective/Damaged Products */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Defective or Damaged Products
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              If you receive a product that is defective or damaged due to our
              error or shipping negligence:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4 mb-4">
              <li>• Report within 24 hours of delivery</li>
              <li>• Do not open or use the product unnecessarily</li>
              <li>• Send photos/videos showing the defect</li>
              <li>
                • We will evaluate and may offer a replacement or store credit
              </li>
            </ul>
            <p className="text-slate-600 italic">
              Note: GiftShop reserves the right to determine eligibility for
              replacement or credit based on evidence provided.
            </p>
          </section>

          {/* What Cannot Be Returned */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Items Not Eligible for Return
            </h2>
            <p className="text-slate-600 mb-4">
              The following are NOT eligible for return under any circumstances:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Products that have been used or opened</li>
              <li>• Items with removed or altered tags</li>
              <li>• Products showing signs of wear</li>
              <li>• Gift wrapping or customization services</li>
              <li>• Clearance or sale items</li>
              <li>• Items purchased outside our website</li>
              <li>• Products reported outside the 24-hour window</li>
            </ul>
          </section>

          {/* Incorrect Orders */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Incorrect Orders
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              If we send you an incorrect item due to our error, please contact
              us within 24 hours with:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Your order number</li>
              <li>• Photos of the incorrect item</li>
              <li>• Your original order details</li>
            </ul>
            <p className="text-slate-600 mt-4">
              We may offer a replacement with prepaid return shipping for
              incorrect items sent due to our error.
            </p>
          </section>

          {/* How to Report */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. How to Report an Issue
            </h2>
            <p className="text-slate-600 mb-6">
              Report issues within 24 hours of delivery using any of these
              methods:
            </p>
            <div className="space-y-3 text-slate-600">
              <p className="flex gap-2">
                <span className="font-bold">Email:</span> support@giftshop.com
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Phone:</span> +91 98765 43210
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Include:</span> Order number,
                photos, and detailed description
              </p>
            </div>
          </section>

          {/* Important Notes */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Important Notes
            </h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Once delivered and accepted, orders are final</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>We are not responsible for change of mind purchases</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  Customer satisfaction is important, but final sales are
                  absolute
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  Any return requests must follow this 24-hour window strictly
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
