"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { loginUser } from "@/services/auth.service"
import { useAuth } from "@/context/AuthContext"

export default function LoginForm() {
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if there's a remembered identifier
    const savedIdentifier = localStorage.getItem("rememberedIdentifier")
    if (savedIdentifier) {
      setIdentifier(savedIdentifier)
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const payload = identifier.includes("@") 
        ? { email: identifier, password } 
        : { username: identifier, password }

      const response = await loginUser(payload)
      setSuccess(response.message || "Login successful! Redirecting...")
      
      if (response.data) {
        const userData = response.data.user
        const token = response.data.accessToken
        
        if (token) {
          localStorage.setItem("accessToken", token)
        }

        // Handle Remember Me logic
        if (rememberMe) {
          localStorage.setItem("rememberedIdentifier", identifier)
        } else {
          localStorage.removeItem("rememberedIdentifier")
        }
        
        login(userData || response.data)
      }
      
      // Delay redirect to show success message
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg space-y-8 rounded-lg border border-white/5 bg-neutral-800/50 p-10 shadow-2xl backdrop-blur-sm">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-brand-light">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Sign in to your account to continue
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded text-sm">
          {success}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Email or Username"
            type="text"
            placeholder="name@example.com or user123"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-white/10 bg-neutral-800 text-brand-accent focus:ring-brand-accent"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-neutral-400"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              href="#"
              className="font-medium text-brand-accent hover:opacity-80 transition-opacity"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-brand-accent text-brand-dark hover:bg-brand-accent/90"
            loading={isLoading}
          >
            Sign in
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-neutral-400">Don&apos;t have an account? </span>
        <Link
          href="/signup"
          className="font-medium text-brand-accent hover:opacity-80 transition-opacity"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}
