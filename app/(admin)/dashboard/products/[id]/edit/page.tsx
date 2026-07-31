"use client";
import { useEffect, useState } from "react";
import {
  Plus, Search, Filter, Download, Upload, MoreHorizontal, Pencil, Trash2,
    Copy, Eye, ChevronLeft, ChevronRight, Package, TrendingUp, AlertTriangle,
    CheckCircle2, LayoutGrid, List, ArrowUpDown, Star,
    ImagePlus,
    X,
    Minus,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";



import AdminShell  from "@/app/(admin)/compononents/admin/AdminShell";

import { getProductById } from "@/app/lib/product";
import { ImageType, SingleProduct, Variant, Category } from "@/app/types/interface";
import { Card,  Select } from "@/app/(admin)/compononents/helpers/helpers";
import {Field} from "@/app/(admin)/compononents/Field"
import { getAllCategories } from "@/app/lib/category";





export default function ProductEditPage() {

  const product_id = useParams().id;
  const [product, setProduct] = useState<SingleProduct>({} as SingleProduct); 
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(Number(product_id));
      console.log("Fetched product data:", productData);
      setProduct(productData);
    };

    const getCategories = async () => {
       const categories = await getAllCategories();
       setCategories(categories);
    };

    fetchProduct();
  }, [product_id]);

  


  const [name, setName] = useState(product.name);
  const [sku, setSku] = useState(product.sku);
  
  const [team, setTeam] = useState(product.team);
  const [price, setPrice] = useState<number>(product.price);

  const [description, setDescription] = useState(product.description ?? "");
  const [variants, setVariants] = useState<Variant[]>(product.product_variants ?? []);
  const [images, setImages] = useState<ImageType[]>(product.product_image ?? []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const thumbs = product.product_image?.map((img) => <img key={img.image_path} src={img.image_path} alt={product.name} className="h-full w-full object-cover " />) ?? [];

  const dirty =
    name !== product.name ||
    sku !== product.sku ||
   
    team !== product.team ||
    price !== product.price ||
    description !== (product.description ?? "");

  const totalStock = variants.reduce((a, v) => a + v.stock_quantity, 0);

  function updateVariant(i: number, patch: Partial<Variant>) {
    setVariants((vs) => vs.map((v, idx) => (idx === i ? { ...v, ...patch } : v)));
  }
  function addVariant() {
    setVariants((vs) => [...vs, { size: "NEW", stock_quantity: 0, sku: `${sku}-NEW` }]);
  }
  function removeVariant(i: number) {
    setVariants((vs) => vs.filter((_, idx) => idx !== i));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 700);
  }


   return (
    <>
      <form onSubmit={handleSave}>
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link href="/products" className="hover:text-foreground">Products</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href={`/dashboard/products/${product.product_id}`} className="hover:text-foreground">{product.product_id}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">Edit</span>
            </nav>
            <h1 className="mt-1 truncate text-2xl font-bold tracking-tight md:text-3xl">Edit product</h1>
            <p className="mt-1 text-sm text-muted-foreground">Update product details, pricing, images, and variants.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/products/${product.product_id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-semibold hover:bg-muted"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!dirty && !saving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_6px_20px_-6px] shadow-primary/60 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {/* <Save className="h-4 w-4" /> */}
              {saving ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
            </button>
          </div>
        </div>

        {dirty && !saved && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-warning/30 bg-warning/10 px-4 py-2.5 text-sm text-warning-foreground">
            <AlertTriangle className="h-4 w-4" />
            You have unsaved changes.

            <span>{name}</span>
          </div>
          

        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            <Card title="Product details">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Product name" required>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input"
                  />
                </Field>
                <Field label="SKU" required>
                  <input value={sku} onChange={(e) => setSku(e.target.value)} required className="input font-mono" />
                </Field>
                <Field label="Price (KES)" required>
                  <input
                    type="number"
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    className="input"
                  />
                </Field>
                
                <Field label="Team" required>
                  <input
                    type="text"

                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    required
                    className="input"
                  />
                </Field>
                
              </div>
            </Card>

            <Card title="Description" subtitle={`${description.length} / 800 characters`}>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 800))}
                rows={6}
                placeholder="Describe fabric, fit, features…"
                className="input min-h-[140px] resize-y"
              />
            </Card>

            <Card title="Images" subtitle="Drag to reorder. The first image is the cover.">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {thumbs.map((img, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted to-muted/40">
                    <div className="grid aspect-square place-items-center text-5xl">{img}</div>
                    {i === 0 && (
                      <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setImages((im) => im.filter((_, idx) => idx !== i))}
                      className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-lg bg-background/90 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:text-destructive"
                      aria-label="Remove image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setImages((im) => [...im, { image_path: "🎽" } as ImageType])}
                  className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-border text-muted-foreground transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  <div className="flex flex-col items-center gap-1 text-xs">
                    <ImagePlus className="h-6 w-6" />
                    Add image
                  </div>
                </button>
              </div>
            </Card>

            <Card
              title="Variants"
              subtitle={`${variants.length} sizes • ${totalStock} total units`}
              action={
                <button
                  type="button"
                  onClick={addVariant}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                >
                  <Plus className="h-3.5 w-3.5" /> Add variant
                </button>
              }
            >
              <div className="space-y-2">
                {variants.map((v, i) => (
                  <div key={i} className="grid grid-cols-[80px_1fr_140px_40px] items-center gap-3 rounded-xl border border-border bg-background p-2.5">
                    <input
                      value={v.size}
                      onChange={(e) => updateVariant(i, { size: e.target.value })}
                      className="input h-9 text-center font-bold"
                    />
                    <input
                      value={v.sku}
                      onChange={(e) => updateVariant(i, { sku: e.target.value })}
                      placeholder="Variant SKU"
                      className="input h-9 font-mono text-xs"
                    />
                    <div className="flex items-center gap-1 rounded-lg border border-border bg-card">
                      <button
                        type="button"
                        onClick={() => updateVariant(i, { stock_quantity: Math.max(0, v.stock_quantity - 1) })}
                        className="grid h-9 w-9 place-items-center text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <input
                        type="number"
                        min={0}
                        value={v.stock_quantity}
                        onChange={(e) => updateVariant(i, { stock_quantity: Math.max(0, Number(e.target.value)) })}
                        className="h-9 w-full bg-transparent text-center text-sm font-semibold outline-none focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => updateVariant(i, { stock_quantity: v.stock_quantity + 1 })}
                        className="grid h-9 w-9 place-items-center text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVariant(i)}
                      className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Remove variant"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {variants.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                    No variants yet. Add one to start tracking size inventory.
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <div className="sticky top-20 space-y-6">
              <Card title="Preview">
                <div className="overflow-hidden rounded-xl border border-border bg-background">
                  <div className="grid h-32 place-items-center bg-gradient-to-br from-muted to-muted/40 text-5xl">
                    {images[0] ? <img src={images[0].image_path} alt={name} className="h-full w-full object-cover" /> : "🎽"}
                  </div>
                  <div className="p-3">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{category}</div>
                    <div className="mt-0.5 line-clamp-2 text-sm font-semibold">{name || "Untitled product"}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{team}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-base font-bold">KES {price}</div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${status === "Active" ? "bg-success/10 text-success" : status === "Draft" ? "bg-muted text-muted-foreground" : status === "Out of Stock" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                        {status}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Danger zone">
                <p className="mb-3 text-xs text-muted-foreground">
                  Deleting a product removes it from the catalog and cannot be undone.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Delete this product? This cannot be undone.")) {
                      router.push("/dashboard/products" );
                    }
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" /> Delete product
                </button>
              </Card>
            </div>
          </div>
        </div>
      </form>

      
    </>
  );
}

  


