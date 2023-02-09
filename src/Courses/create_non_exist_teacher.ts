import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      name: "Curso de ORM com Node.js",
      duration: 100,
      description: "Curso excelente sobre os ORM com Node.js",
      
      teacher: {
        create: {
          name: "Fulano Ciclano",
        },
      },
    },
  });

  console.log(result);
}

main();