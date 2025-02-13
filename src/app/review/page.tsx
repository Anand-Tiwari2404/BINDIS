import { Star } from "lucide-react"

const reviews = [
  { id: 1, name: "Alice", rating: 5, comment: "The cupcakes were absolutely delicious! Will definitely order again." },
  { id: 2, name: "Bob", rating: 4, comment: "Great variety of flavors. The ice cream was a hit at our party." },
  { id: 3, name: "Charlie", rating: 5, comment: "The best eggless cakes I've ever had. Highly recommended!" },
  { id: 4, name: "Diana", rating: 5, comment: "Ordered a custom cake for my daughter's birthday. It was perfect!" },
]

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">Customer Reviews</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mr-4">{review.name}</h2>
              <Rating rating={review.rating} />
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

