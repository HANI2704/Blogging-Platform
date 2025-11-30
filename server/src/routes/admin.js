import express from "express";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();

router.get("/posts", adminController.getSeed);
router.post("/seed", adminController.seed);

export default router;
