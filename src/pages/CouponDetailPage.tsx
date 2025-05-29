import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, Percent, Store, ShoppingBag, Share2 } from 'lucide-react';
import QRCodeGenerator from '../components/qrcode/QRCodeGenerator';
import { Coupon } from '../types/coupon';
import { mockCoupons } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const CouponDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCouponActivated, setIsCouponActivated] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data
    setTimeout(() => {
      const foundCoupon = mockCoupons.find(c => c.id === id);
      setCoupon(foundCoupon || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleActivateCoupon = () => {
    if (!isAuthenticated) {
      // Redirect to login page
      window.location.href = `/login?redirect=/coupons/${id}`;
      return;
    }
    
    // In a real app, this would make an API call
    setIsCouponActivated(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: coupon?.title,
        text: coupon?.description,
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Lien copié dans le presse-papier !'))
        .catch((error) => console.error('Could not copy link:', error));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
        </div>
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Coupon introuvable</h2>
          <p className="text-gray-600 mb-6">
            Le coupon que vous recherchez n'existe pas ou a expiré.
          </p>
          <Link
            to="/coupons"
            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Voir tous les coupons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Coupon Header */}
        <div
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${coupon.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <div className="flex items-center mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-800 text-white">
                <Percent className="h-3 w-3 mr-1" />
                {coupon.discountRate}% de réduction
              </span>
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                {coupon.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white">{coupon.title}</h1>
            <div className="flex flex-wrap items-center mt-2 text-white/90 text-sm">
              <div className="flex items-center mr-4">
                <Store className="h-4 w-4 mr-1" />
                <span>{coupon.businessName}</span>
              </div>
              <div className="flex items-center mr-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{coupon.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Valide jusqu'au {new Date(coupon.expiryDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coupon Body */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 mb-6">{coupon.description}</p>

              {coupon.termsAndConditions && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Conditions d'utilisation</h2>
                  <p className="text-gray-700 whitespace-pre-line">{coupon.termsAndConditions}</p>
                </div>
              )}
            </div>

            <div className="md:w-80 bg-gray-50 rounded-lg p-6 self-start">
              {isCouponActivated ? (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Votre coupon est activé!</h3>
                  <div className="mb-4">
                    <QRCodeGenerator
                      value={`clickdeal:coupon:${coupon.id}`}
                      size={200}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Présentez ce QR code au commerçant pour bénéficier de votre réduction.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Activez ce coupon</h3>
                  <button
                    onClick={handleActivateCoupon}
                    className="w-full mb-4 px-4 py-3 bg-blue-800 text-white rounded-md font-medium hover:bg-blue-700 flex items-center justify-center"
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Activer le coupon
                  </button>
                  <p className="text-sm text-gray-600">
                    Une fois activé, vous pourrez présenter ce coupon en magasin.
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleShare}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 flex items-center justify-center hover:bg-gray-50"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Partager ce coupon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetailPage;