import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
   const router = useRouter();
   

   useEffect(() => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) {
         router.push('/signin');
      }
   }, [router]);
   

   
}
