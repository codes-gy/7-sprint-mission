import { prisma } from "../prisma/prisma.js";

async function main() {
  await prisma.product_comment.deleteMany();
  await prisma.article_comment.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.product_image.deleteMany();

  for (let index = 1; index <= 15; index++) {
    const image = await prisma.product_image.create({
      data: {
        name: `image1-${index}.png`,
        path: `/uploads/image1-${index}.png`,
        size: 500000,
      },
    });
    const product = await prisma.product.create({
      data: {
        name: `전자제품 ${index}번`,
        description: `${index}번 전자제품 설명입니다`,
        price: 200000,
        tags: ["신상품", "전자제품", "임직원 할인"],
        image_id: image.id,
      },
    });
    const article = await prisma.article.create({
      data: {
        title: `${index}번 제목입니다`,
        content: `최신 웹 개발 트렌드 분석 ${index}번`,
      },
    });
    await prisma.product_comment.create({
      data: {
        content: "상품 디자인이 정말 예쁘네요. 구매하고 싶습니다!",
        product_id: product.id,
      },
    });
    await prisma.article_comment.create({
      data: {
        content: "Git Flow 덕분에 팀 프로젝트 관리가 쉬워졌어요.",
        article_id: article.id,
      },
    });
  }
}

main()
  .then(async () => {
    console.log("시딩 완료");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
