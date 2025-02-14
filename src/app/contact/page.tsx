"use client"
import { MapPin, Phone, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function Contact() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-white px-6 py-12">
      {/* Animated Page Title */}
      <motion.h1
        className="text-5xl font-extrabold text-pink-700 mb-10 text-center tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contact Us 📞✨
      </motion.h1>

      {/* Contact Details */}
      <motion.div
        className="w-full max-w-2xl bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-xl p-8 border border-gray-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Address */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-100 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-gray-200">
          <MapPin className="w-8 h-8 text-pink-600" />
          <p className="text-gray-800 text-lg font-medium">📍 Parle Point, Surat</p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4 p-4 mt-4 rounded-lg bg-gray-100 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-gray-200">
          <Phone className="w-8 h-8 text-pink-600" />
          <p className="text-gray-800 text-lg font-medium">
            📞 <a href="tel:+918849130189" className="hover:text-pink-600 transition">+91 8849130189</a>
          </p>
        </div>

        {/* Working Hours */}
        <div className="flex items-center gap-4 p-4 mt-4 rounded-lg bg-gray-100 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-gray-200">
          <Clock className="w-8 h-8 text-pink-600" />
          <p className="text-gray-800 text-lg font-medium">⏰ Open daily: 11:00 AM - 7:00 PM</p>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <p className="text-xl text-gray-700 font-semibold">
            To place an order or for inquiries, contact us today!
          </p>
          <p className="text-lg text-gray-600 mt-2">
            We offer pickup services from our cloud kitchen location.
          </p>
        </div>

        {/* WhatsApp / Call Button */}
        <div className="flex justify-center mt-6">
          <a
            href="https://wa.me/918849130189"
            target="_blank"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  )
}
