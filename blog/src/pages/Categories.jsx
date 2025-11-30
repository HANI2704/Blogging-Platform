import React, { useEffect, useState } from "react";
import { api } from "../../../server/src/api/mockApi";
import { Link } from "react-router-dom";

export default function Categories() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    api.list({ perPage: 100 }).then((res) => {
      const map = {};
      res.items.forEach((p) => (map[p.category] = (map[p.category] || 0) + 1));
      setCats(Object.entries(map).map(([name, count]) => ({ name, count })));
    });
  }, []);

  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Categories</h1>
      <ul className="mt-4 space-y-2">
        {cats.map((c) => (
          <li key={c.name} className="flex justify-between">
            <Link
              to={`/categories/${encodeURIComponent(c.name)}`}
              className="text-indigo-300"
            >
              {c.name}
            </Link>
            <span className="text-slate-400">{c.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
