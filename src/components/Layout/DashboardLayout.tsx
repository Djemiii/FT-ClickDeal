"use client"

import type React from "react"
import Sidebar from "./Sidebar"
import { useCurrentUser } from "../../hooks/useAuth"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { data: user } = useCurrentUser()
  const userRole = (user?.role as "admin" | "entreprise" | "consommateur") || "consommateur"

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} userRole={userRole} />

      {/* Main content */}
      <div className="lg:pl-64 transition-all duration-300">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
