import test from "node:test";
import { prisma } from "../../prisma/prisma.js";

// 상품 생성
export async function createProduct(productData) {
  // 💡 모든 DB 작업은 서비스 계층에서 진행

  const product = await prisma.product.create({
    data: productData,
  });

  return product;
}

// 모든 상품을 조회
export async function findAllProducts(page, limit, sort, search) {
  const order = sort === "recent" ? "desc" : "asc";
  let where = {};
  console.log(`[DEBUG] 수신된 검색어: ${search}`);
  if (search && search.trim() !== "") {
    where = {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };
  }
  const products = await prisma.product.findMany({
    where: where,
    skip: (parseInt(page) - 1) * parseInt(limit),
    take: parseInt(limit),
    orderBy: { created_at: order },
  });
  return products;
}

export async function findProductById(id) {
  const product = await prisma.product.findUnique({
    where: { id: id },
  });
  if (!product) throw new Error(`Product with ID ${id} not found.`);

  return product;
}

export async function updateProduct(id, data) {
  const product = await prisma.product.update({
    where: { id: id },
    data: data, // 업데이트할 데이터 객체
  });
  if (!product) throw new Error(`Product with ID ${id} not found.`);

  return product;
}

export async function deleteProduct(id) {
  // 💡 Prisma.product.delete(): 특정 ID를 가진 레코드를 찾아 삭제합니다.
  const deletedProduct = await prisma.product.delete({
    where: { id: id },
  });
  // 삭제된 레코드 정보를 반환합니다.
  return deletedProduct;
}
