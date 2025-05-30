// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ShoppingBag, MapPin, Search, TrendingUp } from 'lucide-react';
// import CouponCard from '../components/coupon/CouponCard';
// import { Coupon } from '../types/coupon';
// import { allCoupons } from '../data/mockData';

// const HomePage: React.FC = () => {
//   const [featuredCoupons, setFeaturedCoupons] = useState<Coupon[]>([]);
//   const [trendingCoupons, setTrendingCoupons] = useState<Coupon[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     // In a real app, this would fetch data from an API
//     // For now, we'll use mock data
//     setFeaturedCoupons(mockCoupons.slice(0, 4));
//     setTrendingCoupons(mockCoupons.slice(4, 8));
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     // In a real app, this would redirect to search results
//     window.location.href = `/coupons?search=${searchQuery}`;
//   };

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
//         <div className="container mx-auto px-4 py-16 md:py-24">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">
//               Découvrez les meilleures offres locales
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-blue-100">
//               ClickDeal vous aide à économiser avec des coupons exclusifs pour vos commerces préférés au Bénin.
//             </p>
            
//             <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full max-w-xl mx-auto gap-3">
//               <div className="relative flex-grow">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Rechercher un coupon..."
//                   className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-md transition-colors"
//               >
//                 Rechercher
//               </button>
//             </form>

//             <div className="flex flex-wrap justify-center gap-4 mt-8">
//               <Link
//                 to="/coupons"
//                 className="flex items-center bg-white text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
//               >
//                 <ShoppingBag className="mr-2 h-5 w-5" />
//                 Tous les coupons
//               </Link>
//               <button
//                 onClick={() => {
//                   navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                       // In a real app, this would use the coordinates to redirect to nearby offers
//                       window.location.href = '/coupons?nearby=true';
//                     },
//                     (error) => {
//                       console.error('Error getting location:', error);
//                       alert('Impossible de récupérer votre position.');
//                     }
//                   );
//                 }}
//                 className="flex items-center bg-blue-800 text-white px-6 py-3 rounded-md font-medium border border-blue-300 hover:bg-blue-700 transition-colors"
//               >
//                 <MapPin className="mr-2 h-5 w-5" />
//                 Offres à proximité
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Coupons */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">Coupons à la une</h2>
//             <Link to="/coupons" className="text-blue-800 hover:text-blue-700 font-medium">
//               Voir tout →
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {featuredCoupons.map((coupon) => (
//               <CouponCard key={coupon.id} coupon={coupon} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How it works */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//             Comment ça marche
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center p-6">
//               <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                 <Search className="h-8 w-8 text-blue-800" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Trouvez</h3>
//               <p className="text-gray-600">
//                 Parcourez les meilleures offres des commerces locaux autour de vous.
//               </p>
//             </div>

//             <div className="text-center p-6">
//               <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                 <ShoppingBag className="h-8 w-8 text-blue-800" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Activez</h3>
//               <p className="text-gray-600">
//                 Activez le coupon qui vous intéresse et présentez-le en magasin.
//               </p>
//             </div>

//             <div className="text-center p-6">
//               <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                 <TrendingUp className="h-8 w-8 text-blue-800" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Économisez</h3>
//               <p className="text-gray-600">
//                 Profitez de vos réductions et économisez à chaque achat.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Trending Coupons */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">Offres populaires</h2>
//             <Link to="/coupons" className="text-blue-800 hover:text-blue-700 font-medium">
//               Voir tout →
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {trendingCoupons.map((coupon) => (
//               <CouponCard key={coupon.id} coupon={coupon} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Business Call to Action */}
//       <section className="py-16 bg-blue-900 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Vous êtes une entreprise ?</h2>
//           <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
//             Rejoignez ClickDeal et boostez votre visibilité avec nos solutions de promotions efficaces.
//           </p>
//           <Link
//             to="/register"
//             className="inline-block bg-white text-blue-800 font-medium px-8 py-3 rounded-md hover:bg-blue-50 transition-colors"
//           >
//             Créer un compte entreprise
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;

















// "use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ShoppingBag, MapPin, Search, TrendingUp, Users, Award, Heart } from "lucide-react"

// import SnowEffect from "@/components/shared/SnowEffect"
// import CouponOverlay from "@/components/shared/CouponOverlay"
// import Pagination from "@/components/shared/Pagination"
// import TestimonialCarousel from "@/components/shared/TestimonialCarousel"
// import AppLoader from "@/components/shared/AppLoader"
import { Coupon } from "@/types/coupon"
import SnowEffect from "../components/shared/SnowEffect"
import CouponOverlay from "../components/shared/CouponOverlay"
import Pagination from "../components/shared/Pagination"
import TestimonialCarousel from "../components/shared/TestimonialCarousel"
import AppLoader from "../components/shared/AppLoader"
import { useCoupons } from "../hooks/useCoupons"

// Mock data pour les coupons
const mockCoupons = [
  {
    _id: "1",
    title: "Réduction Restaurant Le Palmier",
    description:
      "Profitez de 25% de réduction sur tous vos repas au Restaurant Le Palmier, le meilleur de la cuisine locale.",
    discount: 25,
    category: "Restaurant",
    location: "Cotonou",
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    conditions: "Valable du lundi au vendredi",
    company: "Restaurant Le Palmier",
    views: 1250,
    downloads: 340,
  },
  {
    _id: "2",
    title: "Mode & Style - Boutique Élégance",
    description: "30% de réduction sur toute la collection printemps-été. Vêtements de qualité pour homme et femme.",
    discount: 30,
    category: "Mode",
    location: "Porto-Novo",
    startDate: "2025-01-01",
    endDate: "2025-05-31",
    conditions: "Non cumulable avec d'autres offres",
    company: "Boutique Élégance",
    views: 890,
    downloads: 210,
  },
  {
    _id: "3",
    title: "Supermarché Fresh - Courses",
    description: "15% de réduction sur vos courses alimentaires. Produits frais et de qualité garantie.",
    discount: 15,
    category: "Alimentation",
    location: "Parakou",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    conditions: "Minimum d'achat 10,000 FCFA",
    company: "Supermarché Fresh",
    views: 2100,
    downloads: 580,
  },
  {
    _id: "4",
    title: "Salon de beauté Glamour",
    description: "Offre spéciale coiffure et soins. 40% de réduction sur tous les services beauté.",
    discount: 40,
    category: "Beauté",
    location: "Cotonou",
    startDate: "2025-01-01",
    endDate: "2025-04-30",
    conditions: "Sur rendez-vous uniquement",
    company: "Salon Glamour",
    views: 750,
    downloads: 195,
  },
  {
    _id: "5",
    title: "Pharmacie Santé Plus",
    description: "20% de réduction sur tous les médicaments et produits de parapharmacie.",
    discount: 20,
    category: "Santé",
    location: "Abomey",
    startDate: "2025-01-01",
    endDate: "2025-08-31",
    conditions: "Présentation ordonnance requise",
    company: "Pharmacie Santé Plus",
    views: 1450,
    downloads: 380,
  },
  {
    _id: "6",
    title: "Électronique TechWorld",
    description: "Jusqu'à 35% de réduction sur smartphones, ordinateurs et accessoires high-tech.",
    discount: 35,
    category: "Électronique",
    location: "Cotonou",
    startDate: "2025-01-01",
    endDate: "2025-07-31",
    conditions: "Stock limité",
    company: "TechWorld",
    views: 1800,
    downloads: 420,
  },
]

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [featuredCoupons, setFeaturedCoupons] = useState<Coupon[]>([])
  const [trendingCoupons, setTrendingCoupons] = useState<Coupon[]>([])
  const [newCoupons, setNewCoupons] = useState<Coupon[]>([])
  const [popularCoupons, setPopularCoupons] = useState<Coupon[]>([])
  const [searchQuery, setSearchQuery] = useState("")
const {data:allCoupons,isPending}=useCoupons()

  // Pagination states
  const [featuredPage, setFeaturedPage] = useState(1)
  const [trendingPage, setTrendingPage] = useState(1)
  const [newPage, setNewPage] = useState(1)
  const [popularPage, setPopularPage] = useState(1)

  const itemsPerPage = 4

  useEffect(() => {
    // Simuler le chargement
    setTimeout(() => {
      //@ts-expect-error: Mock data does not fully match the Coupon type
      setFeaturedCoupons(allCoupons.slice(0, 8))
      //@ts-expect-error: Mock data does not fully match the Coupon type
      setTrendingCoupons(allCoupons.slice(2, 10))
      //@ts-expect-error: Mock data does not fully match the Coupon type
      setNewCoupons(allCoupons.slice(1, 9))
      //@ts-expect-error: Mock data does not fully match the Coupon type
      setPopularCoupons(allCoupons.slice(0, 12))
      setIsLoading(isPending)
    }, 2000)
  }, [isPending])

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
