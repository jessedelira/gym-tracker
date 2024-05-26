/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Routine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionDaysActive` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Routine` DROP FOREIGN KEY `Routine_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_routineId_fkey`;

-- DropForeignKey
ALTER TABLE `SessionDaysActive` DROP FOREIGN KEY `SessionDaysActive_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `Workout` DROP FOREIGN KEY `Workout_exerciseId_fkey`;

-- DropForeignKey
ALTER TABLE `Workout` DROP FOREIGN KEY `Workout_sessionId_fkey`;

-- DropTable
DROP TABLE `Exercise`;

-- DropTable
DROP TABLE `Routine`;

-- DropTable
DROP TABLE `Session`;

-- DropTable
DROP TABLE `SessionDaysActive`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `Workout`;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `routine` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `routine_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `routineId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session_days_active` (
    `id` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workout` (
    `id` VARCHAR(191) NOT NULL,
    `reps` INTEGER NOT NULL,
    `sets` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `exerciseId` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercise` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(300) NULL,

    UNIQUE INDEX `exercise_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `routine` ADD CONSTRAINT `routine_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_routineId_fkey` FOREIGN KEY (`routineId`) REFERENCES `routine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session_days_active` ADD CONSTRAINT `session_days_active_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workout` ADD CONSTRAINT `workout_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workout` ADD CONSTRAINT `workout_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workout` ADD CONSTRAINT `workout_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
