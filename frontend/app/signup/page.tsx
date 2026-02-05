'use client'
import { SignupPage } from '@/components/signup/sign-up-page'
import { useAuth } from '@/lib/auth'

const Signup = () => {
   const { loading } = useAuth({ redirectIfAuthed: true });

   if (loading) return null

   return (
      <div className="w-full h-full min-h-screen bg-gradient-to-br from-pri via-blue-900 to-sec flex items-center justify-center p-4">
         <SignupPage />
      </div>
   )
}

export default Signup