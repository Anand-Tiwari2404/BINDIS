"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (!data.products || !Array.isArray(data.products)) {
          throw new Error("Invalid API response format");
        }

        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">🍰 Delicious Cupcakes</h2>

      {error && (
        <p className="text-red-500 text-center font-semibold bg-red-100 p-3 rounded-lg">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => {
          const imageUrl = product.image.startsWith("/") ? product.image : `/${product.image}`;

          return (
            <motion.div
              key={product._id}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link href={`/products/${product._id}`} target="_blank">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                    priority={false}
                  />
                  <h3 className="text-xl font-semibold mt-4 text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-2 px-2">{product.description}</p>
                  <span className="mt-3 text-lg font-bold text-white bg-pink-600 px-3 py-1 rounded-full shadow-md">
                    ${product.price}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
