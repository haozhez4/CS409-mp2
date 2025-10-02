import axios from "axios";
import { PokemonListItem, PokemonDetail } from "./types";

const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

export async function getPokemonList(limit = 151, offset = 0): Promise<PokemonListItem[]> {
  const { data } = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return data.results;
}

const detailCache = new Map<string, PokemonDetail>();

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  if (detailCache.has(name)) return detailCache.get(name)!;

  const { data } = await api.get(`/pokemon/${name}`);
  const detail: PokemonDetail = {
    id: data.id,
    name: data.name,
    base_experience: data.base_experience,
    height: data.height,
    weight: data.weight,
    sprites: data.sprites,
    types: data.types.map((t: any) => t.type.name),
    abilities: data.abilities.map((a: any) => a.ability.name),
    stats: data.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
  };
  detailCache.set(name, detail);
  return detail;
}
