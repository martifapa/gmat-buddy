/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_readingQuestionId_fkey";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "ReadingQuestion";

-- CreateTable
CREATE TABLE "TrainQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answers" TEXT[],
    "type" TEXT NOT NULL,
    "correct" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "readingQuestionId" INTEGER,

    CONSTRAINT "TrainQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainReadingQuestion" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "TrainReadingQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainQuestion" ADD CONSTRAINT "TrainQuestion_readingQuestionId_fkey" FOREIGN KEY ("readingQuestionId") REFERENCES "TrainReadingQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
