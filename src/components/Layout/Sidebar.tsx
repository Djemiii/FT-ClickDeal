"use client"

import type React from "react"
import { useState } from "react"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  BarChart3,
  Gift,
  Shield,
  Building,
  Menu,
  X,
} from "lucide-react"
import { useCurrentUser, useLogout } from "../../hooks/useAuth"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userRole: "admin" | "entreprise" | "consommateur"
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, userRole }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { data: user } = useCurrentUser()
  const logout = useLogout()

  const handleLogout = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      await logout.mutateAsync()
      window.location.href = "/login"
    }
  }

  const getMenuItems = () => {
    const commonItems = [
      { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
      { id: "profile", label: "Mon profil", icon: User },
      { id: "notifications", label: "Notifications", icon: Bell },
    ]

    if (userRole === "admin") {
      return [
        ...commonItems,
        { id: "pending-coupons", label: "Coupons en attente", icon: FileText },
        { id: "all-users", label: "Utilisateurs", icon: Users },
        { id: "moderation", label: "Modération", icon: Shield },
        { id: "settings", label: "Paramètres", icon: Settings },
      ]
    }

    if (userRole === "entreprise") {
      return [
        ...commonItems,
        { id: "my-coupons", label: "Mes coupons", icon: FileText },
        { id: "create-coupon", label: "Créer un coupon", icon: Gift },
        { id: "statistics", label: "Statistiques", icon: BarChart3 },
        { id: "company-settings", label: "Paramètres", icon: Building },
      ]
    }

    return [
      ...commonItems,
      { id: "my-coupons", label: "Mes coupons", icon: FileText },
      { id: "spin-wheel", label: "Roue de la fortune", icon: Gift },
      { id: "history", label: "Historique", icon: BarChart3 },
    ]
  }

  const menuItems = getMenuItems()

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CD</span>
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">ClickDeal</h1>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">{user.name?.charAt(0).toUpperCase()}</span>
            </div>
            {!isCollapsed && (
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          disabled={logout.isPending}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">Déconnexion</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileOpen(false)} />
        </div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-4 right-4">
          <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-md text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-white shadow-lg transition-all duration-300 ${
          isCollapsed ? "lg:w-16" : "lg:w-64"
        }`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
        <SidebarContent />
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-md shadow-md"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  )
}

export default Sidebar
