import Product, {
  validateProductInput,
  validateUpdateFiled,
  validateProductPage,
} from "../models/product.js";
import Comment, { validateParentExists } from "../models/comment.js";
import * as productsService from "../services/product.service.js";
import * as commentService from "../services/comment.service.js";
import _path from "path";
import { prisma } from "../../prisma/prisma.js";

export async function createProduct(req, res, next) {
  try {
    const { name, description, price, tags } = req.body;
    validateProductInput(req.body);
    const createdEntity = await productsService.createProduct({
      name,
      description,
      price,
      tags,
    });

    return res.status(201).json(createdEntity);
  } catch (error) {
    next(error);
  }
}

export async function findAllProducts(req, res, next) {
  try {
    const { limit = "10", page = "1", sort = "recent", search } = req.query;

    validateProductPage({ page, limit });
    const createdProduct = await productsService.findAllProducts(
      page,
      limit,
      sort,
      search
    );
    const result = createdProduct.map((entity) => Product.fromEntity(entity));
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "빈티지 시계","description":"작동 잘 됨","price":120000,"tags":["패션","시계"]}'

export async function findProductById(req, res, next) {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId) || Number(productId) < 1) {
      throw new Error("Invalid ID format.");
    }
    const findproduct = await productsService.findProductById(productId);
    if (!findproduct) {
      return res.status(404).json({
        message: `Product with ID ${req.params.id} not found`,
      });
    }
    const result = Product.fromEntity(findproduct);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
// curl -X GET http://localhost:3000/products/1

export async function updateProduct(req, res, next) {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId) || Number(productId) < 1) {
      throw new Error("Invalid ID format.");
    }
    const data = req.body;
    validateUpdateFiled(productId, data);
    const entity = await productsService.updateProduct(productId, data);
    if (!entity) {
      return res.status(404).json({
        message: `Product with ID ${req.params.id} not found`,
      });
    }
    const result = Product.fromEntity(entity);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
//curl -X PATCH http://localhost:3000/products/1 -H "Content-Type: application/json" -d '{"price": 45000, "description": "가격 인상"}'
//curl -X PATCH http://localhost:3000/products/1 -H "Content-Type: application/json" -d '{"tags": ["할인", "급처"]}'

export async function deleteProduct(req, res, next) {
  try {
    const productId = parseInt(req.params.id);
    const deleteProduct = await productsService.deleteProduct(productId);
    return res
      .status(200)
      .json({ message: `삭제된 상품 :${deleteProduct?.id}` });
  } catch (error) {
    next(error);
  }
}
export async function createComment(req, res, next) {
  try {
    const parentId = String(req.params.id);
    await validateParentExists(parentId, "product");
    const params = {
      content: req.body.content,
      parentId: parentId,
      parentType: "product",
    };
    const comment = await commentService.createComment(params);
    const result = Comment.fromEntity(comment);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
export async function getProductComments(req, res, next) {
  try {
    const parentId = String(req.params.id);
    await validateParentExists(parentId, "product");
    const params = {
      parentId: parentId,
      parentType: "product",
    };
    const comment = await commentService.getComments(params);
    const result = comment.map((entity) => Comment.fromEntity(entity));

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
//curl -X DELETE http://localhost:3000/products/1
export async function createProductImage(req, res, next) {
  try {
    if (!req.file) {
      throw new Error("파일이 업로드되지 않았습니다");
    }

    const { filename: name, path, size } = req.file;
    const { image, image_id, ...productEntity } =
      await prisma.product.findUnique({
        where: { id: req.params.productId },
        include: {
          image: true,
        },
      });

    const newImageEntity = {
      name,
      path,
      size,
    };

    const newProductEntity = await prisma.product.update({
      where: { id: productEntity.id },
      data: {
        ...productEntity,
        image: {
          create: newImageEntity,
        },
      },
    });

    res.json({
      message: "프로필 이미지 업로드 성공",
      file: {
        name,
        path,
        size,
        url: _path.join(path),
      },
    });
  } catch (error) {
    next(error);
  }
}
export async function updateProductImage(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

export async function getProductImage(req, res, next) {
  try {
    const { productId } = req.params;
    const {
      image: { name, path: imagePath },
    } = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        image: true,
      },
    });

    res.sendFile(
      // 절대 경로 필요

      _path.join(import.meta.dirname, "..", "..", imagePath)
    );
  } catch (error) {
    next(error);
  }
}
