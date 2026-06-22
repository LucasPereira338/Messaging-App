/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "adminId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_adminId_key" ON "Group"("adminId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
