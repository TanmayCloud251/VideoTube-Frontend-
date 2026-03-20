"use client"

import { useState, useCallback } from "react"
import Navbar from "@/components/Navbar"
import SideBar from "@/components/SideBar"
import Footer from "@/components/footer/Footer"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, [])

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex h-screen flex-col">
          <Navbar toggleSidebar={toggleSidebar} />

          <div className="flex flex-1 overflow-hidden">
            <SideBar isOpen={isSidebarOpen} />

            <div className="flex flex-1 flex-col">
              <main className="flex-1 overflow-y-auto bg-neutral-900 text-white p-4">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}