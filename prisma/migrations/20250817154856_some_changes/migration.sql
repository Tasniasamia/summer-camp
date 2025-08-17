-- DropForeignKey
ALTER TABLE `class` DROP FOREIGN KEY `Class_instructorId_fkey`;

-- DropIndex
DROP INDEX `Class_instructorId_fkey` ON `class`;

-- AlterTable
ALTER TABLE `class` MODIFY `instructorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
