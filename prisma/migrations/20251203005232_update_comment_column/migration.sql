-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "product_id" BIGINT,
ALTER COLUMN "article_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
