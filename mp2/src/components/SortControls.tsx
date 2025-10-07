import React from "react";

type SortKey = "name" | "id" ;

type Props = {
  sortKey: SortKey;
  setSortKey: (k: SortKey) => void;
  order: "asc" | "desc";
  setOrder: (o: "asc" | "desc") => void;
};

export default function SortControls({
  sortKey,
  setSortKey,
  order,
  setOrder,
}: Props) {
  return (
    <div className="controls">
      <label className="label">Sort by</label>
      <select
        className="select"
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value as SortKey)}
      >
        <option value="name">Name</option>
        <option value="id">ID</option>
      </select>
      <button
        className="btn"
        onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
      >
        {order === "asc" ? "Asc" : "Desc"}
      </button>
    </div>
  );
}
