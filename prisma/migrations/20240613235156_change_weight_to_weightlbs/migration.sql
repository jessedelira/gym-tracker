/*
  Warnings:

  - You are about to drop the column `weight` on the `workout` table. All the data in the column will be lost.
  - Added the required column `weightLbs` to the `workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workout` DROP COLUMN `weight`,
    ADD COLUMN `weightLbs` INTEGER NOT NULL;
