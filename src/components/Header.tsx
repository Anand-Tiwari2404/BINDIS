"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState<number[]>([]); // Placeholder cart items
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  // Fetch products from API when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setAllProducts(data.products); // Set fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Update filtered products when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(results);
  }, [searchQuery, allProducts]);

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
              className={`absolute right-0 mt-2 w-72 transform transition-all duration-300 ease-in-out z-50
        ${isSearchOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
            >
              <div className="bg-white backdrop-blur-md bg-opacity-80 shadow-xl rounded-lg p-2 border border-gray-300">
                <input
                  type="search"
                  placeholder="Search for delicious treats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 text-gray-700 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />

                {/* Search Results */}
                {filteredProducts.length > 0 && (
                  <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-auto">
                    {filteredProducts.map((product) => (
                      <li key={product._id} className="p-2 hover:bg-pink-100 cursor-pointer">
                        <Link href={`/products/${product._id}`}>
                          <span className="block text-gray-800">{product.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="relative">
            {/* Cart Button */}
            <Link href="/cart">
              <button
                aria-label="Shopping Cart"
                className="relative flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all shadow-md"
              >
                <ShoppingCart className="h-6 w-6 text-gray-700" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
