'use client'
import React, { useState } from 'react'

const Signup = () => {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   return (
      <div>
         <h1>Signup</h1>
         <form>
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