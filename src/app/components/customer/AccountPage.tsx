import React, { useState } from "react";
import { User, MapPin, Package, LogOut, Edit } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { mockOrders } from "../../data/mockData";

interface AccountPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function AccountPage({ onNavigate }: AccountPageProps) {
  const { user, setUser, orders: contextOrders } = useApp();
  const [activeTab, setActiveTab] = useState<
    "profile" | "orders" | "addresses"
  >("profile");

  if (!user) {
    onNavigate("login");
    return null;
  }

  // Combine context orders with mock orders for demo
  const allOrders = [
    ...contextOrders,
    ...mockOrders.filter((o) => o.customerId === user.id),
  ];

  const tabs = [
    { id: "profile" as const, name: "Profile", icon: <User size={20} /> },
    { id: "orders" as const, name: "Orders", icon: <Package size={20} /> },
    { id: "addresses" as const, name: "Addresses", icon: <MapPin size={20} /> },
  ];

  const handleLogout = () => {
    setUser(null);
    onNavigate("home");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "success";
      case "shipped":
        return "info";
      case "processing":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-4 md:pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#111827] mb-1">
            My Account
          </h1>
          <p className="text-sm md:text-base text-[#6B7280]">
            Manage your profile, orders, and addresses
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="py-6">
                <div className="flex items-center gap-4 pb-6 border-b border-[#E5E7EB] mb-6">
                  <div className="w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827]">
                      {user.name}
                    </h3>
                    <p className="text-sm text-[#6B7280]">{user.email}</p>
                    {user.role === "reseller" && (
                      <Badge variant="info" className="mt-1">
                        Reseller
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? "bg-[#2563EB] text-white"
                          : "text-[#6B7280] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
                      }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[#EF4444] hover:bg-[#FEF2F2] rounded-xl transition-all"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#111827]">
                      Profile Information
                    </h2>
                    <Button variant="outline" size="sm">
                      <Edit size={16} className="mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-[#6B7280]">
                        Full Name
                      </label>
                      <p className="text-lg text-[#111827] mt-1">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#6B7280]">
                        Email
                      </label>
                      <p className="text-lg text-[#111827] mt-1">
                        {user.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#6B7280]">
                        Phone
                      </label>
                      <p className="text-lg text-[#111827] mt-1">
                        {user.phone || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#6B7280]">
                        Account Type
                      </label>
                      <p className="text-lg text-[#111827] mt-1 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  {user.role === "reseller" && (
                    <div className="mt-6 p-6 bg-[#EFF6FF] rounded-2xl">
                      <h3 className="font-semibold text-[#1E3A8A] mb-4">
                        Reseller Benefits
                      </h3>
                      <ul className="space-y-2 text-sm text-[#1E3A8A]">
                        <li className="flex items-start">
                          <span className="text-[#22C55E] mr-2">✓</span>
                          Exclusive reseller pricing on all products
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#22C55E] mr-2">✓</span>
                          Bulk order discounts
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#22C55E] mr-2">✓</span>
                          Priority customer support
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#22C55E] mr-2">✓</span>
                          Dedicated account manager
                        </li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-[#111827]">
                      My Orders
                    </h2>
                  </CardHeader>
                  <CardContent>
                    {allOrders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package
                          size={64}
                          className="text-[#E5E7EB] mx-auto mb-4"
                        />
                        <p className="text-lg text-[#6B7280] mb-6">
                          No orders yet
                        </p>
                        <Button
                          variant="primary"
                          onClick={() => onNavigate("products")}
                        >
                          Start Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {allOrders.map((order) => (
                          <div
                            key={order.id}
                            className="border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() =>
                              onNavigate("order-detail", { orderId: order.id })
                            }
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                              <div>
                                <p className="font-semibold text-[#111827]">
                                  Order #{order.id}
                                </p>
                                <p className="text-sm text-[#6B7280]">
                                  {new Date(order.createdAt).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    },
                                  )}
                                </p>
                              </div>
                              <div className="flex items-center gap-4 mt-4 md:mt-0">
                                <Badge variant={getStatusColor(order.status)}>
                                  {order.status.charAt(0).toUpperCase() +
                                    order.status.slice(1)}
                                </Badge>
                                <p className="font-bold text-[#111827]">
                                  ₹{order.total.toFixed(2)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              {order.items.slice(0, 3).map((item, index) => (
                                <img
                                  key={index}
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              ))}
                              {order.items.length > 3 && (
                                <div className="w-16 h-16 bg-[#EFF6FF] rounded-lg flex items-center justify-center text-[#2563EB] font-semibold">
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#111827]">
                      Saved Addresses
                    </h2>
                    <Button variant="primary" size="sm">
                      Add New Address
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MapPin size={64} className="text-[#E5E7EB] mx-auto mb-4" />
                    <p className="text-lg text-[#6B7280]">
                      No saved addresses yet
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
