import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <Link href="tel:+91 8849130189">+91 88491-30189</Link>
                <Link href="tel:+91 9978677790">+91 99786-77790</Link>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <Link href="mailto:info@bindiscupcakery.com">info@bindiscupcakery.com</Link>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <address>Parle Point, Surat, Gujarat 395007</address>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Instagram className="w-5 h-5 mr-2" />
                <Link href="https://instagram.com/bindis_cupcakery" target="_blank" rel="noopener noreferrer">
                  @bindis_cupcakery
                </Link>
              </li>
              <li className="flex items-center">
                <Facebook className="w-5 h-5 mr-2" />
                <Link href="https://facebook.com/bindis_cupcakery" target="_blank" rel="noopener noreferrer">
                  Bindi's_Cupcakery
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <div className="h-64 bg-gray-300 rounded-md overflow-hidden">
              {/* Replace with actual Google Maps embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d567.2925023793136!2d72.7914954!3d21.174258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ddd6dae8af5%3A0xe17d92a28035ffe2!2sParle%20Point!5e0!3m2!1sen!2sin!4v1707900000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Bindi's Cupcakery. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

