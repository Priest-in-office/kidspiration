/** Core product type — matches what your backend API should return */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number; // in cents (e.g. 1800 = $18.00)
  compareAtPrice?: number; // original price before discount, in cents
  currency: string; // e.g. "USD"
  images: string[];
  category: string;
  rating: number; // 0–5
  reviewCount: number;
  badge?: "best-seller" | "new" | "sale";
  discountPercent?: number;
  inStock: boolean;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Small", "Red"
  type: "size" | "color";
  price?: number; // override price for this variant
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount?: number;
}

/** Cart item = product + quantity + selected variant */
export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
}

/** Checkout session — what you'll send to your payment gateway */
export interface CheckoutSession {
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
    unitPrice: number;
  }>;
  currency: string;
  totalAmount: number;
  customerEmail?: string;
}

/** Helpers */
export function formatPrice(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function getDiscountPercent(price: number, compareAt: number): number {
  return Math.round(((compareAt - price) / compareAt) * 100);
}
