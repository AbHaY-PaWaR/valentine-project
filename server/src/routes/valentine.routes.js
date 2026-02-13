import express from "express";
import {
  createValentine,
  getValentine
} from "../controllers/valentine.controller.js";

const router = express.Router();

router.post("/create", createValentine);
router.get("/:slug", getValentine);

export default router;
