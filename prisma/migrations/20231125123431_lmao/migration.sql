/*
  Warnings:

  - You are about to drop the column `cons` on the `GirlFriend` table. All the data in the column will be lost.
  - You are about to drop the column `pros` on the `GirlFriend` table. All the data in the column will be lost.
  - Added the required column `con` to the `GirlFriend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pro` to the `GirlFriend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GirlFriend` DROP COLUMN `cons`,
    DROP COLUMN `pros`,
    ADD COLUMN `con` VARCHAR(191) NOT NULL,
    ADD COLUMN `pro` VARCHAR(191) NOT NULL;
