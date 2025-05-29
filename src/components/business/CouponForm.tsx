import React, { useState } from 'react';
import { Coupon } from '../../types/coupon';

interface CouponFormProps {
  initialData?: Partial<Coupon>;
  onSubmit: (data: Partial<Coupon>) => void;
  categories: string[];
  locations: string[];
}

const CouponForm: React.FC<CouponFormProps> = ({
  initialData = {},
  onSubmit,
  categories,
  locations,
}) => {
  const [formData, setFormData] = useState<Partial<Coupon>>({
    title: '',
    description: '',
    discountRate: 10,
    category: '',
    location: '',
    expiryDate: '',
    termsAndConditions: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'La description est requise';
    }
    
    if (!formData.discountRate || formData.discountRate <= 0 || formData.discountRate > 100) {
      newErrors.discountRate = 'Le taux de réduction doit être entre 1 et 100';
    }
    
    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }
    
    if (!formData.location) {
      newErrors.location = 'La localisation est requise';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'La date d\'expiration est requise';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expiryDate = new Date(formData.expiryDate);
      if (expiryDate < today) {
        newErrors.expiryDate = 'La date d\'expiration ne peut pas être dans le passé';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre du coupon*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description*
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700">
            Taux de réduction (%)*
          </label>
          <input
            type="number"
            id="discountRate"
            name="discountRate"
            min="1"
            max="100"
            value={formData.discountRate}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.discountRate ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.discountRate && <p className="mt-1 text-sm text-red-600">{errors.discountRate}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Catégorie*
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.category ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Localisation*
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.location ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Sélectionner une localisation</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Date d'expiration*
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.expiryDate ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="termsAndConditions" className="block text-sm font-medium text-gray-700">
          Conditions d'utilisation
        </label>
        <textarea
          id="termsAndConditions"
          name="termsAndConditions"
          rows={3}
          value={formData.termsAndConditions}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Conditions spécifiques d'utilisation du coupon..."
        />
      </div>

      <div className="pt-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {initialData.id ? 'Mettre à jour' : 'Créer le coupon'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CouponForm;