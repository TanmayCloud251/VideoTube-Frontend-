"use client"

import { useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import SideBar from "@/components/SideBar"
import Footer from "@/components/footer/Footer"
import { AuthProvider } from "@/context/AuthContext"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

  const isAuthPage = pathname === "/login" || pathname === "/signup"

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, [])

  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <div className="flex h-screen flex-col">
            <Navbar toggleSidebar={toggleSidebar} />

            <div className="flex flex-1 overflow-hidden">
              {!isAuthPage && <SideBar isOpen={isSidebarOpen} />}

              <div className="flex flex-1 flex-col">
                <main className={`flex-1 overflow-y-auto bg-neutral-900 text-white ${isAuthPage ? 'p-0' : 'p-4'}`}>
                  {children}
                </main>
                {!isAuthPage && <Footer />}
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}