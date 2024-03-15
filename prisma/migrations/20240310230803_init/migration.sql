/*
  Warnings:

  - You are about to drop the column `description` on the `badges` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `tags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `badges` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `tags` DROP COLUMN `description`;
