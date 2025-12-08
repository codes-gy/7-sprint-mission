/*
  Warnings:

  - You are about to drop the `article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_article_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_product_id_fkey";

-- DropTable
DROP TABLE "article";

-- DropTable
DROP TABLE "comment";

-- DropTable
DROP TABLE "product";

-- CreateTable
CREATE TABLE "Product" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "image_id" BIGINT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_comment" (
    "id" BIGSERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "create_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(6) NOT NULL,
    "product_id" BIGINT NOT NULL,

    CONSTRAINT "Product_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_image" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "create_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Product_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_comment" (
    "id" BIGSERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "create_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(6) NOT NULL,
    "article_id" BIGINT NOT NULL,

    CONSTRAINT "article_comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_image_id_key" ON "Product"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_image_name_key" ON "Product_image"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Product_image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_comment" ADD CONSTRAINT "Product_comment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_comment" ADD CONSTRAINT "article_comment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
