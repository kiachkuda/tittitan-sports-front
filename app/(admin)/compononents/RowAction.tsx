import { useEffect, useState } from "react";
import {
  Plus, Search, Filter, Download, Upload, MoreHorizontal, Pencil, Trash2,
  Copy, Eye, ChevronLeft, ChevronRight, Package, TrendingUp, AlertTriangle,
  CheckCircle2, LayoutGrid, List, ArrowUpDown, Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteProductById } from "@/app/lib/product";




export function RowActions(props: { id: number}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const token = localStorage.getItem("accessToken");

  const deleteItem = async(id:number)=>{
    await deleteProductById(id, token);
    router.push("/dashboard/products");
  }
 

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        aria-label="Actions"
        className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-100 mt-1 w-40 overflow-hidden rounded-xl border border-border bg-popover shadow-[var(--shadow-elevated)]">
          <MenuItem icon={Eye}  id={props.id} onButtonClick={()=>router.push(`/dashboard/products/${props.id}`)}>View</MenuItem>
          <MenuItem icon={Pencil}   id={props.id} onButtonClick={()=>router.push(`/dashboard/products/${props.id}/edit`)}>Edit</MenuItem>
          
          <div className="border-t border-border" />
          <MenuItem icon={Trash2} id={props.id} onButtonClick={()=>(deleteItem(props.id))} danger>Delete</MenuItem>
        </div>
      )}
    </div>
  );
}


export function MenuItem({
  icon: Icon, children, danger, onButtonClick, id
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode; danger?: boolean; onButtonClick:(id:number)=>void, id:number
}) {
  return (
    <button
      className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition ${
        danger ? "text-destructive hover:bg-destructive/10" : "hover:bg-muted"
      }`}
      onClick={() => onButtonClick(id)}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}
