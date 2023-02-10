import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      name: "Curso de CSS",
      duration: 50,
      description: "Curso top de CSS",
      fk_id_teacher: "f5277fb5-4c40-49ec-a62f-8559adec5a67",
    },
  });

  console.log(result);
}

main();