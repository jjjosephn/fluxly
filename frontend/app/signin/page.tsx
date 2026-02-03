import { SignInCard } from '@/components/signin/sign-in-page'
import React from 'react'

const Signin = () => {
  return (
    <div className='w-full h-full min-h-screen bg-gradient-to-br from-pri via-blue-900 to-sec flex items-center justify-center p-4'>
      <SignInCard />
    </div>
  )
}

export default Signin