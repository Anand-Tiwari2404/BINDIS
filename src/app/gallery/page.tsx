"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const galleryImages = [
  { src: "/bakery_interior.jpg", alt: "Bakery Interior" },
  { src: "/cupcake.jpg", alt: "Cupcake Display" },
  { src: "/cake_decoration.jpg", alt: "Cake Decorating" },
  { src: "/happy_customers.jpg", alt: "Happy Customers" },
  { src: "/special_occasion.jpg", alt: "Special Occasion Cakes" },
  { src: "/baking_process.jpg", alt: "Baking Process" },
]

export default function SmoothSidewaysGallery() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Set image change interval to 1 second (1000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      navigate(1)
    }, 2000)  // Change the time interval to 2 second
    return () => clearInterval(interval)
  }, [])

  const navigate = (newDirection: number) => {
    setDirection(newDirection)
    setIndex((prevIndex) => {
      if (newDirection === 1) {
        return (prevIndex + 1) % galleryImages.length
      }
      return prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    })
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }

  return (
    <div className="relative w-screen h-screen bg-pink-50 overflow-hidden">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 100, damping: 20, duration: 1 },  // Set transition duration to 1 second
              opacity: { duration: 1 },  // Set transition duration to 1 second
              scale: { duration: 1 },  // Set transition duration to 1 second
              rotateY: { duration: 1 },  // Set transition duration to 1 second
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <Image
              src={galleryImages[index].src || "/placeholder.svg"}
              alt={galleryImages[index].alt}
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 text-gray-800 p-4 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-300 z-20"
      >
        ◀
      </button>
      <button
        onClick={() => navigate(1)}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 text-gray-800 p-4 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-300 z-20"
      >
        ▶
      </button>

      {/* Image counter */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-50 text-gray-800 px-4 py-2 rounded-full z-20">
        {index + 1} / {galleryImages.length}
      </div>
    </div>
  )
}