import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPokemonDetail } from "../api";
import { PokemonDetail } from "../types";
import { usePokemon } from "../context/pokemon_context";

export default function DetailView() {
  const { name = "" } = useParams();
  const nav = useNavigate();
  const { list } = usePokemon();
  const [data, setData] = useState<PokemonDetail | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setErr("");
    setData(null);
    getPokemonDetail(name!)
      .then((d) => alive && setData(d))
      .catch(() => alive && setErr("Failed to load (API limit/offline)."));
    return () => {
      alive = false;
    };
  }, [name]);

  const names = useMemo(() => list.map((x) => x.name), [list]);
  const idx = names.indexOf(name!);
  const prev = idx > 0 ? names[idx - 1] : null;
  const next = idx >= 0 && idx < names.length - 1 ? names[idx + 1] : null;

  return (
    <section>
      <h2 className="h2">Details</h2>
      {err && <p className="error">{err}</p>}
      {!data && !err && <p className="hint">Loading…</p>}

      {data && (
        <article className="detail">
          <div className="detailHead">
            <img
              className="detailImg"
              src={data.sprites.front_default || ""}
              alt={data.name}
            />
            <div>
              <h3 className="detailTitle">
                #{data.id} {data.name}
              </h3>
              <div className="tags">
                {data.types.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ul className="kv">
            <li>
              <span>Base EXP</span>
              <b>{data.base_experience}</b>
            </li>
            <li>
              <span>Height</span>
              <b>{data.height}</b>
            </li>
            <li>
              <span>Weight</span>
              <b>{data.weight}</b>
            </li>
            <li>
              <span>Abilities</span>
              <b>{data.abilities.join(", ")}</b>
            </li>
          </ul>

          <h4 className="h4">Stats</h4>
          <ul className="stats">
            {data.stats.map((s) => (
              <li key={s.name}>
                <span>{s.name}</span>
                <b>{s.value}</b>
              </li>
            ))}
          </ul>

          <div className="pager">
            <button
              className="btn"
              disabled={!prev}
              onClick={() => prev && nav(`/pokemon/${prev}`)}
            >
              ◀ Prev
            </button>
            <Link className="btn secondary" to="/">
              Back to List
            </Link>
            <button
              className="btn"
              disabled={!next}
              onClick={() => next && nav(`/pokemon/${next}`)}
            >
              Next ▶
            </button>
          </div>
        </article>
      )}
    </section>
  );
}
