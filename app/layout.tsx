import type { Metadata } from "next";

import "./globals.css";
import { AuthProvider } from "@/contexts/AuthProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Titan Sport KE",
  description: "Designed and Developed by KiachKuda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">
         <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
