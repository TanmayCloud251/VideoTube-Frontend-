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
        {section.links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}