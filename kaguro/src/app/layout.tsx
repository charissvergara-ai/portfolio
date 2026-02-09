import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavigationProgress from "@/components/NavigationProgress";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "KaGuro Ph | Innovative Educational Materials",
  description:
    "A community of teachers who share, sell, and discover quality teaching materials designed for the classroom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <NavigationProgress />
            </Suspense>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
