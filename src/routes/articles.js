import express from "express";
import {
  createArticle,
  deleteArticle,
  findAllArticles,
  findArticleById,
  updateArticle,
  createComment,
  getArticleComments,
} from "../controllers/article.controller.js";
const router = express.Router();

router.route("/").get(findAllArticles).post(createArticle);
router
  .route("/:id")
  .get(findArticleById)
  .delete(deleteArticle)
  .patch(updateArticle);

router.route("/:id/comments").get(getArticleComments).post(createComment);

export { router };
