import { prisma } from "../config/prismaClient";
import { maps } from "../data/maps";
import { spaceconCharacters } from "../data/spacecon";
import { universe11Characters } from "../data/universe11";

async function main() {
    await prisma.map.createMany({
        data: maps,
        skipDuplicates: true,
    });

    // spacecon
    await prisma.character.createMany({
      data: spaceconCharacters,
      skipDuplicates: true,
    });

    // universe11
    await prisma.character.createMany({
      data: universe11Characters,
      skipDuplicates: true,
    });

}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    });