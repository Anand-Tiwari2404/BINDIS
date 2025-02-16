"use client";
import { useCart } from "@/app/cart/CartContext";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <h2 className="text-center text-xl mt-10">Your cart is empty! 🛒</h2>;
  }

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b py-3">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg" />
            <div>
              <h3 className="text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">${item.price}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => updateQuantity(item.id, item.qty - 1)}> - </button>
            <span>{item.qty}</span>
            <button onClick={() => updateQuantity(item.id, item.qty + 1)}> + </button>
            <button onClick={() => removeFromCart(item.id)}>
              <Trash2 />
            </button>
          </div>
        </div>
      ))}
      <h3 className="text-xl font-semibold mt-4">Total: ${total}</h3>

      {/* Checkout Button */}
      <Link href="/cart/checkout">
        <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartPage;
