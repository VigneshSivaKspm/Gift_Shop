import React, { useEffect, useState } from "react";
import {
  getSiteContent,
  getSiteSettings,
} from "../../services/firestore-service";
import { SiteContent, SiteSettings } from "../../types";
import { Loader2, Mail, Phone, MapPin, Send } from "lucide-react";

export function ContactPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [contentData, settingsData] = await Promise.all([
          getSiteContent("contact"),
          getSiteSettings(),
        ]);
        setContent(contentData);
        setSettings(settingsData);
      } catch (error) {
        console.error("Error loading contact page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-slate-50 to-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const title = content?.title || "Contact Us";
  const customContent = content?.content || "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-4 md:pt-6 pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 md:mb-4">
            {title}
          </h1>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message or visit our store.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 h-full">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Get in Touch
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Our Location
                  </h3>
                  <p className="text-slate-600 whitespace-pre-line">
                    {settings?.contactAddress ||
                      "123 Gift Street, Mumbai, Maharashtra 400001"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Phone Number
                  </h3>
                  <p className="text-slate-600">
                    {settings?.contactPhone || "+91 98765 43210"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Email Address
                  </h3>
                  <p className="text-slate-600">
                    {settings?.contactEmail || "support@bluebellgifts.in"}
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Content injection if exists */}
            {customContent && (
              <div
                className="mt-8 pt-8 border-t border-slate-100 prose prose-blue max-w-none text-slate-600"
                dangerouslySetInnerHTML={{ __html: customContent }}
              />
            )}
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Send Message
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
