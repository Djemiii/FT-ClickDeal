import React from 'react';
import { Briefcase, BarChart, Check, Clock, CreditCard, Shield } from 'lucide-react';
import Header from '@/components/common/Header';



const BusinessPage: React.FC = () => {
  const benefits = [
    {
      icon: <Briefcase className="h-10 w-10 text-blue-600" />,
      title: 'Visibilité accrue',
      description: 'Mettez votre entreprise en avant auprès de milliers de clients potentiels à la recherche d\'offres.'
    },
    {
      icon: <BarChart className="h-10 w-10 text-blue-600" />,
      title: 'Analyses détaillées',
      description: 'Suivez les performances de vos coupons avec des statistiques en temps réel (vues, téléchargements, conversions).'
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-600" />,
      title: 'Gestion du temps',
      description: 'Définissez précisément les périodes de validité de vos offres et planifiez vos campagnes à l\'avance.'
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      title: 'Contrôle total',
      description: 'Activez, désactivez ou modifiez vos coupons à tout moment depuis votre tableau de bord.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Découverte',
      price: 'Gratuit',
      features: [
        '1 coupon actif à la fois',
        'Statistiques de base',
        'Support par email'
      ],
      cta: 'Commencer gratuitement'
    },
    {
      name: 'Standard',
      price: '10 000 FCFA/mois',
      features: [
        'Jusqu\'à 5 coupons actifs',
        'Statistiques avancées',
        'Positionnement prioritaire',
        'Support prioritaire'
      ],
      cta: 'Choisir Standard',
      recommended: true
    },
    {
      name: 'Premium',
      price: '25 000 FCFA/mois',
      features: [
        'Coupons illimités',
        'Analyses complètes',
        'Meilleur positionnement',
        'Support dédié',
        'Campagnes personnalisées'
      ],
      cta: 'Choisir Premium'
    }
  ];

  return (
    <div className=" ">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Développez votre entreprise avec ClickDeal
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Attirez de nouveaux clients et fidélisez votre clientèle existante grâce à 
            des promotions ciblées et une visibilité maximale.
          </p>
          <button
            className="bg-white text-blue-700 px-6 py-3 text-lg font-semibold rounded hover:bg-blue-50 transition"
          >
            Créer un compte entreprise
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi rejoindre ClickDeal ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

       <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comment ça fonctionne?
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-100"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-4 md:mb-0 md:pr-12 md:text-right">
                    <h3 className="text-xl font-semibold mb-2">Créez votre compte</h3>
                    <p className="text-gray-600">
                      Inscrivez-vous gratuitement et complétez le profil de votre entreprise avec toutes les informations nécessaires.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center justify-center relative z-10">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:hidden">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="md:flex items-center">
                  <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                  <div className="hidden md:flex items-center justify-center relative z-10">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="md:hidden w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mb-4">
                      2
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Créez vos coupons</h3>
                    <p className="text-gray-600">
                      Utilisez notre interface intuitive pour créer des coupons attractifs avec tous les détails nécessaires.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-4 md:mb-0 md:pr-12 md:text-right">
                    <h3 className="text-xl font-semibold mb-2">Suivez les performances</h3>
                    <p className="text-gray-600">
                      Consultez votre tableau de bord pour analyser les statistiques et mesurer l'efficacité de vos offres.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center justify-center relative z-10">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:hidden">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="md:flex items-center">
                  <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                  <div className="hidden md:flex items-center justify-center relative z-10">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="md:hidden w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mb-4">
                      4
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Optimisez vos campagnes</h3>
                    <p className="text-gray-600">
                      Ajustez vos offres en fonction des résultats obtenus pour maximiser votre retour sur investissement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Tarifs simples et transparents</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Choisissez le forfait qui correspond le mieux aux besoins de votre entreprise. 
            Vous pouvez changer de forfait à tout moment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-sm overflow-hidden transition-transform ${
                  plan.recommended ? 'transform md:-translate-y-4 border-2 border-blue-500' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="bg-blue-600 text-white py-2 px-4 text-center font-medium">
                    Recommandé
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full px-6 py-3 rounded font-semibold transition ${
                      plan.recommended
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Tous les prix sont hors taxes. Facturation mensuelle ou annuelle disponible.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à développer votre activité ?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Rejoignez les centaines d'entreprises qui font déjà confiance à ClickDeal pour 
            leurs campagnes promotionnelles.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="bg-white text-blue-700 px-6 py-3 text-lg font-semibold rounded hover:bg-blue-50 transition"
            >
              Créer un compte gratuit
            </button>
            <button
              className="border border-white text-white px-6 py-3 text-lg font-semibold rounded hover:bg-blue-700 transition"
            >
              Contacter les ventes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;