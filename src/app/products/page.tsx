"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ShoppingCart, Heart, Plus, Minus, Edit } from "lucide-react"
import { useCart } from "../cart/CartContext";

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
}

interface CustomizationOptions {
  toppings: string[]
  message: string
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart();
  const [error, setError] = useState("")
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [customizationModal, setCustomizationModal] = useState<{ isOpen: boolean; productId: string | null }>({
    isOpen: false,
    productId: null,
  })
  const [customization, setCustomization] = useState<CustomizationOptions>({ toppings: [], message: "" })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
        const data = await res.json()
        if (!data.products || !Array.isArray(data.products)) throw new Error("Invalid API response format")
        setProducts(data.products)
        const initialQuantities = data.products.reduce((acc: { [key: string]: number }, product: Product) => {
          acc[product._id] = 1
          return acc
        }, {})
        setQuantities(initialQuantities)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError("Failed to load products. Please try again.")
      }
    }
    fetchProducts()
  }, [])

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change),
    }))
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      qty: quantities[product._id] || 1,
      image: product.image,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-r from-pink-100 to-purple-100">
      <motion.h2
        className="text-5xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🧁 Cupcake Paradise
      </motion.h2>

      {error && (
        <motion.p
          className="text-red-500 text-center font-semibold bg-red-100 p-3 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all group"
            whileHover={{ scale: 1.05, rotate: 1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-xl mb-4">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                priority={index < 4}
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                ₹{product.price}
              </span>
              <div className="flex items-center">
                <motion.button
                  className="bg-pink-100 text-pink-600 p-1 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(product._id, -1)}
                >
                  <Minus size={16} />
                </motion.button>
                <span className="mx-2 font-semibold">{quantities[product._id] || 1}</span>
                <motion.button
                  className="bg-pink-100 text-pink-600 p-1 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(product._id, 1)}
                >
                  <Plus size={16} />
                </motion.button>
              </div>
            </div>
            <motion.button
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex-grow mr-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
