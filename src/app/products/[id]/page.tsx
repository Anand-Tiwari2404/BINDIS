"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/cart/CartContext";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const { cart, addToCart, updateQuantity } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.qty : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-xl font-bold text-red-500">{error}</p>
        <Link href="/" className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg shadow-md"
            priority
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{product.description}</p>
            <p className="text-2xl font-semibold text-pink-600 mt-4">${product.price}</p>
          </div>

          <div className="mt-6 flex gap-4 items-center">
            {quantity > 0 ? (
              <div className="flex items-center gap-2 border p-2 rounded-lg">
                <button
                  onClick={() => updateQuantity(product._id, Math.max(0, quantity - 1))}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product._id, quantity + 1)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart({ id: product._id, name: product.name, image: product.image, price: product.price, qty: 1 })}
                className="px-6 py-3 bg-pink-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-pink-600 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}