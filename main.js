import axios from "axios";

import {
  Article,
  getArticleList,
  createArticle,
  getArticle,
  patchArticle,
  deleteArticle,
} from "./src/ArticleService.js";

import {
  Product,
  ElectronicProduct,
  getProductList,
  createProduct,
  getProduct,
  patchProduct,
  deleteProduct,
} from "./src/ProductService.js";

/**
 * @param {Error} error - 오류 객체
 * @param {string} context - 오류가 발생한 함수명 (식별)
 */
export function handleAxiosError(error, contextName) {
  const errorMessage = error.response?.data?.message || error.message;
  console.error(`ERROR [${contextName}]:`, errorMessage);
  throw new Error(errorMessage);
}

// Article 테스트

// 게시글 목록 조회
getArticleList(1, 10, "테스트")
  .then((articles) => console.log("Article 목록:", articles))
  .catch((error) => console.error("Article 목록 오류:", error.message));

// 게시글 추가
const newArticleData = {
  title: "새로운 게시글 (axios)",
  content: "내용입니다...",
  image: "http://example.com/image.jpg",
};
createArticle(newArticleData)
  .then((article) => {
    console.log("생성된 Article:", article);
    const articleId = article.id;

    if (!articleId) {
      console.log("테스트 결과 없음");
      return;
    }

    // 게시글 조회
    return getArticle(articleId)
      .then((fetchedArticle) => {
        console.log("조회된 Article:", fetchedArticle);

        // 게시글 수정
        const patchData = { content: "수정된 내용입니다." };
        return patchArticle(articleId, patchData);
      })
      .then((updatedArticle) => {
        console.log("수정된 Article:", updatedArticle);

        // 게시글 삭제
        return deleteArticle(articleId);
      })
      .then((response) => {
        console.log("삭제 Article 응답:", response);
      });
  })
  .catch((error) => console.error("Article 오류:", error.message));

// Product 테스트

// 상품 목록 조회
getProductList(1, 10, "")
  .then((productsArray) => {
    // 목록 조회 성공
    console.log("Product 목록:", productsArray);

    // 목록 조회 후 테스트 상품 추가
    const newProductData = {
      name: "신형 노트북",
      description: "엄청 빠른 노트북",
      price: 1500000,
      tags: ["전자제품", "노트북", "신상품"],
      images: ["http://example.com/laptop.jpg"],
    };
    return createProduct(newProductData);
  })
  .then((createdProduct) => {
    // 상품 추가 성공
    console.log("생성된 Product:", createdProduct);
    const productId = createdProduct?.id;

    if (!createdProduct || !productId) {
      //상품 추가 오류로 다음 진행 중단
      return;
    }

    // 상품 조회
    return getProduct(productId)
      .then((fetchedProduct) => {
        // 3. 특정 상품 조회 성공 시
        console.log("조회된 Product:", fetchedProduct);

        // 상품 수정
        const patchData = { price: 1450000 };
        return patchProduct(productId, patchData);
      })
      .then((updatedProduct) => {
        // 상품 수정 성공 시
        console.log("수정된 Product:", updatedProduct);

        // 상품 삭제
        return deleteProduct(productId);
      })
      .then((deleteResponse) => {
        // 상품 삭제 성공 시
        console.log("삭제된 Product 응답:", deleteResponse);
      });
  })
  .catch((error) => {
    // 상품 조회 중 오류 발생
    console.error("Product Service 오류:", error.message);
  });

// --- 클래스 테스트 ---
const toy = new Product({
  name: "곰인형",
  description: "귀여운 곰인형",
  price: 20000,
  tags: ["장난감", "인형"],
  images: [],
});

toy.favorite();
toy.favorite();
toy.favorite();
toy.favorite();
console.log(toy);

const tv = new ElectronicProduct({
  name: "스마트 TV",
  description: "고화질 TV",
  price: 1000000,
  tags: ["전자제품", "가전"],
  images: [],
  manufacturer: "Panda Electronics",
});

tv.favorite();
tv.favorite();
tv.favorite();
console.log(tv);

const myArticle = new Article({
  title: "테스트 제목",
  content: "테스트 내용",
  writer: "김판다",
  image: null,
});

myArticle.like();
myArticle.like();
console.log(myArticle);
