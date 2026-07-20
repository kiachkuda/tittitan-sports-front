import type { Metadata } from "next";
import  {AddProductForm}  from "@/app/(admin)/compononents/add-product-form";

export const metadata: Metadata = {
  title: "Add Product — TitanSports Admin",
  description:
    "Create a new jersey or equipment listing — set details, upload images, and configure size variants.",
};

export default function AddProductPage() {
  return <AddProductForm />;
}
