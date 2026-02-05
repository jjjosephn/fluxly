'use client'

import React, { useRef } from "react"

import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { BouncingDots } from '@/components/ui/bouncing-dots'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { useToaster } from "@/app/ToasterContext"
import { getUserFromToken, signUp } from "@/lib/auth"

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })
  const router = useRouter()
  const { showToast } = useToaster();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
        const data = await signUp(formData.name, formData.username, formData.email, formData.password)

        if (!data.token) {
          throw new Error('Signup failed. Please try again.')
        }
        
        const user = getUserFromToken();
        showToast('success', `Welcome to Fluxly, ${user?.name.split(' ')[0]}.`, 'top-center');

        setFormData({
          email: '',
          name: '',
          username: '',
          password: ''
        });

        router.push("/ly/dashboard")
    } catch (error: any) {
      showToast('error', error.message || 'Unable to connect to the server. Please check your connection and try again later.', 'top-center');
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Left Panel */}
        <div className="flex-1 relative overflow-hidden md:block hidden p-4">
          <div className="relative w-full h-full rounded-lg overflow-hidden ring-4 ring-white/80 shadow-lg">
            <div className="absolute top-4 left-4 z-10">
              <Link
                href="/"
                className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full border-2 border-white flex items-center justify-center hover:bg-black/30 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
            </div>

            <Image
              src='/fluxlysignup.jpg'
              alt="Signup Image"
              className="object-cover"
              fill
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h1>
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-medium">
                Log in
              </Link>
            </p>
          </div>

          <form onSubmit={handleOnSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cta text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <BouncingDots dots={3} message="Submitting" messagePlacement="right" className="w-2 h-2 bg-white" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
  )
}
