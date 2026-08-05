"use client"
import { type ReactNode, useEffect, useState } from "react";
import { AppSidebar } from "../compononents/admin/AppSidebar";
import { TopNav } from "../compononents/admin/TopNav";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
   const auth = useAuth();
   const router = useRouter();

   
   const loading = auth.loading;
   const authUser = auth.user;

   const [user, setUser] = useState();

    useEffect(()=>{
    if(!authUser && !loading || authUser?.role !== "admin") {
      router.push('/login')
      console.log(authUser)
    }
    setUser(auth.user);
  })

  return (
    <div className="flex min-h-dvh w-full bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <div className="sticky top-0 h-dvh">
          <AppSidebar user={user} open={open} />
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 animate-slide-in-right">
            <AppSidebar user={user} open={true} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav
        user={user}
          onToggleSidebar={() => {
            if (window.matchMedia("(min-width: 768px)").matches) setOpen((o) => !o);
            else setMobileOpen(true);
          }}
        />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
