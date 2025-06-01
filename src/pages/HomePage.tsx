/* eslint-disable @typescript-eslint/no-explicit-any */

import type React from "react"
import { useState, useEffect } from "react"
import { ShoppingBag, MapPin, Search, TrendingUp, Users, Award, Heart } from "lucide-react"

import { Coupon } from "@/types/coupon"
import SnowEffect from "../components/shared/SnowEffect"
import CouponOverlay from "../components/shared/CouponOverlay"
import Pagination from "../components/shared/Pagination"
import TestimonialCarousel from "../components/shared/TestimonialCarousel"
import AppLoader from "../components/shared/AppLoader"
import { useCoupons } from "../hooks/useCoupons"
import { all } from "axios"



const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [featuredCoupons, setFeaturedCoupons] = useState<Coupon[]>([])
  const [trendingCoupons, setTrendingCoupons] = useState<Coupon[]>([])
  const [newCoupons, setNewCoupons] = useState<Coupon[]>([])
  const [popularCoupons, setPopularCoupons] = useState<Coupon[]>([])
  const [searchQuery, setSearchQuery] = useState("")
const {data:allCouponsData,isPending}=useCoupons()
const [allCoupons,setAllCoupons]=useState<Coupon[]>([])
  useEffect(() => {
    if (allCouponsData && Array.isArray(allCouponsData.data)) {
      setAllCoupons(allCouponsData.data || [])
    }
  }, [allCouponsData])
console.log(allCoupons)
  // Pagination states
  const [featuredPage, setFeaturedPage] = useState(1)
  const [trendingPage, setTrendingPage] = useState(1)
  const [newPage, setNewPage] = useState(1)
  const [popularPage, setPopularPage] = useState(1)

  const itemsPerPage = 4

  useEffect(() => {
    // Simuler le chargement
    setTimeout(() => {
      
      setFeaturedCoupons(allCoupons.slice(0, 8))
      
      setTrendingCoupons(allCoupons.slice(2, 10))
      
      setNewCoupons(allCoupons.slice(1, 9))
      
      setPopularCoupons(allCoupons.slice(0, 12))
      setIsLoading(isPending)
    }, 2000)
  }, [allCoupons])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `/coupons?search=${searchQuery}`
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
      {/* Hero Section avec effet de neige */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700  text-white relative overflow-hidden">
        <SnowEffect />
        <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Découvrez les meilleures offres locales
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-delay">
              ClickDeal vous aide à économiser avec des coupons exclusifs pour vos commerces préférés au Bénin.
            </p>

            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row w-full max-w-xl mx-auto gap-3 animate-slide-up"
            >
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un coupon..."
                  className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105"
              >
                Rechercher
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="flex items-center bg-white text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Tous les coupons
              </button>
              <button className="flex items-center bg-blue-800 text-white px-6 py-3 rounded-md font-medium border border-blue-300 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                <MapPin className="mr-2 h-5 w-5" />
                Offres à proximité
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coupons avec overlay */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Coupons à la une</h2>
            <button className="text-blue-800 hover:text-blue-700 font-medium">Voir tout →</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getPaginatedItems(featuredCoupons, featuredPage).map((coupon) => (
              <CouponOverlay key={coupon._id} coupon={coupon} />
            ))}
          </div>

          <Pagination
            currentPage={featuredPage}
            totalPages={getTotalPages(featuredCoupons)}
            onPageChange={setFeaturedPage}
          />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Comment ça marche</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Search className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trouvez</h3>
              <p className="text-gray-600">Parcourez les meilleures offres des commerces locaux autour de vous.</p>
            </div>

            <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <ShoppingBag className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Activez</h3>
              <p className="text-gray-600">Activez le coupon qui vous intéresse et présentez-le en magasin.</p>
            </div>

            <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Économisez</h3>
              <p className="text-gray-600">Profitez de vos réductions et économisez à chaque achat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Coupons */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Offres populaires</h2>
            <button className="text-blue-800 hover:text-blue-700 font-medium">Voir tout →</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getPaginatedItems(trendingCoupons, trendingPage).map((coupon) => (
              <CouponOverlay key={coupon._id} coupon={coupon} />
            ))}
          </div>

          <Pagination
            currentPage={trendingPage}
            totalPages={getTotalPages(trendingCoupons)}
            onPageChange={setTrendingPage}
          />
        </div>
      </section>

      {/* Nouvelles offres */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Nouvelles offres</h2>
            <button className="text-blue-800 hover:text-blue-700 font-medium">Voir tout →</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getPaginatedItems(newCoupons, newPage).map((coupon) => (
              <CouponOverlay key={coupon._id} coupon={coupon} />
            ))}
          </div>

          <Pagination currentPage={newPage} totalPages={getTotalPages(newCoupons)} onPageChange={setNewPage} />
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">ClickDeal en chiffres</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10" />
              </div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Utilisateurs actifs</div>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-blue-100">Commerces partenaires</div>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10" />
              </div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-blue-100">Coupons disponibles</div>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10" />
              </div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Ce que disent nos partenaires</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Section Offres les plus aimées */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Offres les plus aimées</h2>
            <button className="text-blue-800 hover:text-blue-700 font-medium">Voir tout →</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getPaginatedItems(popularCoupons, popularPage).map((coupon) => (
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
