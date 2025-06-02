/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Coupon } from '../hooks/useCoupons';
import { useCoupons } from '../hooks/useCoupons';

const CouponDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: allCouponsData, isPending } = useCoupons();

  useEffect(() => {
     //@ts-ignore
    if (allCouponsData && Array.isArray(allCouponsData.data) && id) {
       //@ts-ignore
      const foundCoupon = allCouponsData.data.find((c: Coupon) => c._id === id);
      setCoupon(foundCoupon || null);
      setLoading(false);
    }
  }, [allCouponsData, id]);

  const handleGoBack = () => {
    navigate('/coupons');
  };

  const handleDownload = () => {
    if (coupon) {
      // Logique pour télécharger le coupon
      console.log('Téléchargement du coupon:', coupon._id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  if (isPending || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
        </div>
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-800 mb-2">Coupon non trouvé</h3>
          <p className="text-gray-600 mb-6">
            Le coupon que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retour aux coupons
          </button>
        </div>
      </div>
    );
  }

  const expired = isExpired(coupon.endDate);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bouton retour */}
      <button
        onClick={handleGoBack}
        className="flex items-center text-blue-800 hover:text-blue-700 mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux coupons
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header avec titre et badges */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{coupon.title}</h1>
              <p className="text-blue-100 text-lg">{coupon.company.name}</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="bg-white text-blue-800 px-4 py-2 rounded-full font-bold text-2xl">
                -{coupon.discount}%
              </div>
              {coupon.isExclusive && (
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                  Exclusif
                </span>
              )}
              {expired && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Expiré
                </span>
              )}
              {!coupon.isActive && (
                <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Inactif
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{coupon.description}</p>
              </div>

              {/* Conditions */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Conditions d'utilisation</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-gray-700">{coupon.conditions}</p>
                </div>
              </div>

              {/* Statistiques */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Statistiques</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-800">{coupon.views}</div>
                    <div className="text-sm text-gray-600">Vues</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{coupon.downloads}</div>
                    <div className="text-sm text-gray-600">Téléchargements</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">{coupon.conversions}</div>
                    <div className="text-sm text-gray-600">Conversions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Informations rapides */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Catégorie:</span>
                    <span className="ml-2 text-gray-600">{coupon.category}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Localisation:</span>
                    <span className="ml-2 text-gray-600">{coupon.location}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Début:</span>
                    <span className="ml-2 text-gray-600">{formatDate(coupon.startDate)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Fin:</span>
                    <span className={`ml-2 ${expired ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                      {formatDate(coupon.endDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action principale */}
              <div className="sticky top-6">
                {!expired && coupon.isActive ? (
                  <button
                    onClick={handleDownload}
                    className="w-full bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Télécharger le coupon
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
                  >
                    {expired ? 'Coupon expiré' : 'Coupon indisponible'}
                  </button>
                )}
                
                {/* Informations entreprise */}
                <div className="mt-6 p-4 border rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Proposé par</h4>
                  <div className="text-gray-600">
                    <p className="font-medium">{coupon.company.name}</p>
                    <p className="text-sm">{coupon.company.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetailPage;