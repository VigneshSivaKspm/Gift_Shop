import React from "react";
import { XCircle, Clock, AlertCircle } from "lucide-react";

export function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-16">
        {/* Header */}
        <div className="mb-16 flex items-center gap-4">
          <div className="p-4 bg-orange-100 rounded-2xl">
            <XCircle size={32} className="text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Cancellation Policy
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Cancellation Overview
            </h2>
            <p className="text-slate-600 leading-relaxed">
              GiftShop understands that circumstances change. If you need to
              cancel your order, you have a limited window to do so. Once your
              order has been shipped, cancellation is no longer possible.
            </p>
          </section>

          {/* Cancellation Window */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Cancellation Window
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Clock className="text-blue-600 flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Critical Time Limits
                  </h3>
                  <div className="space-y-3 text-slate-700">
                    <p>
                      <strong>Within 2 hours of order placement:</strong> Full
                      cancellation possible with 100% refund
                    </p>
                    <p>
                      <strong>After 2 hours:</strong> Order may be in processing
                      stage - cancellation may not be possible
                    </p>
                    <p>
                      <strong>After shipping:</strong> Cancellation is NOT
                      possible - no returns/refunds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Cancel */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              3. How to Cancel Your Order
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4 py-2">
                <h3 className="font-bold text-slate-900 mb-2">
                  Step 1: Contact Us Immediately
                </h3>
                <p className="text-slate-600">
                  Send a cancellation request to support@giftshop.com with your
                  order number. Include "URGENT CANCELLATION" in the subject
                  line.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4 py-2">
                <h3 className="font-bold text-slate-900 mb-2">
                  Step 2: Provide Order Details
                </h3>
                <p className="text-slate-600">
                  Include your order ID, order date, and reason for
                  cancellation. You can also call us at +91 98765 43210 for
                  faster processing.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4 py-2">
                <h3 className="font-bold text-slate-900 mb-2">
                  Step 3: Wait for Confirmation
                </h3>
                <p className="text-slate-600">
                  We will confirm cancellation status within 1 hour of receiving
                  your request during business hours. If we confirm it's
                  cancelled, refund will be processed within 7-10 business days.
                </p>
              </div>
            </div>
          </section>

          {/* Order Status & Cancellation */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              4. Order Status & Cancellation Eligibility
            </h2>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-bold text-slate-900 mb-1">✓ PENDING</p>
                <p className="text-slate-600 text-sm">
                  Cancellation possible (100% refund)
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-bold text-slate-900 mb-1">✓ CONFIRMED</p>
                <p className="text-slate-600 text-sm">
                  Cancellation possible (100% refund)
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="font-bold text-slate-900 mb-1">⚠ PROCESSING</p>
                <p className="text-slate-600 text-sm">
                  Cancellation may be possible (contact support immediately)
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-bold text-slate-900 mb-1">✗ SHIPPED</p>
                <p className="text-slate-600 text-sm">
                  No cancellation possible
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-bold text-slate-900 mb-1">✗ DELIVERED</p>
                <p className="text-slate-600 text-sm">
                  No cancellation possible (Final sale)
                </p>
              </div>
            </div>
          </section>

          {/* Refund After Cancellation */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Refund After Cancellation
            </h2>
            <p className="text-slate-600 mb-4">
              If your cancellation is approved, your refund will be processed as
              follows:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4 mb-4">
              <li>
                • <strong>Deduction:</strong> Cancellation fee (if applicable):
                5% of order value
              </li>
              <li>
                • <strong>Processing Time:</strong> 5-7 business days for most
                payment methods
              </li>
              <li>
                • <strong>UPI/Digital Wallets:</strong> 24-48 hours
              </li>
              <li>
                • <strong>International Cards:</strong> 7-14 business days
              </li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-slate-700">
                <strong>Note:</strong> Shipping charges (if already paid) and
                taxes are non-refundable as per RBI regulations.
              </p>
            </div>
          </section>

          {/* Cannot Cancel */}
          <section className="bg-red-50 rounded-2xl p-8 border border-red-200 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Situations Where Cancellation is NOT Possible
            </h2>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Order has already been shipped</li>
              <li>• Order has been delivered</li>
              <li>
                • Cancellation request made more than 2 hours after order
                placement
              </li>
              <li>• Order is in final processing/packing stage</li>
              <li>• Pre-order or special custom items</li>
              <li>• Clearance or flash sale items</li>
            </ul>
          </section>

          {/* Automatic Cancellation */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Automatic Cancellation by GiftShop
            </h2>
            <p className="text-slate-600 mb-4">
              GiftShop may cancel orders in the following situations:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Payment fails or is declined</li>
              <li>• Fraud is detected</li>
              <li>• Product is out of stock and unavailable</li>
              <li>• Invalid or incomplete delivery address</li>
              <li>• Customer requests system cleanup</li>
            </ul>
            <p className="text-slate-600 mt-4">
              In such cases, full refund will be issued automatically to the
              original payment method within 7 business days.
            </p>
          </section>

          {/* Special Orders */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Special/Custom Orders
            </h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <div className="flex gap-3">
                <AlertCircle
                  className="text-orange-600 flex-shrink-0"
                  size={24}
                />
                <div>
                  <p className="font-bold text-slate-900 mb-1">
                    Customized/Personalized Items
                  </p>
                  <p className="text-slate-600 text-sm">
                    Custom orders (personalization, engraving, etc.) CANNOT be
                    cancelled after confirmation. Cancellation must occur within
                    30 minutes of order placement.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Need to Cancel? Contact Us Now
            </h2>
            <p className="text-slate-600 mb-6">
              Time is critical! Contact us within 2 hours of order placement:
            </p>
            <div className="space-y-3 text-slate-600">
              <p className="flex gap-2">
                <span className="font-bold">Email:</span> support@giftshop.com
                (Subject: URGENT CANCELLATION)
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Phone:</span> +91 98765 43210
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Hours:</span> 24/7 Cancellation
                Support
              </p>
            </div>
            <p className="text-sm italic mt-6 text-slate-600">
              ⚠ Remember: After 2 hours, cancellation becomes impossible. Act
              fast!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
