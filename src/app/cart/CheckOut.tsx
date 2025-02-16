"use client";
import { useCart } from "@/app/cart/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "UPI",
  });

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address) {
      alert("⚠️ Please fill in all the required details.");
      return;
    }

    // Simulate order placement
    console.log("🛒 Order Placed:", { userDetails, cart });

    // Redirect to confirmation page inside /cart directory
    router.push("/cart/confirmation"); // ✅ This is correct
    


    // Clear cart after redirection
    setTimeout(() => {
      clearCart();
    }, 1000); // Slight delay to ensure redirection happens first
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h2>

      {/* Order Summary */}
      <div className="border p-4 rounded-lg mb-6 bg-white shadow">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-2 text-gray-700">
              <span>{item.name} × {item.qty}</span>
              <span>${item.qty * item.price}</span>
            </div>
          ))
        )}
        <h3 className="text-xl font-semibold mt-4 text-green-600">Total: ${total}</h3>
      </div>

      {/* User Details Form */}
      <div className="border p-4 rounded-lg mb-6 bg-white shadow">
        <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userDetails.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={userDetails.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={userDetails.address}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          required
        />
      </div>

      {/* Payment Options */}
      <div className="border p-4 rounded-lg mb-6 bg-white shadow">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <select
          name="paymentMethod"
          value={userDetails.paymentMethod}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handleOrder}
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition shadow-md"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
