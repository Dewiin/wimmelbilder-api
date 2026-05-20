import { prisma } from "../config/prismaClient";

async function main() {
    await prisma.map.createMany({
        data: [
            {
                name: "spacecon",
                imageUrl: "/maps/spacecon.jpg",
            },

            {
                name: "undrcty",
                imageUrl: "/maps/undrcty.jpg",
            },

            {
                name: "universe11",
                imageUrl: "/maps/universe11.jpg",
            },
        ],

        skipDuplicates: true,
    });
}

main()
    .catch((err) => {
        console.error(err);
    }).finally(async () => {
        await prisma.$disconnect();
    });