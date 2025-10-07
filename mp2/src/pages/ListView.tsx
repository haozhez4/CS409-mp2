import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { usePokemon } from "../context/pokemon_context";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";

export default function ListView() {
  const { list } = usePokemon();
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] =
    useState<"name" | "id" >("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");


  const withId = useMemo(() => {
    return (list || []).map((p: any) => {
      if (p.id != null) return { ...p, id: Number(p.id) };
      const m = p.url?.match(/\/pokemon\/(\d+)\//);
      const id = m ? Number(m[1]) : 0;
      return { ...p, id };
    });
  }, [list]);

  const filtered = useMemo(() => {
    const key = q.trim().toLowerCase();
    const base = withId;
    if (!key) return base;
    return base.filter((p: any) => p.name.toLowerCase().includes(key));
  }, [withId, q]);


  const sorted = useMemo(() => {
    const factor = order === "asc" ? 1 : -1;
    const arr = [...filtered];

    arr.sort((a: any, b: any) => {
      if (sortKey === "name") {
        return a.name.localeCompare(b.name) * factor;
      }
      const ai = Number(a.id ?? 0);
      const bi = Number(b.id ?? 0);
      return (ai - bi) * factor;
    });

    return arr;
  }, [filtered, sortKey, order]);


  return (
    <section>
      <h2 className="h2">List View</h2>
      <SearchBar value={q} onChange={setQ} placeholder="Search Pokémon…" />
      <SortControls
        sortKey={sortKey}
        setSortKey={setSortKey}
        order={order}
        setOrder={setOrder}
      />

      <ul className="list">
        {sorted.map((p) => (
          <li key={p.name} className="card">
            <Link className="link" to={`/pokemon/${p.name}`}>
              <div className="row">
                <span className="badge">#{(p as any).id}</span>
                <strong className="name">{p.name}</strong>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="hint">Typing filters instantly. Click an item for details.</p>
    </section>
  );
}
