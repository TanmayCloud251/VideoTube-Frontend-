export type FooterSection = {
  title: string
  links: {
    label: string
    href: string
  }[]
}

export const footerSections: FooterSection[] = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Explore", href: "/search" },
      { label: "Trending", href: "/" },
      { label: "Tweets", href: "/tweets" },
    ],
  },
  {
    title: "Me",
    links: [
      { label: "About Me", href: "/about" },
      { label: "Portfolio", href: "/about#projects" },
      { label: "Contact", href: "/contact" },
      { label: "Resume", href: "/Tanmay_Mishra_Resume.pdf" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/privacy" },
    ],
  },
]
