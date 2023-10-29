import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      name: "Curso de Node.JS",
      duration: 200,
      description: "Curso top de Node.JS",
    },
  });

  console.log(result);
}

main();