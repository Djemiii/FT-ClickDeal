import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Eye, Download, TrendingUp, Activity, Trash2 } from 'lucide-react';
import PerformanceChart from '../components/business/PerformanceChart';
import { Coupon } from '../types/coupon';
import { mockCoupons, mockPerformanceData } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const BusinessDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeCoupons, setActiveCoupons] = useState<Coupon[]>([]);
  const [expiredCoupons, setExpiredCoupons] = useState<Coupon[]>([]);
  const [performanceData, setPerformanceData] = useState(mockPerformanceData);
  const [loading, setLoading] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data
    setTimeout(() => {
      const now = new Date();
      const active = mockCoupons.filter(
        coupon => new Date(coupon.expiryDate) > now
      );
      const expired = mockCoupons.filter(
        coupon => new Date(coupon.expiryDate) <= now
      );
      
      setActiveCoupons(active);
      setExpiredCoupons(expired);
      setLoading(false);
    }, 500);
  }, []);

  const handleDeleteClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // In a real app, this would make an API call
    if (selectedCoupon) {
      setActiveCoupons(prev => prev.filter(c => c.id !== selectedCoupon.id));
      setExpiredCoupons(prev => prev.filter(c => c.id !== selectedCoupon.id));
      setShowDeleteModal(false);
    }
  };

  const totalViews = performanceData.reduce((sum, item) => sum + item.views, 0);
  const totalDownloads = performanceData.reduce((sum, item) => sum + item.downloads, 0);
  const totalConversions = performanceData.reduce((sum, item) => sum + item.conversions, 0);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard entreprise</h1>
          <p className="text-gray-600">Bienvenue, {user?.name || 'Entreprise'}</p>
        </div>
        <Link
          to="/business/create-coupon"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Créer un nouveau coupon
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Vues totales</h3>
            <div className="p-2 bg-blue-100 rounded-md">
              <Eye className="h-6 w-6 text-blue-800" />
            </div>
          </div>
          <p className="text-3xl font-bold">{totalViews}</p>
          <p className="text-sm text-gray-500 mt-1">Nombre de fois que vos coupons ont été vus</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Téléchargements</h3>
            <div className="p-2 bg-green-100 rounded-md">
              <Download className="h-6 w-6 text-green-800" />
            </div>
          </div>
          <p className="text-3xl font-bold">{totalDownloads}</p>
          <p className="text-sm text-gray-500 mt-1">Nombre de coupons activés par les utilisateurs</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Conversions</h3>
            <div className="p-2 bg-yellow-100 rounded-md">
              <TrendingUp className="h-6 w-6 text-yellow-800" />
            </div>
          </div>
          <p className="text-3xl font-bold">{totalConversions}</p>
          <p className="text-sm text-gray-500 mt-1">Nombre de coupons utilisés en magasin</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Performance au fil du temps</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-800 text-white rounded-md">7 jours</button>
            <button className="px-3 py-1 text-sm bg-white text-gray-700 rounded-md border border-gray-300">30 jours</button>
            <button className="px-3 py-1 text-sm bg-white text-gray-700 rounded-md border border-gray-300">90 jours</button>
          </div>
        </div>
        <PerformanceChart data={performanceData} />
      </div>

      {/* Active Coupons */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Coupons actifs ({activeCoupons.length})</h2>
        
        {activeCoupons.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coupon
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Réduction
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'expiration
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activeCoupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${coupon.imageUrl})` }}></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{coupon.title}</div>
                          <div className="text-sm text-gray-500">{coupon.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{coupon.discountRate}%</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(coupon.expiryDate).toLocaleDateString()}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Eye className="h-4 w-4 mr-1" />
                          120
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Download className="h-4 w-4 mr-1" />
                          45
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Activity className="h-4 w-4 mr-1" />
                          12
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/business/edit-coupon/${coupon.id}`}
                          className="text-blue-800 hover:text-blue-900"
                        >
                          <Edit2 className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(coupon)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">Vous n'avez pas de coupons actifs.</p>
            <Link
              to="/business/create-coupon"
              className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Créer un coupon
            </Link>
          </div>
        )}
      </div>

      {/* Expired Coupons */}
      {expiredCoupons.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Coupons expirés ({expiredCoupons.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coupon
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Réduction
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'expiration
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expiredCoupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50 bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-md bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${coupon.imageUrl})` }}></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-500">{coupon.title}</div>
                          <div className="text-sm text-gray-400">{coupon.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{coupon.discountRate}%</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{new Date(coupon.expiryDate).toLocaleDateString()}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-400">
                          <Eye className="h-4 w-4 mr-1" />
                          98
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Download className="h-4 w-4 mr-1" />
                          37
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Activity className="h-4 w-4 mr-1" />
                          15
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleDeleteClick(coupon)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirmer la suppression</h3>
            <p className="text-gray-700 mb-6">
              Êtes-vous sûr de vouloir supprimer le coupon "{selectedCoupon.title}" ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDashboard;