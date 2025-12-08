import Article, {
  validateCreateArticle,
  validateArticlePage,
} from "../models/article.js";
import * as articlesService from "../services/article.service.js";
import * as commentService from "../services/comment.service.js";
import Comment, { validateParentExists } from "../models/comment.js";

export async function updateComment(req, res) {
  try {
    const commentId = req.params.id;
    const { content } = req.body;

    console.log(`${commentId}  //// ${content}`);
    const updatedComment = await commentService.updateComment({
      commentId,
      content,
    });
    return res.status(200).json({
      message: "댓글 수정완료",
      data: updatedComment,
    });
  } catch (error) {
    handleError(res, error);
  }
}

export async function deleteComment(req, res) {
  try {
    const commentId = parseInt(req.params.id);

    const deletedComment = await commentService.deleteComment({
      commentId,
    });

    return res.status(204).json({
      message: "삭제 완료",
      data: commentId,
    });
  } catch (error) {
    handleError(res, error);
  }
}

function handleError(res, error) {
  console.log(error.statusCode);
  console.log(error.status);
  if (error.statusCode === 404 || error.message.includes("not found")) {
    return res.status(404).json({ message: error.message });
  }
  if (error.message.includes("required") || error.message.includes("valid")) {
    return res.status(400).json({ message: error.message });
  }
  return res
    .status(500)
    .json({ message: `Internal Server Error - ${error.message}` });
}
