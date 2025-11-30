import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import { readJson, writeJson } from "../utils/jsonFile.js";

// Resolve repository root db.json reliably
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "..", "..", "db.json");

export async function list({
  page = 1,
  perPage = 10,
  search = "",
  category = "",
} = {}) {
  const db = await readJson(DB_PATH);
  let posts = (db.posts || []).slice().reverse();
  if (category) posts = posts.filter((p) => p.category === category);
  if (search) {
    const q = String(search).toLowerCase();
    posts = posts.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.excerpt || "").toLowerCase().includes(q) ||
        (p.content || "").toLowerCase().includes(q)
    );
  }
  const total = posts.length;
  const start = (page - 1) * perPage;
  const items = posts.slice(start, start + perPage);
  return { items, total };
}

export async function get(id) {
  const db = await readJson(DB_PATH);
  return (db.posts || []).find((p) => p.id === id) || null;
}

export async function create({
  title,
  content,
  excerpt = "",
  category = "General",
  author = "Anonymous",
}) {
  const db = await readJson(DB_PATH);
  const post = {
    id: uuidv4(),
    title,
    content,
    excerpt,
    category,
    author,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: 0,
    comments: [],
  };
  db.posts = db.posts || [];
  db.posts.push(post);
  await writeJson(DB_PATH, db);
  return post;
}

export async function update(id, patch) {
  const db = await readJson(DB_PATH);
  const idx = (db.posts || []).findIndex((p) => p.id === id);
  if (idx === -1) return null;
  db.posts[idx] = {
    ...db.posts[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await writeJson(DB_PATH, db);
  return db.posts[idx];
}

export async function remove(id) {
  const db = await readJson(DB_PATH);
  db.posts = (db.posts || []).filter((p) => p.id !== id);
  await writeJson(DB_PATH, db);
}

export async function like(id) {
  const db = await readJson(DB_PATH);
  const post = (db.posts || []).find((p) => p.id === id);
  if (!post) return null;
  post.likes = (post.likes || 0) + 1;
  await writeJson(DB_PATH, db);
  return post.likes;
}

export async function addComment(id, { author = "Anon", text }) {
  const db = await readJson(DB_PATH);
  const post = (db.posts || []).find((p) => p.id === id);
  if (!post) return null;
  const comment = {
    id: uuidv4(),
    author,
    text,
    createdAt: new Date().toISOString(),
  };
  post.comments = post.comments || [];
  post.comments.push(comment);
  await writeJson(DB_PATH, db);
  return comment;
}
