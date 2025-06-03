/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Award, Heart, MapPin, Search, ShoppingBag, TrendingUp, Users } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"

import { Coupon } from "@/types/coupon"
import AppLoader from "../components/shared/AppLoader"
import CouponOverlay from "../components/shared/CouponOverlay"
import Pagination from "../components/shared/Pagination"
import TestimonialCarousel from "../components/shared/TestimonialCarousel"
import { useCoupons } from "../hooks/useCoupons"

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [featuredCoupons, setFeaturedCoupons] = useState<Coupon[]>([])
  const [trendingCoupons, setTrendingCoupons] = useState<Coupon[]>([])
  const [newCoupons, setNewCoupons] = useState<Coupon[]>([])
  const [popularCoupons, setPopularCoupons] = useState<Coupon[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { data: allCouponsData, isPending } = useCoupons()

  const [allCoupons, setAllCoupons] = useState<Coupon[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearbyCoupons, setNearbyCoupons] = useState<Coupon[]>([])

  const [featuredPage, setFeaturedPage] = useState(1)
  const [trendingPage, setTrendingPage] = useState(1)
  const [newPage, setNewPage] = useState(1)
  const [popularPage, setPopularPage] = useState(1)

  const itemsPerPage = 4

  useEffect(() => {
    //@ts-ignore
    if (allCouponsData && Array.isArray(allCouponsData.data)) {
      //@ts-ignore
      setAllCoupons(allCouponsData.data || [])
    }
  }, [allCouponsData])

  useEffect(() => {
    setTimeout(() => {
      setFeaturedCoupons(allCoupons.slice(0, 8))
      setTrendingCoupons(allCoupons.slice(2, 10))
      setNewCoupons(allCoupons.slice(1, 9))
      setPopularCoupons(allCoupons.slice(0, 12))
      setIsLoading(isPending)
    }, 2000)
  }, [allCoupons])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Erreur géolocalisation :", error)
        }
      )
    }
  }, [])

  const getDistanceInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  useEffect(() => {
    if (userLocation && allCoupons.length > 0) {
      const filtered = allCoupons.filter((coupon) => {
        if (!coupon.location?.lat || !coupon.location?.lng) return false
        const distance = getDistanceInKm(
          userLocation.lat,
          userLocation.lng,
          coupon.location.lat,
          coupon.location.lng
        )
        return distance <= 10
      })
      setNearbyCoupons(filtered)
    }
  }, [userLocation, allCoupons])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filtered = allCoupons.filter((coupon) =>
      coupon.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFeaturedCoupons(filtered)
    setTrendingCoupons(filtered)
    setNewCoupons(filtered)
    setPopularCoupons(filtered)
  }

  const getPaginatedItems = (items: any[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage
    return items.slice(startIndex, startIndex + itemsPerPage)
  }

  const getTotalPages = (items: any[]) => Math.ceil(items.length / itemsPerPage)

  if (isPending) {
    return <AppLoader />
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-900 to-blue-700  text-white relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Découvrez les meilleures offres locales</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              ClickDeal vous aide à économiser avec des coupons exclusifs pour vos commerces préférés au Bénin.
            </p>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full max-w-xl mx-auto gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un coupon..."
                  className="block w-full pl-10 pr-3 py-3 rounded-md text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white py-3 px-6 rounded-md">
                Rechercher
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                className="flex items-center bg-white text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-50"
                onClick={() => setFeaturedCoupons(allCoupons)}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Tous les coupons
              </button>
              <button
                className="flex items-center bg-blue-800 text-white px-6 py-3 rounded-md font-medium border border-blue-300 hover:bg-blue-700"
                onClick={() => setFeaturedCoupons(nearbyCoupons)}
              >
                <MapPin className="mr-2 h-5 w-5" />
                Offres à proximité
              </button>
            </div>

            {featuredCoupons.length === 0 && (
              <p className="text-center text-gray-200 mt-4">
                Aucune offre à moins de 10 km. Activez la localisation ou réessayez plus tard.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Coupons à la une</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getPaginatedItems(featuredCoupons, featuredPage).map((coupon) => (
              <CouponOverlay key={coupon._id} coupon={coupon} />
            ))}
          </div>
        <Pagination
            currentPage={popularPage}
            totalPages={getTotalPages(popularCoupons)}
            onPageChange={setPopularPage}
          />
        </div>
      </section>

      {/* Business Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Vous êtes une entreprise ?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Rejoignez ClickDeal et boostez votre visibilité avec nos solutions de promotions efficaces.
          </p>
          <button className="inline-block bg-white text-blue-800 font-medium px-8 py-3 rounded-md hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
            Créer un compte entreprise
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
