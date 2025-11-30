import React from "react";

export default function Contact() {
  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="mt-3 text-slate-300">
        You can reach the demo author at <strong>demo@example.com</strong>.
      </p>
      <form className="mt-4 space-y-3">
        <input
          placeholder="Your name"
          className="w-full p-3 rounded bg-slate-800/40"
        />
        <input
          placeholder="Your email"
          className="w-full p-3 rounded bg-slate-800/40"
        />
        <textarea
          placeholder="Message"
          className="w-full p-3 rounded bg-slate-800/40 h-28"
        />
        <button className="btn">Send</button>
      </form>
    </div>
  );
}
