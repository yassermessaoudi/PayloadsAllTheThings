import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  email: string;
  username?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  profileImage?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phoneNumber?: string;
}

export interface Category {
  _id?: ObjectId;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategory?: ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id?: ObjectId;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  discount?: number;
  sku: string;
  inventory: number;
  categoryId: ObjectId;
  images: string[];
  tags?: string[];
  features?: string[];
  specifications?: { [key: string]: string };
  isActive: boolean;
  isFeatured: boolean;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  salesCount: number;
}

export interface CartItem {
  productId: ObjectId;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  _id?: ObjectId;
  orderNumber: string;
  userId: ObjectId;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'paypal' | 'stripe' | 'cash';
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber?: string;
  };
  billingAddress?: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber?: string;
  };
  couponCode?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coupon {
  _id?: ObjectId;
  code: string;
  name: string;
  description?: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minimumAmount?: number;
  maximumAmount?: number;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  applicableCategories?: ObjectId[];
  applicableProducts?: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  _id?: ObjectId;
  date: Date;
  siteVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  productViews: { [productId: string]: number };
  orderCount: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts: { productId: ObjectId; views: number; sales: number }[];
  topCategories: { categoryId: ObjectId; views: number; sales: number }[];
  trafficSources: { [source: string]: number };
  deviceTypes: { [device: string]: number };
  browserTypes: { [browser: string]: number };
  createdAt: Date;
}

export interface Newsletter {
  _id?: ObjectId;
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

export interface Review {
  _id?: ObjectId;
  productId: ObjectId;
  userId: ObjectId;
  rating: number;
  title?: string;
  comment?: string;
  isVerified: boolean;
  isApproved: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  _id?: ObjectId;
  userId?: ObjectId;
  sessionId?: string;
  items: CartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteSettings {
  _id?: ObjectId;
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  currency: string;
  taxRate: number;
  shippingCost: number;
  freeShippingThreshold: number;
  contactEmail: string;
  contactPhone: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  updatedAt: Date;
}