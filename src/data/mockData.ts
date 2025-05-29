import { Coupon } from '../types/coupon';

export const categories = [
  'Restaurants',
  'Beauté',
  'Mode',
  'Électronique',
  'Divertissement',
  'Santé',
  'Services',
  'Autres'
];

export const locations = [
  'Cotonou',
  'Porto-Novo',
  'Parakou',
  'Abomey-Calavi',
  'Bohicon',
  'Natitingou',
  'Djougou',
  'Ouidah'
];

export const mockCoupons: Coupon[] = [
  {
    id: '1',
    title: '50% de réduction sur les pizzas',
    description: 'Profitez d\'une réduction exceptionnelle de 50% sur toutes nos pizzas, du lundi au jeudi.',
    discountRate: 50,
    category: 'Restaurants',
    businessName: 'Pizza Palace',
    location: 'Cotonou',
    expiryDate: '2025-12-31',
    imageUrl: 'https://images.pexels.com/photos/2271194/pexels-photo-2271194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    termsAndConditions: 'Offre valable uniquement sur place, du lundi au jeudi. Non cumulable avec d\'autres promotions. Une pizza par coupon.',
    isActive: true
  },
  {
    id: '2',
    title: '30% sur les soins du visage',
    description: 'Bénéficiez de 30% de réduction sur tous nos soins du visage premium.',
    discountRate: 30,
    category: 'Beauté',
    businessName: 'Beauty Spa',
    location: 'Porto-Novo',
    expiryDate: '2025-11-15',
    imageUrl: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    termsAndConditions: 'Réservation obligatoire. Offre valable du lundi au vendredi uniquement. Non cumulable avec d\'autres promotions.',
    isActive: true
  },
  {
    id: '3',
    title: '20% sur toute la collection',
    description: 'Découvrez notre nouvelle collection et profitez de 20% de réduction sur tous les articles.',
    discountRate: 20,
    category: 'Mode',
    businessName: 'Fashion Store',
    location: 'Cotonou',
    expiryDate: '2025-10-30',
    imageUrl: 'https://images.pexels.com/photos/5872361/pexels-photo-5872361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    termsAndConditions: 'Valable sur tous les articles non soldés. Non cumulable avec d\'autres promotions ou cartes de fidélité.',
    isActive: true
  },
  {
    id: '4',
    title: '15% sur les smartphones',
    description: 'Réduction de 15% sur tous les smartphones de notre catalogue.',
    discountRate: 15,
    category: 'Électronique',
    businessName: 'Tech Shop',
    location: 'Parakou',
    expiryDate: '2025-09-15',
    imageUrl: 'https://images.pexels.com/photos/50614/pexels-photo-50614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    termsAndConditions: 'Offre valable sur les smartphones uniquement. Garantie standard applicable. Non cumulable avec d\'autres promotions.',
    isActive: true
  },
  {
    id: '5',
    title: '2 places de cinéma pour le prix d\'1',
    description: 'Venez à deux et ne payez qu\'une seule place pour profiter des derniers films.',
    discountRate: 50,
    category: 'Divertissement',
    businessName: 'Ciné Star',
    location: 'Cotonou',
    expiryDate: '2025-12-15',
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    termsAndConditions: 'Offre valable du lundi au jeudi uniquement. Non valable les jours fériés. Hors films en 3D et événements spéciaux.',
    isActive: true
  },
  {
    id: '6',
    title: '25% sur les consultations',
    description: 'Réduction de 25% sur votre première consultation chez notre spécialiste.',
    discountRate: 25,
    category: 'Santé',
    businessName: 'Centre Médical',
    location: 'Abomey-Calavi',
    expiryDate: '2025-08-31',
    imageUrl: 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    termsAndConditions: 'Valable uniquement pour les nouveaux patients. Sur rendez-vous uniquement. Hors examens complémentaires.',
    isActive: true
  },
  {
    id: '7',
    title: '40% sur la première heure de cours',
    description: 'Bénéficiez de 40% de réduction sur votre premier cours de langue étrangère.',
    discountRate: 40,
    category: 'Services',
    businessName: 'Language Center',
    location: 'Porto-Novo',
    expiryDate: '2025-11-30',
    imageUrl: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    termsAndConditions: 'Offre réservée aux nouveaux clients. Réservation obligatoire. Valable pour toutes les langues proposées.',
    isActive: true
  },
  {
    id: '8',
    title: '10% sur tous les produits',
    description: 'Réduction de 10% sur l\'ensemble de nos produits artisanaux locaux.',
    discountRate: 10,
    category: 'Autres',
    businessName: 'Artisanat Béninois',
    location: 'Ouidah',
    expiryDate: '2025-12-31',
    imageUrl: 'https://images.pexels.com/photos/2166456/pexels-photo-2166456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    termsAndConditions: 'Valable sur tous les produits du magasin. Non cumulable avec les soldes ou autres promotions en cours.',
    isActive: true
  },
  {
    id: '9',
    title: '35% sur le menu déjeuner',
    description: 'Profitez de 35% de réduction sur notre menu déjeuner complet du lundi au vendredi.',
    discountRate: 35,
    category: 'Restaurants',
    businessName: 'Restaurant Saveurs',
    location: 'Cotonou',
    expiryDate: '2025-10-15',
    imageUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    termsAndConditions: 'Offre valable uniquement pour le menu déjeuner, du lundi au vendredi de 12h à 14h. Boissons non incluses.',
    isActive: true
  },
  {
    id: '10',
    title: '15% sur toutes les coiffures',
    description: 'Réduction de 15% sur toutes nos prestations de coiffure.',
    discountRate: 15,
    category: 'Beauté',
    businessName: 'Salon Élégance',
    location: 'Bohicon',
    expiryDate: '2025-09-30',
    imageUrl: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    termsAndConditions: 'Sur rendez-vous uniquement. Non cumulable avec d\'autres offres promotionnelles. Produits non inclus.',
    isActive: true
  }
];

export const mockPerformanceData = [
  {
    date: '2025-01-01',
    views: 120,
    downloads: 45,
    conversions: 12
  },
  {
    date: '2025-01-02',
    views: 145,
    downloads: 52,
    conversions: 15
  },
  {
    date: '2025-01-03',
    views: 135,
    downloads: 48,
    conversions: 13
  },
  {
    date: '2025-01-04',
    views: 160,
    downloads: 60,
    conversions: 18
  },
  {
    date: '2025-01-05',
    views: 190,
    downloads: 75,
    conversions: 25
  },
  {
    date: '2025-01-06',
    views: 210,
    downloads: 82,
    conversions: 28
  },
  {
    date: '2025-01-07',
    views: 185,
    downloads: 70,
    conversions: 22
  }
];