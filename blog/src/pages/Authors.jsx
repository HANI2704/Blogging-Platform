import React, { useEffect, useState } from "react";
import { api } from "../../../server/src/api/mockApi";
import { Link } from "react-router-dom";

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    api.list({ perPage: 200 }).then((res) => {
      const map = {};
      res.items.forEach((p) => (map[p.author] = (map[p.author] || 0) + 1));
      setAuthors(Object.entries(map).map(([name, count]) => ({ name, count })));
    });
  }, []);

  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Authors</h1>
      <ul className="mt-4 space-y-2">
        {authors.map((a) => (
          <li key={a.name} className="flex justify-between">
            <Link
              to={`/authors/${encodeURIComponent(a.name)}`}
              className="text-indigo-300"
            >
              {a.name}
            </Link>
            <span className="text-slate-400">{a.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
