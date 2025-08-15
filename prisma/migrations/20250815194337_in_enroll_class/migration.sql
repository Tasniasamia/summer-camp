/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `enrollClass` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `enrollClass_transactionId_key` ON `enrollClass`(`transactionId`);
