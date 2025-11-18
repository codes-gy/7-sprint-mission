import axios from "axios";
import { handleAxiosError } from "../main.js";

/**
 * 상품 클래스
 * @property {string} name - 상품명
 * @property {string} description - 상품 설명
 * @property {number} price - 판매 가격
 * @property {string[]} tags - 해시태그 배열
 * @property {string[]} images - 이미지 배열
 * @property {number} favoriteCount - 찜하기 수
 */
export class Product {
  #name;
  #description;
  #price;
  #tags;
  #images;
  #favoriteCount;

  constructor({ name, description, price, tags, images, favoriteCount = 0 }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags;
    this.images = images;
    this.favoriteCount = favoriteCount;
  }

  favorite() {
    this.favoriteCount++;
  }
}

/**
 * 전자제품 클래스 (Product 상속)
 * @property {string} manufacturer - 제조사
 */
export class ElectronicProduct extends Product {
  manufacturer;

  constructor({ manufacturer, ...productData }) {
    super(productData);
    this.manufacturer = manufacturer;
  }
}

const BASE_URL = "https://panda-market-api-crud.vercel.app";

/**
 * 상품 목록 조회
 * @param {number} page - 페이지 번호
 * @param {number} pageSize - 페이지 당 항목 수
 * @param {string} keyword - 검색 키워드
 * @returns {Promise} 상품 목록 (클래스 인스턴스)
 */
export async function getProductList(page = 1, pageSize = 10, keyword = "") {
  const params = {
    page: page,
    pageSize: pageSize,
    keyword: keyword,
  };

  try {
    const response = await axios.get(`${BASE_URL}/products`, { params });
    const data = response.data;

    if (!Array.isArray(data?.list)) {
      console.error("getProductList: API 응답이 배열이 아닙니다.", data?.list);
      throw new Error("상품 목록 형식이 올바르지 않습니다.");
    }

    // 해시태그에 전자제품이 포함되어 있는 상품은 Product클래스
    // 대신 ElectronicProduct 클래스를 사용해 인스턴스를 생성 그 외는 Product 클래스
    const products = data.list.map((item) => {
      if (item.tags && item.tags.includes("전자제품")) {
        //전자제품 해시태그 확인
        return new ElectronicProduct(item);
      } else {
        return new Product(item);
      }
    });

    return products;
  } catch (error) {
    handleAxiosError(error, "getProductList");
  }
}

/**
 * 상품 조회
 * @param {string} productId - 상품 ID
 * @returns {Promise<object>} 조회한 상품 객체 return
 */
export async function getProduct(productId) {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "getProduct");
  }
}

/**
 * 상품 추가
 * @param {object} data - request 데이터
 * @returns {Promise<object>} 추가한 상품 return
 */
export async function createProduct(data) {
  try {
    const response = await axios.post(`${BASE_URL}/products`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "createProduct");
  }
}

/**
 * 상품 수정 (일부 수정)
 * @param {string} productId - 상품 ID
 * @param {object} data - 수정할 데이터
 * @returns {Promise<object>} 수정한 상품 객체 return
 */
export async function patchProduct(productId, data) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/products/${productId}`,
      data
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "patchProduct");
  }
}

/**
 * 상품 삭제
 * @param {string} productId - 상품 ID
 * @returns {Promise<object>} 삭제한 상품 객체 return
 */
export async function deleteProduct(productId) {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "deleteProduct");
  }
}
