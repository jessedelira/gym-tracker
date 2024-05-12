/*
  Warnings:

  - You are about to drop the column `dateCreated` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `dateCreated`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL;
