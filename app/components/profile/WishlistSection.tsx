import { Heart } from "lucide-react";
import { SectionHeader } from "./PersonalInformation";
import Link from "next/link";

export function WishlistSection(props: {wishlist:any[]}) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Wishlist"
        description="Products you've saved for later."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500">
          <Heart size={28} />
        </div>

        <h3 className="mt-4 font-semibold text-slate-900">
          Your wishlist
        </h3>
        </>
        
        <>
        <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
          Save your favourite jerseys, football accessories and
          sportswear so you can find them easily later.
        </p>

        <Link href="/products">
          <button className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
            Browse Products
          </button>
        </Link>
        </>
        
      </div>
    </div>
  );
}
