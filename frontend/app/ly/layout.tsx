import { Sidebar } from '@/components/sidebar';
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div>
         <Sidebar />
         <main>
            {children}
         </main>
      </div>
   );
}