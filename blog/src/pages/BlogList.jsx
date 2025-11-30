import React, { useEffect, useState } from "react";
import { api } from "../../../server/src/api/mockApi";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { Link } from "react-router-dom";

const PER_PAGE = 5;

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    let mounted = true;
    api.list({ page, perPage: PER_PAGE, search, category }).then((res) => {
      if (!mounted) return;
      setPosts(res.items);
      setTotal(res.total);
    });
    const unsub = api.subscribe(() => {
      api.list({ page, perPage: PER_PAGE, search, category }).then((res) => {
        if (!mounted) return;
        setPosts(res.items);
        setTotal(res.total);
      });
    });
    return () => {
      mounted = false;
      unsub();
    };
  }, [page, search, category]);

  return (
    <div className="blog-list">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">Latest posts</h2>
        <Link to="/create" className="btn">
          Create post
        </Link>
      </div>
      <SearchBar
        value={search}
        onChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
      />
      <CategoryFilter
        value={category}
        onChange={(v) => {
          setCategory(v);
          setPage(1);
        }}
      />

      {posts.length === 0 && <p className="text-slate-300">No posts found.</p>}
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.id} className="card">
            <Link to={`/post/${p.id}`}>
              <h3 className="text-xl font-semibold">{p.title}</h3>
            </Link>
            <div className="text-sm muted mt-1">
              {p.category} • {new Date(p.createdAt).toLocaleString()}
            </div>
            <p className="mt-3 text-slate-200">{p.excerpt || ""}</p>
            <div className="mt-3 flex items-center justify-between">
              <Link
                to={`/post/${p.id}`}
                className="text-sm text-indigo-300 hover:underline"
              >
                Read
              </Link>
              <div className="text-sm muted">
                {p.comments?.length || 0} comments
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        current={page}
        pageSize={PER_PAGE}
        total={total}
        onChange={setPage}
      />
    </div>
  );
}
