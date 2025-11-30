import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-3 flex gap-2 items-center">
      <input
        className="flex-1 bg-slate-900/30 border border-slate-800 text-sm px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Search posts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="text-sm text-slate-300" onClick={() => onChange("")}>
          Clear
        </button>
      )}
    </div>
  );
}
