/*
  Warnings:

  - You are about to drop the `_studenttoclasses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_studenttoclasses` DROP FOREIGN KEY `_StudentToClasses_A_fkey`;

-- DropForeignKey
ALTER TABLE `_studenttoclasses` DROP FOREIGN KEY `_StudentToClasses_B_fkey`;

-- DropTable
DROP TABLE `_studenttoclasses`;
