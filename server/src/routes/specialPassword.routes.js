import express from "express";
import { storeSpecialPassword } from "../controllers/specialPassword.controller.js";

const router = express.Router();

router.post("/", storeSpecialPassword);

export default router;
