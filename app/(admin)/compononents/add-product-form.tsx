"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  ArrowLeft, Upload, X, Plus, Trash2, Save, Eye, Image as ImageIcon,
  Package, Tag, FileText, Layers, Star, CheckCircle2, GripVertical, Info,
} from "lucide-react";
import AdminShell  from "@/app/(admin)/compononents/admin/AdminShell";

const CATEGORIES = [
  "Club Jerseys",
  "National Teams",
  "Retro",
  "Equipment",
  "Training Wear",
  "Accessories",
] as const;

const BRANDS = ["Adidas", "Nike", "Puma", "Umbro", "New Balance", "Kappa"] as const;

const SIZE_PRESETS = ["XS", "S", "M", "L", "XL", "XXL"];

type Variant = { id: string; size: string; quantity: number; sku?: string };
type ImageItem = { id: string; url: string; name: string };

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function AddProductForm() {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [team, setTeam] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Draft">("Draft");
  const [images, setImages] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([
    { id: uid(), size: "M", quantity: 0 },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalStock = variants.reduce((s, v) => s + (Number(v.quantity) || 0), 0);
  const progress = [
    name.trim().length > 0,
    category.length > 0,
    price.length > 0,
    description.trim().length >= 20,
    images.length > 0,
    variants.some((v) => v.size && v.quantity > 0),
  ];
  const completion = Math.round((progress.filter(Boolean).length / progress.length) * 100);

  const handleClick = (destination:string) => {
      router.push(destination);
  }

  // function handleFiles(files: FileList | null) {
  //   if (!files) return;
  //   const next: ImageItem[] = [];
  //   Array.from(files).forEach((f) => {
  //     if (!f.type.startsWith("image/")) return;
  //     next.push({ id: uid(), url: URL.createObjectURL(f), name: f.name });
  //   });
  //   setImages((prev) => [...prev, ...next]);
  // }

  
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((i) => i.id !== id));
  }

  function makePrimary(id: string) {
    setImages((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx <= 0) return prev;
      const copy = [...prev];
      const [it] = copy.splice(idx, 1);
      copy.unshift(it);
      return copy;
    });
  }

  function addVariant(size?: string) {
    setVariants((v) => [...v, { id: uid(), size: size || "", quantity: 0 }]);
  }
  function updateVariant(id: string, patch: Partial<Variant>) {
    setVariants((v) => v.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }
  function removeVariant(id: string) {
    setVariants((v) => (v.length === 1 ? v : v.filter((it) => it.id !== id)));
  }
  function addAllSizes() {
    const existing = new Set(variants.map((v) => v.size));
    const toAdd = SIZE_PRESETS.filter((s) => !existing.has(s)).map((s) => ({
      id: uid(),
      size: s,
      quantity: 0,
    }));
    setVariants((v) => [...v.filter((it) => it.size), ...toAdd]);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Product name is required";
    if (!category) e.category = "Choose a category";
    if (!price || Number(price) <= 0) e.price = "Enter a valid price";
    if (description.trim().length < 20) e.description = "Add at least 20 characters";
    if (images.length === 0) e.images = "Upload at least one image";
    if (!variants.some((v) => v.size && v.quantity > 0))
      e.variants = "Add at least one variant with stock";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handleSave = async (
  e: React.FormEvent<HTMLFormElement>
) => {
 

  if (!validate()) return;

  try {
    const formData = new FormData();

    // Product Details
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("team", team);
    formData.append("sku", sku);
    

    // Variants
    formData.set(
      "variants",
      JSON.stringify(
        variants.map((v) => ({
          size: v.size,
          quantity: v.quantity,
          sku: v.sku,
        }))
      )
    );

    // Images
    images.forEach((file) => formData.set("image_paths", file));

    

    const response = await fetch(
      "http://localhost:5000/api/v1/products",
      {
        method: "POST",
        body: formData,
      }
    );

    

    const data = await response.json();

    if (!response.ok) {
      console.log(data.errors);
      return;
    }

   

    router.push("/dashboard/products")

  } catch (err) {
    console.error(err);
  }
};

  return (
    <AdminShell>
      {/* Header */}
      
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        
        <div className="min-w-0">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to products
          </Link>
          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Add New Product
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the details below to publish a new item to the TitanSports catalog.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Cancel
          </Link>
          <button
            onClick={() => handleSave(false)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            <Save className="h-4 w-4" /> Save draft
          </button>
          <button
            onClick={() => handleSave(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_6px_20px_-6px] shadow-primary/60 transition hover:brightness-110"
          >
            <CheckCircle2 className="h-4 w-4" /> Publish product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main column */}
        <div className="space-y-6">
          {/* Basic info */}
          <Section
            icon={FileText}
            title="Product details"
            description="Give customers the essentials — what it is and why it's great."
          >
            <Field
              label="Product name"
              hint="Shown across the store and search results."
              required
              error={errors.name}
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Arsenal Home Jersey 25/26"
                className={inputCls(!!errors.name)}
                maxLength={120}
              />
              <Counter now={name.length} max={120} />
            </Field>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Category" required error={errors.category}>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={selectCls(!!errors.category)}
                  >
                    <option value="">Select a category…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <Caret />
                </div>
              </Field>

              <Field label="TEAM" hint="Auto-generated if left blank.">
                <input
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  placeholder="ARS-H-2526"
                  className={`${inputCls(false)} font-mono`}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Price (KES)" required error={errors.price}>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                    KES
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="4200"
                    className={`${inputCls(!!errors.price)} pl-14`}
                  />
                </div>
              </Field>

              <Field label="SKU" hint="Auto-generated if left blank.">
                <input
                  value={team}
                  onChange={(e) => setSku(e.target.value.toUpperCase())}
                  placeholder="ARS-H-2526"
                  className={`${inputCls(false)} font-mono`}
                />
              </Field>
            </div>

            <Field
              label="Description"
              hint="Describe the fabric, fit, and any unique features. Min. 20 characters."
              required
              error={errors.description}
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="A premium replica jersey crafted from breathable AEROREADY fabric, featuring embroidered club crest and moisture-wicking finish for match-day comfort…"
                className={`${inputCls(!!errors.description)} min-h-32 resize-y py-3 leading-relaxed`}
                maxLength={2000}
              />
              <Counter now={description.length} max={2000} />
            </Field>
          </Section>

          {/* Images */}
          <Section
            icon={ImageIcon}
            title="Product images"
            description="The first image becomes the cover. Drag to reorder or click to make primary."
            error={errors.images}
          >
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInput.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
                dragOver
                  ? "border-primary bg-primary/5"
                  : errors.images
                  ? "border-destructive/50 bg-destructive/5"
                  : "border-border bg-muted/30 hover:border-primary hover:bg-primary/5"
              }`}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Upload className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">
                Drop images here or <span className="text-primary">browse files</span>
              </div>
              <div className="text-xs text-muted-foreground">
                PNG, JPG or WEBP · Up to 5MB each · Recommended 1200×1200
              </div>
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-background"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                    {idx === 0 && (
                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                        <Star className="h-3 w-3 fill-current" /> Cover
                      </span>
                    )}
                    <div className="absolute inset-0 flex items-end justify-between gap-1 bg-gradient-to-t from-black/70 via-transparent to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                      {idx !== 0 && (
                        <button
                          onClick={() => makePrimary(img.id)}
                          title="Make primary"
                          className="rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold text-slate-900 hover:bg-white"
                        >
                          Set cover
                        </button>
                      )}
                      <button
                        onClick={() => removeImage(img.id)}
                        title="Remove"
                        className="ml-auto grid h-7 w-7 place-items-center rounded-lg bg-destructive text-destructive-foreground hover:brightness-110"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => fileInput.current?.click()}
                  className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-border text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            )}
          </Section>

          {/* Variants */}
          <Section
            icon={Layers}
            title="Size variants & stock"
            description="Add each size you'll sell along with the quantity available."
            error={errors.variants}
            action={
              <button
                onClick={addAllSizes}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
              >
                <Plus className="h-3.5 w-3.5" /> Add all sizes
              </button>
            }
          >
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="grid grid-cols-[24px_1fr_1fr_1fr_36px] items-center gap-3 border-b border-border bg-muted/40 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <span />
                <span>Size</span>
                <span>Quantity</span>
                <span>Variant SKU</span>
                <span />
              </div>
              {variants.map((v) => (
                <div
                  key={v.id}
                  className="grid grid-cols-[24px_1fr_1fr_1fr_36px] items-center gap-3 border-b border-border px-4 py-3 last:border-0"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                  <div className="flex flex-wrap gap-1">
                    {SIZE_PRESETS.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateVariant(v.id, { size: s })}
                        className={`h-8 min-w-9 rounded-lg border px-2 text-xs font-bold transition ${
                          v.size === s
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center rounded-xl border border-border bg-background">
                    <button
                      onClick={() => updateVariant(v.id, { quantity: Math.max(0, (v.quantity || 0) - 1) })}
                      className="grid h-10 w-9 place-items-center text-muted-foreground hover:bg-muted"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={0}
                      value={v.quantity}
                      onChange={(e) => updateVariant(v.id, { quantity: Math.max(0, Number(e.target.value) || 0) })}
                      className="h-10 w-full border-0 bg-transparent text-center text-sm font-semibold outline-none"
                    />
                    <button
                      onClick={() => updateVariant(v.id, { quantity: (v.quantity || 0) + 1 })}
                      className="grid h-10 w-9 place-items-center text-muted-foreground hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                  <input
                    value={v.sku || ""}
                    onChange={(e) => updateVariant(v.id, { sku: e.target.value.toUpperCase() })}
                    placeholder="Auto"
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 font-mono text-xs outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                  <button
                    onClick={() => removeVariant(v.id)}
                    disabled={variants.length === 1}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-40"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => addVariant()}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-2.5 text-sm font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
            >
              <Plus className="h-4 w-4" /> Add another variant
            </button>
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
          {/* Completion */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Completion
              </div>
              <div className="text-sm font-bold text-primary">{completion}%</div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <CheckRow ok={progress[0]}>Product name</CheckRow>
              <CheckRow ok={progress[1]}>Category</CheckRow>
              <CheckRow ok={progress[2]}>Price</CheckRow>
              <CheckRow ok={progress[3]}>Description (20+ chars)</CheckRow>
              <CheckRow ok={progress[4]}>At least one image</CheckRow>
              <CheckRow ok={progress[5]}>Variant with stock</CheckRow>
            </ul>
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Live preview
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-background">
              <div className="grid aspect-square place-items-center bg-gradient-to-br from-muted to-muted/40">
                {images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={images[0].url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <Package className="h-10 w-10 text-muted-foreground/40" />
                )}
              </div>
              <div className="space-y-1 p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {category || "Category"}
                </div>
                <div className="line-clamp-1 text-sm font-semibold">
                  {name || "Product name"}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="text-base font-bold">
                    {price ? `KES ${Number(price).toLocaleString()}` : "KES —"}
                  </div>
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                    {totalStock} in stock
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Visibility
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(["Draft", "Active"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    status === s
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {status === "Active"
                ? "This product will be visible to customers immediately after publishing."
                : "Drafts are hidden from the storefront and can be edited later."}
            </p>
          </div>
        </aside>
      </div>
      
    </AdminShell>
  );
}

/* ---------- helpers ---------- */

const inputCls = (err: boolean) =>
  `h-11 w-full rounded-xl border bg-background px-3.5 text-sm outline-none transition placeholder:text-muted-foreground focus:ring-4 ${
    err
      ? "border-destructive focus:border-destructive focus:ring-destructive/10"
      : "border-border focus:border-primary focus:ring-primary/10"
  }`;

const selectCls = (err: boolean) =>
  `h-11 w-full appearance-none rounded-xl border bg-background pl-3.5 pr-9 text-sm outline-none transition focus:ring-4 ${
    err
      ? "border-destructive focus:border-destructive focus:ring-destructive/10"
      : "border-border focus:border-primary focus:ring-primary/10"
  }`;

function Caret() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Section({
  icon: Icon, title, description, children, error, action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  children: React.ReactNode;
  error?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
      <header className="flex items-start justify-between gap-3 border-b border-border p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight md:text-base">{title}</h2>
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {action}
      </header>
      <div className="space-y-5 p-5">
        {children}
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs font-medium text-destructive">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}

function Field({
  label, hint, required, error, children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label className="text-sm font-semibold">
          {label}
          {required && <span className="ml-1 text-primary">*</span>}
        </label>
        {hint && !error && (
          <span className="text-[11px] text-muted-foreground">{hint}</span>
        )}
      </div>
      {children}
      {error && (
        <div className="mt-1.5 text-xs font-medium text-destructive">{error}</div>
      )}
    </div>
  );
}

function Counter({ now, max }: { now: number; max: number }) {
  return (
    <div className="mt-1 text-right text-[11px] text-muted-foreground">
      {now} / {max}
    </div>
  );
}

function CheckRow({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className={`grid h-4 w-4 place-items-center rounded-full ${
          ok ? "bg-success text-white" : "border border-border bg-background"
        }`}
      >
        {ok && <CheckCircle2 className="h-3 w-3" />}
      </span>
      <span className={ok ? "text-foreground" : "text-muted-foreground"}>{children}</span>
    </li>
  );
}
