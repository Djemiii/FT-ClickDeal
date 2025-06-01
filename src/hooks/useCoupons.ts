import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../lib/api"

export interface Coupon {
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
  company:{_id:string;email:string;name:string}
  createdAt: string
  updatedAt: string
  
}
export interface CouponType {
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
  company:{_id:string;email:string;name:string}
  createdAt: string
  updatedAt: string
  
}

interface CreateCouponData {
  title: string
  description: string
  discount: number
  category: string
  location: string
  startDate: string
  endDate: string
  conditions: string
}

interface CouponsFilters {
  page?: number
  limit?: number
  category?: string
  location?: string
  search?: string
}

// Get All Coupons
export const useCoupons = (filters: CouponsFilters = {}) => {
  return useQuery<Coupon[]>({
    queryKey: ["coupons", filters],
    queryFn: async () => {
      try {
        const response = await api.get("/coupons", { params: filters })
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération des coupons")
      }
    },
  })
}

// Get My Coupons (for companies)
export const useMyCoupons = () => {
  return useQuery<Coupon[]>({
    queryKey: ["myCoupons"],
    queryFn: async () => {
      try {
        const response = await api.get("/coupons/mine")
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération de vos coupons")
      }
    },
  })
}

// Get Coupon by ID
export const useCoupon = (id: string) => {
  return useQuery<Coupon>({
    queryKey: ["coupon", id],
    queryFn: async () => {
      try {
        const response = await api.get(`/coupons/${id}`)
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération du coupon")
      }
    },
    enabled: !!id,
  })
}

// Create Coupon
export const useCreateCoupon = () => {
  const queryClient = useQueryClient()

  return useMutation<Coupon, Error, CreateCouponData>({
    mutationFn: async (data: CreateCouponData) => {
      try {
        const response = await api.post("/coupons", data)
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la création du coupon")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
      queryClient.invalidateQueries({ queryKey: ["myCoupons"] })
    },
  })
}

// Update Coupon
export const useUpdateCoupon = () => {
  const queryClient = useQueryClient()

  return useMutation<Coupon, Error, { id: string; data: Partial<CreateCouponData> }>({
    mutationFn: async ({ id, data }) => {
      try {
        const response = await api.put(`/coupons/${id}`, data)
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour du coupon")
      }
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["coupon", id] })
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
      queryClient.invalidateQueries({ queryKey: ["myCoupons"] })
    },
  })
}

// Delete Coupon
export const useDeleteCoupon = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      try {
        await api.delete(`/coupons/${id}`)
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la suppression du coupon")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] })
      queryClient.invalidateQueries({ queryKey: ["myCoupons"] })
    },
  })
}
