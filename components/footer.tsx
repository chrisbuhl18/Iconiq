import Link from "next/link"
import Logo from "@/components/logo"

export default function Footer() {
  return (
    <footer id="contact" className="bg-english-violet text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Logo className="w-10 h-10 bg-white rounded-full" />
              <span className="font-bold text-xl font-heading">Lumio</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Bring energy and the highest form of brand engagement into your emails with animated elements that make
              you stand out.
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium">Email:</span> hello@lumio.com
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Phone:</span> (555) 123-4567
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/avatars" className="text-gray-300 hover:text-white transition-colors">
                  Email Avatars
                </Link>
              </li>
              <li>
                <Link href="/signatures" className="text-gray-300 hover:text-white transition-colors">
                  Email Signatures
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Lumio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
