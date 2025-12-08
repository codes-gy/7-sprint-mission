class Article {
  constructor({ id, title, content, createdAt }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
  static fromEntity({ id, title, content, create_at }) {
    const info = {
      id: id.toString(),
      title,
      content,
      createAt: create_at,
    };

    validateArticleInfo(info);

    return new Article(info);
  }
}

export function validateCreateArticle({ title, content }) {
  if (!title) {
    throw new Error("requied parameter title");
  }
  if (!content) {
    throw new Error("requied parameter content");
  }
}

function validationId(id) {
  if (typeof id !== "string") {
    throw new Error(`Invalid id type "${typeof id}"`);
  }
}

function validationTitle(title) {
  if (title.length > 255) {
    throw new Error(`Title too long ${title.length}`);
  }
}

function validationContent(content) {
  if (content.length > 10000) {
    throw new Error(`Title too long ${content.length}`);
  }
}

function validationCreatedAt(createAt) {
  if (new Date("2024-01-01") > createAt) {
    throw new Error(`Invalid createAt ${createAt.toString()}`);
  }
}

function validateArticleInfo({ id, title, content, createAt }) {
  validationId(id);
  validationTitle(title);
  validationContent(content);
  validationCreatedAt(createAt);
}

export function validateArticlePage({ page, limit }) {
  const pageVal = parseInt(page);
  const limitVal = parseInt(limit);
  if (isNaN(pageVal) || pageVal < 1) {
    throw new Error("Invalid 'page': must be a positive integer.");
  }
  if (isNaN(limitVal) || limitVal < 1) {
    throw new Error("Invalid 'limit': must be a positive integer.");
  }
}
export default Article;
