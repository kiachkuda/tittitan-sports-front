'use client'

import { deleteProductById, getAllProducts } from "@/app/lib/product";
import { Product } from "@/app/types/interface";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { MenuItem, RowActions } from "../RowAction";
import { ArrowUpDown, Copy, Eye, Pencil, Trash2 } from "lucide-react";



export function TableView({
    rows,
}: {
    rows: Product[];
}) {

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                        {/* <th className="w-10 px-5 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="h-4 w-4 rounded border-border accent-primary"
              />
            </th> */}
                        <Th>Product <ArrowUpDown className="h-3 w-3" /></Th>
                        <Th>SKU</Th>
                        <Th>Category</Th>
                        <Th>Price</Th>
                        <Th>Action</Th>
                        {/* <Th>Stock</Th>
            <Th>Sold</Th>
            <Th>Rating</Th>
            <Th>Status</Th> */}
                        <th className="px-5 py-3" />
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 && (
                        <tr>
                            <td colSpan={10} className="px-5 py-16 text-center text-sm text-muted-foreground">
                                No products match your filters.
                            </td>
                        </tr>
                    )}
                    {rows.map((p) => (
                        <tr key={p.product_id} className="border-b border-border last:border-0 hover:bg-muted/30">

                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-muted to-muted/50 text-xl">
                                        {p.product_id}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate font-semibold">{p.name}</div>
                                        <div className="text-[11px] text-muted-foreground">{p.team}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{p.sku}</td>
                            <td className="px-5 py-4">
                                <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">{p.category}</span>
                            </td>
                            <td className="px-5 py-4 font-semibold">KES {p.price.toLocaleString()}</td>

                            <td className="px-2 py-4">
                                <RowActions id={p.product_id}  /></td>
                            {/* <td className="px-2 py-4"><MenuItem id={p.product_id} onButtonClick={() => deleteProductById(p.product_id)} icon={Pencil}>Edit</MenuItem> </td> */}


                            {/* <td className="px-2 py-4">
                                <button
                                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition ${"text-destructive hover:bg-destructive/10"
                                        }`}
                                    onClick={() => deleteProduct(p.product_id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    DELETE
                                </button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

async function deleteProduct(id: number) {
    if (await deleteProductById(id)) {
        window.location.href = `/dashboard/products`;
    }
}

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th className="px-5 py-3 font-semibold">
            <span className="inline-flex items-center gap-1.5">{children}</span>
        </th>
    );
}
