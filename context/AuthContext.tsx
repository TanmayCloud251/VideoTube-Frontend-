"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser, logoutUser } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { User } from "@/types"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (userData: User) => void
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const refreshUser = async () => {
    try {
      const res = await getCurrentUser()
      if (res.data) {
        setUser(res.data)
      } else {
        setUser(null)
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken")
        }
      }
    } catch (err) {
      setUser(null)
      // Only remove if we're sure it's an auth error
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken")
      }
      router.push("/")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
