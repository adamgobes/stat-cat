-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "joinedLeagueAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "FantasyLeagueInvitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sentOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leagueId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FantasyLeagueInvitation.email_unique" ON "FantasyLeagueInvitation"("email");

-- AddForeignKey
ALTER TABLE "FantasyLeagueInvitation" ADD FOREIGN KEY("leagueId")REFERENCES "FantasyLeague"("id") ON DELETE CASCADE ON UPDATE CASCADE;
