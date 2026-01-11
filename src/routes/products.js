import express from "express";
import {
  createProduct,
  deleteProduct,
  findProductById,
  findAllProducts,
  updateProduct,
  createComment,
  getProductComments,
} from "../controllers/product.controller.js";
import productImageRouter from "./product-image.route.js";
const router = express.Router();

router.route("/").get(findAllProducts).post(createProduct);

router
  .route("/:id")
  .get(findProductById)
  .delete(deleteProduct)
  .patch(updateProduct);

router.route("/:id/comments").get(getProductComments).post(createComment);

router.use("/upload/image/:productId", productImageRouter);
export { router };
