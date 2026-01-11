import { Router } from "express";
import { upload } from "../utils/multer.js";
import {
  createProductImage,
  updateProductImage,
  getProductImage,
} from "../controllers/product.controller.js";
const productImageRouter = new Router({ mergeParams: true });

productImageRouter
  .route("/")
  .post(upload.single("image"), createProductImage)
  .get(getProductImage);

export default productImageRouter;
