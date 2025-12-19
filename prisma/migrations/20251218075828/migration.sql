-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('ON_SALE', 'SOLD_OUT');

-- CreateTable
CREATE TABLE "Item" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "status" "ItemStatus" NOT NULL DEFAULT 'ON_SALE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
