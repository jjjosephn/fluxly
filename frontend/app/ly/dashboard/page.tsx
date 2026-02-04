'use client'

import { useAuth } from '@/lib/useAuth'
import React from 'react'

const Dashboard = () => {
  useAuth();

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard