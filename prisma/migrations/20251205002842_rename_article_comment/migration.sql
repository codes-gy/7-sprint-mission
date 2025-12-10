/*
  Warnings:

  - You are about to drop the `article_comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "article_comment" DROP CONSTRAINT "article_comment_article_id_fkey";

-- DropTable
DROP TABLE "article_comment";

-- CreateTable
CREATE TABLE "Article_comment" (
    "id" BIGSERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "create_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(6) NOT NULL,
    "article_id" BIGINT NOT NULL,

    CONSTRAINT "Article_comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article_comment" ADD CONSTRAINT "Article_comment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
