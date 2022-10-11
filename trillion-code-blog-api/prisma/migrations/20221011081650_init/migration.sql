/*
  Warnings:

  - The primary key for the `BlogsOnBlogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `BlogsOnBlogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BlogsOnBlogs` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
