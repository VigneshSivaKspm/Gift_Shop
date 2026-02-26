import React from "react";
import { FileText, CheckCircle, AlertCircle } from "lucide-react";

export function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-16">
        {/* Header */}
        <div className="mb-16 flex items-center gap-4">
          <div className="p-4 bg-amber-100 rounded-2xl">
            <FileText size={32} className="text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Terms & Conditions
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing and using the Blue Bell Gifts website and services,
              you accept and agree to be bound by the terms and provision of
              this agreement. If you do not agree to abide by the above, please
              do not use this service.
            </p>
          </section>

          {/* Use License */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Use License
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Blue Bell Gifts's website
              for personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this
              license you may not:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Modify or copy the materials</li>
              <li>
                • Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                • Attempt to decompile or reverse engineer any software on the
                site
              </li>
              <li>
                • Remove any copyright or other proprietary notations from the
                materials
              </li>
              <li>
                • Transfer the materials to another person or "mirror" the
                materials on any other server
              </li>
              <li>• Violate any applicable laws or regulations</li>
            </ul>
          </section>

          {/* Product Information */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <AlertCircle className="text-orange-600" size={24} />
              3. Product Information & Pricing
            </h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  All product descriptions, prices, and availability are subject
                  to change without notice
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>We reserve the right to limit or cancel any order</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Product images are for reference purposes only and may not
                  represent exact colors
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Prices are displayed in Indian Rupees (₹) and are subject to
                  taxes and shipping charges
                </span>
              </li>
            </ul>
          </section>

          {/* User Accounts */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. User Accounts
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              If you create an account on our website, you are responsible for:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>
                • Providing accurate and complete registration information
              </li>
              <li>
                • Maintaining the confidentiality of your password and account
              </li>
              <li>• All activities that occur under your account</li>
              <li>
                • Promptly notifying us of unauthorized use of your account
              </li>
            </ul>
          </section>

          {/* Orders & Purchases */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Orders & Purchases
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              When you place an order with us:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>
                • You warrant that you have the legal authority to make the
                purchase
              </li>
              <li>
                • You are responsible for providing accurate delivery
                information
              </li>
              <li>• Payment must be received before order shipment</li>
              <li>
                • We reserve the right to refuse orders that appear fraudulent
              </li>
            </ul>
          </section>

          {/* No Returns or Refunds */}
          <section className="bg-red-50 rounded-2xl p-8 border border-red-200 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-600" size={24} />
              6. Returns & Refunds Policy
            </h2>
            <div className="bg-white rounded-xl p-6 mb-4 border-l-4 border-red-600">
              <h3 className="font-bold text-slate-900 mb-2">
                IMPORTANT: No Returns/Refunds on Completed Orders
              </h3>
              <p className="text-slate-600">
                Once an order has been marked as completed and delivered, no
                returns or refunds will be accepted under any circumstances.
                This is a final sale policy.
              </p>
            </div>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Orders cannot be cancelled after processing has begun</li>
              <li>
                • Delivery confirmation marks the final point of return
                eligibility
              </li>
              <li>
                • Customers should inspect products immediately upon receipt
              </li>
              <li>• Issues must be reported within 24 hours of delivery</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Blue Bell Gifts and its suppliers will not be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials or services, even if we have
              been notified of the possibility of such damage.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Intellectual Property Rights
            </h2>
            <p className="text-slate-600 leading-relaxed">
              All content on the Blue Bell Gifts website, including text,
              graphics, logos, images, and software, is the property of Blue
              Bell Gifts or its content suppliers and is protected by
              international copyright laws. You may not reproduce, distribute,
              transmit, or display any content without our prior written
              permission.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Third-Party Links
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Blue Bell Gifts may contain links to third-party websites. We are
              not responsible for the content, accuracy, or practices of these
              external sites. Your use of third-party websites is at your own
              risk and subject to their terms of service.
            </p>
          </section>

          {/* Modifications */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Modifications to Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Blue Bell Gifts may update these terms and conditions at any time
              without notice. Your continued use of the website following any
              changes constitutes your acceptance of the new terms.
            </p>
          </section>

          {/* Governing Law */}
          <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Governing Law
            </h2>
            <p className="text-slate-600 mb-4">
              These terms and conditions are governed by and construed in
              accordance with the laws of India, and you irrevocably submit to
              the exclusive jurisdiction of the courts located in Mumbai,
              Maharashtra.
            </p>
            <p className="text-slate-600">
              <strong>Contact:</strong> For questions regarding these terms,
              please contact support@bluebellgifts.in
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
