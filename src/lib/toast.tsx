import toast, { Toaster, type ToastOptions } from "react-hot-toast"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

// Configuration par défaut des toasts
const defaultOptions: ToastOptions = {
  duration: 4000,
  position: "top-right",
}

// Types de toast avec leurs styles
const toastTypes = {
  success: {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    className: "bg-green-50 border-green-200 text-green-800",
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-red-500" />,
    className: "bg-red-50 border-red-200 text-red-800",
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-500" />,
    className: "bg-blue-50 border-blue-200 text-blue-800",
  },
  warning: {
    icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    className: "bg-yellow-50 border-yellow-200 text-yellow-800",
  },
}

// Fonctions pour afficher différents types de toasts
export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${toastTypes.success.className} flex items-center p-3 shadow-md rounded-lg border ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          {toastTypes.success.icon}
          <span className="ml-2">{message}</span>
        </div>
      ),
      { ...defaultOptions, ...options },
    )
  },
  error: (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${toastTypes.error.className} flex items-center p-3 shadow-md rounded-lg border ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          {toastTypes.error.icon}
          <span className="ml-2">{message}</span>
        </div>
      ),
      { ...defaultOptions, ...options },
    )
  },
  info: (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${toastTypes.info.className} flex items-center p-3 shadow-md rounded-lg border ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          {toastTypes.info.icon}
          <span className="ml-2">{message}</span>
        </div>
      ),
      { ...defaultOptions, ...options },
    )
  },
  warning: (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${toastTypes.warning.className} flex items-center p-3 shadow-md rounded-lg border ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          {toastTypes.warning.icon}
          <span className="ml-2">{message}</span>
        </div>
      ),
      { ...defaultOptions, ...options },
    )
  },
}

// Composant Toaster à ajouter dans le layout principal
export const ToastProvider = () => {
  return <Toaster />
}
