/*
  Warnings:

  - You are about to drop the column `assitant` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "assitant",
ADD COLUMN     "assistant" TEXT;
