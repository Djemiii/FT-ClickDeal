"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Eye, Download, TrendingUp, Edit, Trash2, Calendar, MapPin, Tag, Search, Filter } from "lucide-react"
import { useMyCoupons, useDeleteCoupon } from "../../../hooks/useCoupons"
import EditCouponModal from "./EditCouponModal"
import CreateCouponModal from "./CreateCouponModal"

const MyCouponsConsumerPage: React.FC = () => {
  const { data: coupons, isLoading } = useMyCoupons()
  const deleteCoupon = useDeleteCoupon()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [editingCoupon, setEditingCoupon] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleDeleteCoupon = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce coupon ?")) {
      try {
        await deleteCoupon.mutateAsync(id)
        alert("Coupon supprimé avec succès!")
      } catch (error) {
        alert("Erreur lors de la suppression du coupon")
      }
    }
  }

  const filteredCoupons = coupons?.filter((coupon) => {
    const matchesSearch =
      coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || coupon.category === selectedCategory
    const matchesStatus =
      !selectedStatus ||
      (selectedStatus === "active" && coupon.isActive && coupon.approved) ||
      (selectedStatus === "pending" && !coupon.approved) ||
      (selectedStatus === "inactive" && !coupon.isActive)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = [...new Set(coupons?.map((coupon) => coupon.category) || [])]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Coupons</h1>
            <p className="text-gray-600">Gérez tous vos coupons et suivez leurs performances</p>
          </div>
          {/* <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau coupon
          </button> */}
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Tag className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total coupons</p>
              <p className="text-2xl font-bold text-gray-900">{coupons?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Coupons actifs</p>
              <p className="text-2xl font-bold text-gray-900">
                {coupons?.filter((c) => c.isActive && c.approved).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-gray-900">{coupons?.filter((c) => !c.approved).length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Download className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total téléchargements</p>
              <p className="text-2xl font-bold text-gray-900">
                {coupons?.reduce((sum, c) => sum + (c.downloads || 0), 0) || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher par titre ou description..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Toutes les catégories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="pending">En attente</option>
              <option value="inactive">Inactifs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des coupons */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {!filteredCoupons || filteredCoupons.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {coupons?.length === 0 ? "Aucun coupon " : "Aucun coupon trouvé"}
              </h3>
              <p className="text-gray-600 mb-6">
                {coupons?.length === 0
                  ? ""
                  : "Essayez de modifier vos critères de recherche."}
              </p>
              {/* {coupons?.length === 0 && (
                <button
                  onClick={() => (window.location.href = "/dashboard?tab=create-coupon")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Créer mon premier coupon
                </button>
              )} */}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCoupons.map((coupon) => (
                <div
                  key={coupon._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{coupon.title}</h3>
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          -{coupon.discount}%
                        </span>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            coupon.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {coupon.approved ? "Approuvé" : "En attente"}
                        </span>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            coupon.isActive ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {coupon.isActive ? "Actif" : "Inactif"}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{coupon.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-2" />
                          <span>{coupon.category}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{coupon.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Jusqu'au {new Date(coupon.endDate).toLocaleDateString("fr-FR")}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{coupon.views || 0} vues</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          <span>{coupon.downloads || 0} téléchargements</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span>{coupon.conversions || 0} conversions</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-6">
                      <button
                        onClick={() => setEditingCoupon(coupon)}
                        className="flex items-center px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon._id)}
                        disabled={deleteCoupon.isPending}
                        className="flex items-center px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50 disabled:opacity-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal d'édition */}
      {editingCoupon && (
        <EditCouponModal
          coupon={editingCoupon}
          isOpen={!!editingCoupon}
          onClose={() => setEditingCoupon(null)}
          onSuccess={() => {
            setEditingCoupon(null)
            // Refresh data
          }}
        />
      )}

      {/* Modal de création */}
      {showCreateModal && (
        <CreateCouponModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            // Refresh data will happen automatically via React Query
          }}
        />
      )}
    </div>
  )
}

export default MyCouponsConsumerPage
