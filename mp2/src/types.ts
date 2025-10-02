export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other?: any;
  };
  types: string[];
  abilities: string[];
  stats: { name: string; value: number }[];
}
