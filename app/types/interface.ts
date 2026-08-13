
export type Category = {category_id:number, name:string}
export type Variant = {  variant_id?:number, size: string; stock_quantity: number; sku: string };
export type ImageType = {product_id: number; image_path: string, file:File, is_cover:boolean, id:number}

export const SIZES = ["XS","S","M","L","XL","2xl"];

export type ProductCategory = {
  category_id:number,
  product_id:number,
  categories: {name:string}
}

export interface CartItem extends Product {
  quantity: number;
}

export type StepId = "bag" | "delivery" | "payment" | "review" | "confirmed";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem, quantity: number, variant_id?:number, printing_cost?:number) => void;
  updateQuantity: (id: number, amount: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  subtotal: number;
}

export type SingleProduct = {
  product_id: number;
  name: string;
  sku: string;
  category: string;
  team: string;
  price: number;
  product_image: ImageType[];
  description?: string;
  product_variants?: Variant[];
  product_categories:ProductCategory[] 
};

export type Product = {
  product_id: number;
  name: string;
  sku: string;
  category: string;
  team: string;
  price: number;
  product_image: ImageType[];
  description?: string;
};

export type User = {
  user_id: Number,
  first_name: string,
  last_name: string,
  email:string,
  mobile: string,
  role: string
}

export interface CartItem {
  product_id: number;
  product_name: string;
  image_product: ImageType;
  price: number;
  quantity: number;
  variant_id:number;
  printing_cost:number;
}

export type Address = {
  address_id:string;
  first_name: string;
  last_name: string;
  phone_number: string;
  county: string;
  city: string;
  street_address: string;
  landmark?:string;
  apartment?:string;
};

export type DeliveryMethodId = "standard" | "express" | "pickup";

export interface DeliveryMethod {
  id: DeliveryMethodId;
  label: string;
  description: string;
  price: number;
  etaLabel: string;
}

export interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

export type PaymentMethodId = "mpesa" | "card"

export interface CheckoutState {
  step: StepId;
  promoCode: string;
  promoApplied: boolean;
  addressId: string | null;
  newAddress: Address;
  usingNewAddress: boolean;
  deliveryMethodId: DeliveryMethodId;
  paymentMethodId: PaymentMethodId;
  card: CardDetails;
  mpesaNumber:string;
  totalPrice:number;
  orderNumber: string | null;
}
export interface PriceBreakdown {
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
}





