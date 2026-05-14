-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_chatId_fkey";

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
