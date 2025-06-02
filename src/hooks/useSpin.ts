/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../lib/api"

interface SpinResult {
  prize: string
  value: number
  type: "discount" | "points" | "coupon"
}

interface SpinHistory {
  _id: string
  prize: string
  value: number
  type: string
  date: string
}

// Spin the Wheel
export const useSpin = () => {
  const queryClient = useQueryClient()

  return useMutation<SpinResult, Error>({
    mutationFn: async () => {
      try {
        const response = await api.post("/spin")
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors du spin")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spin", "history"] })
    },
  })
}

// Get Spin History
export const useSpinHistory = () => {
  return useQuery<SpinHistory[]>({
    queryKey: ["spin", "history"],
    queryFn: async () => {
      try {
        const response = await api.get("/spin/history")
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération de l'historique")
      }
    },
  })
}
