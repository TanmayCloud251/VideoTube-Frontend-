"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { registerUser } from "@/services/auth.service"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  })
  const [avatar, setAvatar] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")
    
    // Manual validation for the hidden file input
    if (!avatar) {
      setError("Please upload an avatar image.")
      setIsLoading(false)
      return
    }

    console.log("Starting registration request...")
    const data = new FormData()
    data.append("fullName", formData.fullName)
    data.append("email", formData.email)
    data.append("username", formData.username)
    data.append("password", formData.password)
    data.append("avatar", avatar)

    try {
      console.log("Calling registerUser service...")
      const response = await registerUser(data)
      console.log("Registration Response Success:", response)
      
      setSuccess(response.message || "Registration successful! Redirecting to login...")
      
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err: any) {
      console.error("Registration Catch Block Triggered!")
      console.error("Full Error Object:", err)
      if (err.response) {
        console.error("Error Response Data:", err.response.data)
        console.error("Error Response Status:", err.response.status)
      } else if (err.request) {
        console.error("No response received. Request details:", err.request)
      } else {
        console.error("Error Message:", err.message)
      }
      setError(err.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
      console.log("Registration process finished.")
    }
  }

  return (
    <div className="w-full max-w-xl space-y-6 rounded-lg border border-white/5 bg-neutral-800/50 p-10 shadow-2xl backdrop-blur-sm">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-brand-light">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Join VideoTube today
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

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="johndoe123"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-light">
            <span className="text-red-500 mr-1 font-bold">*</span>
            Avatar Image
          </label>
          <div className="flex w-full items-center justify-center">
            <label className="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/10 bg-neutral-800/50 hover:bg-neutral-800 hover:border-brand-accent transition-all">
              <div className="flex flex-col items-center justify-center pb-2 pt-2">
                <p className="text-xs text-neutral-400">
                  {avatar ? avatar.name : "Click to upload avatar"}
                </p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-brand-accent text-brand-dark hover:bg-brand-accent/90 mt-4"
          loading={isLoading}
        >
          Create Account
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-neutral-400">Already have an account? </span>
        <Link
          href="/login"
          className="font-medium text-brand-accent hover:opacity-80 transition-opacity"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}
