import express from "express";
import { router as productsRouter } from "./routes/products.js";
import { router as articlesRouter } from "./routes/articles.js";
import { router as commentsRouter } from "./routes/comment.js";
import { handleError } from "../src/errors/customErrors.js";
const app = express();
app.use(express.json());
BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.use("/products", productsRouter);
app.use("/articles", articlesRouter);
app.use("/comments", commentsRouter);

app.get("/", (req, res) => {
  res.json({
    message: "API Server",
    endpoints: ["/products", "/articles"],
  });
});

app.use(handleError);

app.listen(3000, () => {
  console.log("서버 실행중...");
});
