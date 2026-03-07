import { Button } from "./ui/Button"

export default function Navbar() {
  return (
    <header className="bg-brand-accent text-brand-dark px-6 py-4 flex items-center justify-between">

      {/* Logo */}
      <div className="font-bold text-lg">
        VideoTube
      </div>

      {/* Search */}
      <form className="flex items-center gap-2">
        <input
          id="search"
          type="text"
          placeholder="Search"
          className="px-3 py-1 rounded-md border border-brand-dark bg-brand-light text-brand-dark"
          aria-label="Search videos"
        />

        <button
          type="submit"
          className="px-3 py-1 rounded-md bg-brand-dark text-brand-light"
        >
          🔍
        </button>
      </form>

      {/* User actions */}
      <div className="flex items-center gap-4">
        <Button>Login</Button>
      </div>
    </header>
  )
}