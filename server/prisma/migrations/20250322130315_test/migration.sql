/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `product_images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_images_public_id_key" ON "product_images"("public_id");
