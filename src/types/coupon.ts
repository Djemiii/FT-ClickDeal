export interface Coupon {
  id: string;
  title: string;
  description: string;
  discountRate: number;
  category: string;
  businessName: string;
  location: string;
  expiryDate: string;
  imageUrl: string;
  termsAndConditions?: string;
  isActive: boolean;
}