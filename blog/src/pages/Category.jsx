import React, { useEffect, useState } from "react";
import { api } from "../../../server/src/api/mockApi";
import { useParams, Link } from "react-router-dom";

export default function Category() {
  const { name } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api
      .list({ perPage: 100, category: name })
      .then((res) => setPosts(res.items));
  }, [name]);

  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Category: {name}</h1>
      <ul className="mt-4 space-y-4">
        {posts.map((p) => (
          <li key={p.id}>
            <Link
              to={`/post/${p.id}`}
              className="text-indigo-300 text-lg font-semibold"
            >
              {p.title}
            </Link>
            <p className="text-slate-400 text-sm">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
