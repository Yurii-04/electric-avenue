/*
  Warnings:

  - The primary key for the `attributes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "attribute_values" DROP CONSTRAINT "attribute_values_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "category_attributes" DROP CONSTRAINT "category_attributes_attribute_id_fkey";

-- AlterTable
ALTER TABLE "attribute_values" ALTER COLUMN "attribute_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "attributes" DROP CONSTRAINT "attributes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "attributes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "attributes_id_seq";

-- AlterTable
ALTER TABLE "category_attributes" ALTER COLUMN "attribute_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "attribute_values" ADD CONSTRAINT "attribute_values_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_attributes" ADD CONSTRAINT "category_attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
