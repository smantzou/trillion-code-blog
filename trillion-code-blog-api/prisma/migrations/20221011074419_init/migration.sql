-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `imagePath` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `date` DATE NOT NULL,

    UNIQUE INDEX `Blog_name_key`(`name`),
    UNIQUE INDEX `Blog_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogsOnBlogs` (
    `blogId` INTEGER NOT NULL,
    `relatedToBlogId` INTEGER NOT NULL,

    PRIMARY KEY (`blogId`, `relatedToBlogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
