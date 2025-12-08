import Article, {
  validateCreateArticle,
  validateArticlePage,
} from "../models/article.js";
import * as articlesService from "../services/article.service.js";
import * as commentService from "../services/comment.service.js";
import Comment, { validateParentExists } from "../models/comment.js";

export async function createArticle(req, res, next) {
  try {
    const { title, content } = req.body;

    const article = {
      title,
      content,
    };

    validateCreateArticle(article);

    const createdArticle = await articlesService.createArticle(article);
    return res.status(200).json(createdArticle);
  } catch (error) {
    next(error);
  }
}

export async function findAllArticles(req, res, next) {
  try {
    const { limit = "10", page = "1", sort = "recent", search } = req.query;

    validateArticlePage({ page, limit });
    const createdArticle = await articlesService.findAllArticles(
      page,
      limit,
      sort,
      search
    );
    const result = createdArticle.map((entity) => Article.fromEntity(entity));
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// curl -X POST http://localhost:3000/articles -H "Content-Type: application/json" -d '{"title": "1일차 테스트 글", "content": "내용입니다", "productId": 2}'

export async function findArticleById(req, res, next) {
  try {
    const articleId = parseInt(req.params.id);
    const articles = await articlesService.findArticleById(articleId);
    return res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
}
// curl -X GET http://localhost:3000/articles/1

export async function deleteArticle(req, res, next) {
  try {
    const articleId = parseInt(req.params.id);
    const deleteArticle = await articlesService.deleteArticle(articleId);
    return res
      .status(200)
      .json({ message: `삭제된 상품 :${deleteArticle?.id}` });
  } catch (error) {
    next(error);
  }
}

//curl -X DELETE http://localhost:3000/articles/1

export async function updateArticle(req, res, next) {
  try {
    const articleId = parseInt(req.params.id);
    const data = req.body;
    const articles = await articlesService.updateArticle(articleId, data);
    return res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
}
//curl -X PATCH http://localhost:3000/articles/2 -H "Content-Type: application/json" -d '{"price": 45000, "description": "가격 인상"}'
//curl -X PATCH http://localhost:3000/articles/2 -H "Content-Type: application/json" -d '{"tags": ["할인", "급처"]}'

export async function createComment(req, res, next) {
  try {
    const parentId = req.params.id;
    await validateParentExists(parentId, "article");
    const params = {
      content: req.body.content,
      parentId: parentId,
      parentType: "article",
    };
    const comment = await commentService.createComment(params);
    const result = Comment.fromEntity(comment);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getArticleComments(req, res, next) {
  try {
    const parentId = String(req.params.id);
    await validateParentExists(parentId, "article");
    const params = {
      parentId: parentId,
      parentType: "article",
    };
    const comment = await commentService.getComments(params);
    const result = comment.map((entity) => Comment.fromEntity(entity));

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
