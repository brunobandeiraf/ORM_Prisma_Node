import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      name: "Curso de Java",
      duration: 200,
      description: "Curso com 300h de Java",
      
      teacher: {
        connectOrCreate: {
          where: {
            name: "Ana Maria",
          },
          create: {
            name: "Ana Maria",
          },
        },
      },
      
    },
  });

  console.log(result);
}

main();