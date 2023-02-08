import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      name: "Curso de Milhas",
      duration: 100,
      description: "Curso com 100h sobre Milhas",
      
      teacher: {
        connectOrCreate: {
          where: {
            name: "Bruno Fernandes",
          },
          create: {
            name: "Bruno Fernandes",
          },
        },
      },
      
    },
  });

  console.log(result);
}

main();