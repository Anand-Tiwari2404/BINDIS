import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { CartProvider } from "./cart/CartContext"; // Import CartProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bindi's Cupcakery",
  description: "Vegetarian, eggless bakery offering homemade, preservative-free desserts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <CartProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}