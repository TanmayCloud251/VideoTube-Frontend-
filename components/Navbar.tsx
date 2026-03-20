"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/Button"
import { Menu, Search } from "lucide-react"

type Props = {
  toggleSidebar: () => void
}


export default function Navbar({toggleSidebar}: Props) {

  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    router.push(`/search?q=${query}`)
  }

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

        <Link href="/" className="text-lg font-bold">
          VideoTube
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

        <Button className="rounded-full border border-black px-4 py-1">
          Login
        </Button>

      </div>
    </header>
  )
}