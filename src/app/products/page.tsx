"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

export default function Products() {
  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h1
        className="text-5xl font-bold text-pink-600 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Delicious Products
      </motion.h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-52">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-5 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 text-lg">{product.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
