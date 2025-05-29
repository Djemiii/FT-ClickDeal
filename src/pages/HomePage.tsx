import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, Search, TrendingUp } from 'lucide-react';
import CouponCard from '../components/coupon/CouponCard';
import { Coupon } from '../types/coupon';
import { mockCoupons } from '../data/mockData';

const HomePage: React.FC = () => {
  const [featuredCoupons, setFeaturedCoupons] = useState<Coupon[]>([]);
  const [trendingCoupons, setTrendingCoupons] = useState<Coupon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data
    setFeaturedCoupons(mockCoupons.slice(0, 4));
    setTrendingCoupons(mockCoupons.slice(4, 8));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would redirect to search results
    window.location.href = `/coupons?search=${searchQuery}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Découvrez les meilleures offres locales
            </h1>
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
                  className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Rechercher
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                to="/coupons"
                className="flex items-center bg-white text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Tous les coupons
              </Link>
              <button
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      // In a real app, this would use the coordinates to redirect to nearby offers
                      window.location.href = '/coupons?nearby=true';
                    },
                    (error) => {
                      console.error('Error getting location:', error);
                      alert('Impossible de récupérer votre position.');
                    }
                  );
                }}
                className="flex items-center bg-blue-800 text-white px-6 py-3 rounded-md font-medium border border-blue-300 hover:bg-blue-700 transition-colors"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Offres à proximité
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coupons */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Coupons à la une</h2>
            <Link to="/coupons" className="text-blue-800 hover:text-blue-700 font-medium">
              Voir tout →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Comment ça marche
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trouvez</h3>
              <p className="text-gray-600">
                Parcourez les meilleures offres des commerces locaux autour de vous.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Activez</h3>
              <p className="text-gray-600">
                Activez le coupon qui vous intéresse et présentez-le en magasin.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Économisez</h3>
              <p className="text-gray-600">
                Profitez de vos réductions et économisez à chaque achat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Coupons */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Offres populaires</h2>
            <Link to="/coupons" className="text-blue-800 hover:text-blue-700 font-medium">
              Voir tout →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </div>
      </section>

      {/* Business Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Vous êtes une entreprise ?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Rejoignez ClickDeal et boostez votre visibilité avec nos solutions de promotions efficaces.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-800 font-medium px-8 py-3 rounded-md hover:bg-blue-50 transition-colors"
          >
            Créer un compte entreprise
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;