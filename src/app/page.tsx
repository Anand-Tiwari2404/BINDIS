import Image from "next/image"
import Link from "next/link"
import { Leaf, IceCream, Cake } from "lucide-react"
import HeroSection from "./components/HeroSection"

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-8">
      <HeroSection/>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Welcome to Bindi's Cupcakery</h1>
        <p className="text-xl text-gray-700">Delicious, homemade, and preservative-free desserts</p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-pink-50 p-6 rounded-lg shadow-md">
          <Leaf className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Vegetarian</h2>
          <p className="text-gray-600">All our products are 100% vegetarian and eggless</p>
        </div>
        <div className="bg-pink-50 p-6 rounded-lg shadow-md">
          <IceCream className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Variety</h2>
          <p className="text-gray-600">Wide range of cupcakes, brownies, cakes, and ice creams</p>
        </div>
        <div className="bg-pink-50 p-6 rounded-lg shadow-md">
          <Cake className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Homemade</h2>
          <p className="text-gray-600">Crafted with love using natural ingredients</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Our Delicious Creations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src={`/placeholder.svg?height=300&width=300&text=Dessert ${i}`}
                alt={`Dessert ${i}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Link
          href="/products"
          className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
        >
          View Our Products
        </Link>
      </div>
    </div>
  )
}

