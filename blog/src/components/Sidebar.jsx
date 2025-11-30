import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const sections = [
    { title: "Latest", to: "/" },
    { title: "Categories", to: "/#categories" },
    { title: "About", to: "/about" },
  ];

  return (
    <aside className="w-full bg-slate-900/30 px-3 py-3 rounded-lg">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-100 mb-2">Explore</h3>
        <ul className="space-y-2 text-sm">
          {sections.map((s) => (
            <li key={s.title}>
              <Link to={s.to} className="block text-slate-300 hover:text-white">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="text-xs text-slate-400 uppercase mb-2">About Zidio</h4>
        <p className="text-sm text-slate-300">
          A tiny demo blog built with Vite, React and Tailwind. Use it to draft
          and preview posts.
        </p>
      </div>
    </aside>
  );
}
