"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState<number[]>([]); // Placeholder cart items

  return (
    <header className="bg-pink-100 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/bindis_logo.jpg" alt="Bindi's Cupcakery Logo" width={150} height={50} priority />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-800 hover:text-pink-600">Home</Link>
          <Link href="/products" className="text-gray-800 hover:text-pink-600">Products</Link>
          <Link href="/gallery" className="text-gray-800 hover:text-pink-600">Gallery</Link>
          <Link href="/contact" className="text-gray-800 hover:text-pink-600">Contact</Link>
          <Link href="/review" className="text-gray-800 hover:text-pink-600">Review</Link>
        </nav>

        {/* Right-side icons: Search & Cart */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <div className="relative">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            {isSearchOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden">
                <input type="search" placeholder="Search..." className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            )}
          </div>

          {/* Shopping Cart */}
          <div className="relative">
            <button aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
