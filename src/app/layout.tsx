import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/layout/header";
import Footer from "@/Components/layout/footer";
import { ProductsProvider } from "@/contexts/ProductsContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Update Wear",
  description: "A store for online shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProductsProvider>
          <Header />
          {children}
          <Footer />
        </ProductsProvider>
      </body>
    </html>
  );
}
