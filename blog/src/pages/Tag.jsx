import React from "react";
import { useParams } from "react-router-dom";

export default function Tag() {
  const { tag } = useParams();
  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Tag: {tag}</h1>
      <p className="mt-3 text-slate-300">
        This demo does not maintain separate tag lists; search is recommended.
      </p>
    </div>
  );
}
