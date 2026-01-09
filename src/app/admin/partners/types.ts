export interface RawPartner {
  id: number;
  name: string;
  slug: string;
  image_path: string | null;
}

export interface Partner {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}