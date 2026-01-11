import { prisma } from "../../prisma/prisma.js";
class Comment {
  constructor({ id, content, create_at, update_at, article_id, product_id }) {
    this.id = id;
    this.content = content;
    this.createAt = create_at;
    this.updateAt = update_at;
    this.articleId = article_id;
    this.productId = product_id;
  }
  static fromEntity({
    id,
    content,
    create_at,
    update_at,
    article_id,
    product_id,
  }) {
    const info = {
      id: id.toString(),
      content: content,
      createAt: create_at,
      updateAt: update_at,
      articleId: article_id,
      productId: product_id,
    };
    return new Comment(info);
  }
}

export async function validateParentExists(parentId, parentType) {
  let parent = null;

  if (parentType === "product") {
    parent = await prisma.product.findUnique({ where: { id: parentId } });
  } else if (parentType === "article") {
    parent = await prisma.article.findUnique({ where: { id: parentId } });
  }

  if (!parent) {
    throw new Error(`${parentType} with ID ${parentId} not found.`);
  }
}

export default Comment;
