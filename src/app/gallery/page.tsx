import Image from "next/image"

const galleryImages = [
  { src: "/placeholder.svg?height=400&width=600&text=Bakery+Interior", alt: "Bakery Interior" },
  { src: "/placeholder.svg?height=400&width=600&text=Cupcake+Display", alt: "Cupcake Display" },
  { src: "/placeholder.svg?height=400&width=600&text=Cake+Decorating", alt: "Cake Decorating" },
  { src: "/placeholder.svg?height=400&width=600&text=Happy+Customers", alt: "Happy Customers" },
  { src: "/placeholder.svg?height=400&width=600&text=Special+Occasion+Cakes", alt: "Special Occasion Cakes" },
  { src: "/placeholder.svg?height=400&width=600&text=Baking+Process", alt: "Baking Process" },
]

export default function Gallery() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">Our Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

