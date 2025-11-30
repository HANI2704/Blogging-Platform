import fs from "fs/promises";

export async function readJson(path) {
  try {
    const raw = await fs.readFile(path, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return { posts: [] };
  }
}

export async function writeJson(path, data) {
  await fs.writeFile(path, JSON.stringify(data, null, 2), "utf8");
}
