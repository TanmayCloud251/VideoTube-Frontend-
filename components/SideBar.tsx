"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import {
  Home,
  ThumbsUp,
  UserCheck2,
  MessageCircle,
  ListMusic,
  History,
} from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "History", href: "/history", icon: History },
  { name: "Liked Videos", href: "/liked", icon: ThumbsUp },
  { name: "Tweets", href: "/tweets", icon: MessageCircle },
  { name: "Subscriptions", href: "/subscriptions", icon: UserCheck2 },
  { name: "Playlists", href: "/playlist", icon: ListMusic },
]


type Props = {
  isOpen: boolean;
  onClose: () => void;
}

function SideBar({isOpen, onClose}: Props) {
  const pathname = usePathname()
  const { user } = useAuth()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 md:hidden" 
        onClick={onClose} 
      />
      
      <aside className={`
        fixed left-0 top-16 z-50 h-[calc(100vh-64px)] w-60 border-r bg-neutral-950 text-gray-300 p-4 overflow-y-auto transition-transform
        md:sticky md:top-16 md:z-auto
      `}>
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

      {!user && (
        <div className="mt-6 border-t border-neutral-800 pt-6 px-3">
          <p className="text-xs text-neutral-400 mb-3">
            Sign in to like videos, comment, and subscribe.
          </p>
          <Link
            href="/login"
            className="flex items-center justify-center w-full rounded-full border border-neutral-700 px-4 py-1.5 text-sm font-medium text-brand-accent hover:bg-brand-accent/10 transition-colors"
          >
            Sign in
          </Link>
        </div>
      )}
    </aside>
    </>
  )
}

export default SideBar