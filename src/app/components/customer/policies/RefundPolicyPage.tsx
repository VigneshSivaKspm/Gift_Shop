import React from "react";
import { DollarSign, AlertCircle, Clock, CheckCircle } from "lucide-react";

export function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-16">
        {/* Header */}
        <div className="mb-16 flex items-center gap-4">
          <div className="p-4 bg-green-100 rounded-2xl">
            <DollarSign size={32} className="text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Refund Policy
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
                No Refunds on Completed Orders
              </h2>
              <p className="text-red-800 leading-relaxed">
                Blue Bell Gifts operates on a <strong>FINAL SALE BASIS</strong>.
                Once an order has been marked as completed and delivered, NO
                REFUNDS will be issued under any circumstances.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Refund Policy Overview
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Due to the nature of our products (gifts and premium items), all
              sales are final. Once your order has been delivered and marked as
              completed, refunds will NOT be issued.
            </p>
            <p className="text-slate-600 leading-relaxed">
              If you have concerns about your order BEFORE it ships, please
              contact us immediately to discuss cancellation options.
            </p>
          </section>

          {/* When You Can Request Cancellation */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Cancellation (Before Shipping)
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
              <div className="flex items-start gap-3">
                <Clock className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Limited Cancellation Window
                  </h3>
                  <p className="text-slate-700">
                    Orders can only be cancelled{" "}
                    <strong>within 2 hours of placement</strong> and{" "}
                    <strong>before shipping begins</strong>.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              If your order is eligible for cancellation:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Contact us via email or phone immediately</li>
              <li>• Refund will be processed to original payment method</li>
              <li>• Processing time: 5-7 business days</li>
              <li>• Once shipped, cancellation is no longer possible</li>
            </ul>
          </section>

          {/* Payment Methods & Refunds */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              3. Refund Process (When Applicable)
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-bold text-slate-900 mb-2">
                  Credit Card/Debit Card
                </h3>
                <p className="text-slate-600">
                  Refund credited within 7-10 business days
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-bold text-slate-900 mb-2">
                  Digital Wallets (PayPal, Apple Pay, Google Pay)
                </h3>
                <p className="text-slate-600">
                  Refund processed within 3-5 business days
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-bold text-slate-900 mb-2">Bank Transfer</h3>
                <p className="text-slate-600">
                  Refund processed within 5-7 business days
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-bold text-slate-900 mb-2">UPI Payments</h3>
                <p className="text-slate-600">
                  Refund reversed within 24-48 hours
                </p>
              </div>
            </div>
          </section>

          {/* Circumstances for Refunds */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Limited Circumstances for Refunds
            </h2>
            <p className="text-slate-600 mb-4">
              In rare cases, refunds may be considered if:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4 mb-4">
              <li>
                • Blue Bell Gifts is responsible for product defects
                (case-by-case evaluation)
              </li>
              <li>
                • Technical/payment errors on our platform caused duplicate
                charges
              </li>
              <li>
                • Items are completely out of stock and cannot be fulfilled
              </li>
            </ul>
            <p className="text-slate-600 italic">
              In such cases, Blue Bell Gifts may offer store credit instead of
              cash refund at our discretion.
            </p>
          </section>

          {/* No Refund Scenarios */}
          <section className="bg-red-50 rounded-2xl p-8 border border-red-200 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. No Refund Scenarios
            </h2>
            <p className="text-slate-600 mb-4">
              The following situations will NOT result in refunds:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Change of mind after order delivery</li>
              <li>• Product does not match expectations</li>
              <li>• Color/size variations (within normal ranges)</li>
              <li>• Recipient did not like the gift</li>
              <li>• You forgot to apply a discount code</li>
              <li>• Price decreases after your purchase</li>
              <li>• Personal/financial circumstances changed</li>
            </ul>
          </section>

          {/* Partial/Store Credit */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Store Credit Option
            </h2>
            <p className="text-slate-600 mb-4">
              In situations where Blue Bell Gifts determines a refund may be
              warranted:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>
                • Store credit equal to 90% of order value may be offered
                instead of refund
              </li>
              <li>
                • Store credit is non-transferable and must be used within 6
                months
              </li>
              <li>• Store credit cannot be converted to cash</li>
              <li>• This is a courtesy and not an obligation</li>
            </ul>
          </section>

          {/* Fraud & Chargebacks */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Fraud & Chargeback Policy
            </h2>
            <p className="text-slate-600 mb-4">
              Customers who attempt to defraud Blue Bell Gifts through false
              refund claims or chargebacks:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Will have their account permanently terminated</li>
              <li>• May face legal action</li>
              <li>
                • Will be reported to payment processors and relevant
                authorities
              </li>
            </ul>
          </section>

          {/* Contact & Support */}
          <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Questions About Your Refund?
            </h2>
            <p className="text-slate-600 mb-6">
              If you have questions or believe you're eligible for a refund
              consideration, contact our support team:
            </p>
            <div className="space-y-3 text-slate-600">
              <p className="flex gap-2">
                <span className="font-bold">Email:</span>{" "}
                support@bluebellgifts.in
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Phone:</span> +91 98765 43210
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Hours:</span> Monday - Friday, 10:00
                AM - 6:00 PM IST
              </p>
              <p className="text-sm italic mt-4">
                Note: Cancellation/refund requests submitted outside business
                hours will be processed the next business day.
              </p>
            </div>
          </section>

          {/* Key Takeaway */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <div className="flex gap-4">
              <CheckCircle className="text-blue-600 flex-shrink-0" size={28} />
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Remember
                </h2>
                <p className="text-slate-600">
                  Once your order is delivered and marked as completed, it is
                  final. Please check all product details carefully before
                  purchasing. If you have any doubts, contact us BEFORE placing
                  your order.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
