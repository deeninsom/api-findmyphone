/*
  Warnings:

  - You are about to drop the column `fcm_token` on the `Devices` table. All the data in the column will be lost.
  - Added the required column `fcmToken` to the `Devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_username_key";

-- AlterTable
ALTER TABLE "Devices" DROP COLUMN "fcm_token",
ADD COLUMN     "fcmToken" TEXT NOT NULL;
