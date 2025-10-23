export interface Technique {
  id: number;
  name: string;
  category: number;
  category_name: string;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}
