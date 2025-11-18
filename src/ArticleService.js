import axios from "axios";
import { handleAxiosError } from "../main.js";

export class Article {
  #title;
  #content;
  #image;
  #writer;
  #likeCount;

  constructor(title, content, writer, image) {
    this.#title = title;
    this.#content = content;
    this.writer = writer;
    this.#image = image;
    this.#likeCount = 0;
    this.createdAt = new Date();
  }

  // 좋아요 수 증가
  like() {
    this.#likeCount += 1;
  }

  likeCount() {
    return this.#likeCount;
  }
}

const BASE_URL = "https://panda-market-api-crud.vercel.app";

/**
 * 게시글 목록 조회
 * @param {number} page - 페이지 번호
 * @param {number} pageSize - 페이지 당 항목 수
 * @param {string} keyword - 검색 키워드
 * @returns {Promise<object[]>} 게시글 목록 return
 */
export function getArticleList(page = 1, pageSize = 10, keyword = "") {
  const params = {
    page: page,
    pageSize: pageSize,
    keyword: keyword,
  };

  return axios
    .get(`${BASE_URL}/articles`, { params: params })
    .then((response) => response.data)
    .catch((error) => {
      handleAxiosError(error, "getArticleList");
    });
}

/**
 * 게시글 조회
 * @param {string} articleId - 게시글 ID
 * @returns {Promise<object>} 조회된 게시글 객체 reutrn
 */
export function getArticle(articleId) {
  return axios
    .get(`${BASE_URL}/articles/${articleId}`)
    .then((response) => response.data)
    .catch((error) => {
      handleAxiosError(error, "getArticle");
    });
}

/**
 * 게시글 추가
 * @param {object} data - 생성할 데이터
 * @param {string} data.title - 제목
 * @param {string} data.content - 내용
 * @param {string} data.image - 이미지 URL
 * @returns {Promise<object>} 생성된 게시글 객체 return
 */
export function createArticle(data) {
  return axios
    .post(`${BASE_URL}/articles`, data)
    .then((response) => response.data)
    .catch((error) => {
      handleAxiosError(error, "createArticle");
    });
}

/**
 * 게시글 수정(일부 수정)
 * @param {string} articleId - 게시글 ID
 * @param {object} data - 수정할 데이터
 * @returns {Promise<object>} 수정된 게시글 객체 return
 */
export function patchArticle(articleId, data) {
  return axios
    .patch(`${BASE_URL}/articles/${articleId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      handleAxiosError(error, "patchArticle");
    });
}

/**
 * 게시글 삭제
 * @param {string} articleId - 게시글 ID
 * @returns {Promise<object>} 삭제한 객체 return
 */
export function deleteArticle(articleId) {
  return axios
    .delete(`${BASE_URL}/articles/${articleId}`)
    .then((response) => response.data)
    .catch((error) => {
      handleAxiosError(error, "deleteArticle");
    });
}
