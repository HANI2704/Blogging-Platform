import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../../../server/src/api/mockApi";
import Comments from "../components/Comments";

export default function BlogDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.get(id).then((p) => {
      if (mounted) setPost(p);
    });
    const unsub = api.subscribe(() =>
      api.get(id).then((p) => {
        if (mounted) setPost(p);
      })
    );
    return () => {
      mounted = false;
      unsub();
    };
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <div className="text-sm muted mt-1">
            {post.category} • {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={`/edit/${post.id}`}
            className="text-sm text-indigo-300 hover:underline"
          >
            Edit
          </Link>
          <button
            className="btn secondary"
            onClick={() => {
              api.remove(post.id).then(() => nav("/"));
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div
        className="prose prose-invert mt-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-6 flex items-center gap-3">
        <button className="btn" onClick={() => api.like(post.id)}>
          &#128077; Like ({post.likes || 0})
        </button>
        <div className="text-sm muted">
          {post.comments?.length || 0} comments
        </div>
      </div>

      <div className="mt-6">
        <Comments postId={post.id} comments={post.comments || []} />
      </div>
    </div>
  );
}
