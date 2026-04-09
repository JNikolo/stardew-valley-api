-- CreateEnum
CREATE TYPE "Season" AS ENUM ('Spring', 'Summer', 'Fall', 'Winter');

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthday_season" "Season" NOT NULL,
    "birthday_day" INTEGER NOT NULL,
    "lives_in" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "can_marriage" BOOLEAN NOT NULL,
    "clinic_visit_season" "Season" NOT NULL,
    "clinic_visit_day" INTEGER NOT NULL,
    "loved_gifts" TEXT[],
    "family" TEXT[],
    "character_image" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relationship" (
    "id" SERIAL NOT NULL,
    "character_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSchedule" (
    "id" SERIAL NOT NULL,
    "character_id" INTEGER NOT NULL,
    "season" "Season" NOT NULL,
    "isRegular" BOOLEAN NOT NULL,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "specialOcassion" TEXT,

    CONSTRAINT "CharacterSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSchedule" ADD CONSTRAINT "CharacterSchedule_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
