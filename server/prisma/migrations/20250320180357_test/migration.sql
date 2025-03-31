/*
  Warnings:

  - You are about to drop the column `optionValueId` on the `attribute_options` table. All the data in the column will be lost.
  - Added the required column `option_value_id` to the `attribute_options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `attributes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attribute_options" DROP CONSTRAINT "attribute_options_optionValueId_fkey";

-- AlterTable
ALTER TABLE "attribute_options" DROP COLUMN "optionValueId",
ADD COLUMN     "option_value_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "attributes" ADD COLUMN     "category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "attributes" ADD CONSTRAINT "attributes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_options" ADD CONSTRAINT "attribute_options_option_value_id_fkey" FOREIGN KEY ("option_value_id") REFERENCES "option_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
