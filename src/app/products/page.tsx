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

  const openCustomizationModal = (productId: string) => {
    setCustomizationModal({ isOpen: true, productId })
  }

  const closeCustomizationModal = () => {
    setCustomizationModal({ isOpen: false, productId: null })
    setCustomization({ toppings: [], message: "" })
  }

  const handleCustomization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the customization data to your backend
    console.log("Customization for product", customizationModal.productId, ":", customization)
    closeCustomizationModal()
  }

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => {
          const imageUrl = product.image.startsWith("/") ? product.image : `/${product.image}`

          return (
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
                  src={imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button className="bg-white text-pink-600 p-2 rounded-full mr-2" whileHover={{ scale: 1.1 }}>
                    <ShoppingCart size={20} />
                  </motion.button>
                  <motion.button className="bg-white text-pink-600 p-2 rounded-full" whileHover={{ scale: 1.1 }}>
                    <Heart size={20} />
                  </motion.button>
                </div>
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
              <div className="flex justify-between">
                <motion.button
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex-grow mr-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openCustomizationModal(product._id)}
                >
                  <Edit size={16} />
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {customizationModal.isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-2xl font-bold mb-4">Customize Your Cupcake</h3>
              <form onSubmit={handleCustomization}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Toppings</label>
                  <div className="space-y-2">
                    {["Sprinkles", "Chocolate Chips", "Nuts", "Fruit"].map((topping) => (
                      <label key={topping} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-pink-600"
                          checked={customization.toppings.includes(topping)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCustomization((prev) => ({ ...prev, toppings: [...prev.toppings, topping] }))
                            } else {
                              setCustomization((prev) => ({
                                ...prev,
                                toppings: prev.toppings.filter((t) => t !== topping),
                              }))
                            }
                          }}
                        />
                        <span className="ml-2">{topping}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Message
                  </label>
                  <input
                    type="text"
                    id="message"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                    placeholder="Happy Birthday!"
                    value={customization.message}
                    onChange={(e) => setCustomization((prev) => ({ ...prev, message: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    onClick={closeCustomizationModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                  >
                    Apply Customization
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

