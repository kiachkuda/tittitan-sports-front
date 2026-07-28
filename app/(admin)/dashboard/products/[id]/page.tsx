"use client"
import Link from "next/link";
import  AdminShell  from "@/app/(admin)/compononents/admin/AdminShell";
import { SingleProduct} from "@/app/types/interface";
import {
  ArrowLeft, Pencil, Copy, Trash2, Share2, Star, Package, TrendingUp,
  DollarSign, ShoppingBag, Warehouse, ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/app/lib/product";


function NotFoundView() {
  return (
    <AdminShell>
      <div className="grid place-items-center py-24 text-center">
        <div className="text-5xl">🔎</div>
        <h1 className="mt-4 text-2xl font-bold">Product not found</h1>
        <p className="mt-1 text-sm text-muted-foreground">This product may have been removed or archived.</p>
        <Link href="/products" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to products
        </Link>
      </div>
    </AdminShell>
  );
}

export default function ProductViewPage() {

  const { id } = useParams();
  const [product, setProduct] = useState<SingleProduct>({} as SingleProduct);
  const thumbs = product.product_image?.map((img) => <img key={img.image_path} src={img.image_path} alt={product.name} className="h-full w-full object-cover " />) ?? [];
  const [selectedImg, setSelectedImg] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      let data = await getProductById(Number(id));
      setProduct(data);
      console.log("Fetched product:", data);
    };
    fetchProduct();
  }, [id]);
  

  
  return (
    <>
      {/* Breadcrumb + actions */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/products" className="hover:text-foreground">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.product_id}</span>
          </nav>
          <h1 className="mt-1 truncate text-2xl font-bold tracking-tight md:text-3xl">{product.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-mono text-xs">{product.sku}</span>
            <span>•</span>
            <span>{product.team}</span>
            {/* <span>•</span>
            <StatusBadge status={product.status} /> */}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/products" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-semibold hover:bg-muted">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-semibold hover:bg-muted">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-semibold hover:bg-muted">
            <Copy className="h-4 w-4" /> Duplicate
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-destructive/30 bg-card px-3.5 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" /> Delete
          </button>
          <Link
            href={`/dashboard/products/${product.product_id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_6px_20px_-6px] shadow-primary/60 hover:brightness-110"
          >
            <Pencil className="h-4 w-4" /> Edit product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: gallery + description + variants */}
        <div className="space-y-6 lg:col-span-2">
          {/* Gallery */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
            <div className="grid aspect-[4/3] place-items-center rounded-xl bg-gradient-to-br from-muted to-muted/40 text-[8rem]">
              {thumbs[selectedImg]}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {thumbs.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`grid aspect-square place-items-center rounded-xl border-2 bg-gradient-to-br from-muted to-muted/40 text-3xl transition ${
                    selectedImg === i ? "border-primary" : "border-transparent hover:border-border"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <Card title="Description">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </Card>

          {/* Variants */}
          <Card title="Variants & Inventory" subtitle={`${product.product_variants?.length ?? 0} sizes `}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 font-semibold">Size</th>
                    <th className="pb-3 font-semibold">SKU</th>
                    <th className="pb-3 font-semibold">Quantity</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(product.product_variants ?? []).map((v) => (
                    <tr key={v.size} className="border-b border-border last:border-0">
                      <td className="py-3">
                        <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-muted font-bold">{v.size}</span>
                      </td>
                      <td className="py-3 font-mono text-xs text-muted-foreground">{v.sku}</td>
                      <td className="py-3 font-semibold">{v.stock_quantity}</td>
                      <td className="py-3">
                        <StockPill n={v.stock_quantity} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right: sidebar */}
        <div className="space-y-6">
          {/* Price + rating */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Retail Price</div>
            <div className="mt-1 text-3xl font-bold tracking-tight">KES {product.price}</div>
            {/* <div className="mt-3 flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-muted-foreground">/ 5.0 rating</span>
            </div> */}
          </div>

          {/* Performance */}
          {/* <Card title="Performance">
            <ul className="space-y-3 text-sm">
              <MetricRow icon={ShoppingBag} label="Units sold" value={product.sold.toLocaleString()} />
              <MetricRow icon={DollarSign} label="Revenue" value={`KES ${revenue.toLocaleString()}`} />
              <MetricRow icon={Warehouse} label="In stock" value={totalStock.toLocaleString()} />
              <MetricRow icon={TrendingUp} label="Sell-through" value={`${Math.round((product.sold / Math.max(1, product.sold + totalStock)) * 100)}%`} />
            </ul>
          </Card> */}

          {/* Details */}
          <Card title="Details">
            <ul className="space-y-3 text-sm">
              <DetailRow label="Product ID" value={<span className="font-mono text-xs">{product.product_id}</span>} />
              <DetailRow label="SKU" value={<span className="font-mono text-xs">{product.sku}</span>} />
              <DetailRow label="Category" value={<span className="rounded-md bg-muted px-2 py-0.5 text-xs">{product.category}</span>} />
              <DetailRow label="Team" value={product.team} />
              <DetailRow label="Variants" value={`${product.product_variants?.length ?? 0} sizes`} />
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}

/* ---------- helpers ---------- */

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-bold">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function MetricRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <li className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" /> {label}
      </span>
      <span className="font-semibold">{value}</span>
    </li>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value}</span>
    </li>
  );
}

function StockPill({ n }: { n: number }) {
  const tone =
    n === 0 ? "bg-destructive/10 text-destructive"
    : n <= 20 ? "bg-warning/20 text-warning-foreground"
    : "bg-success/10 text-success";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {n === 0 ? "Out" : n <= 20 ? "Low" : "Healthy"}
    </span>
  );
}

