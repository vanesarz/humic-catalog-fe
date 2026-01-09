export interface Admin {
  name: string;
}

export interface RawInternship {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  thumbnail_path: string | null;
  user_manual: string | null
  file_path: string | null;
  file_url: string | null;
}

export interface Internship {
  id: number;
  title: string;
  slug: string;
  category: string;
  thumbnail: string | null;
  file_path?: string | null;
  file_url?: string | null;
  user_manual?: string | null;
  description?: string | null;
}