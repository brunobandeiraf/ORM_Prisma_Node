import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.authors.create({
    data: {
      name: "Machado de Assis",
      Books: {
        create: [
          { name: "Dom Casmurro" },
          { name: "Memórias Póstumas de Brás Cubas" },
        ],
      },
    },
    include: { Books: true },
  });

  console.log(result);
}

main();
