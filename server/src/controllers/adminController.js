import path from "path";
import { fileURLToPath } from "url";
import { readJson, writeJson } from "../utils/jsonFile.js";

// Resolve repo root db.json reliably from this module's file URL
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_DB = path.join(__dirname, "..", "..", "..", "db.json");

export async function getSeed(req, res) {
  const seed = await readJson(REPO_DB);
  return res.json(seed);
}

export async function seed(req, res) {
  const seed = await readJson(REPO_DB);
  // write to server DB path (same as repo root db.json used by postService)
  await writeJson(REPO_DB, seed);
  return res.json({ seeded: (seed.posts || []).length });
}
