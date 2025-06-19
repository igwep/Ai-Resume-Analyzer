// app/dashboard/layout.tsx

import React from 'react'
import Navbar from '../component/Dashboard/Navbar'
import Sidebar from '../component/Dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A]">
      <div className="md:ml-64">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-6 md:ml-64 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
