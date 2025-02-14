"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "../cart/CartContext"; // Import Cart Context

const products = [
  { id: 1, name: "Brownie-Tub", category: "Brownie", image: "/Brownie_tub.jpg", price: 250 },
  { id: 2, name: "Nutella Sandwich Cookies", category: "Desserts", image: "/Nutella_Sandwich_Cookies.jpg", price: 300 },
  { id: 3, name: "Jim Jam Cookie", category: "Cake", image: "/Jim_Jam_Cookies.jpg", price: 200 },
  { id: 4, name: "Cookie Dough Brownie Cup", category: "Brownie", image: "/Cookie_Dough_Brownie_Cup.jpg", price: 280 },
  { id: 5, name: "Coconut Truffle", category: "Ice Creams", image: "/Coconut_Truffle.jpg", price: 270 },
  { id: 6, name: "Chocolate Chips Cookies", category: "Brownie", image: "/Chocolate_Chips_Cookie.jpg", price: 220 },
  { id: 7, name: "Blueberry Truffle", category: "Ice Creams", image: "/Blueberry_Truffle.jpg", price: 290 },
  { id: 8, name: "Rasmalai Truffle", category: "Ice Creams", image: "/Rasmalai_Truffle.jpg", price: 300 },
  { id: 9, name: "Donuts", category: "Desserts", image: "/Donuts.jpg", price: 260 },
  { id: 10, name: "Chilli Cheese Cookies", category: "Cookies", image: "/chilli_cheese_cookies.jpg", price: 240 },
  { id: 11, name: "Cranberry Pistachio Blondie", category: "Desserts", image: "/cranberry_pistachio_blondie.jpg", price: 310 },
  { id: 12, name: "Dark Chocolate Walnut Truffle", category: "Ice Creams", image: "/dark_chocolate_walnut_brownie.jpg", price: 320 },
  { id: 13, name: "Cookie Dough Brownie", category: "Brownie", image: "/cookie_dough_brownie.jpg", price: 280 },
  { id: 14, name: "Mint Chocolate Chips Truffle", category: "Ice Creams", image: "/Mint_chocolate_chips_truffle.jpg", price: 290 },
  { id: 15, name: "Dark Chocolate Hazelnut Brownie", category: "Brownie", image: "/Dark_chocolate_hazelnut_brownie.jpg", price: 330 },
];


const categories = ["All", "Brownie", "Cake", "Desserts"];

export default function Products() {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart(); // Extract all functions
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on category
  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h1
        className="text-5xl font-extrabold text-pink-600 mb-8 text-center tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Delicious Products 🍰✨
      </motion.h1>

      {/* Product Grid */}
      <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden group transform transition duration-500 hover:scale-105 p-4 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-52 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-md">₹{product.price}</p>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center bg-gray-200 rounded-lg px-2">
                <button
                  onClick={() => {
                    const existingItem = cart.find((item) => item.id === product.id);
                    if (existingItem) {
                      if (existingItem.qty > 1) {
                        updateQuantity(product.id, existingItem.qty - 1);
                      } else {
                        removeFromCart(product.id);
                      }
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-gray-300 transition"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="px-4 text-lg font-semibold">
                  {cart.find((item) => item.id === product.id)?.qty || 0}
                </span>
                <button
                  onClick={() => {
                    const existingItem = cart.find((item) => item.id === product.id);
                    if (existingItem) {
                      updateQuantity(product.id, existingItem.qty + 1);
                    } else {
                      addToCart({ ...product, qty: 1 });
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-gray-300 transition"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <button
                onClick={() => addToCart({ ...product, qty: 1 })}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-pink-600 transition"
              >
                <ShoppingCart className="w-5 h-5" />
                Add
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
