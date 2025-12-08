import * as commentService from "../services/comment.service.js";

export async function updateComment(req, res, next) {
  try {
    const commentId = req.params.id;
    const { content } = req.body;

    const updatedComment = await commentService.updateComment({
      commentId,
      content,
    });
    return res.status(200).json({
      message: "댓글 수정완료",
      data: updatedComment,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(req, res, next) {
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
    next(error);
  }
}
