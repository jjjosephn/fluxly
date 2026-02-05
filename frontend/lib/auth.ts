'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export function useAuth({ redirectIfAuthed = false } = {}) {
   const router = useRouter()
   const pathname = usePathname();
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const token = localStorage.getItem('token')

      if (redirectIfAuthed && token) {
         router.replace('/ly/dashboard')
         return
      }

      if (!redirectIfAuthed && !token) {
         router.replace('/signin')
         return
      }

      setLoading(false)
   }, [router, pathname, redirectIfAuthed])

   return { loading }
}

export function getUserFromToken() {
   if (typeof window === 'undefined') return null

   const token = localStorage.getItem('token')

   if (!token) return null

   try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return {
         id: payload.sub,
         username: payload.username,
         name: payload.name,
         email: payload.email,
      }
   } catch (error) {
      console.error('Failed to parse token:', error)
      return null
   }
}

export async function signUp(name: string, username: string, email: string, password: string) {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, email, password })
   })

   const text = await res.text();

   if (!res.ok) {
      throw new Error(text || 'Failed to sign up')
   }

   const data = await JSON.parse(text)
   localStorage.setItem('token', data.token)
   return data
}

export async function signIn(emailOrUsername: string, password: string) {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/signin`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailOrUsername, password })
   })

   if (!res.ok) {
      throw new Error('Incorrect email, username, or password')
   }

   const data = await res.json()
   localStorage.setItem('token', data.token)
   return data
}

export function signOut() {
   localStorage.removeItem('token')

   if (typeof window !== 'undefined') {
      window.location.href = '/'   
   }
}
