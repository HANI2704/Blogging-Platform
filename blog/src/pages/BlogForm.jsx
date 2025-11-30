import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../server/src/api/mockApi";
import TinyMCEEditor from "../components/TinyMCEEditor";

export default function BlogForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("General");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      api.get(id).then((p) => {
        if (!p) return;
        setTitle(p.title);
        setExcerpt(p.excerpt || "");
        setCategory(p.category || "General");
        setContent(p.content || "");
      });
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (id) {
      await api.update(id, { title, excerpt, category, content });
    } else {
      const post = await api.create({ title, excerpt, category, content });
      // navigate to detail
      return nav(`/post/${post.id}`);
    }
    // after edit, go back to detail page for the post
    nav(`/post/${id}`);
  };

  return (
    <form onSubmit={submit} className="blog-form space-y-4">
      <h2 className="text-2xl font-semibold">{id ? "Edit" : "Create"} Post</h2>
      <div>
        <label className="block text-sm text-slate-300">Title</label>
        <input
          className="mt-1 p-2 w-full rounded-md bg-slate-900/30 border border-transparent focus:border-brand"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm text-slate-300">Excerpt</label>
        <input
          className="mt-1 p-2 w-full rounded-md bg-slate-900/30 border border-transparent focus:border-brand"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm text-slate-300">Category</label>
        <input
          className="mt-1 p-2 w-full rounded-md bg-slate-900/30 border border-transparent focus:border-brand"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-2">Content</label>
        <div className="editor-wrapper">
          <TinyMCEEditor value={content} onChange={setContent} />
        </div>
      </div>

      <div className="pt-2">
        <button className="btn" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
