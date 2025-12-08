import { prisma } from "../../prisma/prisma.js";

export async function createComment({ content, parentId, parentType }) {
  let data = {
    content: content,
  };
  let models;
  if (parentType === "product") {
    models = prisma.product_comment;
    data.product_id = parentId;
  }
  if (parentType === "article") {
    models = prisma.article_comment;
    data.article_id = parentId;
  }
  const result = await models.create({
    data,
  });

  return result;
}

export async function updateComment({ commentId, parentType, content }) {
  const existingComment = await prisma.product_comment.findUnique({
    where: { id: commentId },
  });

  if (!existingComment) {
    throw new Error(`Comment with ID ${commentId} not found.`);
  }
  const result = await prisma.product_comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: content,
    },
  });

  return result;
}

export async function deleteComment({ commentId }) {
  const result = await prisma.product_comment.delete({
    where: {
      id: commentId,
    },
  });
  return result;
}

export async function getComments({
  parentId,
  parentType,
  limit = 10,
  cursorId,
}) {
  const take = parseInt(limit);
  const cursor = cursorId ? cursorId : undefined;
  //const skip = (parseInt(page) - 1) * take;
  let commentWhere = {};
  let models;
  let comments = {};

  if (parentType === "product") {
    models = prisma.product_comment;
    commentWhere = { product_id: parentId };
  } else if (parentType === "article") {
    models = prisma.article_comment;
    commentWhere = { article_id: parentId };
  } else {
    throw new Error("Invalid parentType");
  }
  if (cursor) {
    // 커서 페이징은 항상 ID가 이전 커서보다 '작은' (desc 정렬 기준 다음 페이지) 항목을 찾습니다.
    commentWhere.id = { lt: cursor };
  }
  comments = await models.findMany({
    where: commentWhere,
    take: take,
    //skip: skip,
    orderBy: {
      id: "desc",
    },
  });

  const nextCursor =
    comments.length === take
      ? comments[comments.length - 1].id.toString()
      : null;

  return { comments, nextCursor };
}
