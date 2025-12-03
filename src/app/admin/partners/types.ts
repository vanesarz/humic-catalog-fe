// src/types/partners.ts

export interface RawPartner {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string | null;
  category?: string | null;
  created_at?: string;
  admin?: {
    name: string;
  };
}

export interface Partner {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
}