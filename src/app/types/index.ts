export interface Product {
  id: string;
  name: string;
  category: string;
  retailPrice: number;
  resellerPrice: number;
  discountPrice: number;
  sellingPrice: number;
  costPrice: number;
  onOffer: boolean;
  stock: number;
  sku: string;
  image: string;
  description: string;
  tags: string[];
  rating: number;
  reviews: number;
  discount?: number;
  needsCustomerName?: boolean;
  needsCustomerPhoto?: boolean;
  multipleImagesRequired?: boolean;
  numberOfImagesRequired?: number;
}

export interface CartItemCustomization {
  customerName?: string;
  customerPhotoUrl?: string;
  customerImages?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: CartItemCustomization;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "reseller" | "admin";
  image?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: Address[];
  disabled?: boolean;
  profileComplete?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  shippingAddress: Address;
  orderType: "online" | "offline" | "reseller";
  createdAt: Date;
  updatedAt: Date;
  hasCustomizations?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface InventoryLog {
  id: string;
  productId: string;
  productName: string;
  type: "in" | "out";
  quantity: number;
  date: Date;
  notes?: string;
}

export interface SiteContent {
  id: string; // 'about', 'contact', 'terms', 'privacy', 'refund'
  title: string;
  content: string; // HTML or Markdown
  lastUpdated: Date;
}

export interface SiteSettings {
  id: string; // 'general'
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  currency: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  logoUrl?: string;
}
