import express from "express";
import contactController from "../controllers/contact.controller";

const router = express.Router();
router.post("/mark-spam", contactController.markSpam);
router.post("/search", contactController.search);
router.get("/generate-random", contactController.generateRandom);

export default router;
