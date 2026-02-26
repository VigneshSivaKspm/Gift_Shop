import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Heart,
  LogOut,
  MapPin,
  Truck,
  ChevronDown,
  Home,
  Grid,
  Tag,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Scale,
  Shield,
  FileText,
  RotateCcw,
  Package,
  MessageCircle,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { cart, user, logout, wishlist } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "home", icon: Home },
    { name: "Shop", path: "categories", icon: Grid },
    { name: "Deals", path: "products", icon: Tag },
    { name: "About", path: "about", icon: HelpCircle },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      onNavigate("home");
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* 
        PREMIUM HEADER 
        - Default: Transparent/Primary
        - Scrolled: Glassmorphic Sticky
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-slate-200/50 py-2"
            : "bg-white py-3 border-b border-slate-100"
        }`}
      >
        {/* Top Bar - Delivery & Login (Desktop Only) */}
        <div
          className={`hidden md:block transition-all duration-300 ${scrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100 border-b border-slate-100 pb-2 mb-2"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-medium text-slate-500">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors group">
                <MapPin size={12} className="group-hover:animate-bounce" />
                <span>
                  Deliver to{" "}
                  <span className="text-slate-900 border-b border-dashed border-slate-300">
                    Mumbai 400001
                  </span>
                </span>
              </button>
              <div className="flex items-center gap-1.5">
                <Truck size={12} />
                <span>
                  Free delivery on orders above{" "}
                  <span className="text-slate-900">₹999</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="hover:text-blue-600 transition-colors">
                Track Order
              </button>
              <div className="w-px h-3 bg-slate-200"></div>
              <button className="hover:text-blue-600 transition-colors">
                Help
              </button>
            </div>
          </div>
        </div>

        {/* Main Header Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo Section */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
              >
                {mobileMenuOpen ? (
                  <X size={24} strokeWidth={1.5} />
                ) : (
                  <Menu size={24} strokeWidth={1.5} />
                )}
              </button>

              {/* Brand Logo */}
              <button
                onClick={() => onNavigate("home")}
                className="flex items-center gap-2 group outline-none"
              >
                <img
                  src="/logo.png"
                  alt="Blue Bell Gifts Logo"
                  className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-200/50 rounded-lg"
                />
                <img
                  src="/banner.png"
                  alt="Blue Bell Gifts"
                  className="h-6 md:h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`text-sm font-semibold transition-colors duration-200 hover:text-blue-600 relative py-2 ${
                    currentPage === item.path
                      ? "text-blue-600"
                      : "text-slate-600"
                  }`}
                >
                  {item.name}
                  {currentPage === item.path && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full"></span>
                  )}
                </button>
              ))}

              {/* Desktop Search */}
              <div className="relative group w-64 lg:w-80">
                <input
                  type="text"
                  placeholder="Search for premium gifts..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-inner group-hover:bg-white"
                />
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-3">
              {/* Wishlist */}
              <button
                onClick={() => onNavigate("wishlist")}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-full relative group transition-all duration-300 hover:text-red-500 active:scale-95"
              >
                <Heart
                  size={22}
                  strokeWidth={1.5}
                  className="group-hover:fill-red-50"
                />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => onNavigate("cart")}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-full relative group transition-all duration-300 hover:text-blue-600 active:scale-95"
              >
                <ShoppingCart
                  size={22}
                  strokeWidth={1.5}
                  className="group-hover:fill-blue-50"
                />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* User Profile (Desktop) */}
              <div className="hidden md:block pl-2 border-l border-slate-200 ml-2">
                {user ? (
                  <button
                    onClick={() => onNavigate("account")}
                    className="flex items-center gap-2 hover:bg-slate-50 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold overflow-hidden">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-bold text-slate-900 leading-none">
                        {user.name.split(" ")[0]}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        My Account
                      </p>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate("login")}
                    className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-95"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* spacer to prevent content from hiding behind fixed header */}
      <div className="h-[72px] md:h-[110px]"></div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-50 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed left-0 top-0 w-[85%] max-w-sm h-full bg-white z-[60] shadow-2xl transition-transform duration-300 ease-out md:hidden flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Blue Bell Gifts Logo"
              className="w-10 h-10 object-contain shadow-lg shadow-blue-200/50 rounded-lg"
            />
            <img
              src="/banner.png"
              alt="Blue Bell Gifts"
              className="h-8 object-contain"
            />
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* User Section */}
          {!user ? (
            <div
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group cursor-pointer"
              onClick={() => {
                onNavigate("login");
                setMobileMenuOpen(false);
              }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles size={80} />
              </div>
              <h3 className="text-lg font-bold mb-1 relative z-10">
                Welcome Guest
              </h3>
              <p className="text-slate-300 text-sm mb-4 relative z-10">
                Sign in to track orders and more
              </p>
              <button className="bg-white text-slate-900 px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors w-full relative z-10">
                Login / Register
              </button>
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{user.name}</h3>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
          )}

          {/* Navigation Links - Only show when logged in */}
          {user && (
            <div className="space-y-1">
              <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Menu
              </p>
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    currentPage === item.path
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 font-medium"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={currentPage === item.path ? "fill-blue-200" : ""}
                  />
                  {item.name}
                  {currentPage === item.path && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* My Account Section - Only show when logged in */}
          {user && (
            <div className="border-t border-slate-100 pt-6">
              <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                My Account
              </p>
              <button
                onClick={() => {
                  onNavigate("account");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
              >
                <User size={20} /> Profile
              </button>
              <button
                onClick={() => {
                  onNavigate("orders");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
              >
                <Truck size={20} /> Orders
              </button>
              <button
                onClick={() => {
                  onNavigate("wishlist");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
              >
                <Heart size={20} /> Wishlist
              </button>
            </div>
          )}

          {/* Policies Section */}
          <div className="border-t border-slate-100 pt-6">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Customer Support
            </p>
            <button
              onClick={() => {
                onNavigate("faq");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
            >
              <HelpCircle size={20} /> FAQ
            </button>
            <button
              onClick={() => {
                onNavigate("contact");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
            >
              <MessageCircle size={20} /> Contact Us
            </button>
          </div>

          {/* Policies Section */}
          <div className="border-t border-slate-100 pt-6">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Policies
            </p>
            <button
              onClick={() => {
                onNavigate("shipping");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
            >
              <Package size={20} /> Shipping Policy
            </button>
            <button
              onClick={() => {
                onNavigate("return");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
            >
              <RotateCcw size={20} /> Return Policy
            </button>
            <button
              onClick={() => {
                onNavigate("refund");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
            >
              <Shield size={20} /> Refund Policy
            </button>
            <button
              onClick={() => {
                onNavigate("cancellation");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
            >
              <X size={20} /> Cancellation Policy
            </button>
            <button
              onClick={() => {
                onNavigate("terms");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
            >
              <FileText size={20} /> Terms & Conditions
            </button>
            <button
              onClick={() => {
                onNavigate("privacy");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
            >
              <Scale size={20} /> Privacy Policy
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        {user && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 py-3 rounded-xl transition-colors font-medium"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
