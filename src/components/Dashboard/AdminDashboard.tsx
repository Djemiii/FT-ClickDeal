"use client"

import type React from "react"
import { useState } from "react"
import { Users, FileText, CheckCircle, Trash2, Search, Filter, Calendar, MapPin, Tag } from "lucide-react"
import { usePendingCoupons, useApproveCoupon, useAdminDeleteCoupon, useAllUsers } from "../../hooks/useAdmin"

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "users">("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const { data: pendingCoupons, isLoading: loadingCoupons } = usePendingCoupons()
  const { data: users, isLoading: loadingUsers } = useAllUsers()
  const approveCoupon = useApproveCoupon()
  const deleteCoupon = useAdminDeleteCoupon()

  const handleApproveCoupon = async (id: string) => {
    try {
      await approveCoupon.mutateAsync(id)
      alert("Coupon approuvé avec succès!")
    } catch (error) {
      alert("Erreur lors de l'approbation du coupon")
    }
  }

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

  const filteredCoupons = pendingCoupons?.filter((coupon) => {
    const matchesSearch =
      coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || coupon.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(pendingCoupons?.map((coupon) => coupon.category) || [])]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrateur</h1>
          <p className="text-gray-600">Gérez les coupons et utilisateurs de la plateforme</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Coupons en attente</p>
                <p className="text-2xl font-bold text-gray-900">{pendingCoupons?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
                <p className="text-2xl font-bold text-gray-900">{users?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Entreprises</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users?.filter((user) => user.role === "entreprise").length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Consommateurs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users?.filter((user) => user.role === "consommateur").length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("pending")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "pending"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Coupons en attente ({pendingCoupons?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Utilisateurs ({users?.length || 0})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "pending" && (
              <div>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Rechercher par titre ou entreprise..."
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
                </div>

                {/* Pending Coupons List */}
                {loadingCoupons ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Chargement des coupons...</p>
                  </div>
                ) : filteredCoupons?.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun coupon en attente</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCoupons?.map((coupon) => (
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
                            </div>

                            <p className="text-gray-600 mb-4">{coupon.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
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

                            <div className="mt-4 text-sm text-gray-500">
                              <p>
                                <strong>Entreprise:</strong> {coupon.company}
                              </p>
                              <p>
                                <strong>Conditions:</strong> {coupon.conditions}
                              </p>
                              <p>
                                <strong>Créé le:</strong> {new Date(coupon.createdAt).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 ml-6">
                            <button
                              onClick={() => handleApproveCoupon(coupon._id)}
                              disabled={approveCoupon.isPending}
                              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approuver
                            </button>
                            <button
                              onClick={() => handleDeleteCoupon(coupon._id)}
                              disabled={deleteCoupon.isPending}
                              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "users" && (
              <div>
                {loadingUsers ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Chargement des utilisateurs...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Utilisateur
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rôle
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date d'inscription
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users?.map((user) => (
                          <tr key={user._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-700">
                                    {user.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  user.role === "entreprise"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
