import React from "react";

export default function FAQ() {
  return (
    <div className="card">
      <h1 className="text-2xl font-bold">FAQ</h1>
      <div className="mt-3 text-slate-300 space-y-2">
        <div>
          <strong>Q:</strong> Is this a production-ready blog?
          <p>A: No — this is a demo scaffold for learning and prototyping.</p>
        </div>
        <div>
          <strong>Q:</strong> How do I add posts?
          <p>
            A: Use the "Create" button in the navbar to add posts via the
            editor.
          </p>
        </div>
      </div>
    </div>
  );
}
