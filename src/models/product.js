class Product {
  constructor({ id, name, description, price, tags = [], createdAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags;
    this.createdAt = createdAt;
  }
  static fromEntity({ id, name, description, price, tags, create_at }) {
    const info = {
      id: id.toString(),
      name,
      description,
      price,
      tags: tags || [],
      createAt: create_at,
    };
    validateProductInfo(info);
    return new Product(info);
  }
}

export function validateId(id) {
  if (typeof id !== "string") {
    throw new Error(`Invalid id type "${typeof id}"`);
  }
}

export function validateName(name) {
  if (!name) {
    throw new Error("Name is required");
  }
  if (name.length > 255) {
    throw new Error(`Title too long ${name.length}`);
  }
}

export function validateDescription(description) {
  if (!description) {
    throw new Error("description is required");
  }
  if (description.length > 10000) {
    throw new Error(`Title too long ${description.length}`);
  }
}

export function validatePrice(price) {
  const value = Number(price);
  if (!price) {
    throw new Error("price is required");
  }
  if (isNaN(value)) {
    throw new Error(`Invalid price: "${value}" is not a number`);
  }
  if (value < 0) {
    throw new Error("price cannot be negative");
  }
}
function validateTags(tags) {
  if (!Array.isArray(tags)) {
    throw new Error(`Invalid tags: expected array but got "${typeof tags}"`);
  }
  if (tags.length > 5) {
    throw new Error("Too many tags: maximum 5 tags allowed");
  }
}

function validationCreatedAt(createAt) {
  if (new Date("2024-01-01") > createAt) {
    throw new Error(`Invalid createAt ${createAt.toString()}`);
  }
}
export function validateUpdateFiled(id, data) {
  validateId(id);
  if (Object.keys(data).length === 0) {
    throw new Error("Update data is required");
  }
}
function validateProductInfo({ id, name, description, price, tags, createAt }) {
  validateId(id);
  validateName(name);
  validateDescription(description);
  validatePrice(price);
  validateTags(tags);
  validationCreatedAt(createAt);
}

export function validateProductInput({ name, description, price, tags }) {
  validateName(name);
  validateDescription(description);
  validatePrice(price);
  validateTags(tags);
}

export function validateProductPage({ page, limit }) {
  const pageVal = parseInt(page);
  const limitVal = parseInt(limit);
  if (isNaN(pageVal) || pageVal < 1) {
    throw new Error("Invalid 'page': must be a positive integer.");
  }
  if (isNaN(limitVal) || limitVal < 1) {
    throw new Error("Invalid 'limit': must be a positive integer.");
  }
}

export default Product;
