import express from "express";
import * as postsController from "../controllers/postsController.js";

const router = express.Router();

router.get("/", postsController.list);
router.get("/:id", postsController.get);
router.post("/", postsController.create);
router.put("/:id", postsController.update);
router.delete("/:id", postsController.remove);
router.post("/:id/like", postsController.like);
router.post("/:id/comments", postsController.addComment);

export default router;
