"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/bakery_1.jpg",
  "/bakery_2.jpg",
  "/bakery_3.jpg",
  "/bakery_4.jpg",
  "/bakery_5.jpg",
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image Carousel */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Bakery Background ${index + 1}`}
            layout="fill"
            objectFit="cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-6 animate-fadeIn">
          Eggless, Homemade & Delicious!
        </h1>
        <p className="mt-3 text-xl md:text-2xl text-pink-300 mb-8 animate-slideUp">
          Freshly baked cupcakes, brownies, and ice creams made with love ❤️
        </p>

        {/* Updated WhatsApp Button */}
        <a
          href="https://wa.me/918849130189"
          className="bg-green-600 text-white text-lg font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition-all duration-300"
        >
          Order on WhatsApp
        </a>
      </div>
    </section>
  );
}
