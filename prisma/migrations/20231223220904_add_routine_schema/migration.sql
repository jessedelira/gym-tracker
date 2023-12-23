/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Routine` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Routine` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `SessionDaysActive` (
    `id` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Routine_name_key` ON `Routine`(`name`);

-- AddForeignKey
ALTER TABLE `SessionDaysActive` ADD CONSTRAINT `SessionDaysActive_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
