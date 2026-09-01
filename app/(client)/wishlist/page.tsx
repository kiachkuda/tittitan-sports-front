
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Loader2,
  PackageOpen,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/v1/wishlist`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load wishlist"
        );
      }

      setWishlist(data.data || []);
    } catch (error:any) {
      console.error("Wishlist error:", error);

      setError(
        error.message || "Failed to load your wishlist"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId:number, wishlistId:any) => {
    try {
      setRemovingId(wishlistId);

      const response = await fetch(
        `${API_URL}/wishlist/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to remove item"
        );
      }

      setWishlist((current) =>
        current.filter(
          (item:any) => item?.wishlist_id !== wishlistId
        )
      );
    } catch (error:any) {
      console.error("Remove wishlist error:", error);

      alert(
        error.message || "Failed to remove item from wishlist"
      );
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-[#071A33] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/profile"
            className="mb-5 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500">
              <Heart
                size={25}
                className="fill-white"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                My Wishlist
              </h1>

              <p className="mt-1 text-sm text-slate-300">
                Your favourite Titan Sports products
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Loading */}
        {loading && <WishlistLoading />}

        {/* Error */}
        {!loading && error && (
          <ErrorState
            message={error}
            onRetry={fetchWishlist}
          />
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          wishlist.length === 0 && <EmptyWishlist />}

        {/* Wishlist */}
        {!loading &&
          !error &&
          wishlist.length > 0 && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Saved Products
                  </h2>

                  <p className="text-sm text-slate-500">
                    {wishlist.length}{" "}
                    {wishlist.length === 1
                      ? "item"
                      : "items"}{" "}
                    saved
                  </p>
                </div>

                <Link
                  href="/products"
                  className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {wishlist.map((item:any) => (
                  <WishlistCard
                    key={item.wishlist_id}
                    item={item}
                    removing={
                      removingId === item.wishlist_id
                    }
                    onRemove={removeFromWishlist}
                  />
                ))}
              </div>
            </>
          )}
      </div>
    </main>
  );
}

/* =========================================================
   WISHLIST CARD
========================================================= */

function WishlistCard(props:{item:any, removing : boolean, onRemove:(productId:number, wishlistId:any) => void})  {
  const product = props.item.product;

  if (!product) {
    return null;
  }

  /*
   * Adjust these fields if your Product model uses
   * different names.
   */
  const image =
    product.image ||
    product.image_url ||
    product.images?.[0] ||
    "/images/product-placeholder.png";

  const price = Number(product.price || 0);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Link href={`/products/${product.product_id}`}>
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Remove */}
        <button
          type="button"
          onClick={() =>
            props.onRemove(
              product.product_id,
              props.item.wishlist_id
            )
          }
          disabled={props.removing}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm backdrop-blur transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Remove from wishlist"
        >
          {props.removing ? (
            <Loader2
              size={17}
              className="animate-spin"
            />
          ) : (
            <Trash2 size={17} />
          )}
        </button>

        {/* Wishlist indicator */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-orange-600 shadow-sm backdrop-blur">
          <Heart
            size={12}
            className="fill-orange-500"
          />
          Saved
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <Link
          href={`/products/${product.product_id}`}
          className="block"
        >
          <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold text-slate-900 transition hover:text-orange-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-base font-bold text-slate-900">
            KSh {price.toLocaleString()}
          </p>
        </div>

        {/* Add to cart */}
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   LOADING
========================================================= */

function WishlistLoading() {
  return (
    <>
      <div className="mb-6">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-24 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="aspect-square animate-pulse bg-slate-200" />

            <div className="space-y-3 p-4">
              <div className="h-4 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
              <div className="h-10 animate-pulse rounded-xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyWishlist() {
  return (
    <div className="flex min-h-[450px] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
          <PackageOpen
            size={36}
            className="text-orange-500"
          />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          Your wishlist is empty
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Save your favourite jerseys, football accessories,
          tracksuits and other sports products here so you
          can easily find them later.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <ShoppingCart size={17} />
          Start Shopping
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   ERROR STATE
========================================================= */

function ErrorState(props:{message:string, onRetry:() => void}) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <Heart
            size={28}
            className="text-red-500"
          />
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-900">
          Unable to load wishlist
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {props.message}
        </p>

        <button
          onClick={props.onRetry}
          className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}


