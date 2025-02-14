"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Gallery Images
const galleryImages = [
  { src: "/bakery_interior.jpg", alt: "Bakery Interior" },
  { src: "/cupcake.jpg", alt: "Cupcake Display" },
  { src: "/cake_decoration.jpg", alt: "Cake Decorating" },
  { src: "/happy_customers.jpg", alt: "Happy Customers" },
  { src: "/special_occasion.jpg", alt: "Special Occasion Cakes" },
  { src: "/baking_process.jpg", alt: "Baking Process" },
];

export default function Gallery() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Page Title */}
      <motion.h1
        className="text-5xl font-extrabold text-pink-600 mb-10 text-center tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Gallery 📸✨
      </motion.h1>

      {/* Gallery Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map(({ src, alt }, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image */}
            <Image
              src={src}
              alt={alt}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay with Caption */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-semibold">{alt}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
