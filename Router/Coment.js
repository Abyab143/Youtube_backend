import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../Controllers/Coments.js";
import { Authentication } from "../Auth.js";
const router = express.Router();

router.get("/comments/:videoId", getComments);
router.post("/addcoment", Authentication, addComment);

export default router;
