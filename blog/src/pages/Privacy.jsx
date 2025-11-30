import React from "react";

export default function Privacy() {
  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Privacy</h1>
      <p className="mt-3 text-slate-300">
        This demo does not collect personal data. LocalStorage is used to store
        posts locally in your browser.
      </p>
    </div>
  );
}
