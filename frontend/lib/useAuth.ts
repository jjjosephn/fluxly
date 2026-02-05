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
