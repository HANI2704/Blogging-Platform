import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef(null);

  return (
    <header className="sticky top-0 z-40">
      <div className="backdrop-blur-sm bg-slate-900/30 border-b border-slate-800/40">
        <div className="container px-3 py-3 flex items-center justify-between gap-4">
          {/* Left: brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand to-indigo-400 flex items-center justify-center text-xl font-extrabold text-slate-900 shadow-md">
                Z
              </div>
              <div className="leading-tight">
                <div className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand to-indigo-400">
                  Zidio
                </div>
                <div className="text-xs text-slate-300 hidden sm:block">
                  Thoughts & tutorials
                </div>
              </div>
            </Link>
          </div>

          {/* Center: search */}
          <div className="flex-1 hidden md:flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <label className="relative block">
                <span className="sr-only">Search posts</span>
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="placeholder:text-slate-400 block w-full bg-gradient-to-br from-slate-900/40 to-slate-800/20 border border-slate-800 rounded-full py-3 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                  placeholder="Search posts, tags, authors..."
                />
                <svg
                  className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.386-1.414 1.415-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-300 bg-slate-800/30 px-3 py-1 rounded-full hover:bg-slate-800/40"
                  onClick={() => setQ("")}
                >
                  Clear
                </button>
              </label>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/create"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-brand to-indigo-400 text-slate-900 shadow-sm hover:scale-105 transition-transform"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="#042022"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Create</span>
            </Link>

            <button
              onClick={() => alert("Notifications placeholder")}
              title="Notifications"
              className="relative p-2 rounded-full bg-slate-900/25 hover:bg-slate-900/35 hidden sm:inline-flex"
            >
              <svg
                className="w-5 h-5 text-slate-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 -mt-1 -mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                3
              </span>
            </button>

            <div className="relative">
              <button
                className="flex items-center gap-2 p-1 rounded-full bg-gradient-to-br from-slate-800/40 to-slate-800/20 hover:scale-105 transform transition"
                onClick={() => setOpen(!open)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-indigo-400 flex items-center justify-center text-sm font-bold text-slate-900 ring-2 ring-slate-800">
                  RM
                </div>
                <svg
                  className="w-3 h-3 text-slate-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 111.06-1.06L10 9.86l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 7.21z" />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900/40 backdrop-blur rounded-lg shadow-2xl py-2">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-sm hover:bg-slate-800/40"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 text-sm hover:bg-slate-800/40"
                  >
                    Settings
                  </Link>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-800/40">
                    Sign out
                  </button>
                </div>
              )}
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-900/30 border-t border-slate-800/40">
          <div className="px-2 py-3 space-y-2">
            <Link
              to="/"
              className="block px-2 py-2 rounded hover:bg-slate-800/40"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="block px-2 py-2 rounded hover:bg-slate-800/40"
            >
              Write
            </Link>
            <Link
              to="/about"
              className="block px-2 py-2 rounded hover:bg-slate-800/40"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
