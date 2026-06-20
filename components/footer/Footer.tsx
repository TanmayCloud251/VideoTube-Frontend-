import Link from "next/link"
import { footerSections } from "./Footer.data"
import FooterLinks from "./FooterLinks"
import { Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-neutral-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-2xl font-black text-white tracking-tighter"
            >
              VIDEOTUBE<span className="text-brand-accent">.</span>
            </Link>
            
            <p className="mt-6 text-sm text-neutral-500 leading-relaxed max-w-xs">
              A high-performance video sharing ecosystem built for modern creators. 
              Designed and developed with precision by <span className="text-neutral-300 font-medium">Tanmay Mishra</span>.
            </p>

            <div className="mt-8 flex items-center gap-4">
               <a 
                 href="https://github.com/TanmayCloud251" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-brand-accent hover:border-brand-accent/50 hover:-translate-y-0.5 transition-all duration-300"
               >
                  <Github size={18} />
               </a>
               <a 
                 href="https://www.linkedin.com/in/tanmaymi251/" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-brand-accent hover:border-brand-accent/50 hover:-translate-y-0.5 transition-all duration-300"
               >
                  <Linkedin size={18} />
               </a>
               <a 
                 href="/Tanmay_Mishra_Resume.pdf" 
                 download
                 className="flex items-center gap-2 px-4 py-2 h-10 rounded-full border border-neutral-800 bg-neutral-900 text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-brand-dark hover:bg-brand-accent hover:border-brand-accent hover:-translate-y-0.5 transition-all duration-300"
               >
                  Resume
               </a>
            </div>
          </div>

          {/* Dynamic Links */}
          {footerSections.map((section) => (
            <FooterLinks key={section.title} section={section} />
          ))}


        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 md:flex-row">

          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} VideoTube. Developed by <a href="/about" className="text-neutral-300 hover:text-brand-accent transition-colors">Tanmay Mishra</a>.
          </p>

          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-neutral-600">
            <Link href="/privacy" className="hover:text-brand-accent transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-brand-accent transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}