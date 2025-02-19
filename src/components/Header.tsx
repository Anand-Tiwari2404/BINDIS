"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, X } from "lucide-react"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [allProducts, setAllProducts] = useState<any[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        setAllProducts(data.products)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([])
      return
    }

    const results = allProducts.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

    setFilteredProducts(results)
  }, [searchQuery, allProducts])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setSearchQuery("")
      setFilteredProducts([])
    }
  }

  return (
    <header className="bg-pink-100 shadow-md relative z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/bindis_logo.jpg" alt="Bindi's Cupcakery Logo" width={150} height={50} priority />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-800 hover:text-pink-600">
            Home
          </Link>
          <Link href="/products" className="text-gray-800 hover:text-pink-600">
            Products
          </Link>
          <Link href="/gallery" className="text-gray-800 hover:text-pink-600">
            Gallery
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-pink-600">
            Contact
          </Link>
          <Link href="/review" className="text-gray-800 hover:text-pink-600">
            Review
          </Link>
        </nav>

        {/* Right-side icons: Search & Cart */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <button
            onClick={toggleSearch}
            aria-label="Search"
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
          >
            <Search className="h-6 w-6 text-gray-700 transition-transform duration-300 hover:scale-110" />
          </button>

          {/* Shopping Cart */}
          <div className="relative">
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

      {/* Full-width Search Overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-white bg-opacity-95 transition-all duration-300 ease-in-out ${
          isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center h-full">
          <div className="w-full max-w-3xl mx-auto relative">
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search for delicious treats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 text-xl text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-pink-500 transition-all"
            />
            <button
              onClick={toggleSearch}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2"
              aria-label="Close search"
            >
              <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        {filteredProducts.length > 0 && (
          <div className="container mx-auto px-6 mt-4">
            <ul className="bg-white rounded-lg shadow-lg max-h-96 overflow-auto">
              {filteredProducts.map((product) => (
                <li key={product._id} className="border-b border-gray-200 last:border-b-0">
                  <Link href={`/products/${product._id}`} onClick={toggleSearch}>
                    <span className="block p-4 hover:bg-pink-50 transition-colors">{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

