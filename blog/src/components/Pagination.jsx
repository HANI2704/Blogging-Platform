import React from "react";

export default function Pagination({
  current = 1,
  pageSize = 5,
  total = 0,
  onChange,
}) {
  const pages = Math.ceil(total / pageSize) || 1;
  return (
    <div className="flex items-center gap-3 justify-between mt-6">
      <button
        className="px-3 py-1 rounded bg-slate-900/30 hover:bg-slate-900/40 disabled:opacity-50"
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
      >
        Prev
      </button>
      <div className="text-sm text-slate-300">
        Page {current} of {pages}
      </div>
      <button
        className="px-3 py-1 rounded bg-slate-900/30 hover:bg-slate-900/40 disabled:opacity-50"
        onClick={() => onChange(Math.min(pages, current + 1))}
        disabled={current === pages}
      >
        Next
      </button>
    </div>
  );
}
