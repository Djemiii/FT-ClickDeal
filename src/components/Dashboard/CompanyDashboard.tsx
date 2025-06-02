/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Eye, Download, TrendingUp, Edit, Trash2, Calendar, MapPin, Tag, BarChart3, Target } from "lucide-react"
import { useMyCoupons, useDeleteCoupon, useCreateCoupon } from "../../hooks/useCoupons"
import { useCompanyStats } from "../../hooks/useUsers"
import EditCouponModal from "./Coupons/EditCouponModal"
import CreateCouponModal from "./Coupons/CreateCouponModal"

const CompanyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "coupons">("overview")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const { data: coupons, isLoading: loadingCoupons } = useMyCoupons()
  const { data: stats, isLoading: loadingStats } = useCompanyStats()
  const deleteCoupon = useDeleteCoupon()
  const createCoupon = useCreateCoupon()

  const [newCoupon, setNewCoupon] = useState({
    title: "",
    description: "",
    discount: 0,
    category: "",
    location: "",
    startDate: "",
    endDate: "",
    conditions: "",
  })

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

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createCoupon.mutateAsync(newCoupon)
      alert("Coupon créé avec succès! Il sera visible après approbation.")
      setNewCoupon({
        title: "",
        description: "",
        discount: 0,
        category: "",
        location: "",
        startDate: "",
        endDate: "",
        conditions: "",
      })
      setShowCreateForm(false)
      setActiveTab("coupons")
    } catch (error) {
      alert("Erreur lors de la création du coupon")
    }
  }

  const activeCoupons = Array.isArray(coupons) && coupons?.filter((coupon) =>  coupon.isApproved) || []
  const pendingCoupons =Array.isArray(coupons) && coupons?.filter((coupon) => !coupon.isApproved) || []

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Entreprise</h1>
          <p className="text-gray-600">Gérez vos coupons et suivez vos performances</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab("coupons")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "coupons"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Mes coupons ({coupons?.length || 0})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total coupons</p>
                        <p className="text-2xl font-bold text-gray-900">{stats?.totalCoupons || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Target className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Coupons actifs</p>
                        <p className="text-2xl font-bold text-gray-900">{stats?.activeCoupons || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Eye className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total vues</p>
                        <p className="text-2xl font-bold text-gray-900">{stats?.totalViews || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Download className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Téléchargements</p>
                        <p className="text-2xl font-bold text-gray-900">{stats?.totalDownloads || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Taux de conversion</h3>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Conversions</span>
                          <span>{stats?.conversionRate?.toFixed(1) || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${stats?.conversionRate || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-2xl font-bold text-gray-900">{stats?.totalConversions || 0}</div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut des coupons</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Actifs</span>
                        <span className="text-sm font-medium text-green-600">{activeCoupons.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">En attente</span>
                        <span className="text-sm font-medium text-yellow-600">{pendingCoupons.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total</span>
                        <span className="text-sm font-medium text-gray-900">{coupons?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "coupons" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Mes coupons</h2>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau coupon
                  </button>
                </div>

                {loadingCoupons ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Chargement des coupons...</p>
                  </div>
                ) : coupons?.length === 0 ? (
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun coupon créé</p>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Créer votre premier coupon
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {coupons?.map((coupon) => (
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
                                <span>{coupon.views} vues</span>
                              </div>
                              <div className="flex items-center">
                                <Download className="h-4 w-4 mr-1" />
                                <span>{coupon.downloads} téléchargements</span>
                              </div>
                              <div className="flex items-center">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                <span>{coupon.conversions} conversions</span>
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
            )}
          </div>
        </div>
      </div>
      {editingCoupon && (
        <EditCouponModal
          coupon={editingCoupon}
          isOpen={!!editingCoupon}
          onClose={() => setEditingCoupon(null)}
          onSuccess={() => setEditingCoupon(null)}
        />
      )}
      {showCreateModal && (
        <CreateCouponModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
          }}
        />
      )}
    </div>
  )
}

export default CompanyDashboard
