/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CouponFilter from '../components/coupon/CouponFilter';
import CouponOverlay from "../components/shared/CouponOverlay";
import { categories, locations } from '../data/mockData';
import { useCoupons } from "../hooks/useCoupons";
import { Coupon } from '../types/coupon';

const CouponListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const {data:allCouponsData,isPending}=useCoupons()

    useEffect(() => {
       //@ts-ignore
      if (allCouponsData && Array.isArray(allCouponsData.data)) {
         //@ts-ignore
        setCoupons(allCouponsData.data || [])
      }
    }, [allCouponsData])
  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
  // const [loading, setLoading] = useState(true);

  // Initialize filters from URL params
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialMinDiscount = parseInt(searchParams.get('minDiscount') || '0', 10);

 

  useEffect(() => {
    // Apply initial filters from URL
    if (coupons.length > 0) {
      handleFilterChange({
        search: initialSearch,
        category: initialCategory,
        location: initialLocation,
        minDiscount: initialMinDiscount,
      });
    }
  }, [coupons, initialSearch, initialCategory, initialLocation, initialMinDiscount,allCouponsData]);

  const handleFilterChange = (filters: {
    search: string;
    category: string;
    location: string;
    minDiscount: number;
  }) => {
    let filtered = [...coupons];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        coupon =>
          coupon.title.toLowerCase().includes(searchLower) ||
          coupon.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(coupon => coupon.category === filters.category);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(coupon => coupon.location === filters.location);
    }

    // Apply discount filter
    if (filters.minDiscount > 0) {
      filtered = filtered.filter(coupon => coupon.discountRate >= filters.minDiscount);
    }

    setFilteredCoupons(filtered);

    // Update URL params
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.location) params.set('location', filters.location);
    if (filters.minDiscount > 0) params.set('minDiscount', filters.minDiscount.toString());
    
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tous les coupons</h1>

      <CouponFilter
        categories={categories}
        locations={locations}
        onFilterChange={handleFilterChange}
      />

      {isPending ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-gray-600">
              {filteredCoupons.length} {filteredCoupons.length === 1 ? 'coupon trouvé' : 'coupons trouvés'}
            </p>
          </div>

          {filteredCoupons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCoupons.map(coupon => (

                <CouponOverlay key={coupon.id}
                 //@ts-ignore
                 coupon={coupon} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Aucun coupon trouvé</h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos filtres pour voir plus de résultats.
              </p>
              <button
                onClick={() => handleFilterChange({
                  search: '',
                  category: '',
                  location: '',
                  minDiscount: 0,
                })}
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CouponListingPage;