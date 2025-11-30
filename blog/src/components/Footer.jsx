import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-800/50">
      <div className="container px-2 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
        <div className="mb-3 md:mb-0">
          © {new Date().getFullYear()} Zidio — Built with ❤️
        </div>
        <nav className="flex gap-4">
          <Link to="/" className="hover:text-slate-100">
            Home
          </Link>
          <Link to="/about" className="hover:text-slate-100">
            About
          </Link>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-100"
          >
            Source
          </a>
        </nav>
      </div>
    </footer>
  );
}
