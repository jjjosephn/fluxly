'use client'
import React, { useState } from 'react'

const Signup = () => {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const handleOnSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      const requestBody = {
         email,
         name,
         username,
         password
      }

      try {
         const res = await fetch(`http://localhost:8080/api/users/`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
         })

         if (!res.ok) {
            throw new Error('Failed to sign up')
         }
         const data = await res.json()
         console.log('User signed up successfully:', data)
      } catch (error) {
         console.error('Error signing up:', error)
      }
   }

   return (
      <div>
         <h1>Signup</h1>
         <form onSubmit={handleOnSubmit}>
            <input
               type="text"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <input
               type="text"
               placeholder="Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <input
               type="text"
               placeholder="Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
            <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
         </form>
      </div>
   )
}

export default Signup