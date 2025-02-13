import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-pink-100 shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/bindis_logo.jpg" alt="Bindi's Cupcakery Logo" width={150} height={50} priority />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-800 hover:text-pink-600">Home</Link>
            <Link href="/products" className="text-gray-800 hover:text-pink-600">Products</Link>
            <Link href="/contact" className="text-gray-800 hover:text-pink-600">Contact</Link>
            <Link href="/review" className="text-gray-800 hover:text-pink-600">Review</Link> 
            <Link href="/gallery" className="text-gray-800 hover:text-pink-600">Gallery</Link> 
          </div>
        </div>
      </nav>
    </header>
  )
}
