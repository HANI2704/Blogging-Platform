import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import BlogForm from "./pages/BlogForm";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Tags from "./pages/Tags";
import Tag from "./pages/Tag";
import Authors from "./pages/Authors";
import Author from "./pages/Author";
import Archive from "./pages/Archive";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="w-full px-0 py-6 grid grid-cols-1 md:grid-cols-5 gap-2 max-w-full mx-auto">
        <main className="md:col-span-4 pr-0">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/post/:id" element={<BlogDetail />} />
            <Route path="/create" element={<BlogForm />} />
            <Route path="/edit/:id" element={<BlogForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:name" element={<Category />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/tags/:tag" element={<Tag />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/authors/:name" element={<Author />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>

        <aside className="hidden md:block md:col-span-1 pl-0">
          <Sidebar />
        </aside>
      </div>

      <Footer />
    </div>
  );
}

export default App;
