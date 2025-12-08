<<<<<<< HEAD
## 클래스 구현하기

- [x] `class`키워드를 이용해서 Product 클래스를 만들어 주세요.
- [x] `name`(상품명)`description`(상품 설명),`price`(판매 가격),`tags`(해시태그 배열),`images`(이미지 배열),`favoriteCount`(찜하기 수)프로퍼티를 가집니다.

- [x] `favorite`메소드를 가집니다.`favorite`메소드가 호출될 경우 찜하기 수가 1 증가합니다.
- [x] `class`키워드를 이용해서 ElectronicProduct 클래스를 만들어 주세요.
- [x] Product를 상속하며, 추가로`manufacturer`(제조사) 프로퍼티를 가집니다.
- [x] class 키워드를 이용해서 Article 클래스를 만들어 주세요.
- [x] `title`(제목),`content`(내용),`writer`(작성자),`likeCount`(좋아요 수) 프로퍼티를 가집니다.
- [x] `like`메소드를 가집니다.`like`메소드가 호출될 경우 좋아요 수가 1 증가합니다.
- [x] 각 클래스 마다**constructor**를 작성해 주세요.
- [x] 추상화/캡슐화/상속/다형성을 고려하여 코드를 작성해 주세요.

## Article 요청 함수 구현하기

- [x] [https://panda-market-api-crud.vercel.app/docs](https://panda-market-api-crud.vercel.app/docs)의 Article API를 이용하여 아래 함수들을 구현해 주세요.
- [x] `getArticleList()`: GET 메소드를 사용해 주세요.
- [x] `page`,`pageSize`,`keyword`쿼리 파라미터를 이용해 주세요.
- [x] `getArticle()`: GET 메소드를 사용해 주세요.
- [x] `createArticle()`: POST 메소드를 사용해 주세요.
- [x] request body에`title`,`content`,`image`를 포함해 주세요.
- [x] `patchArticle()`: PATCH 메소드를 사용해 주세요.
- [x] `deleteArticle()`: DELETE 메소드를 사용해 주세요.
- [x] `fetch`혹은`axios`를 이용해 주세요.
- [x] 응답의 상태 코드가 2XX가 아닐 경우, 에러 메시지를 콘솔에 출력해 주세요.
- [x] `.then()`메소드를 이용하여 비동기 처리를 해주세요.
- [x] `.catch()`를 이용하여 오류 처리를 해주세요.

### Article 요청 함수 구현하기 (심화)

- [x] Article 클래스에`createdAt`(생성일자) 프로퍼티를 만들어 주세요.
- [x] 새로운 객체가 생성되어 constructor가 호출될 시`createdAt`에 현재 시간을 저장합니다.

## Product 요청 함수 구현하기

- [x] [https://panda-market-api-crud.vercel.app/docs](https://panda-market-api-crud.vercel.app/docs)의 Product API를 이용하여 아래 함수들을 구현해 주세요.
- [x] `getProductList()`: GET 메소드를 사용해 주세요.
- [x] `page`,`pageSize`,`keyword`쿼리 파라미터를 이용해 주세요.
- [x] `getProduct()`: GET 메소드를 사용해 주세요.
- [x] `createProduct()`: POST 메소드를 사용해 주세요.
- [x] request body에`name`,`description`,`price`,`tags`,`images`를 포함해 주세요.
- [x] `patchProduct()`: PATCH 메소드를 사용해 주세요.
- [x] `deleteProduct()`: DELETE 메소드를 사용해 주세요.
- [x] `async/await`을 이용하여 비동기 처리를 해주세요.
- [x] `try/catch`를 이용하여 오류 처리를 해주세요.
- [x] `getProductList()`를 통해서 받아온 상품 리스트를 각각 인스턴스로 만들어`products`배열에 저장해 주세요.
- [x] 해시태그에 "**전자제품**"이 포함되어 있는 상품들은`Product`클래스 대신`ElectronicProduct`클래스를 사용해 인스턴스를 생성해 주세요.
- [x] 나머지 상품들은 모두`Product`클래스를 사용해 인스턴스를 생성해 주세요.

## 기타

- [x] 구현한 함수들을 아래와 같이 파일을 분리해 주세요.
- [x] **export**를 활용해 주세요.
- [x] `ProductService.js`파일**Product**API 관련 함수들을 작성해 주세요.
- [x] `ArticleService.js`파일에**Article**API 관련 함수들을 작성해 주세요.
- [x] 이외의 코드들은 모두`main.js`파일에 작성해 주세요.
- [x] **import**를 활용해 주세요.
- [x] 각 함수를 실행하는 코드를 작성하고, 제대로 동작하는지 확인해 주세요.
- [x] `README.md`파일을 작성해 주세요.
- [x] 마크다운 언어를 숙지하여 작성해 주세요.
- [x] 내용은 자유롭게 작성해 주세요.
=======
## 🚀 1일차: 핵심 CRUD API 및 데이터 타입 검증 (보강)

1일차는 기본 CRUD의 성공을 확인하고, 데이터 타입 관련 예외 발생 여부를 확인합니다.

| **API**                    | **목적**                  | **Method** | **경로**        | **검증 시나리오**                                              | **curl 명령어**                                                                                                                                                                              |
| -------------------------- | ------------------------- | ---------- | --------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **상품 등록**              | Product POST (Success)    | `POST`     | `/products`     | **정상 등록** 및 `201 Created` 확인                            | `curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "새 상품", "description": "테스트 상품입니다", "price": 50000, "tags": ["전자제품", "새것"]}'` |
| **상품 상세 조회**         | Product GET (Success)     | `GET`      | `/products/:id` | **정상 조회** 및 `200 OK` 확인                                 | `curl -X GET http://localhost:3000/products/[등록된 상품 ID]`                                                                                                                                |
| **상품 수정 (Price)**      | Product PATCH (Success)   | `PATCH`    | `/products/:id` | **가격 필드 수정** 및 `200 OK` 확인                            | `curl -X PATCH http://localhost:3000/products/[등록된 상품 ID] -H "Content-Type: application/json" -d '{"price": 45000, "description": "가격 인하"}'`                                        |
| **상품 수정 (Tags)**       | Product PATCH (Success)   | `PATCH`    | `/products/:id` | **Tags 필드 수정** (배열) 확인                                 | `curl -X PATCH http://localhost:3000/products/[등록된 상품 ID] -H "Content-Type: application/json" -d '{"tags": ["할인", "급처"]}'`                                                          |
| **상품 등록 (Price Type)** | Product POST (Type Error) | `POST`     | `/products`     | `price`에 **문자열 입력** 시 서버 오류 (`500` 또는 `400` 예상) | `curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "잘못된 가격", "price": "오만원", "description": "테스트"}' -v`                                |
| **게시글 등록**            | Article POST (Success)    | `POST`     | `/articles`     | **정상 등록** 및 `201 Created` 확인                            | `curl -X POST http://localhost:3000/articles -H "Content-Type: application/json" -d '{"title": "1일차 테스트 글", "content": "내용입니다"}'`                                                 |
| **게시글 수정**            | Article PATCH (Success)   | `PATCH`    | `/articles/:id` | **일부 필드만 수정** 및 `200 OK` 확인                          | `curl -X PATCH http://localhost:3000/articles/[등록된 게시글 ID] -H "Content-Type: application/json" -d '{"content": "내용이 수정되었습니다."}'`                                             |
| **게시글 삭제**            | Article DELETE (Success)  | `DELETE`   | `/articles/:id` | **정상 삭제** 및 `204 No Content` 또는 `200 OK` 확인           | `curl -X DELETE http://localhost:3000/articles/[등록된 게시글 ID]`                                                                                                                           |

---

## ✅ 2일차: 유효성 검증, 에러 핸들링 및 목록 조회 검증 (보강)

2일차는 **필수 필드 누락 (400)**, **리소스 없음 (404)** 처리, **페이지네이션** 및 **정렬** 기능을 검증합니다.

| **API**                     | **목적**              | **Method** | **경로**        | **검증 시나리오**                                   | **curl 명령어**                                                                                                                              |
| --------------------------- | --------------------- | ---------- | --------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **상품 등록 (필수 필드)**   | Validation Fail (400) | `POST`     | `/products`     | **`name` 누락** 시 `400 Bad Request` 확인           | `curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"price": 50000, "tags": ["전자제품"]}' -v`             |
| **게시글 등록 (필수 필드)** | Validation Fail (400) | `POST`     | `/articles`     | **`content` 누락** 시 `400 Bad Request` 확인        | `curl -X POST http://localhost:3000/articles -H "Content-Type: application/json" -d '{"title": "제목만 있음"}' -v`                           |
| **상품 조회 (404)**         | Not Found Error       | `GET`      | `/products/:id` | **존재하지 않는 ID** 조회 시 `404 Not Found` 확인   | `curl -X GET http://localhost:3000/products/ffffffff-ffff-ffff-ffff-ffffffffffff -v`                                                         |
| **상품 수정 (404)**         | Not Found Error       | `PATCH`    | `/products/:id` | **존재하지 않는 ID** 수정 시 `404 Not Found` 확인   | `curl -X PATCH http://localhost:3000/products/ffffffff-ffff-ffff-ffff-ffffffffffff -H "Content-Type: application/json" -d '{"price": 1}' -v` |
| **상품 목록 (기본 Offset)** | Product List GET      | `GET`      | `/products`     | **`limit=3`**, **`offset=0`**으로 목록 조회         | `curl -X GET http://localhost:3000/products?limit=3&offset=0`                                                                                |
| **상품 목록 (정렬)**        | Sort by recent        | `GET`      | `/products`     | **`sort=recent`**로 최신순 정렬 확인                | `curl -X GET http://localhost:3000/products?limit=5&sort=recent`                                                                             |
| **게시글 목록 (Offset)**    | Article List GET      | `GET`      | `/articles`     | **`limit=10`**, **`offset=10`**로 페이지네이션 확인 | `curl -X GET http://localhost:3000/articles?limit=10&offset=10`                                                                              |

---

## 📑 3일차: 댓글 기능 및 검색 기능 검증 (보강)

3일차는 **댓글 등록/수정/삭제**와 **`OR` 조건 기반 검색** 기능을 검증합니다.

| **API**                          | **목적**                 | **Method** | **경로**                 | **검증 시나리오**                            | **curl 명령어**                                                                                                                                     |
| -------------------------------- | ------------------------ | ---------- | ------------------------ | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **상품 댓글 등록**               | Comment POST (Product)   | `POST`     | `/products/:id/comments` | **정상 등록** 및 부모 ID 연결 확인           | `curl -X POST http://localhost:3000/products/[상품 ID]/comments -H "Content-Type: application/json" -d '{"content": "상품 첫 댓글입니다."}'`        |
| **게시글 댓글 등록**             | Comment POST (Article)   | `POST`     | `/articles/:id/comments` | **정상 등록** 및 부모 ID 연결 확인           | `curl -X POST http://localhost:3000/articles/[게시글 ID]/comments -H "Content-Type: application/json" -d '{"content": "게시글 첫 댓글입니다."}'`    |
| **댓글 수정**                    | Comment PATCH (Success)  | `PATCH`    | `/comments/:id`          | **내용 수정** 및 `200 OK` 확인               | `curl -X PATCH http://localhost:3000/comments/[등록된 댓글 ID] -H "Content-Type: application/json" -d '{"content": "수정된 내용"}'`                 |
| **댓글 수정 (404)**              | Comment PATCH (404)      | `PATCH`    | `/comments/:id`          | **존재하지 않는 댓글 ID** 수정 시 `404` 확인 | `curl -X PATCH http://localhost:3000/comments/ffffffff-ffff-ffff-ffff-ffffffffffff -H "Content-Type: application/json" -d '{"content": "수정"}' -v` |
| **상품 목록 (Name 검색)**        | Product Search (Name)    | `GET`      | `/products`              | **`name` 필드**에 포함된 단어로 검색         | `curl -X GET http://localhost:3000/products?search=새%20상품`                                                                                       |
| **상품 목록 (Description 검색)** | Product Search (Desc)    | `GET`      | `/products`              | **`description` 필드**에 포함된 단어로 검색  | `curl -X GET http://localhost:3000/products?search=테스트%20상품입니다`                                                                             |
| **게시글 목록 (Title 검색)**     | Article Search (Title)   | `GET`      | `/articles`              | **`title` 필드**에 포함된 단어로 검색        | `curl -X GET http://localhost:3000/articles?search=테스트%20글`                                                                                     |
| **게시글 목록 (Content 검색)**   | Article Search (Content) | `GET`      | `/articles`              | **`content` 필드**에 포함된 단어로 검색      | `curl -X GET http://localhost:3000/articles?search=내용입니다`                                                                                      |

---

## 🖼️ 4일차: 이미지 업로드 및 Cursor 페이지네이션 검증 (보강)

4일차는 **`multer` 기반 파일 업로드** 및 **Cursor 페이지네이션**의 작동 방식을 검증합니다.

| **API**                       | **목적**                  | **Method** | **경로**                 | **검증 시나리오**                                                       | **curl 명령어**                                                                                                  |
| ----------------------------- | ------------------------- | ---------- | ------------------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **이미지 업로드 (Success)**   | Multer Upload             | `POST`     | `/upload/image`          | **`.jpg` 이미지 파일** 업로드 및 URL 경로 응답 확인                     | `curl -X POST http://localhost:3000/upload/image -F "image=@/path/to/your/image.jpg"`                            |
| **이미지 업로드 (File Type)** | Multer Upload (Fail)      | `POST`     | `/upload/image`          | **이미지 외 파일** (예: `.txt`) 업로드 시 필터링 오류 확인 (`400` 예상) | `curl -X POST http://localhost:3000/upload/image -F "image=@/path/to/your/text.txt" -v`                          |
| **상품 댓글 목록 (기본)**     | Product Comments          | `GET`      | `/products/:id/comments` | **`limit`만** 사용하여 첫 페이지 댓글 조회                              | `curl -X GET http://localhost:3000/products/[상품 ID]/comments?limit=5`                                          |
| **상품 댓글 목록 (Cursor)**   | Product Comments (Cursor) | `GET`      | `/products/:id/comments` | **`cursorId`**를 사용하여 다음 페이지 조회 (`skip: 1` 포함)             | `curl -X GET http://localhost:3000/products/[상품 ID]/comments?limit=5&cursorId=[이전 페이지 마지막 댓글 ID]`    |
| **게시글 댓글 목록 (Cursor)** | Article Comments (Cursor) | `GET`      | `/articles/:id/comments` | **Cursor** 기반 페이지네이션 작동 확인                                  | `curl -X GET http://localhost:3000/articles/[게시글 ID]/comments?limit=10&cursorId=[이전 페이지 마지막 댓글 ID]` |

---

## 🌐 5일차: 최종 점검 및 배포 검증 (보강)

5일차는 배포 후 **환경 변수**, **CORS**, 그리고 **데이터 무결성**을 검증합니다.

| **검증 항목**             | **목적**            | **Method** | **경로**        | **검증 시나리오**                                                                    | **curl 명령어 (예시)**                                                                                                    |
| ------------------------- | ------------------- | ---------- | --------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **배포된 서비스 확인**    | Health Check        | `GET`      | `/products`     | **Render URL**을 통한 `200 OK` 응답 확인                                             | `curl -X GET [Your-Render-URL]/products`                                                                                  |
| **CORS 설정 검증**        | CORS Test           | `OPTIONS`  | `/products`     | **Preflight 요청**에 대한 `204 No Content` 및 CORS 헤더 확인                         | `curl -I -X OPTIONS [Your-Render-URL]/products -H "Origin: https://example.com" -H "Access-Control-Request-Method: POST"` |
| **라우트 중복 제거 확인** | Route Consolidation | `GET`      | `/articles/:id` | **`app.route()`**가 정상 적용되었는지 확인                                           | `curl -X GET [Your-Render-URL]/articles/[등록된 게시글 ID]`                                                               |
| **관계 및 Cascade 검증**  | Data Integrity Test | `DELETE`   | `/products/:id` | **댓글이 달린 상품 삭제** 후, 해당 상품의 댓글 목록 조회 시 댓글이 삭제되었는지 확인 | `curl -X DELETE [Your-Render-URL]/products/[댓글이 달린 상품 ID]`                                                         |
>>>>>>> 595dfd9 (feat: 1차 작성완료)
