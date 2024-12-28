/*
  Warnings:

  - You are about to drop the column `timezone` on the `timezone_map` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[iana]` on the table `timezone_map` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `display` to the `timezone_map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iana` to the `timezone_map` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `timezone_map_timezone_key` ON `timezone_map`;

-- AlterTable
ALTER TABLE `timezone_map` DROP COLUMN `timezone`,
    ADD COLUMN `display` VARCHAR(191) NOT NULL,
    ADD COLUMN `iana` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `timezone_map_iana_key` ON `timezone_map`(`iana`);
