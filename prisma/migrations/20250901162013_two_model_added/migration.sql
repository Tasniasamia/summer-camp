-- CreateTable
CREATE TABLE `conversation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `person` INTEGER NOT NULL,
    `person_name` VARCHAR(191) NULL,
    `person_email` VARCHAR(191) NULL,
    `image` JSON NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `conversation_person_key`(`person`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender` INTEGER NOT NULL,
    `message` JSON NULL,
    `receiver` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
