/*
  Warnings:

  - You are about to drop the `attribute_values` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category_attributes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attribute_values" DROP CONSTRAINT "attribute_values_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_values" DROP CONSTRAINT "attribute_values_product_id_fkey";

-- DropForeignKey
ALTER TABLE "category_attributes" DROP CONSTRAINT "category_attributes_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "category_attributes" DROP CONSTRAINT "category_attributes_category_id_fkey";

-- DropIndex
DROP INDEX "attributes_name_key";

-- DropTable
DROP TABLE "attribute_values";

-- DropTable
DROP TABLE "category_attributes";

-- CreateTable
CREATE TABLE "option_values" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "option_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attribute_options" (
    "id" TEXT NOT NULL,
    "attribute_id" TEXT NOT NULL,
    "optionValueId" TEXT NOT NULL,

    CONSTRAINT "attribute_options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attribute_options" ADD CONSTRAINT "attribute_options_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_options" ADD CONSTRAINT "attribute_options_optionValueId_fkey" FOREIGN KEY ("optionValueId") REFERENCES "option_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
