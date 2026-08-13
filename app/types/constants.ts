import { Store, Zap } from "lucide-react";
import { Address, CartItem, DeliveryMethod, PriceBreakdown } from "./interface";


export const API_URL = process.env.NODE_ENV==="development" ? process.env.NEXT_PUBLIC_API_URL :
      process.env.API_URL;


export const COUNTIES = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Uasin Gishu",
  "Kiambu",
  "Machakos",
  "Kajiado",
  "Kilifi",
  "Kakamega",
  "Meru",
  "Nyeri",
];

export const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: "standard",
    label: "Standard delivery",
    description: "Tracked delivery to your door",
    price: 4.5,
    etaLabel: "3–5 business days",
  },
  {
    id: "express",
    label: "Express delivery",
    description: "Priority handling and dispatch",
    price: 12.0,
    etaLabel: "1–2 business days",
  },
  {
    id: "pickup",
    label: "Store pickup",
    description: "Collect from your nearest store",
    price: 0,
    etaLabel: "Ready in 24 hours",
  },
];

export const PAYMENT_METHODS = [
  {
    id: "mpesa",
    name: "M-Pesa",
    description: "Pay securely using M-Pesa",
    color: "bg-green-600",
    placeholder: "0712 345 678",
  },
  {
    id: "kcb",
    name: "KCB",
    description: "Pay using KCB mobile banking",
    color: "bg-blue-700",
    placeholder: "0712 345 678",
  },
  {
    id: "equity",
    name: "Equity",
    description: "Pay using Equity mobile banking",
    color: "bg-red-600",
    placeholder: "0712 345 678",
  },
];

export const SAVED_ADDRESSES:Address[] = [];

export const formatCurrency = (amount: number) => {
  return `KSh ${Number(amount).toLocaleString("en-KE")}`;
};

export function generateOrderNumber(): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `ORD-${random}`;
}

export const CART_ITEMS:CartItem[] = [];

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + (item.price * item.quantity + item.printing_cost), 0);
}


const TAX_RATE = 0.08;
const PROMO_DISCOUNT_RATE = 0.1;
export function calculatePriceBreakdown(
  items: CartItem[],
  shippingPrice: number,
  promoApplied: boolean
): PriceBreakdown {
  const subtotal = calculateSubtotal(items);
  const discount = promoApplied ? subtotal * PROMO_DISCOUNT_RATE : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + tax + shippingPrice;
  return { subtotal, shipping: shippingPrice, discount, tax, total };
}