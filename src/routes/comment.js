import express from "express";
import {
  deleteComment,
  updateComment,
} from "../controllers/comment.controller.js";
const router = express.Router();

router.route("/:id").delete(deleteComment).patch(updateComment);

export { router };
