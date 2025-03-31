/*
  Warnings:

  - The primary key for the `attribute_values` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `category_attributes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "attribute_values" DROP CONSTRAINT "attribute_values_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "attribute_values_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "attribute_values_id_seq";

-- AlterTable
ALTER TABLE "category_attributes" DROP CONSTRAINT "category_attributes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "category_attributes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "category_attributes_id_seq";
