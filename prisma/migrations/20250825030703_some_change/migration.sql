-- DropForeignKey
ALTER TABLE `enrollclass` DROP FOREIGN KEY `enrollClass_classId_fkey`;

-- DropIndex
DROP INDEX `enrollClass_classId_fkey` ON `enrollclass`;

-- AddForeignKey
ALTER TABLE `enrollClass` ADD CONSTRAINT `enrollClass_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
