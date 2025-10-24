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

export interface TechniqueDetail {
  id: number;
  order: number;
  side: "OI" | "GYAKU";
  technique: number;
  technique_name: string;
}

export interface Sequence {
  id: number;
  stance: "ZENKUTSU_DACHI" | "KOKUTSU_DACHI" | "KIBA_DACHI";
  quantity: number;
  techniques_detail: TechniqueDetail[];
  created_date: string;
  updated_date: string;
}

export type Stance = Sequence["stance"];

export type StanceAndQuantity = {
  stance: Sequence["stance"];
  quantity: Sequence["quantity"];
};
