'use client'

import { useAuth } from '@/lib/auth'
import React from 'react'

const Dashboard = () => {
  useAuth();

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard