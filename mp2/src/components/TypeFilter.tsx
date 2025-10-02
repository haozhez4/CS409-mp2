import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = { selected: string[]; onChange: (t: string[]) => void };

export default function TypeFilter({ selected, onChange }: Props) {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) =>
        setTypes(
          data.results
            .map((r: any) => r.name)
            .filter((t: string) => !["unknown", "shadow"].includes(t))
        )
      )
      .catch(() =>
        setTypes([
          "grass",
          "fire",
          "water",
          "electric",
          "psychic",
          "bug",
          "normal",
          "fighting",
          "poison",
          "ground",
          "rock",
          "ghost",
          "ice",
          "dragon",
          "dark",
          "steel",
          "fairy",
          "flying",
        ])
      );
  }, []);

  const toggle = (t: string) => {
    if (selected.includes(t)) onChange(selected.filter((x) => x !== t));
    else onChange([...selected, t]);
  };

  return (
    <div className="typeFilter">
      {types.map((t) => (
        <label key={t} className={selected.includes(t) ? "chip chipOn" : "chip"}>
          <input
            type="checkbox"
            checked={selected.includes(t)}
            onChange={() => toggle(t)}
          />
          <span>{t}</span>
        </label>
      ))}
    </div>
  );
}
