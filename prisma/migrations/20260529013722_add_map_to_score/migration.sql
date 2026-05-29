-- AlterTable
ALTER TABLE "scores" ADD COLUMN     "mapName" TEXT NOT NULL DEFAULT 'spacecon';

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_mapName_fkey" FOREIGN KEY ("mapName") REFERENCES "maps"("name") ON DELETE CASCADE ON UPDATE CASCADE;
