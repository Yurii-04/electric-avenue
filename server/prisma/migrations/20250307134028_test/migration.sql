/*
  Warnings:

  - Made the column `hashed_rt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "hashed_rt" SET NOT NULL;
