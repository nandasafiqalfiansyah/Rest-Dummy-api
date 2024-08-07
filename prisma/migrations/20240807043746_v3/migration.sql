-- AlterTable
ALTER TABLE "card" ALTER COLUMN "rate" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Employed" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Employed_pkey" PRIMARY KEY ("id")
);
