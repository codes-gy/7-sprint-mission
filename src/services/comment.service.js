import { prisma } from "../../prisma/prisma.js";

export async function createComment({ content, parentId, parentType }) {
  let data = {
    content: content,
  };
  if (parentType === "product") {
    data.product_id = parentId;
    data.article_id = null;
  }
  if (parentType === "article") {
    data.product_id = null;
    data.article_id = parentId;
  }
  const result = await prisma.product_comment.create({
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
  limit = 5,
  page = 1,
}) {
  const take = parseInt(limit);
  const skip = (parseInt(page) - 1) * take;
  let commentWhere = {};
  let result = {};
  if (parentType === "product") {
    commentWhere = { product_id: parentId };
    result = await prisma.product_comment.findMany({
      where: commentWhere,
      take: take,
      skip: skip,
      orderBy: {
        create_at: "desc",
      },
    });
  }
  if (parentType === "article") {
    commentWhere = { article_id: parentId };
    result = await prisma.article_comment.findMany({
      where: commentWhere,
      take: take,
      skip: skip,
      orderBy: {
        create_at: "desc",
      },
    });
  }

  return result;
}
