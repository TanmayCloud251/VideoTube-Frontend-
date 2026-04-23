"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/Button"
import { Menu, Search, Video, User, LogOut, LayoutDashboard, UserCircle, Plus, History } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

type Props = {
  toggleSidebar: () => void
}

export default function Navbar({ toggleSidebar }: Props) {
  const [query, setQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${query}`)
  }

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-brand-accent px-4 py-3 text-brand-dark shadow-sm">
      {/* LEFT: Logo + Sidebar toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="rounded-md p-2 hover:bg-black/10"
        >
          <Menu size={20} />
        </button>
        <Link href="/" className="text-2xl font-black  tracking-tighter text-border-2 ">
          VIDEOTUBE<span className="text-white">.</span>
        </Link>
      </div>

      {/* CENTER: Search */}
      <form
        onSubmit={handleSearch}
        className="hidden w-full max-w-md items-center md:flex"
      >
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-l-full border border-brand-dark bg-brand-light px-4 py-2 text-sm outline-none"
        />
        <Button
          type="submit"
          className="rounded-r-full border border-black px-3 py-2"
        >
          <Search size={18} />
        </Button>
      </form>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-3">
        {/* Mobile Search Button */}
        <button className="p-2 md:hidden">
          <Search size={20} />
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/upload">
              <button 
                title="Add Video"
                className="flex items-center justify-center rounded-full bg-white border-2 font-bold text-black p-2 hover:opacity-90 transition-opacity"
              >
                <Plus size={22} />
              </button>
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-brand-dark bg-neutral-200 hover:opacity-90 transition-opacity"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={24} />
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold truncate">{user.fullName}</p>
                    <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                  </div>
                  
                  <Link
                    href={`/profile/${user.username}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <UserCircle size={18} />
                    Profile
                  </Link>
                  
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <Link
                    href="/history"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <History size={18} />
                    History
                  </Link>

                  <button
                    onClick={() => {
                      logout()
                      setIsDropdownOpen(false)
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={18} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link href="/login">
            <Button className="rounded-full border border-black px-4 py-1">
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}
