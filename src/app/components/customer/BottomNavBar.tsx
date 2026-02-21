import React from "react";
import { Home, Grid, ShoppingCart, Heart, User, Search } from "lucide-react";
import { useApp } from "../../context/AppContext";

interface BottomNavBarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function BottomNavBar({ onNavigate, currentPage }: BottomNavBarProps) {
  const { user } = useApp();

  const navItems = [
    { name: "Home", path: "home", icon: Home },
    { name: "Shop", path: "categories", icon: Grid },
    { name: "Search", path: "search", icon: Search },
    { name: "Saved", path: "wishlist", icon: Heart },
    { name: "Account", path: user ? "account" : "login", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pointer-events-none pb-3 px-3">
      {/* Premium White Bottom Navigation */}
      <nav className="pointer-events-auto bg-white shadow-2xl border border-slate-100 rounded-3xl mx-auto max-w-md overflow-hidden">
        <div className="flex items-center justify-between h-20 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentPage === item.path ||
              (item.path === "account" && currentPage === "login");

            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`group relative flex-1 h-full flex flex-col items-center justify-center gap-1.5 rounded-2xl mx-1 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-b from-blue-50 to-blue-50/30"
                    : "hover:bg-slate-50"
                }`}
              >
                {/* Icon Container */}
                <div
                  className={`
                  relative p-2.5 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "text-slate-600 group-hover:text-blue-600"
                  }
                `}
                >
                  <Icon
                    size={isActive ? 24 : 22}
                    strokeWidth={isActive ? 2 : 2}
                    className={`transition-all duration-300 ${isActive ? "drop-shadow-sm" : ""}`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-500 group-hover:text-slate-700"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
