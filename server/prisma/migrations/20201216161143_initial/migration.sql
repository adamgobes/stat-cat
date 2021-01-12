-- CreateTable
CREATE TABLE "FantasyLeague" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "espnId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "espnId" TEXT,
    "ownerId" TEXT,
    "leagueId" TEXT,
    "players" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FantasyLeague.espnId_unique" ON "FantasyLeague"("espnId");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Team" ADD FOREIGN KEY("leagueId")REFERENCES "FantasyLeague"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD FOREIGN KEY("ownerId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
