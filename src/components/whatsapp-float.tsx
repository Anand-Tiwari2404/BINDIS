import { PhoneIcon as WhatsappIcon } from "lucide-react"
import Link from "next/link"

export default function WhatsAppFloat() {
  return (
    <Link
      href="https://wa.me/918849130189"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out hover:scale-110 animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <WhatsappIcon size={32} />
    </Link>
  )
}

