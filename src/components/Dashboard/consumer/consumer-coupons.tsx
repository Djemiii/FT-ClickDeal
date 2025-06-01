"use client"

import type React from "react"
import { useState } from "react"
import { Copy, Download, QrCode, Calendar, MapPin, Tag, Search, Filter, Check, X, Eye } from "lucide-react"
import { useMyCoupons, useDeleteCoupon } from "../../../hooks/useCoupons"
interface UserCoupon {
  _id: string
  couponId: string
  title: string
  description: string
  discount: number
  category: string
  location: string
  company: string
  code: string
  qrCode: string
  activatedAt: string
  expiresAt: string
  usedAt?: string
  status: "active" | "used" | "expired"
}

const MyCouponsConsumer: React.FC = () => {
  const { data: coupons, isLoading } = useMyCoupons()
//   const activateCoupon = useActivateCoupon()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [showQRCode, setShowQRCode] = useState<string | null>(null)

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      alert("Impossible de copier le code")
    }
  }

  const handleDownloadCoupon = (coupon: UserCoupon) => {
    // Créer un canvas pour générer l'image du coupon
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    canvas.width = 800
    canvas.height = 400

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#3B82F6")
    gradient.addColorStop(1, "#8B5CF6")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Coupon content
    ctx.fillStyle = "white"
    ctx.font = "bold 32px Arial"
    ctx.fillText(coupon.title, 40, 80)

    ctx.font = "18px Arial"
    ctx.fillText(coupon.description, 40, 120)

    ctx.font = "bold 48px Arial"
    ctx.fillText(`-${coupon.discount}%`, 40, 200)

    ctx.font = "16px Arial"
    ctx.fillText(`Code: ${coupon.code}`, 40, 240)
    ctx.fillText(`Valable jusqu'au: ${new Date(coupon.expiresAt).toLocaleDateString("fr-FR")}`, 40, 270)
    ctx.fillText(`${coupon.company} - ${coupon.location}`, 40, 300)

    // Download
    const link = document.createElement("a")
    link.download = `coupon-${coupon.code}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const filteredCoupons = coupons?.filter((coupon) => {
    const matchesSearch =
      coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || coupon.category === selectedCategory
    const matchesStatus = !selectedStatus 

    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = [...new Set(coupons?.map((coupon) => coupon.category) || [])]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "used":
        return "bg-gray-100 text-gray-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Actif"
      case "used":
        return "Utilisé"
      case "expired":
        return "Expiré"
      default:
        return "Inconnu"
    }
  }

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Coupons</h1>
        <p className="text-gray-600">Gérez vos coupons activés et suivez leur utilisation</p>
      </div>

      {/* Statistiques */}
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
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Coupons actifs</p>
              <p className="text-2xl font-bold text-gray-900">
                {coupons?.filter((c) => c.isActive).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Coupons utilisés</p>
              <p className="text-2xl font-bold text-gray-900">
                {coupons?.filter((c) => c.isActive ).length || 0}
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
              <p className="text-sm font-medium text-gray-600">Économies totales</p>
              <p className="text-2xl font-bold text-gray-900">2,450 FCFA</p>
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

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="used">Utilisés</option>
              <option value="expired">Expirés</option>
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
                {coupons?.length === 0 ? "Aucun coupon activé" : "Aucun coupon trouvé"}
              </h3>
              <p className="text-gray-600 mb-6">
                {coupons?.length === 0
                  ? "Explorez les offres disponibles et activez vos premiers coupons."
                  : "Essayez de modifier vos critères de recherche."}
              </p>
              {coupons?.length === 0 && (
                <button
                  onClick={() => (window.location.href = "/coupons")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Découvrir les offres
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCoupons.map((coupon) => (
                <div
                  key={coupon._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{coupon.title}</h3>
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          -{coupon.discount}%
                        </span>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(coupon.isActive ? "active" : "expired")}`}
                        >
                          {getStatusText(coupon.isActive ? "active" : "expired")}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{coupon.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
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
                      <span>Expire le {new Date(coupon.endDate).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{coupon.company.name}</div>
                  </div>

                  {/* Code du coupon */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Code du coupon</p>
                        <p className="text-lg font-mono font-bold text-gray-900">{coupon.code}</p>
                      </div>
                      <button
                        onClick={() => handleCopyCode(coupon.code)}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copié !
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copier
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowQRCode(coupon._id)}
                      className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Code
                    </button>
                    <button
                      onClick={() => handleDownloadCoupon(coupon)}
                      className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal QR Code */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">QR Code du coupon</h3>
              <button onClick={() => setShowQRCode(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-24 h-24 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">Présentez ce QR code en magasin pour utiliser votre coupon</p>
              <button
                onClick={() => setShowQRCode(null)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyCouponsConsumer
