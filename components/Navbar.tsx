import { Button } from "./ui/Button"

export default function Navbar() {
  return (
    <header className="bg-brand-accent text-brand-dark px-6 py-4 flex items-center justify-between">

      {/* Logo */}
      <div className="font-bold text-lg">
        VideoTube
      </div>

      {/* Search */}
      <form className="flex items-center ">
        <input
          id="search"
          type="text"
          placeholder="Search"
          className="px-3 py-1 rounded-l-4xl border border-brand-dark bg-brand-light text-brand-dark"
          aria-label="Search videos"  
        />
        <Button type="submit" variant="primary" className="rounded-r-4xl h-fit border-1 border-black w-10 p-1.5 rounded-l-none">🔍</Button>
      </form>

      {/* User actions */}
      <div className="flex items-center gap-4">
        <Button variant="secondary" className="rounded-3xl border-2 border-black">Login</Button>
      </div>
    </header>
  )
}