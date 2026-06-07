"use client"

import { useState, useCallback, useEffect } from "react"
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
  const isVideoPage = pathname.startsWith("/video/")

  useEffect(() => {
    // Determine initial sidebar state based on screen width
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // 768px is the standard 'md' breakpoint
      
      if (isVideoPage || isAuthPage) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(!isMobile);
      }
    };

    // Run once on mount and whenever pathname/pages change
    handleResize();

    // Close sidebar on mobile when navigating
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }

    // Optional: Update state when window is resized
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname, isVideoPage, isAuthPage])

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
              {!isAuthPage && <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} />}

              <div className="flex flex-1 flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto bg-neutral-900 text-white">
                  <div className="min-h-full flex flex-col">
                    <div className="flex-1">
                      {children}
                    </div>
                    {!isAuthPage && <Footer />}
                  </div>
                </main>
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}