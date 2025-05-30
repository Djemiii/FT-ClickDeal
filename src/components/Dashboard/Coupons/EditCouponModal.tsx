"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Save } from "lucide-react"
import { useUpdateCoupon } from "../../../hooks/useCoupons"

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
}

interface EditCouponModalProps {
  coupon: Coupon
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const EditCouponModal: React.FC<EditCouponModalProps> = ({ coupon, isOpen, onClose, onSuccess }) => {
  const updateCoupon = useUpdateCoupon()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: 0,
    category: "",
    location: "",
    startDate: "",
    endDate: "",
    conditions: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (coupon) {
      setFormData({
        title: coupon.title,
        description: coupon.description,
        discount: coupon.discount,
        category: coupon.category,
        location: coupon.location,
        startDate: coupon.startDate.split("T")[0],
        endDate: coupon.endDate.split("T")[0],
        conditions: coupon.conditions,
      })
    }
  }, [coupon])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Le titre est requis"
    }
    if (!formData.description.trim()) {
      newErrors.description = "La description est requise"
    }
    if (formData.discount < 1 || formData.discount > 100) {
      newErrors.discount = "La réduction doit être entre 1 et 100%"
    }
    if (!formData.category) {
      newErrors.category = "La catégorie est requise"
    }
    if (!formData.location.trim()) {
      newErrors.location = "La localisation est requise"
    }
    if (!formData.startDate) {
      newErrors.startDate = "La date de début est requise"
    }
    if (!formData.endDate) {
      newErrors.endDate = "La date de fin est requise"
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = "La date de fin doit être après la date de début"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await updateCoupon.mutateAsync({
        id: coupon._id,
        data: formData,
      })
      onSuccess()
      onClose()
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Modifier le coupon</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre du coupon *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ex: Réduction sur tous nos produits"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Décrivez votre offre en détail..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pourcentage de réduction *</label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: Number.parseInt(e.target.value) })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.discount ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.discount && <p className="mt-1 text-sm text-red-600">{errors.discount}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Mode">Mode</option>
                <option value="Beauté">Beauté</option>
                <option value="Électronique">Électronique</option>
                <option value="Santé">Santé</option>
                <option value="Alimentation">Alimentation</option>
                <option value="Services">Services</option>
                <option value="Loisirs">Loisirs</option>
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Localisation *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ex: Cotonou, Porto-Novo..."
            />
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date de début *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.startDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.endDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conditions d'utilisation</label>
            <textarea
              rows={2}
              value={formData.conditions}
              onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Valable du lundi au vendredi, non cumulable..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={updateCoupon.isPending}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {updateCoupon.isPending ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCouponModal
