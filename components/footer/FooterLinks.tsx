import Link from "next/link"
import { FooterSection } from "./Footer.data"

type Props = {
  section: FooterSection
}

export default function FooterLinks({ section }: Props) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white mb-4">
        {section.title}
      </h3>

      <ul className="space-y-2">
        {section.links.map((link) => {
          const isDownload = link.href.endsWith(".pdf")
          const isExternal = link.href.startsWith("http")

          if (isDownload || isExternal) {
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  download={isDownload}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-brand-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            )
          }

          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-gray-400 hover:text-brand-accent transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}