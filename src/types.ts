export interface ProductImage {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  badge?: string;
  alt: string;
}

export interface PackOption {
  id: string;
  name: string;
  subtitle: string;
  quantity: number;
  mrp: number;
  price: number;
  discountPercent: number;
  savings: number;
  badge?: string;
  popular?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductBenefit {
  id: string;
  title: string;
  description: string;
}

export interface UsageStep {
  step: string;
  title: string;
  description: string;
}

export interface ProductConfig {
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  mrp: number;
  price: number;
  discountPercent: number;
  savings: number;
  images: ProductImage[];
  packs: PackOption[];
  usageNotice: string;
  usageSteps: UsageStep[];
  nightCareNoteTitle: string;
  nightCareNote: string;
  benefits: ProductBenefit[];
  whatsappNumber: string;
  whatsappDisplayNumber: string;
  updatedAt: string;
}

export type OrderStatus = 'New' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Pending' | 'Refunded';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  pincode: string;
  packSelected: string;
  quantity: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  orderStatus: OrderStatus;
  createdAt: string;
  notes?: string;
  trackingNumber?: string;
}
