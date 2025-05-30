import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../lib/api"

interface RegisterData {
  name: string
  email: string
  password: string
  role: "consommateur" | "entreprise"
}

interface LoginData {
  email: string
  password: string
}

interface AuthResponse {
  token: string
  user: {
    _id: string
    name: string
    email: string
    role: string
    logo?: string
    createdAt: string
    updatedAt: string
  }
}

interface UpdateUserData {
  name?: string
  email?: string
   phone: string,
  address?: string,
  description?: string,
  website?: string,
  secteurActivite?: string,
  logo?: string,
}
       

// Register Hook
export const useRegister = () => {
  return useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: async (data: RegisterData) => {
      try {
        const response = await api.post("/auth/register", data)
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de l'inscription")
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
    },
  })
}

// Login Hook
export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation<AuthResponse, Error, LoginData>({
    mutationFn: async (data: LoginData) => {
      try {
        const response = await api.post("/auth/login", data)
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la connexion")
      }
    },
    onSuccess: (data) => {
      console.log("Login successful:", data)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      queryClient.setQueryData(["user", "me"], data.user)
    },
  })
}

// Logout Hook
export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

// Get Current User
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      try {
        const response = await api.get("/users/me")
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération du profil")
      }
    },
    // initialData: () => {
    //   const user = localStorage.getItem("user")
    //   return user ? JSON.parse(user) : undefined
    // },
    retry: false,
  })
}

// Update User
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation<any, Error, UpdateUserData>({
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

// Upload Logo
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
        console.log(error, "Error uploading logo")
        throw new Error(error.response?.data?.message || "Erreur lors du téléchargement du logo")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] })
    },
  })
}
