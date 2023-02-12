import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.findMany({
    where: {
      //name: "Curso de Prisma",
      duration: 50
      // AND: {
      //   duration: 300,
      // },
    },
  });

  console.log(result);
}

main();