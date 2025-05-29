import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';

interface CouponFilterProps {
  categories: string[];
  locations: string[];
  onFilterChange: (filters: {
    search: string;
    category: string;
    location: string;
    minDiscount: number;
  }) => void;
}

const CouponFilter: React.FC<CouponFilterProps> = ({ 
  categories, 
  locations, 
  onFilterChange 
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [minDiscount, setMinDiscount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ search, category, location, minDiscount });
  };

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setLocation('');
    setMinDiscount(0);
    onFilterChange({ search: '', category: '', location: '', minDiscount: 0 });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un coupon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:w-auto w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filtres
          </button>
          
          <button
            type="button"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  // In a real app, this would use the coordinates to find the nearest location
                  setLocation(locations[0]);
                  onFilterChange({ search, category, location: locations[0], minDiscount });
                },
                (error) => {
                  console.error('Error getting location:', error);
                  alert('Impossible de récupérer votre position.');
                }
              );
            }}
            className="md:w-auto w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <MapPin className="h-5 w-5 mr-2" />
            À proximité
          </button>
          
          <button
            type="submit"
            className="md:w-auto w-full px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
          >
            Rechercher
          </button>
        </div>
        
        {isFilterOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Toutes les catégories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Localisation
              </label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Toutes les localisations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="minDiscount" className="block text-sm font-medium text-gray-700 mb-1">
                Réduction minimale: {minDiscount}%
              </label>
              <input
                id="minDiscount"
                type="range"
                min="0"
                max="100"
                value={minDiscount}
                onChange={(e) => setMinDiscount(parseInt(e.target.value))}
                className="block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="md:col-span-3 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CouponFilter;