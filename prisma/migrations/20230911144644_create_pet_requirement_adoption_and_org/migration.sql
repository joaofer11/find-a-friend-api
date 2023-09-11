-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('NEW_BORN', 'JUNIOR', 'TEEN', 'FULL_GROW');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('VERY_SMALL', 'SMALL', 'MEDIUM', 'BIG', 'VERY_BIG');

-- CreateEnum
CREATE TYPE "PetLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "PetEnvironment" AS ENUM ('CLOSED', 'OPEN', 'WIDE_OPEN');

-- CreateTable
CREATE TABLE "pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "specie" TEXT NOT NULL,
    "age" "PetAge" NOT NULL DEFAULT 'NEW_BORN',
    "environment" "PetEnvironment" NOT NULL DEFAULT 'OPEN',
    "size" "PetSize" NOT NULL DEFAULT 'MEDIUM',
    "energyLevel" "PetLevel" NOT NULL DEFAULT 'MEDIUM',
    "dependenceLevel" "PetLevel" NOT NULL DEFAULT 'MEDIUM',
    "orgId" TEXT NOT NULL,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption_requirement" (
    "id" SERIAL NOT NULL,
    "issue" TEXT NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "adoption_requirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "whatsAppNumber" TEXT NOT NULL,

    CONSTRAINT "org_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "org_email_key" ON "org"("email");

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requirement" ADD CONSTRAINT "adoption_requirement_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
