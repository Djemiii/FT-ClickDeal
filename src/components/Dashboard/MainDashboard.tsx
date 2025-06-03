/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import type React from "react"
import { useState } from "react"
import DashboardLayout from "../Layout/DashboardLayout"
import AdminDashboard from "./AdminDashboard"
import CompanyDashboard from "./CompanyDashboard"
import ConsumerDashboard from "./ConsumerDashboard"
import UserProfile from "../Profile/UserProfile"
import NotificationCenter from "../Notifications/NotificationCenter"
import { useCurrentUser } from "../../hooks/useAuth"
import SpinWheelAdmin from "./SpinWheel/SpinWheelAdmin"
import SpinWheelGame from "../SpinWheel/SpinWheelGame"
import MyCouponsPage from "./Coupons/MyCouponsPage"
import MyCouponsConsumerPage from "./Coupons/MyCouponsPage"


const MainDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { data: user } = useCurrentUser()

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />
      case "notifications":
        return <NotificationCenter />
      case "settings":
        return <SettingsPage />
      case "my-coupons":
        if (user?.role === "entreprise") {
          return <MyCouponsPage />
        } else {
          return <div><MyCouponsConsumerPage/></div>
        }
        break
      case "spin-wheel-admin":
        if (user?.role === "admin") {
          return <SpinWheelAdmin />
        }
        break
      case "spin-wheel":
        return <SpinWheelGame />
      case "dashboard":
        if (user?.role === "admin") {
           //@ts-ignore
          return <AdminDashboard activeTab="dashboard" />
        } else if (user?.role === "entreprise") {
           //@ts-ignore
          return <CompanyDashboard activeTab="dashboard" />
        } else {
          return <ConsumerDashboard />
        }
        break
      case "pending-coupons":
      case "all-users":
      case "moderation":
        if (user?.role === "admin") {
          //@ts-ignore
          return <AdminDashboard activeTab={activeTab} />
        }
        break
      case "create-coupon":
      case "statistics":
      case "company-settings":
        if (user?.role === "entreprise") {
           //@ts-ignore
          return <CompanyDashboard activeTab={activeTab} />
        }
        break
      default:
        return <div>Contenu à implémenter pour {activeTab}</div>
    }

    // Default dashboard based on role
    if (user?.role === "admin") {
       //@ts-ignore
      return <AdminDashboard activeTab="dashboard" />
    } else if (user?.role === "entreprise") {
       //@ts-ignore
      return <CompanyDashboard activeTab="dashboard" />
    } else {
      return <ConsumerDashboard />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}

export default MainDashboard
