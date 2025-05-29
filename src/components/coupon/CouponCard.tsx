import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Percent } from 'lucide-react';
import { Coupon } from '../../types/coupon';

interface CouponCardProps {
  coupon: Coupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ backgroundImage: `url(${coupon.imageUrl})` }}
      >
        <div className="h-full w-full bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <div className="p-4 text-white">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-800">
              <Percent className="h-3 w-3 mr-1" />
              {coupon.discountRate}% de réduction
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {coupon.title}
          </h3>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {coupon.description}
        </p>
        
        <div className="mt-3 flex items-center text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>Valide jusqu'au {new Date(coupon.expiryDate).toLocaleDateString()}</span>
        </div>
        
        <div className="mt-1 flex items-center text-xs text-gray-500">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{coupon.location}</span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Link 
            to={`/coupons/${coupon.id}`}
            className="text-sm font-medium text-blue-800 hover:text-blue-700"
          >
            Voir le détail
          </Link>
          
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
            {coupon.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;