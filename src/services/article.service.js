import { prisma } from "../../prisma/prisma.js";

// 상품 생성
export async function createArticle(articleData) {
  // 💡 모든 DB 작업은 서비스 계층에서 진행
  if (!articleData.content) {
    throw new Error('required parameter "content"');
  }
  const article = await prisma.article.create({
    data: articleData,
  });
  return article;
}

// 모든 상품을 조회

export async function findAllArticles(cursor, limit, sort, search) {
  const order = sort === "recent" ? "desc" : "asc";
  let where = {};
  console.log(`[DEBUG] 수신된 검색어: ${search}`);
  if (search && search.trim() !== "") {
    where = {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };
  }

  if (cursor) {
    if (order === "desc") where.id = { lt: cursor };
    if (order === "asc") where.id = { gt: cursor };
  }

  const articleLimit = parseInt(limit, 10);

  const articles = await prisma.article.findMany({
    where: where,
    //skip: (parseInt(page) - 1) * parseInt(limit),
    take: articleLimit,
    orderBy: { created_at: order },
  });

  const nextCursor =
    articles.length === articleLimit
      ? articles[articles.length - 1].id.toString()
      : null;

  return articles;
}

export async function findArticleById(id) {
  const article = await prisma.article.findUnique({
    where: { id: id },
  });
  if (!article) {
    throw new Error(`Article ID ${id} not found.`);
  }
  return article;
}

export async function updateArticle(id, data) {
  const article = await prisma.article.update({
    where: { id: id },
    data: data, // 업데이트할 데이터 객체
  });
  return article;
}

export async function deleteArticle(id) {
  // 💡 Prisma.product.delete(): 특정 ID를 가진 레코드를 찾아 삭제합니다.
  const deletedArticle = await prisma.article.delete({
    where: { id: id },
  });
  // 삭제된 레코드 정보를 반환합니다.
  return deletedArticle;
}
