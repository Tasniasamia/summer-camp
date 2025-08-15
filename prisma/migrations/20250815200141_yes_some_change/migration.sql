-- AlterTable
ALTER TABLE `enrollclass` MODIFY `status` ENUM('paid', 'failed', 'pending', 'cancel') NOT NULL DEFAULT 'pending';
