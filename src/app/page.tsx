"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf, IceCream, Cake } from "lucide-react";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-8 mt-10">
      {/* Welcome Section (Moved Above Hero Section) */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Welcome to Bindi's Cupcakery</h1>
        <p className="text-xl text-gray-700">Delicious, homemade, and preservative-free desserts</p>
      </section>

      {/* Hero Section */}
      <HeroSection />

      {/* Spacing after Hero Section */}
      <div className="mt-20">
        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: <Leaf className="w-14 h-14 text-green-500 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />,
              title: "100% Vegetarian",
              text: "All our products are made with pure vegetarian, eggless ingredients.",
              gradient: "from-green-100 to-green-50",
            },
            {
              icon: <IceCream className="w-14 h-14 text-blue-500 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />,
              title: "Delicious Variety",
              text: "Cupcakes, brownies, cakes & ice creams – indulge in our wide range!",
              gradient: "from-blue-100 to-blue-50",
            },
            {
              icon: <Cake className="w-14 h-14 text-pink-500 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />,
              title: "Homemade with Love",
              text: "Baked fresh using natural, high-quality ingredients.",
              gradient: "from-pink-100 to-pink-50",
            },
          ].map(({ icon, title, text, gradient }, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-b ${gradient} p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
            >
              {icon}
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{title}</h2>
              <p className="text-gray-600 text-center">{text}</p>
            </div>
          ))}
        </section>

        {/* Creations Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-extrabold text-pink-600 mb-8 text-center tracking-wide">
            Our Delicious Creations 🍰✨
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {[
              { name: "Brownie-Tub", image: "/Brownie_tub.jpg" },
              { name: "Rasmalai Truffle", image: "/Rasmalai_Truffle.jpg" },
              { name: "Jim Jam Cookie", image: "/Jim_Jam_Cookies.jpg" },
              { name: "Blueberry Truffle", image: "/Blueberry_Truffle.jpg" },
            ].map(({ name, image }, i) => (
              <div
                key={i}
                className="relative group h-52 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={image}
                  alt={name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-semibold">{name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* View Products Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            View Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}
