"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = [
  { src: "/bakery_interior.jpg", alt: "Bakery Interior" },
  { src: "/cupcake.jpg", alt: "Cupcake Display" },
  { src: "/cake_decoration.jpg", alt: "Cake Decorating" },
  { src: "/happy_customers.jpg", alt: "Happy Customers" },
  { src: "/special_occasion.jpg", alt: "Special Occasion Cakes" },
  { src: "/baking_process.jpg", alt: "Baking Process" },
];

export default function FullPageSlider() {
  const [index, setIndex] = useState(0);

  // Auto-play effect (change image every 4 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black flex items-center justify-center">
      {/* Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={galleryImages[index].src}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          <Image
            src={galleryImages[index].src}
            alt={galleryImages[index].alt}
            width={1920}
            height={1080}
            className="max-w-full max-h-full object-contain"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={() => setIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
      >
        ◀
      </button>
      <button
        onClick={() => setIndex((prev) => (prev + 1) % galleryImages.length)}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
      >
        ▶
      </button>
    </div>
  );
}
