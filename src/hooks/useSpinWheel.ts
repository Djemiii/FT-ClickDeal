/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../lib/api"

interface WheelPrize {
  id: string
  label: string
  value: number
  type: "discount" | "points" | "coupon" | "nothing"
  probability: number
  color: string
}

interface WheelConfig {
  prizes: WheelPrize[]
  settings: {
    maxSpinsPerDay: number
    isActive: boolean
    requireLogin: boolean
    cooldownMinutes: number
  }
}

interface SpinWheelStats {
  totalSpins: number
  spinsToday: number
  prizesWon: number
  activeUsers: number
}

// Get Spin Wheel Configuration
export const useSpinWheelConfig = () => {
  return useQuery<WheelConfig>({
    queryKey: ["spinwheel", "config"],
    queryFn: async () => {
      try {
        const response = await api.get("/admin/spinwheel/config")
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération de la configuration")
      }
    },
  })
}

// Update Spin Wheel Configuration
export const useUpdateSpinWheelConfig = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, WheelConfig>({
    mutationFn: async (config: WheelConfig) => {
      try {
        await api.put("/admin/spinwheel/config", config)
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour de la configuration")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spinwheel", "config"] })
    },
  })
}

// Get Spin Wheel Statistics
export const useSpinWheelStats = () => {
  return useQuery<SpinWheelStats>({
    queryKey: ["spinwheel", "stats"],
    queryFn: async () => {
      try {
        const response = await api.get("/admin/spinwheel/stats")
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération des statistiques")
      }
    },
  })
}
