import { prisma } from "../config/prismaClient";

const maps = [
  {
    name: "spacecon",
    imageUrl: "/maps/spacecon.jpg",
    description:
      "A futuristic sci-fi convention packed with aliens and hidden travelers.",
  },
  {
    name: "undrcty",
    imageUrl: "/maps/undrcty.jpg",
    description:
      "A dense underground cyberpunk city filled with strange activity.",
  },
  {
    name: "universe11",
    imageUrl: "/maps/universe11.jpg",
    description:
      "A chaotic multiverse battlefield with heroes scattered everywhere.",
  },
];

async function main() {
    await prisma.map.createMany({
        data: maps,
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