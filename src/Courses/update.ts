import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.update({
    where: {
      id: "29d984de-3e8c-4df7-aee1-ac5554156c5a",
    },
    data: {
      duration: 300,
      name: "Curso de React Native - v2",
      description: "Curso muito bom de React Native",
    },
  });

  console.log(result);
}


main();