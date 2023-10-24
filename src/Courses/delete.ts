import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.delete({
    where: {
      id: "29d984de-3e8c-4df7-aee1-ac5554156c5a",
    },
  });

  console.log(result);
}


main();