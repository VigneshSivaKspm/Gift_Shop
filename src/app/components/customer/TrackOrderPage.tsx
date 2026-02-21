import React, { useState } from "react";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface TrackOrderPageProps {
  onNavigate: (page: string) => void;
}

export function TrackOrderPage({ onNavigate }: TrackOrderPageProps) {
  const [orderId, setOrderId] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const handleTrack = () => {
    // Mock tracking data
    setTrackingResult({
      orderId: orderId || "ORD-001",
      status: "shipped",
      estimatedDelivery: "2026-02-12",
      timeline: [
        {
          status: "Order Placed",
          date: "2026-02-08, 10:30 AM",
          completed: true,
          icon: <CheckCircle size={24} />,
        },
        {
          status: "Order Confirmed",
          date: "2026-02-08, 11:00 AM",
          completed: true,
          icon: <CheckCircle size={24} />,
        },
        {
          status: "Processing",
          date: "2026-02-08, 2:00 PM",
          completed: true,
          icon: <Package size={24} />,
        },
        {
          status: "Shipped",
          date: "2026-02-09, 9:00 AM",
          completed: true,
          icon: <Truck size={24} />,
        },
        {
          status: "Out for Delivery",
          date: "Expected: 2026-02-12",
          completed: false,
          icon: <Truck size={24} />,
        },
        {
          status: "Delivered",
          date: "Expected: 2026-02-12",
          completed: false,
          icon: <CheckCircle size={24} />,
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-4 md:pt-6 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111827] mb-6 md:mb-8">
          Track Your Order
        </h1>

        {/* Search Card */}
        <Card className="mb-8">
          <CardContent className="py-8">
            <div className="flex gap-4">
              <Input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID"
                className="flex-1"
              />
              <Button variant="primary" onClick={handleTrack}>
                Track Order
              </Button>
            </div>
            <p className="text-sm text-[#6B7280] mt-3">
              Enter your order ID to track your shipment
            </p>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[#111827]">
                      Order #{trackingResult.orderId}
                    </h2>
                    <p className="text-sm text-[#6B7280] mt-1">
                      Estimated Delivery:{" "}
                      {new Date(
                        trackingResult.estimatedDelivery,
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <Badge variant="info">
                    {trackingResult.status.charAt(0).toUpperCase() +
                      trackingResult.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Timeline */}
            <Card>
              <CardContent className="py-8">
                <div className="relative">
                  {trackingResult.timeline.map((step: any, index: number) => (
                    <div key={index} className="flex gap-6 mb-8 last:mb-0">
                      {/* Icon */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.completed
                              ? "bg-[#22C55E] text-white"
                              : "bg-[#E5E7EB] text-[#6B7280]"
                          }`}
                        >
                          {step.icon}
                        </div>
                        {index < trackingResult.timeline.length - 1 && (
                          <div
                            className={`absolute left-6 top-12 w-0.5 h-16 ${
                              step.completed ? "bg-[#22C55E]" : "bg-[#E5E7EB]"
                            }`}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <h3
                          className={`font-semibold mb-1 ${
                            step.completed ? "text-[#111827]" : "text-[#6B7280]"
                          }`}
                        >
                          {step.status}
                        </h3>
                        <p className="text-sm text-[#6B7280]">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Support Contact */}
                <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                  <div className="bg-[#EFF6FF] rounded-2xl p-6">
                    <h3 className="font-semibold text-[#1E3A8A] mb-2">
                      Need Help?
                    </h3>
                    <p className="text-sm text-[#1E3A8A] mb-4">
                      Contact our support team for any queries about your order
                    </p>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate("contact")}
                      >
                        Contact Support
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onNavigate("account")}
                      >
                        View All Orders
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
