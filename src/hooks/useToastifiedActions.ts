"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../components/Toast/ToastProvider"
import api from "../lib/api"

// Hook pour les actions avec toast automatique
export const useToastifiedMutation = <TData, TError, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    successMessage?: string
    errorMessage?: string
    onSuccess?: (data: TData) => void
    onError?: (error: TError) => void
    invalidateQueries?: string[][]
  } = {},
) => {
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess: (data) => {
      if (options.successMessage) {
        showToast({
          type: "success",
          title: options.successMessage,
        })
      }

      if (options.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey })
        })
      }

      options.onSuccess?.(data)
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: options.errorMessage || "Une erreur est survenue",
        message: error instanceof Error ? error.message : "Veuillez réessayer",
      })

      options.onError?.(error)
    },
  })
}

// Exemples d'utilisation avec toast
export const useCreateCouponWithToast = () => {
  return useToastifiedMutation(
    async (data: any) => {
      const response = await api.post("/coupons", data)
      return response.data
    },
    {
      successMessage: "Coupon créé avec succès!",
      errorMessage: "Erreur lors de la création du coupon",
      invalidateQueries: [["coupons"], ["coupons", "mine"]],
    },
  )
}

export const useDeleteCouponWithToast = () => {
  return useToastifiedMutation(
    async (id: string) => {
      await api.delete(`/coupons/${id}`)
    },
    {
      successMessage: "Coupon supprimé avec succès!",
      errorMessage: "Erreur lors de la suppression du coupon",
      invalidateQueries: [["coupons"], ["coupons", "mine"]],
    },
  )
}
