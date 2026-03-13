import Link from "next/link"
import { footerSections } from "./Footer.data"
import FooterLinks from "./FooterLinks"
import { Github, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-neutral-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-semibold text-white"
            >
              VideoTube
            </Link>
            

            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              A platform to share videos, posts and playlists.
              Built for creators and communities.
            </p>
          </div>

          {/* Dynamic Links */}
          {footerSections.map((section) => (
            <FooterLinks key={section.title} section={section} />
          ))}


        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 md:flex-row">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} VideoTube. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-gray-400">

            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-white transition-colors"
            >
              <Twitter size={18} />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-white transition-colors"
            >
              <Youtube size={18} />
            </a>

          </div>
        </div>

      </div>
    </footer>
  )
}