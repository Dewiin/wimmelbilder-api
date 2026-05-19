-- CreateTable
CREATE TABLE "maps" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "xMin" DOUBLE PRECISION NOT NULL,
    "xMax" DOUBLE PRECISION NOT NULL,
    "yMin" DOUBLE PRECISION NOT NULL,
    "yMax" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_sessions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "game_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "found_characters" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "found_characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scores" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "timeMs" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "maps_name_key" ON "maps"("name");

-- CreateIndex
CREATE INDEX "maps_name_idx" ON "maps"("name");

-- CreateIndex
CREATE INDEX "characters_name_mapId_idx" ON "characters"("name", "mapId");

-- CreateIndex
CREATE UNIQUE INDEX "characters_name_mapId_key" ON "characters"("name", "mapId");

-- CreateIndex
CREATE INDEX "game_sessions_id_idx" ON "game_sessions"("id");

-- CreateIndex
CREATE INDEX "found_characters_characterId_sessionId_idx" ON "found_characters"("characterId", "sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "found_characters_characterId_sessionId_key" ON "found_characters"("characterId", "sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "scores_sessionId_key" ON "scores"("sessionId");

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "maps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "found_characters" ADD CONSTRAINT "found_characters_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "game_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "found_characters" ADD CONSTRAINT "found_characters_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "game_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
