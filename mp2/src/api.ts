import axios from "axios";
import { PokemonDetail } from "./types";

const api = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

export type BasicPokemon = {
  name: string;
  url: string;
  id: number;
};

export async function getPokemonList(
  limit = 500,
  offset = 0
): Promise<BasicPokemon[]> {
  const { data } = await api.get("/pokemon", { params: { limit, offset } });
  // results: [{ name, url }]
  return (data.results as { name: string; url: string }[]).map((r) => ({
    ...r,
    id: Number(r.url.match(/\/pokemon\/(\d+)\//)?.[1] ?? 0),
  }));
}

const detailCache = new Map<string, PokemonDetail>();

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  const cached = detailCache.get(name);
  if (cached) return cached;

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
