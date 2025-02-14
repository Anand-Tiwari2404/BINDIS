"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Minus, Plus } from "lucide-react"; // Icons

// Full Product List
const products = [
  { name: "Brownie-Tub", category: "Brownie", image: "/Brownie_tub.jpg" },
  { name: "Nutella Sandwich Cookies", category: "Desserts", image: "/Nutella_Sandwich_Cookies.jpg" },
  { name: "Jim Jam Cookie", category: "Cake", image: "/Jim_Jam_Cookies.jpg" },
  { name: "Cookie Dough Brownie Cup", category: "Brownie", image: "/Cookie_Dough_Brownie_Cup.jpg" },
  { name: "Coconut Truffle", category: "Ice Creams", image: "/Coconut_Truffle.jpg" },
  { name: "Chocolate Chips Cookies", category: "Brownie", image: "/Chocolate_Chips_Cookie.jpg" },
  { name: "Blueberry Truffle", category: "Ice Creams", image: "/Blueberry_Truffle.jpg" },
  { name: "Rasmalai Truffle", category: "Ice Creams", image: "/Rasmalai_Truffle.jpg" },
  { name: "Donuts", category: "Desserts", image: "/Donuts.jpg" },
  { name: "Chilli Cheese Cookies", category: "Cookies", image: "/chilli_cheese_cookies.jpg" },
  { name: "Cranberry Pistachio Blondie", category: "Desserts", image: "/cranberry_pistachio_blondie.jpg" },
  { name: "Dark Chocolate Walnut Truffle", category: "Ice Creams", image: "/dark_chocolate_walnut_brownie.jpg" },
  { name: "Cookie Dough Brownie", category: "Brownie", image: "/cookie_dough_brownie.jpg" },
  { name: "Mint Chocolate Chips Truffle", category: "Ice Creams", image: "/Mint_chocolate_chips_truffle.jpg" },
  { name: "Dark Chocolate Hazelnut Brownie", category: "Brownie", image: "/Dark_chocolate_hazelnut_brownie.jpg" },
];

// Category options
const categories = ["All", "Brownie", "Ice Creams", "Cake", "Desserts", "Cookies"];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<{ [key: string]: number }>({}); // Cart state

  // Filter products based on category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  // Handle quantity changes
  const handleQuantityChange = (productName: string, amount: number) => {
    setCart((prevCart) => {
      const newQuantity = Math.max(0, (prevCart[productName] || 0) + amount);
      return newQuantity === 0
        ? Object.fromEntries(Object.entries(prevCart).filter(([key]) => key !== productName))
        : { ...prevCart, [productName]: newQuantity };
    });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Page Title */}
      <motion.h1
        className="text-5xl font-extrabold text-pink-600 mb-8 text-center tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Delicious Products 🍰✨
      </motion.h1>

      {/* Filter Section */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-2 bg-white shadow-md rounded-full px-4 py-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-pink-300 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden group transform transition duration-500 hover:scale-105 p-4 relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Product Image */}
              <div className="relative h-52 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Product Details */}
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 text-md">{product.category}</p>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="flex justify-between items-center mt-4">
                {/* Quantity Selector */}
                <div className="flex items-center bg-gray-200 rounded-lg px-2">
                  <button
                    onClick={() => handleQuantityChange(product.name, -1)}
                    className="p-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="px-4 text-lg font-semibold">{cart[product.name] || 0}</span>
                  <button
                    onClick={() => handleQuantityChange(product.name, 1)}
                    className="p-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleQuantityChange(product.name, 1)}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-pink-600 transition"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg col-span-full">No products found in this category.</p>
        )}
      </motion.div>
    </div>
  );
}
