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
    <button
      onClick={() => setIsSearchOpen(!isSearchOpen)}
      aria-label="Search"
      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
    >
      <Search className="h-6 w-6 text-gray-700 transition-transform duration-300 hover:scale-110" />
    </button>

    {/* Animated Search Bar */}
    <div
      className={`absolute right-0 mt-2 w-72 transform transition-all duration-300 ease-in-out 
        ${isSearchOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
    >
      <div className="bg-white backdrop-blur-md bg-opacity-80 shadow-xl rounded-lg p-2 border border-gray-300">
        <input
          type="search"
          placeholder="Search for delicious treats..."
          className="w-full p-3 text-gray-700 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
        />
      </div>
    </div>
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
