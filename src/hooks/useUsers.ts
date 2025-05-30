import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../lib/api"

interface User {
  _id: string
  name: string
  email: string
  role: string
  logo?: string
  createdAt: string
  updatedAt: string
}

interface UpdateUserData {
  name?: string
  email?: string
}

interface CompanyStats {
  totalCoupons: number
  activeCoupons: number
  pendingCoupons: number
  totalViews: number
  totalDownloads: number
  totalConversions: number
  conversionRate: number
}

// Get Current User Profile
export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["user", "me"],
    queryFn: async () => {
      try {
        const response = await api.get("/users/me")
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération du profil")
      }
    },
    initialData: () => {
      const user = localStorage.getItem("user")
      return user ? JSON.parse(user) : undefined
    },
    retry: false,
  })
}

// Update User Profile
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation<User, Error, UpdateUserData>({
    mutationFn: async (data: UpdateUserData) => {
      try {
        const response = await api.put("/users/me", data)
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour du profil")
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "me"], data)
      localStorage.setItem("user", JSON.stringify(data))
    },
  })
}

// Upload Company Logo
export const useUploadLogo = () => {
  const queryClient = useQueryClient()

  return useMutation<{ logoUrl: string }, Error, File>({
    mutationFn: async (file: File) => {
      try {
        const formData = new FormData()
        formData.append("logo", file)

        const response = await api.post("/users/logo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors du téléchargement du logo")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] })
    },
  })
}

// Get Company Stats
export const useCompanyStats = () => {
  return useQuery<CompanyStats>({
    queryKey: ["company", "stats"],
    queryFn: async () => {
      try {
        const response = await api.get("/company/coupons/stats")
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération des statistiques")
      }
    },
  })
}

// Change Password
export const useChangePassword = () => {
  return useMutation<void, Error, { currentPassword: string; newPassword: string }>({
    mutationFn: async (data) => {
      try {
        await api.put("/users/change-password", data)
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors du changement de mot de passe")
      }
    },
  })
}

// Delete User Account
export const useDeleteAccount = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error>({
    mutationFn: async () => {
      try {
        await api.delete("/users/me")
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la suppression du compte")
      }
    },
    onSuccess: () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      queryClient.clear()
      window.location.href = "/login"
    },
  })
}

// Update User Preferences
export const useUpdateUserPreferences = () => {
  const queryClient = useQueryClient()

  return useMutation<User, Error, { notifications: boolean; newsletter: boolean; language: string }>({
    mutationFn: async (preferences) => {
      try {
        const response = await api.put("/users/preferences", preferences)
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour des préférences")
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "me"], data)
      localStorage.setItem("user", JSON.stringify(data))
    },
  })
}
