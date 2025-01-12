import { PrismaClient } from '@prisma/client';
import { categories } from './data';

const prisma = new PrismaClient();

async function main() {
  await prisma.categories.deleteMany();

  await prisma.$executeRaw`ALTER SEQUENCE "categories_id_seq" RESTART WITH 1`;

  await prisma.categories.createMany({
    data: categories,
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
