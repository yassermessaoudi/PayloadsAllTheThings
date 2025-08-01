import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SmartCommerce - Shop Intelligently. Expand Infinitely.",
  description: "Experience the future of e-commerce with our intelligent platform. Discover premium products with advanced features and seamless shopping experience.",
  keywords: ["e-commerce", "smart shopping", "online store", "premium products", "technology"],
  authors: [{ name: "SmartCommerce Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#14b8a6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#14b8a6" />
      </head>
      <body className="min-h-screen bg-dark-gradient text-white antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-cyber-violet-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-deep-mint-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-charcoal-gold-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: "4s" }}></div>
        </div>
      </body>
    </html>
  );
}
