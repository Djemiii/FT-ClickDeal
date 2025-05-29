import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CouponForm from '../components/business/CouponForm';
import { Coupon } from '../types/coupon';
import { mockCoupons, categories, locations } from '../data/mockData';

const CreateCouponPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState<Partial<Coupon> | null>(null);
  const [loading, setLoading] = useState(id ? true : false);
  const isEditing = !!id;

  useEffect(() => {
    if (id) {
      // In a real app, this would fetch data from an API
      setTimeout(() => {
        const foundCoupon = mockCoupons.find(c => c.id === id);
        setCoupon(foundCoupon || null);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleSubmit = (data: Partial<Coupon>) => {
    // In a real app, this would make an API call
    console.log('Submitting coupon:', data);
    
    // Show success message
    alert(isEditing ? 'Coupon mis à jour avec succès!' : 'Coupon créé avec succès!');
    
    // Redirect back to dashboard
    navigate('/business');
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? 'Modifier le coupon' : 'Créer un nouveau coupon'}
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <CouponForm
          initialData={coupon || {}}
          onSubmit={handleSubmit}
          categories={categories}
          locations={locations}
        />
      </div>
    </div>
  );
};

export default CreateCouponPage;