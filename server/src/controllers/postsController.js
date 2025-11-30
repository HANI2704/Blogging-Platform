import * as postService from "../services/postService.js";

export async function list(req, res, next) {
  try {
    const { page = 1, perPage = 10, search = "", category = "" } = req.query;
    const result = await postService.list({
      page: Number(page),
      perPage: Number(perPage),
      search,
      category,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function get(req, res, next) {
  try {
    const post = await postService.get(req.params.id);
    if (!post) return res.status(404).json({ error: "Not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const post = await postService.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const post = await postService.update(req.params.id, req.body);
    if (!post) return res.status(404).json({ error: "Not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await postService.remove(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

export async function like(req, res, next) {
  try {
    const likes = await postService.like(req.params.id);
    if (likes == null) return res.status(404).json({ error: "Not found" });
    res.json({ likes });
  } catch (err) {
    next(err);
  }
}

export async function addComment(req, res, next) {
  try {
    const comment = await postService.addComment(req.params.id, req.body);
    if (!comment) return res.status(404).json({ error: "Not found" });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}
