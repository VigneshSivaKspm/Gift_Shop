import React from "react";
import { mockCategories } from "../../data/mockData";
import { Card, CardContent } from "../ui/card";
import { ArrowRight } from "lucide-react";

interface CategoriesPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function CategoriesPage({ onNavigate }: CategoriesPageProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-4 md:pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111827] mb-2">
          All Categories
        </h1>
        <p className="text-lg text-[#6B7280] mb-8">
          Browse our wide range of gift categories
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCategories.map((category) => (
            <Card
              key={category.id}
              hover
              className="cursor-pointer group"
              onClick={() =>
                onNavigate("category", { categoryId: category.id })
              }
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#111827] mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[#6B7280]">
                      {category.productCount} products available
                    </p>
                  </div>
                  <ArrowRight
                    className="text-[#2563EB] group-hover:translate-x-1 transition-transform"
                    size={24}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
