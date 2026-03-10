export type FooterSection = {
  title: string
  links: {
    label: string
    href: string
  }[]
}

export const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Videos", href: "/videos" },
      { label: "Playlists", href: "/playlists" },
      { label: "Tweets", href: "/tweets" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Docs", href: "/docs" },
      { label: "API", href: "/api-docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
]