"use client"

import type React from "react"
import { useState } from "react"
import { Gift, MapPin, Clock, Star, TrendingUp, Search } from "lucide-react"
import { useCoupons } from "../../hooks/useCoupons"
import { useSpinHistory } from "../../hooks/useSpin"
import CouponOverlay from "../CouponOverlay"

const ConsumerDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [location, setLocation] = useState("")

  const { data: coupons, isLoading } = useCoupons({
    search: searchTerm,
    category: selectedCategory,
    location: location,
  })
  const { data: spinHistory } = useSpinHistory()

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          // Ici vous pourriez faire un appel API pour récupérer les coupons à proximité
          alert("Localisation activée ! Recherche des coupons à proximité...")
        },
        (error) => {
          alert("Impossible d'obtenir votre localisation")
        },
      )
    }
  }

  const categories = ["Restaurant", "Mode", "Beauté", "Électronique", "Santé", "Alimentation", "Services", "Loisirs"]
  const recentCoupons = Array.isArray(coupons) && coupons?.slice(0, 8) || []
  const popularCoupons =  Array.isArray(coupons) && coupons?.sort((a, b) => (b.downloads || 0) - (a.downloads || 0)).slice(0, 6) || []

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Découvrez les meilleures offres et gérez vos coupons</p>
      </div>

      {/* Statistiques utilisateur */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Gift className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Coupons utilisés</p>
              <p className="text-2xl font-bold text-gray-900">
                {spinHistory?.filter((h) => h.type !== "nothing").length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Économies totales</p>
              <p className="text-2xl font-bold text-gray-900">2,450 FCFA</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Points fidélité</p>
              <p className="text-2xl font-bold text-gray-900">1,250</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Coupons actifs</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher des coupons..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Toutes catégories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                onClick={handleGetLocation}
                className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MapPin className="w-4 h-4 mr-2" />À proximité
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Roue de la Fortune</h3>
              <p className="text-blue-100 mb-4">Tentez votre chance quotidienne</p>
              <button
                onClick={() => (window.location.href = "/dashboard?tab=spin-wheel")}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Jouer maintenant
              </button>
            </div>
            <Gift className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Offres du jour</h3>
              <p className="text-green-100 mb-4">12 nouvelles offres disponibles</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                Découvrir
              </button>
            </div>
            <TrendingUp className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Mes favoris</h3>
              <p className="text-orange-100 mb-4">5 coupons sauvegardés</p>
              <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                Voir tout
              </button>
            </div>
            <Star className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Coupons récents */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Nouveaux coupons</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">Voir tout →</button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentCoupons.map((coupon) => (
              <CouponOverlay key={coupon._id} coupon={coupon} />
            ))}
          </div>
        )}
      </div>

      {/* Coupons populaires */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Coupons populaires</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">Voir tout →</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCoupons.map((coupon) => (
            <CouponOverlay key={coupon._id} coupon={coupon} />
          ))}
        </div>
      </div>

      {/* Historique récent */}
      {spinHistory && spinHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Activité récente</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {spinHistory.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Gift className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.prize}</p>
                      <p className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString("fr-FR")}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {item.type === "discount" && `${item.value}% de réduction`}
                    {item.type === "points" && `${item.value} points`}
                    {item.type === "coupon" && "Coupon gratuit"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConsumerDashboard
