import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      name: "Curso de Prisma",
      duration: 50,
      description: "Curso sobre como utilizar ORM Prisma.js",
      
      teacher: {
        connect: {
          id: "51af9063-88a0-4980-83a1-3c9d4c26a4a5",
        },
      },
    },
  });

  console.log(result);
}

main();