import React from "react";
import { Shield, Mail, Lock, Eye } from "lucide-react";

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-16">
        {/* Header */}
        <div className="mb-16 flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-2xl">
            <Shield size={32} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Privacy Policy
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
              Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed">
              GiftShop ("we," "us," "our," or "Company") is committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website and use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              1. Information We Collect
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Eye className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Personal Information
                  </h3>
                  <p className="text-slate-600">
                    When you register, place an order, or contact us, we collect
                    information such as your name, email address, phone number,
                    shipping address, billing address, and payment information.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Lock
                  className="text-purple-600 flex-shrink-0 mt-1"
                  size={24}
                />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Automatic Information
                  </h3>
                  <p className="text-slate-600">
                    We automatically collect certain information about your
                    device and browsing activity, including IP address, browser
                    type, operating system, referring URLs, and pages visited.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Communication Information
                  </h3>
                  <p className="text-slate-600">
                    If you contact us, we collect the contents of your message,
                    including attachments, and contact information provided in
                    your communication.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              2. How We Use Your Information
            </h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Process and fulfill your orders and transactions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Send you order confirmations and shipping updates</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Provide customer support and respond to inquiries</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Send promotional emails and marketing communications (with
                  your consent)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Improve our website and services</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Prevent fraud and ensure account security</span>
              </li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              3. How We Share Your Information
            </h2>
            <p className="text-slate-600 mb-4">
              We do not sell your personal information. However, we may share
              your information with:
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Service Providers:</strong> Payment processors,
                  shipping carriers, email providers, and analytics services
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Law Enforcement:</strong> When required by law or to
                  protect our rights
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Business Partners:</strong> With your consent for
                  joint offerings
                </span>
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We implement industry-standard security measures to protect your
              personal information, including SSL encryption, secure payment
              gateways, and limited employee access. However, no method of
              transmission over the internet is 100% secure. We cannot guarantee
              absolute security of your information.
            </p>
          </section>

          {/* Your Rights */}
          <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Your Privacy Rights
            </h2>
            <p className="text-slate-600 mb-4">You have the right to:</p>
            <ul className="space-y-2 text-slate-600 ml-4">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate information</li>
              <li>• Request deletion of your data</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Export your data in a portable format</li>
            </ul>
          </section>

          {/* Contact Us */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Contact Us
            </h2>
            <p className="text-slate-600 mb-4">
              If you have questions about this Privacy Policy or our privacy
              practices, please contact us at:
            </p>
            <div className="space-y-2 text-slate-600">
              <p>Email: privacy@giftshop.com</p>
              <p>Address: Mumbai, Maharashtra, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
