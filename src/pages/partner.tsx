'use client';
import React from 'react';
import Header from '@/components/common/Header';
import { Building2, BadgePercent, Users, Info } from 'lucide-react';
import { useCoupons } from "../hooks/useCoupons"

const partners = [
  { name: 'Café Gourmand', description: 'Restaurant convivial au cœur de la ville', category: 'Restaurants' },
  { name: 'Beauty Luxe', description: 'Salon de beauté et spa haut de gamme', category: 'Beauté' },
  { name: 'TechZone', description: 'Boutique spécialisée en électronique', category: 'Électronique' },
  { name: 'Style Urbain', description: 'Mode et accessoires tendance', category: 'Mode' },
];

const categories = [
  'Restaurants',
  'Beauté',
  'Mode',
  'Électronique',
  'Divertissement',
  'Santé',
  'Services',
  'Autres'
];

const steps = [
  {
    icon: <BadgePercent className="h-10 w-10 text-blue-600" />,
    title: 'Explorer les offres',
    description: 'Découvrez une variété de coupons exclusifs dans différentes catégories.'
  },
  {
    icon: <Users className="h-10 w-10 text-blue-600" />,
    title: 'Choisir un coupon',
    description: 'Sélectionnez les offres qui vous intéressent selon vos préférences.'
  },
  {
    icon: <Info className="h-10 w-10 text-blue-600" />,
    title: 'Utiliser en magasin',
    description: 'Présentez le coupon à l’entreprise partenaire pour en profiter immédiatement.'
  }
];

const PartnersPage: React.FC = () => {
    const {data:allCoupons}=useCoupons();
  console.log(allCoupons);
  const partners = Array.isArray(allCoupons?.data) ? Array.from(new Set(allCoupons.data.map(coupon => coupon.company.name))).map(name => ({ name, description: '', category: '' })) : [];
  console.log(partners,'partners');

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Nos entreprises partenaires</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Découvrez les commerces locaux qui vous proposent des réductions exclusives grâce à ClickDeal.
          </p>
        </div>
      </div>

      {/* Liste des entreprises */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Entreprises en vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, idx) => (
              <div key={idx} className="bg-white shadow-sm rounded-lg p-6">
                <Building2 className="h-8 w-8 text-blue-500 mb-3" />
                <h3 className="text-xl font-semibold">{partner.name}</h3>
                {/* <p className="text-gray-600 mb-1">{partner.description}</p>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {partner.category}
                </span> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Catégories de coupons */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Catégories de coupons</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* How to use */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Comment utiliser ClickDeal ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
