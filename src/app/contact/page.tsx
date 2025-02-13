"use client"
import { MapPin, Phone, Clock } from "lucide-react"

export default function Contact() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">Contact Us</h1>
      <div className="bg-pink-50 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="flex items-center mb-4">
          <MapPin className="w-6 h-6 text-pink-600 mr-2" />
          <p className="text-gray-800">Parle Point, Surat</p>
        </div>
        <div className="flex items-center mb-4">
          <Phone className="w-6 h-6 text-pink-600 mr-2" />
          <p className="text-gray-800">+91 1234567890</p>
        </div>
        <div className="flex items-center">
          <Clock className="w-6 h-6 text-pink-600 mr-2" />
          <p className="text-gray-800">Open daily: 10:00 AM - 8:00 PM</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-xl text-gray-700">To place an order or for any inquiries, please contact us.</p>
        <p className="text-xl text-gray-700 mt-2">We offer pickup services from our cloud kitchen location.</p>
      </div>
    </div>
  )
}

