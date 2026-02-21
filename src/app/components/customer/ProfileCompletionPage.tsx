import React, { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { createOrUpdateCustomerProfile } from "../../services/firestore-service";

interface ProfileCompletionPageProps {
  onNavigate: (page: string) => void;
}

export function ProfileCompletionPage({
  onNavigate,
}: ProfileCompletionPageProps) {
  const { user, setUser } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
    addressLine1: user?.addresses?.[0]?.addressLine1 || "",
    addressLine2: user?.addresses?.[0]?.addressLine2 || "",
    city: user?.addresses?.[0]?.city || "",
    state: user?.addresses?.[0]?.state || "",
    pincode: user?.addresses?.[0]?.pincode || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError("First Name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last Name is required");
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError("Valid phone number is required");
      return false;
    }
    if (!formData.dateOfBirth) {
      setError("Date of Birth is required");
      return false;
    }
    if (!formData.addressLine1.trim()) {
      setError("Address is required");
      return false;
    }
    if (!formData.city.trim()) {
      setError("City is required");
      return false;
    }
    if (!formData.state.trim()) {
      setError("State is required");
      return false;
    }
    if (!formData.pincode.trim() || formData.pincode.length < 6) {
      setError("Valid Pincode is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (!user) {
        setError("User not found. Please log in again.");
        return;
      }

      const updatedUser: any = {
        id: user.id,
        name: `${formData.firstName} ${formData.lastName}`,
        email: user.email,
        role: user.role,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        addresses: [
          {
            id: user.addresses?.[0]?.id || `addr-${Date.now()}`,
            name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            isDefault: true,
          },
        ],
        profileComplete: true,
      };

      // Update customer profile in Firestore
      await createOrUpdateCustomerProfile(user.id, updatedUser);

      // Update local user state
      setUser(updatedUser);

      setSuccessMessage("Profile completed successfully!");
      setTimeout(() => {
        onNavigate("home");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to complete profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-4 md:pt-6 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
              <User size={32} className="text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            We need a few more details to personalize your shopping experience
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle
              className="text-red-600 flex-shrink-0 mt-0.5"
              size={20}
            />
            <div>
              <p className="font-semibold text-red-900">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-pulse">
            <CheckCircle
              className="text-green-600 flex-shrink-0 mt-0.5"
              size={20}
            />
            <div>
              <p className="font-semibold text-green-900">Success!</p>
              <p className="text-green-700 text-sm">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <User size={24} className="text-blue-600" />
              Personal Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-slate-900 mb-2 flex items-center gap-1"
                >
                  <Phone size={16} className="text-blue-600" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-semibold text-slate-900 mb-2 flex items-center gap-1"
                >
                  <Calendar size={16} className="text-blue-600" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MapPin size={24} className="text-blue-600" />
              Delivery Address
            </h2>

            <div className="space-y-6">
              {/* Address Line 1 */}
              <div>
                <label
                  htmlFor="addressLine1"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  placeholder="Street address, house number"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>

              {/* Address Line 2 */}
              <div>
                <label
                  htmlFor="addressLine2"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* City and State */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Maharashtra"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* Pincode */}
              <div>
                <label
                  htmlFor="pincode"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Pincode *
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="400001"
                  maxLength={6}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Completing Profile...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Complete Profile & Continue
              </>
            )}
          </button>
        </form>

        {/* Info */}
        <p className="text-center text-slate-600 text-sm mt-6">
          This information helps us provide better service and faster deliveries
        </p>
      </div>
    </div>
  );
}
