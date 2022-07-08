export interface Pokemon {
  base_experience: number;
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  stats: any[];
  type_1: string;
  type_2: string;
  weight: number;
  image: string;
  color: string | null;
  types: any[];
}
