import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-yellow-100 py-20 text-center mb-10"> {/* Added mb-10 for spacing */}
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bindi's_logo.jpg"
          alt="Bakery Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-pink-600">Eggless, Homemade & Delicious!</h1>
        <p className="mt-3 text-lg text-gray-700">
          Freshly baked cupcakes, brownies, and ice creams made with love ❤️
        </p>
        <a
          href="https://wa.me/918849130189"
          className="mt-6 inline-block bg-pink-500 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:bg-pink-600 transition"
        >
          Order on WhatsApp
        </a>
      </div>
    </section>
  );
}
