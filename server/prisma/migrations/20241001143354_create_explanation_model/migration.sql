-- CreateTable
CREATE TABLE "Explanation" (
    "id" SERIAL NOT NULL,
    "explanation" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Explanation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Explanation" ADD CONSTRAINT "Explanation_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
