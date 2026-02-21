import React from "react";
import { Truck, Package, MapPin, Clock } from "lucide-react";

export function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-16">
        {/* Header */}
        <div className="mb-16 flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-2xl">
            <Truck size={32} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Shipping Policy
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
              1. Shipping Overview
            </h2>
            <p className="text-slate-600 leading-relaxed">
              GiftShop ships premium gifts nationwide across India with secure
              packaging and reliable delivery partners. We ensure your gifts
              arrive in perfect condition.
            </p>
          </section>

          {/* Delivery Areas */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              2. Delivery Coverage
            </h2>
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  All-India Coverage
                </h3>
                <p className="text-slate-600 mb-4">
                  We deliver to all locations across India including metro
                  cities, tier-2 cities, and most towns.
                </p>
                <p className="text-slate-600">
                  Some remote areas may have limited service. Please check
                  delivery availability at checkout.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Options */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              3. Shipping Options & Charges
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4 py-3">
                <h3 className="font-bold text-slate-900 mb-1">
                  Standard Delivery
                </h3>
                <p className="text-slate-600 text-sm mb-1">5-7 Business Days</p>
                <p className="text-slate-600 text-sm">
                  <strong>Cost:</strong> Free on orders above ₹999 | ₹49 for
                  orders below ₹999
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4 py-3">
                <h3 className="font-bold text-slate-900 mb-1">
                  Express Delivery
                </h3>
                <p className="text-slate-600 text-sm mb-1">2-3 Business Days</p>
                <p className="text-slate-600 text-sm">
                  <strong>Cost:</strong> ₹149 across India
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4 py-3">
                <h3 className="font-bold text-slate-900 mb-1">
                  Overnight Delivery
                </h3>
                <p className="text-slate-600 text-sm mb-1">
                  1 Business Day (Metro Cities Only)
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Cost:</strong> ₹299 (Available in select metros)
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-4 py-3">
                <h3 className="font-bold text-slate-900 mb-1">
                  Same-Day Delivery
                </h3>
                <p className="text-slate-600 text-sm mb-1">
                  Within 24 Hours (Selected Cities)
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Cost:</strong> ₹499 (Mumbai, Delhi, Bangalore only)
                </p>
              </div>
            </div>
          </section>

          {/* Delivery Timeline */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              4. Delivery Timeline
            </h2>
            <div className="flex items-start gap-4 mb-6">
              <Clock className="text-orange-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-slate-600 leading-relaxed">
                  Delivery timelines mentioned above are{" "}
                  <strong>estimated and not guaranteed</strong>. They exclude
                  weekends, public holidays, and unforeseen circumstances.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-3">
                Business Days Calculation:
              </h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>• Starts from the day after payment confirmation</li>
                <li>• Excludes Sundays and national holidays</li>
                <li>• Orders placed after 6 PM are processed next day</li>
                <li>• Weekend orders start processing on Monday</li>
              </ul>
            </div>
          </section>

          {/* Packaging */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              5. Packaging & Handling
            </h2>
            <div className="flex items-start gap-4 mb-6">
              <Package
                className="text-green-600 flex-shrink-0 mt-1"
                size={24}
              />
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Premium Packaging
                </h3>
                <p className="text-slate-600">
                  All gifts are carefully packed using high-quality materials to
                  ensure maximum protection during transit.
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-slate-600 ml-4">
              <li>
                • <strong>Protective Padding:</strong> Bubble wrap, foam, or
                cushioning material
              </li>
              <li>
                • <strong>Gift Wrapping:</strong> Premium wrapping available
                (additional charge)
              </li>
              <li>
                • <strong>Fragile Items:</strong> Special handling and double
                boxing
              </li>
              <li>
                • <strong>Personalization:</strong> Gift cards included upon
                request
              </li>
              <li>
                • <strong>Tracking:</strong> Real-time shipment tracking
                provided
              </li>
            </ul>
          </section>

          {/* Tracking */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Order Tracking
            </h2>
            <p className="text-slate-600 mb-4">
              Once your order ships, you will receive:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4 mb-4">
              <li>• Tracking number via email and SMS</li>
              <li>• Tracking link to monitor shipment in real-time</li>
              <li>• Delivery address and estimated delivery date</li>
              <li>• Carrier information and contact details</li>
            </ul>
            <p className="text-slate-600">
              Log into your GiftShop account to view complete order and delivery
              history.
            </p>
          </section>

          {/* Delivery Confirmation */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Delivery Confirmation
            </h2>
            <p className="text-slate-600 mb-4">
              Upon delivery, our delivery partner will:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Take photo/video proof of delivery</li>
              <li>• Obtain recipient signature or OTP confirmation</li>
              <li>• Provide delivery receipt</li>
              <li>• Send confirmation via email and SMS</li>
            </ul>
          </section>

          {/* Address Requirements */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Delivery Address Requirements
            </h2>
            <p className="text-slate-600 mb-4">
              To ensure smooth delivery, please provide:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4 mb-4">
              <li>• Complete and accurate recipient name</li>
              <li>• Full street address with apartment/house number</li>
              <li>• Landmark or nearby location reference</li>
              <li>• Correct pincode</li>
              <li>• Valid mobile number</li>
              <li>• Alternative contact number if possible</li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-slate-700">
                <strong>Note:</strong> Incorrect or incomplete addresses may
                result in delivery delays or failed delivery. GiftShop is not
                responsible for lost packages due to incorrect addresses.
              </p>
            </div>
          </section>

          {/* Issues & Complaints */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Delivery Issues & Complaints
            </h2>
            <p className="text-slate-600 mb-4">
              If you experience delivery problems:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>
                • <strong>Not Delivered:</strong> Contact us within 24 hours
                with tracking number
              </li>
              <li>
                • <strong>Damaged Package:</strong> Report within 24 hours with
                photos/video
              </li>
              <li>
                • <strong>Missing Items:</strong> Raised claim immediately with
                documentation
              </li>
              <li>
                • <strong>Address Error:</strong> Inform us immediately for
                rerouting
              </li>
            </ul>
            <p className="text-slate-600 mt-4">
              Please keep all packaging and proof of delivery for claim
              processing.
            </p>
          </section>

          {/* International Shipping */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. International Shipping
            </h2>
            <p className="text-slate-600 mb-4">
              Currently, GiftShop ships to select international destinations.
              For international orders:
            </p>
            <ul className="space-y-2 text-slate-600 ml-4 mb-4">
              <li>• Minimum order value: ₹2,000</li>
              <li>• Delivery time: 7-14 business days</li>
              <li>• Additional charges apply for customs and duties</li>
              <li>• Contact us for available destinations and pricing</li>
            </ul>
          </section>

          {/* Contact for Shipping */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Shipping Support
            </h2>
            <p className="text-slate-600 mb-6">
              Have questions about shipping? Contact our logistics team:
            </p>
            <div className="space-y-3 text-slate-600">
              <p className="flex gap-2">
                <span className="font-bold">Email:</span> shipping@giftshop.com
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Phone:</span> +91 98765 43210
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Hours:</span> Monday - Friday, 10:00
                AM - 6:00 PM IST
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
