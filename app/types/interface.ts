
export type Category = {name:string, description:string}
export type Variant = {  size: string; stock_quantity: number; sku: string };
export type ImageType = {product_id: number; image_path: string, file:File, is_cover:boolean, id:number}

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

export const CATEGORIES: string[] = [
  "National Teams",
  "Club Teams",
  "Sportswear",
  "Accessories",
]

export type User = {
  user_id: Number,
  first_name: string,
  last_name: string,
  email:string,
  mobile: string,
  role: string
}





