'use client'
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-md font-bold mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
