/*
  Warnings:

  - Made the column `status` on table `class` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `class` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;
