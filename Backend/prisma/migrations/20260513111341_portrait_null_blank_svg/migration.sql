/*
  Warnings:

  - Made the column `portrait` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "portrait" SET NOT NULL,
ALTER COLUMN "portrait" SET DEFAULT 'profiles/portraits/blank.svg';
