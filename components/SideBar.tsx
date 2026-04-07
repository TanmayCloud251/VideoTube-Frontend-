"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  ThumbsUp,
  UserCheck2,
  MessageCircle,
  ListMusic,
  Smartphone,
} from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shorts", href: "/shorts", icon: Smartphone },
  { name: "Liked Videos", href: "/liked", icon: ThumbsUp },
  { name: "Tweets", href: "/tweets", icon: MessageCircle },
  { name: "Subscriptions", href: "/subscriptions", icon: UserCheck2 },
  { name: "Playlists", href: "/playlist", icon: ListMusic },
]


type Props = {
  isOpen: boolean
}

function SideBar({isOpen}: Props) {
  const pathname = usePathname()

  if (!isOpen) return null

  return (
    <aside className="sticky left-0 top-0 h-[calc(100vh-64px)] w-60 border-r bg-neutral-950 text-gray-300 p-4 overflow-y-auto">
      <ul className="flex flex-col gap-2">

        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all
                  ${
                    isActive
                      ? "bg-white text-black font-medium"
                      : "hover:bg-neutral-800 hover:text-white"
                  }`}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            </li>
          )
        })}

      </ul>
    </aside>
  )
}

export default SideBar