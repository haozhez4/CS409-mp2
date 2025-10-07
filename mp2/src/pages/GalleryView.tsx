import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { usePokemon } from "../context/pokemon_context";
import TypeFilter from "../components/TypeFilter";
import { getPokemonDetail } from "../api";

export default function GalleryView() {
  const { list } = usePokemon();
  const [selected, setSelected] = useState<string[]>([]);
  const [sprites, setSprites] = useState<Record<string, string | null>>({});
  const [types, setTypes] = useState<Record<string, string[]>>({});

  useEffect(() => {
    let alive = true;
    (async () => {
      const first = list.slice(0, 1000);
      const results = await Promise.all(
        first.map(async (p) => {
          try {
            const d = await getPokemonDetail(p.name);
            return {
              name: p.name,
              sprite: d.sprites.front_default,
              types: d.types,
            };
          } catch {
            return { name: p.name, sprite: null, types: [] };
          }
        })
      );
      if (!alive) return;
      const s: Record<string, string | null> = {};
      const t: Record<string, string[]> = {};
      results.forEach((r) => {
        s[r.name] = r.sprite;
        t[r.name] = r.types;
      });
      setSprites(s);
      setTypes(t);
    })();
    return () => {
      alive = false;
    };
  }, [list]);

  const filteredNames = useMemo(() => {
    const names = Object.keys(sprites);
    if (selected.length === 0) return names;
    return names.filter((n) => selected.every((k) => types[n]?.includes(k)));
  }, [selected, sprites, types]);

  return (
    <section>
      <h2 className="h2">Gallery View</h2>
      <p className="hint">Filter by types (multi-select).</p>
      <TypeFilter selected={selected} onChange={setSelected} />

      <div className="grid">
        {filteredNames.map((name) => (
          <Link key={name} className="tile" to={`/pokemon/${name}`}>
            {sprites[name] ? (
              <img className="img" src={sprites[name]!} alt={name} />
            ) : (
              <div className="img placeholder">No Image</div>
            )}
            <div className="caption">{name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
