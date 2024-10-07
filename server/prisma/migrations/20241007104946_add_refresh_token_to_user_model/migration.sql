-- AlterTable
ALTER TABLE "User" ADD COLUMN     "expiry_date" TIMESTAMP(3),
ADD COLUMN     "refresh_token" TEXT;
