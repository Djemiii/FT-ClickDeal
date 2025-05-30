"use client"

import type React from "react"
import { Bell, Check, Trash2, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
  useDeleteAllNotifications,
} from "../../hooks/useNotifications"

const NotificationCenter: React.FC = () => {
  const { data: notifications, isLoading } = useNotifications()
  const markAsRead = useMarkNotificationRead()
  const markAllAsRead = useMarkAllNotificationsRead()
  const deleteNotification = useDeleteNotification()
  const deleteAllNotifications = useDeleteAllNotifications()

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead.mutateAsync(id)
    } catch (error) {
      console.error("Erreur lors du marquage comme lu:", error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead.mutateAsync()
    } catch (error) {
      console.error("Erreur lors du marquage de toutes les notifications:", error)
    }
  }

  const handleDeleteNotification = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette notification ?")) {
      try {
        await deleteNotification.mutateAsync(id)
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
      }
    }
  }

  const handleDeleteAll = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer toutes les notifications ?")) {
      try {
        await deleteAllNotifications.mutateAsync()
      } catch (error) {
        console.error("Erreur lors de la suppression de toutes les notifications:", error)
      }
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "error":
        return "bg-red-50 border-red-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-gray-400 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              {notifications && notifications.length > 0 && (
                <span className="ml-3 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {notifications.filter((n) => !n.read).length} non lues
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleMarkAllAsRead}
                disabled={markAllAsRead.isPending}
                className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50"
              >
                <Check className="w-4 h-4 inline mr-1" />
                Tout marquer comme lu
              </button>
              <button
                onClick={handleDeleteAll}
                disabled={deleteAllNotifications.isPending}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4 inline mr-1" />
                Tout supprimer
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-6">
          {!notifications || notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucune notification</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`border rounded-lg p-4 transition-all hover:shadow-md ${getNotificationBg(
                    notification.type,
                  )} ${!notification.read ? "border-l-4" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notification.createdAt).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification._id)}
                          disabled={markAsRead.isPending}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteNotification(notification._id)}
                        disabled={deleteNotification.isPending}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationCenter
