"use client";
import Checkout from "../CheckOut"; // Import the Checkout component

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <Checkout />
    </div>
  );
}
