import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-100 to-pink-50 py-8 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-pink-700">Contact Us</h3>
            <ul className="space-y-1 text-gray-700">
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-pink-500" />
                <div className="flex flex-col">
                  <Link href="tel:+918849130189" className="hover:text-pink-600 transition">
                    +91 88491-30189
                  </Link>
                  <Link href="tel:+919978677790" className="hover:text-pink-600 transition">
                    +91 99786-77790
                  </Link>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-pink-500" />
                <Link href="mailto:info@bindiscupcakery.com" className="hover:text-pink-600 transition">
                  info@bindiscupcakery.com
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-pink-500" />
                <span>Parle Point, Surat, Gujarat 395007</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-3 text-pink-700">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="https://instagram.com/bindis_cupcakery" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-700 transition" />
              </Link>
              <Link href="https://facebook.com/bindis_cupcakery" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6 text-pink-500 hover:text-pink-700 transition" />
              </Link>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d567.2925023793136!2d72.7914954!3d21.174258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ddd6dae8af5%3A0xe17d92a28035ffe2!2sParle%20Point!5e0!3m2!1sen!2sin!4v1707900000000!5m2!1sen!2sin"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Bindi's Cupcakery. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
