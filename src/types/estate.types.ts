export type PropertyPurpose = 'buy' | 'rent' | 'invest';
export type PropertyCategory = 'all' | 'villa' | 'apartment' | 'penthouse' | 'commercial' | 'plot';
export type PropertyStatus = 'For Sale' | 'Ready to Move' | 'Under Construction' | 'Just Launched' | 'Exclusive';

export interface PropertyAmenity {
  icon?: string;
  name: string;
}

export interface PropertyGalleryItem {
  url: string;
  caption: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  location: {
    area: string;
    city: string;
    fullAddress: string;
    landmark?: string;
  };
  priceValue: number; // numeric value in Rupees for filtering/sorting (e.g. 28000000)
  priceDisplay: string; // e.g. "₹2.80 Cr", "₹1.35 Cr", "₹82.5 L"
  pricePerSqft: number;
  purpose: PropertyPurpose;
  type: 'villa' | 'apartment' | 'penthouse' | 'commercial' | 'plot';
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  carpetArea?: number;
  facing?: string;
  furnishing?: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  floor?: string;
  parking?: string;
  possessionDate?: string;
  reraNumber?: string;
  featured: boolean;
  coverImage: string;
  gallery: PropertyGalleryItem[];
  floorPlanImage?: string;
  description: string;
  detailedDescription: string;
  highlights: string[];
  amenities: {
    luxury: string[];
    wellness: string[];
    security: string[];
    connectivity: string[];
  };
  agentId: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  city: string;
  status: 'Ready for Possession' | 'Under Development' | 'Launching Soon';
  completionYear: string;
  startingPrice: string;
  coverImage: string;
  gallery: string[];
  totalUnits: string;
  towers: string;
  openSpace: string;
  description: string;
  highlights: string[];
}

export interface Advisor {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  reviewCount: number;
  clientCount: string;
  phone: string;
  whatsapp: string;
  email: string;
  image: string;
  bio: string;
  specialties: string[];
  languages: string[];
  activeListingsCount: number;
}

export interface SearchFilters {
  purpose: 'all' | 'buy' | 'rent' | 'invest';
  location: string;
  propertyType: string;
  minBudget: number;
  maxBudget: number;
  bedrooms: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'newest';
}

export interface PropertyInquiryForm {
  propertyId?: string;
  propertyTitle?: string;
  agentId?: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate?: string;
  preferredTime?: string;
  purpose: 'buying' | 'renting' | 'investment' | 'site_visit' | 'general';
  message: string;
}
