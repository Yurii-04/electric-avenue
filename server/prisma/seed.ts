import { PrismaClient } from '@prisma/client';
import { categories, attributes, optionValues, attributeOptions } from './data';

const prisma = new PrismaClient();

async function main() {
  await prisma.users.createMany({
    data: [
      {
        id: 'user1',
        firstName: 'admin',
        lastName: 'admin',
        email: 'root.user@gmail.com',
        hashedPassword: 'password',
      },
    ],
    skipDuplicates: true,
  });
  await prisma.categories.createMany({
    data: categories,
    skipDuplicates: true,
  });
  await prisma.attributes.createMany({
    data: attributes,
    skipDuplicates: true,
  });
  await prisma.optionValues.createMany({
    data: optionValues,
    skipDuplicates: true,
  });
  await prisma.attributeOptions.createMany({
    data: attributeOptions,
    skipDuplicates: true,
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
