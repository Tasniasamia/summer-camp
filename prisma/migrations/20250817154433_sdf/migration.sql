-- DropForeignKey
ALTER TABLE `class` DROP FOREIGN KEY `Class_instructorId_fkey`;

-- DropForeignKey
ALTER TABLE `enrollclass` DROP FOREIGN KEY `enrollClass_userId_fkey`;

-- DropIndex
DROP INDEX `Class_instructorId_fkey` ON `class`;

-- DropIndex
DROP INDEX `enrollClass_userId_fkey` ON `enrollclass`;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollClass` ADD CONSTRAINT `enrollClass_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
