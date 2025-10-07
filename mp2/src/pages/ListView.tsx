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

  const filtered = useMemo(
    () => list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())),
    [q, list]
  );

  const withId = useMemo(
    () =>
      filtered.map((p) => ({
        ...p,
        id: Number((p.url.match(/\/pokemon\/(\d+)\/?$/) || [])[1] || 0),
      })),
    [filtered]
  );

  const sorted = useMemo(() => {
    return [...withId].sort((a: any, b: any) => {
      let av: any, bv: any;
      if (sortKey === "name") {
        av = a.name;
        bv = b.name;
      } else {
        av = 0;
        bv = 0;
      }
      const cmp = av > bv ? 1 : av < bv ? -1 : 0;
      return order === "asc" ? cmp : -cmp;
    });
  }, [withId, sortKey, order]);

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
