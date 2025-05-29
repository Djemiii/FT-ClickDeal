import React, { useState } from 'react';
import FortuneWheel from '../components/fortune/FortuneWheel';
import { useAuth } from '../contexts/AuthContext';

const FortuneWheelPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isPlayed, setIsPlayed] = useState(false);
  const [reward, setReward] = useState<string | null>(null);

  // Define wheel sections
  const wheelSections = [
    { text: '5%', color: '#1E40AF', reward: '5% de réduction' },
    { text: '10%', color: '#3B82F6', reward: '10% de réduction' },
    { text: '15%', color: '#1E40AF', reward: '15% de réduction' },
    { text: '20%', color: '#3B82F6', reward: '20% de réduction' },
    { text: '25%', color: '#1E40AF', reward: '25% de réduction' },
    { text: 'Perdu', color: '#3B82F6', reward: 'Essayez encore' },
    { text: '30%', color: '#1E40AF', reward: '30% de réduction' },
    { text: 'Perdu', color: '#3B82F6', reward: 'Essayez encore' },
  ];

  const handleSpin = (result: string) => {
    setIsPlayed(true);
    setReward(result);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Roue de la Fortune</h1>
          <p className="text-gray-700 mb-6">
            Connectez-vous pour tenter votre chance et gagner des réductions exclusives !
          </p>
          <a
            href="/login?redirect=/fortune-wheel"
            className="inline-block px-6 py-3 bg-blue-800 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Roue de la Fortune</h1>
          <p className="text-gray-700">
            Tentez votre chance pour gagner des réductions exclusives !
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <FortuneWheel sections={wheelSections} onSpin={handleSpin} />
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Comment ça marche</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-medium mr-2">
                    1
                  </span>
                  <span>Cliquez sur le bouton "Tourner la roue"</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-medium mr-2">
                    2
                  </span>
                  <span>Attendez que la roue s'arrête</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-medium mr-2">
                    3
                  </span>
                  <span>Découvrez votre réduction</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-medium mr-2">
                    4
                  </span>
                  <span>Utilisez votre code promo dans n'importe quel magasin partenaire</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  Vous pouvez jouer une fois par jour. Les réductions gagnées sont valables pendant 7 jours dans tous les magasins partenaires.
                </p>
              </div>
              
              {isPlayed && reward && reward !== 'Essayez encore' && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">
                    Votre code promo
                  </h3>
                  <div className="bg-white p-3 rounded border border-blue-200 text-center">
                    <span className="font-mono text-lg font-bold tracking-wider">
                      FORTUNE{Math.floor(Math.random() * 10000)}
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    Ce code est valable pour {reward} dans tous les magasins partenaires jusqu'au {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-center mb-6">Nos partenaires</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 h-24 flex items-center justify-center"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-medium">Logo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FortuneWheelPage;