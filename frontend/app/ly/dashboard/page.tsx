'use client'

import { useAuth } from '@/lib/auth'

const Dashboard = () => {
  const { loading } = useAuth();

  if (loading) return null

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard