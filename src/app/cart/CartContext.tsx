"use client";
import { createContext, useContext, useState } from "react";

// Define types for cart items
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  qty: number;
}

// Define types for Cart Context
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
}

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
  };

  // Update item quantity (remove if qty is 0)
  const updateQuantity = (id: number, qty: number) => {
    setCart((prevCart) =>
      qty > 0
        ? prevCart.map((item) => (item.id === id ? { ...item, qty } : item))
        : prevCart.filter((item) => item.id !== id)
    );
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use Cart Context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
