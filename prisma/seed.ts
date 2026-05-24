import { prisma } from "../config/prismaClient";

const maps = [
  {
    name: "spacecon",
    imageUrl: "/maps/spacecon.jpg",
    description: "A futuristic sci-fi convention packed with aliens and hidden travelers.",
  },
  {
    name: "undrcty",
    imageUrl: "/maps/undrcty.jpg",
    description: "A dense underground cyberpunk city filled with strange activity.",
  },
  {
    name: "universe11",
    imageUrl: "/maps/universe11.jpg",
    description: "A chaotic multiverse battlefield with heroes scattered everywhere.",
  },
];

const spaceconCharacters = [
  {
    name: "Goku",
    xMin: 0.58,
    xMax: 0.63,
    yMin: 0.57,
    yMax: 0.63,
    imageUrl: "/characters/goku.png",
    mapId: "cmpdhl6ae0000k8f3hphqa4nb"
  },
  {
    name: "Invincible",
    xMin: 0.15,
    xMax: 0.20,
    yMin: 0.46,
    yMax: 0.52,
    imageUrl: "/characters/invincible.png",
    mapId: "cmpdhl6ae0000k8f3hphqa4nb"
  },
  {
    name: "Jack Skellington",
    xMin: 0.05,
    xMax: 0.09,
    yMin: 0.51,
    yMax: 0.59,
    imageUrl: "/characters/jack_skellington.png",
    mapId: "cmpdhl6ae0000k8f3hphqa4nb"
  },
  {
    name: "Hulk",
    xMin: 0.22,
    xMax: 0.31,
    yMin: 0.38,
    yMax: 0.47,
    imageUrl: "/characters/hulk.png",
    mapId: "cmpdhl6ae0000k8f3hphqa4nb"
  },
  {
    name: "The Thing",
    xMin: 0.53,
    xMax: 0.62,
    yMin: 0.69,
    yMax: 0.74,
    imageUrl: "/characters/the_thing.png",
    mapId: "cmpdhl6ae0000k8f3hphqa4nb"
  },
  {
    name: "Green Goblin",
    xMin: 0.86,
    xMax: 0.89,
    yMin: 0.25,
    yMax: 0.29,
    imageUrl: "/characters/green_goblin.png",
    mapId: "cmpdhl6ae0000k8f3hphqa4nb"
  },
  {
    name: "Kid Buu",
    xMin: 0.80,
    xMax: 0.83,
    yMin: 0.45,
    yMax: 0.51,
    imageUrl: "/characters/kid_buu.png",
    mapId: "cmpdhl6ae0000k8f3hphqa4nb"
  },
  {
    name: "Blade",
    xMin: 0.41,
    xMax: 0.45,
    yMin: 0.59,
    yMax: 0.66,
    imageUrl: "/characters/blade.png",
    mapId: "cmpdhl6ae0000k8f3hphqa4nb"
  },
  {
    name: "Master Chief",
    xMin: 0.30,
    xMax: 0.36,
    yMin: 0.68,
    yMax: 0.75,
    imageUrl: "/characters/master_chief.png",
    mapId: "cmpdhl6ae0000k8f3hphqa4nb"
  },
  {
    name: "Seiko Ayase",
    xMin: 0.28,
    xMax: 0.33,
    yMin: 0.66,
    yMax: 0.74,
    imageUrl: "/characters/seiko_ayase.png",
    mapId: "cmpdhl6ae0000k8f3hphqa4nb"
  },
]

async function main() {
    // await prisma.map.createMany({
    //     data: maps,
    //     skipDuplicates: true,
    // });

    // const spacecon = await prisma.map.findUnique({
    //   where: {
    //     name: "spacecon"
    //   }
    // });
    
    await prisma.character.createMany({
      data: spaceconCharacters,
      skipDuplicates: true,
    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    });