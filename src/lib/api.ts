import axios from "axios"

// Configuration automatique selon l'environnement
const getApiUrl = () => {
  // Si on a défini VITE_API_URL, on l'utilise
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // Sinon, automatique selon l'environnement
  if (import.meta.env.PROD) {
    return "https://clickdeal.onrender.com/api"  // Production
  }
  
  return "http://localhost:8080/api"  // Développement
}

const API_BASE_URL = getApiUrl()

console.log("🔗 API URL:", API_BASE_URL) // Pour débugger

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api