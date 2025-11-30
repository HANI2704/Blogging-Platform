import React, { useState } from "react";
import { api } from "../../../server/src/api/mockApi";

export default function Comments({ postId, comments = [] }) {
  const [list, setList] = useState(comments);
  const [text, setText] = useState("");

  React.useEffect(() => setList(comments), [comments]);

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const c = await api.addComment(postId, { text });
    // fetch updated comments via subscribe, but optimistically update
    setList((s) => [...s, c]);
    setText("");
  };

  return (
    <div className="comments mt-6">
      <h4 className="text-lg font-semibold mb-3">Comments ({list.length})</h4>
      <ul className="space-y-3">
        {list.map((c) => (
          <li key={c.id} className="p-3 rounded-md bg-slate-900/20">
            <div className="comment-meta text-slate-300">
              {c.author} • {new Date(c.createdAt).toLocaleString()}
            </div>
            <div className="mt-1 text-slate-200">{c.text}</div>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="mt-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          className="w-full p-2 rounded-md bg-slate-900/30 border border-transparent focus:border-brand"
        />
        <div className="mt-2">
          <button className="btn" type="submit">
            Add comment
          </button>
        </div>
      </form>
    </div>
  );
}
