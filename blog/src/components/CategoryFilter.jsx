import React from "react";

const CATEGORIES = ["All", "General", "News", "Tutorial", "Opinion"];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label>Category: </label>
      <select
        value={value || "All"}
        onChange={(e) =>
          onChange(e.target.value === "All" ? "" : e.target.value)
        }
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
