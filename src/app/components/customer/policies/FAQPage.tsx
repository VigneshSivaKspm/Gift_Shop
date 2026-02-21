import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQItems = [
  {
    category: "Orders & Returns",
    items: [
      {
        q: "Can I return or refund my order?",
        a: "No. GiftShop operates on a final sale basis. Once an order is delivered and marked as completed, no returns or refunds are accepted. Please carefully review product details before purchasing.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can only be cancelled within 2 hours of placement and before shipping begins. Contact us immediately at support@giftshop.com to request cancellation. After 2 hours, your order enters processing and cannot be cancelled.",
      },
      {
        q: "What if I received a damaged product?",
        a: "Report damaged items within 24 hours of delivery with photos/videos. GiftShop may offer a replacement or store credit after assessment. This must be reported within the 24-hour window.",
      },
      {
        q: "What if I received the wrong item?",
        a: "If we sent the wrong product due to our error, contact us within 24 hours with proof. We may offer a replacement with prepaid return shipping.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery: 5-7 business days (free for orders above ₹999). Express: 2-3 days (₹149). Overnight: 1 day in metros (₹299). Same-day available in select cities (₹499).",
      },
      {
        q: "Do you deliver outside India?",
        a: "We currently ship to select countries internationally. International orders take 7-14 business days. Minimum order value is ₹2,000. Contact us for available destinations.",
      },
      {
        q: "Can I change my delivery address?",
        a: "Yes, but only within 2 hours of order placement. Contact support@giftshop.com immediately with URGENT CHANGE in the subject line.",
      },
      {
        q: "How do I track my order?",
        a: "Once shipped, you'll receive a tracking number via email and SMS. Use this to track real-time delivery status on our website or app.",
      },
      {
        q: "Do you ship on Sundays or holidays?",
        a: "Shipments are processed on business days only. Delivery timelines exclude weekends and national holidays.",
      },
    ],
  },
  {
    category: "Payment & Pricing",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, digital wallets (PayPal, Apple Pay, Google Pay), UPI, and bank transfers. All payments are secure and encrypted.",
      },
      {
        q: "Why is my order total higher than expected?",
        a: "The total includes: product price + applicable taxes (GST) + shipping charges (if applicable). Some discounts may not apply to certain products.",
      },
      {
        q: "Can I get a refund if the price drops after I purchase?",
        a: "No. Price reductions after purchase are not eligible for refunds. Prices are final at the time of transaction.",
      },
      {
        q: "Do you have payment plans or installments?",
        a: "Currently, we don't offer payment plans. However, some credit cards provide EMI options. Check with your bank.",
      },
    ],
  },
  {
    category: "Account & Subscription",
    items: [
      {
        q: "How do I create an account?",
        a: 'Click "Login/Register" on our website, enter your email, and set a password. You\'ll receive a verification link to confirm your account.',
      },
      {
        q: "Can I delete my account?",
        a: "Yes, you can request account deletion. However, order history is retained for compliance. Contact support@giftshop.com for deletion requests.",
      },
      {
        q: "How do I unsubscribe from emails?",
        a: 'Click the "Unsubscribe" link at the bottom of any marketing email, or manage preferences in your account settings.',
      },
      {
        q: "Can I change my email address?",
        a: "Yes, you can update your email in your account settings. You'll receive a verification link at the new address.",
      },
    ],
  },
  {
    category: "Products & Orders",
    items: [
      {
        q: "Are product images accurate?",
        a: "Product images are for reference. Colors and sizes may vary slightly from actual products. We ensure all variations are within acceptable ranges.",
      },
      {
        q: "Can I customize/personalize a gift?",
        a: "Yes! Custom orders (engraving, personalization) are available. These cannot be cancelled after confirmation. Customization takes 2-3 additional business days.",
      },
      {
        q: "Can I gift wrap my purchase?",
        a: "Yes, premium gift wrapping is available for an additional charge. Select this option at checkout.",
      },
      {
        q: "What if an item is out of stock?",
        a: "If an item is out of stock, we'll notify you and offer similar alternatives or provide a full refund before shipping.",
      },
      {
        q: "Do you accept bulk orders?",
        a: "Yes, contact our corporate team at corporate@giftshop.com for bulk orders and special pricing.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    items: [
      {
        q: "Is my payment information secure?",
        a: "Yes, all payments are processed through encrypted SSL connections with PCI-DSS compliance. We never store full credit card details.",
      },
      {
        q: "How do you use my personal data?",
        a: "We use your data only for order processing, delivery, customer service, and marketing (if you consent). Read our Privacy Policy for complete details.",
      },
      {
        q: "Do you sell my information?",
        a: "No, we never sell customer data. Your information is kept confidential and used only as described in our Privacy Policy.",
      },
      {
        q: "Can I request my data?",
        a: "Yes, write to privacy@giftshop.com to request a copy of your personal data we hold.",
      },
    ],
  },
  {
    category: "Troubleshooting",
    items: [
      {
        q: "My payment failed. What do I do?",
        a: "Try again using a different payment method. If the issue persists, contact your bank. You won't be charged for failed transactions.",
      },
      {
        q: "I didn't receive my order. What do I do?",
        a: "Check your tracking status. If marked delivered but not received, file a complaint with the delivery partner immediately. Contact support@giftshop.com.",
      },
      {
        q: "Why is my order taking longer than expected?",
        a: "Delays can occur due to weather, holidays, or carrier issues. Check tracking updates. Most delays are 2-3 days. Contact us if significantly delayed.",
      },
      {
        q: "The website is not loading properly.",
        a: "Clear your browser cache and cookies, or try a different browser. Ensure you have a stable internet connection. Contact us if issues persist.",
      },
    ],
  },
];

export function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-16">
        {/* Header */}
        <div className="mb-16 flex items-center gap-4">
          <div className="p-4 bg-purple-100 rounded-2xl">
            <HelpCircle size={32} className="text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Frequently Asked Questions
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-2">
              Find answers to your questions about GiftShop
            </p>
          </div>
        </div>

        {/* FAQ Items by Category */}
        <div className="space-y-12">
          {FAQItems.map((category, catIndex) => (
            <section key={catIndex} className="mb-12">
              {/* Category Title */}
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-600 inline-block">
                {category.category}
              </h2>

              {/* FAQ Items */}
              <div className="space-y-4 mt-6">
                {category.items.map((item, itemIndex) => {
                  const id = `${catIndex}-${itemIndex}`;
                  const isExpanded = expandedItems.includes(id);

                  return (
                    <div
                      key={id}
                      className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full px-6 py-5 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-left font-bold text-slate-900 text-lg">
                          {item.q}
                        </span>
                        <ChevronDown
                          size={24}
                          className={`flex-shrink-0 text-blue-600 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="px-6 py-5 bg-blue-50 border-t border-blue-100">
                          <p className="text-slate-700 leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Still Have Questions */}
        <section className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-12 border border-purple-100 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Still Have Questions?
          </h2>
          <p className="text-slate-600 mb-6">
            Can't find the answer you're looking for? Our support team is here
            to help!
          </p>
          <div className="space-y-3 text-slate-600">
            <p className="flex gap-2 justify-center">
              <span className="font-bold">Email:</span> support@giftshop.com
            </p>
            <p className="flex gap-2 justify-center">
              <span className="font-bold">Phone:</span> +91 98765 43210
            </p>
            <p className="flex gap-2 justify-center">
              <span className="font-bold">Hours:</span> Monday - Friday, 10:00
              AM - 6:00 PM IST
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
