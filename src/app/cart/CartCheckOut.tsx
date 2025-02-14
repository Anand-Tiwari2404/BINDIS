import { FC } from 'react';

// Assuming the cart items have the following structure
interface CartItem {
  qty: number;
  name: string;
  price: number;
}

interface UseCart {
  cart: CartItem[];
}

// Simulate the useCart hook (you might already have this hook defined in your project)
const useCart = (): UseCart => {
  // Dummy data for illustration
  return { cart: [{ qty: 2, name: "Item 1", price: 100 }] };
};

const CheckoutButton: FC = () => {
  const { cart } = useCart();

  const checkout = (): void => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add items before proceeding.");
      return;
    }

    const orderText = cart
      .map((item) => `${item.qty}x ${item.name} - ₹${item.qty * item.price}`)
      .join("\n");

    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2);
    const message = `Hello, I'd like to order:\n${orderText}\nTotal: ₹${total}`;

    window.open(`https://wa.me/918XXXXXXXXX?text=${encodeURIComponent(message)}`);
    // const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918XXXXXXXXX";
    // window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
  };

  return (
    <button
      onClick={checkout}
      className={`px-4 py-2 rounded text-white transition ${
        cart.length === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
      disabled={cart.length === 0}
    >
      Order via WhatsApp
    </button>
  );
};

export default CheckoutButton;
