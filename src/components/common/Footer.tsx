import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, ShoppingBag } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8" />
              <span className="ml-2 text-2xl font-bold">ClickDeal</span>
            </Link>
            <p className="mt-4 text-blue-100">
              La plateforme de coupons de réduction pour les entreprises locales du Bénin.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Pour les consommateurs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/coupons" className="text-blue-100 hover:text-white transition-colors">
                  Tous les coupons
                </Link>
              </li>
              <li>
                <Link to="/fortune-wheel" className="text-blue-100 hover:text-white transition-colors">
                  Roue de la Fortune
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-100 hover:text-white transition-colors">
                  Comment ça marche
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Pour les entreprises</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/business" className="text-blue-100 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-blue-100 hover:text-white transition-colors">
                  Créer un compte
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-100 hover:text-white transition-colors">
                  Avantages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <address className="not-italic text-blue-100">
              <p>Cotonou, Bénin</p>
              <p className="mt-2">
                <a href="mailto:contact@clickdeal.com" className="flex items-center text-blue-100 hover:text-white transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  contact@clickdeal.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-10 pt-6">
          <p className="text-center text-blue-100">
            &copy; {new Date().getFullYear()} ClickDeal. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;