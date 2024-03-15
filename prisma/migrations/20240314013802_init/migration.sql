/*
  Warnings:

  - You are about to drop the column `productId` on the `badge` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `shade` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `badge` DROP FOREIGN KEY `Badge_productId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_productId_fkey`;

-- DropForeignKey
ALTER TABLE `shade` DROP FOREIGN KEY `Shade_productId_fkey`;

-- DropForeignKey
ALTER TABLE `tag` DROP FOREIGN KEY `Tag_productId_fkey`;

-- AlterTable
ALTER TABLE `badge` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `shade` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `tag` DROP COLUMN `productId`;

-- CreateTable
CREATE TABLE `_ProductToShade` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductToShade_AB_unique`(`A`, `B`),
    INDEX `_ProductToShade_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductToTag_AB_unique`(`A`, `B`),
    INDEX `_ProductToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BadgeToProduct` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BadgeToProduct_AB_unique`(`A`, `B`),
    INDEX `_BadgeToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ImageToProduct` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ImageToProduct_AB_unique`(`A`, `B`),
    INDEX `_ImageToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Cart_userId_key` ON `Cart`(`userId`);

-- AddForeignKey
ALTER TABLE `_ProductToShade` ADD CONSTRAINT `_ProductToShade_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToShade` ADD CONSTRAINT `_ProductToShade_B_fkey` FOREIGN KEY (`B`) REFERENCES `Shade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToTag` ADD CONSTRAINT `_ProductToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToTag` ADD CONSTRAINT `_ProductToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BadgeToProduct` ADD CONSTRAINT `_BadgeToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Badge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BadgeToProduct` ADD CONSTRAINT `_BadgeToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageToProduct` ADD CONSTRAINT `_ImageToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageToProduct` ADD CONSTRAINT `_ImageToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
