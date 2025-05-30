import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../lib/api"

interface User {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

interface Coupon {
  _id: string
  title: string
  description: string
  discount: number
  category: string
  location: string
  startDate: string
  endDate: string
  conditions: string
  isActive: boolean
  approved: boolean
  views: number
  downloads: number
  conversions: number
  company: string
  createdAt: string
  updatedAt: string
}

// Get Pending Coupons (Admin only)
export const usePendingCoupons = () => {
  return useQuery<Coupon[]>({
    queryKey: ["admin", "coupons", "pending"],
    queryFn: async () => {
      try {
        const response = await api.get("/admin/coupons/pending")
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération des coupons en attente")
      }
    },
  })
}

// Approve Coupon (Admin only)
export const useApproveCoupon = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      try {
        await api.patch(`/admin/coupons/${id}/approve`)
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de l'approbation du coupon")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons", "pending"] })
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
    },
  })
}

// Delete Coupon (Admin moderation)
export const useAdminDeleteCoupon = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      try {
        await api.delete(`/admin/coupons/${id}`)
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la suppression du coupon")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons", "pending"] })
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
    },
  })
}

// Get All Users (Admin only)
export const useAllUsers = () => {
  return useQuery<User[]>({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      try {
        const response = await api.get("/admin/users")
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération des utilisateurs")
      }
    },
  })
}
