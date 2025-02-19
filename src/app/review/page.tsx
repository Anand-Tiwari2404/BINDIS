"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const initialReviews = [
  { id: 1, name: "Hrithik", rating: 5, comment: "The cupcakes were absolutely delicious! Will definitely order again.", bgColor: "bg-pink-100" },
  { id: 2, name: "Abhishek", rating: 4, comment: "Great variety of flavors. The ice cream was a hit at our party.", bgColor: "bg-purple-100" },
  { id: 3, name: "Kshitij", rating: 5, comment: "The best eggless cakes I've ever had. Highly recommended!", bgColor: "bg-rose-100" },
  { id: 4, name: "Akshat", rating: 5, comment: "Ordered a custom cake for my daughter's birthday. It was perfect!", bgColor: "bg-yellow-100" },
  { id: 5, name: "Jaimin", rating: 5, comment: "Their service and quality is the best, and they maintain very good hygiene.", bgColor: "bg-blue-100" },
]

function Rating({ rating, setRating }: { rating: number, setRating?: (value: number) => void }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`relative w-6 h-6 cursor-pointer transition-all duration-300 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => setRating && setRating(i + 1)} // **Now sets the rating!**
          whileHover={{ scale: 1.2 }}
        >
          <Star className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews)
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!name.trim() || !comment.trim() || rating === 0) {
      setError("Please fill out all fields and select a rating.")
      return
    }

    setReviews([{ id: Date.now(), name, rating, comment, bgColor: "bg-gray-100" }, ...reviews])

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000) // Show success animation briefly

    setName("")
    setRating(0)
    setComment("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-rose-100 text-gray-900 px-6 py-12">
      <motion.h1 
        className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Customer Reviews
      </motion.h1>

      {/* Feedback Form */}
      <motion.div 
        className="mb-12 max-w-2xl mx-auto bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-8 border border-pink-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">We Value Your Feedback</h2>
        <p className="text-gray-500 mb-6">Your feedback helps us improve! Share your experience with us.</p>

        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 focus:border-pink-500 focus:ring focus:ring-pink-300 transition"
        />

        <textarea 
          placeholder="Share your thoughts..." 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 focus:border-pink-500 focus:ring focus:ring-pink-300 transition"
          rows={4}
        />

        <div className="mb-5 flex items-center gap-3">
          <span className="text-gray-700 font-medium">Rating:</span>
          <Rating rating={rating} setRating={setRating} />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <motion.button 
          onClick={handleSubmit} 
          className="w-full p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
          animate={submitted ? { scale: 1.1, backgroundColor: "#4CAF50" } : {}}
        >
          {submitted ? "✓ Feedback Submitted!" : "Submit Review"}
        </motion.button>
      </motion.div>

      {/* Reviews List */}
      <div className="grid gap-8 md:grid-cols-2">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            className={`rounded-xl shadow-md p-6 border border-pink-200 transition-all ${review.bgColor}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0px 4px 20px rgba(255, 0, 122, 0.2)" }}
          >
            <div className="flex items-center mb-3">
              <motion.h2 
                className="text-xl font-semibold text-gray-900 mr-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                {review.name}
              </motion.h2>
              <Rating rating={review.rating} />
            </div>
            <motion.p 
              className="text-gray-700 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              "{review.comment}"
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
