import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../lib/api"

interface Notification {
  _id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}

// Get User Notifications
export const useNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const response = await api.get("/notifications")
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération des notifications")
      }
    },
  })
}

// Mark Notification as Read
export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      try {
        await api.patch(`/notifications/${id}/read`)
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour de la notification")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}

// Mark All Notifications as Read
export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error>({
    mutationFn: async () => {
      try {
        await api.patch("/notifications/read-all")
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour des notifications")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}

// Delete Notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      try {
        await api.delete(`/notifications/${id}`)
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la suppression de la notification")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}

// Delete All Notifications
export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error>({
    mutationFn: async () => {
      try {
        await api.delete("/notifications")
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la suppression des notifications")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}
