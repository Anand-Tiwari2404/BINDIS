import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { CartProvider } from "./cart/CartContext"; // Import CartProvider
import { AuthProvider } from "./auth/AuthContext"; // Import AuthProvider
import WhatsAppFloat from "@/components/whatsapp-float"; // Import WhatsApp Float

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bindi's Cupcakery",
  description: "Vegetarian, eggless bakery offering homemade, preservative-free desserts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider> {/* Wrap everything inside AuthProvider */}
          <CartProvider> {/* CartProvider inside AuthProvider */}
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <WhatsAppFloat /> {/* Ensure WhatsApp Floating Icon is always visible */}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
