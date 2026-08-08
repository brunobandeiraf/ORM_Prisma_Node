import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Limpar banco antes de popular (ordem importa por causa das FKs)
  await prisma.coursesModules.deleteMany();
  await prisma.books.deleteMany();
  await prisma.authors.deleteMany();
  await prisma.courses.deleteMany();
  await prisma.teachers.deleteMany();
  await prisma.modules.deleteMany();

  console.log("🗑️  Banco limpo!\n");

  // 1. Criar Teachers
  const teacher1 = await prisma.teachers.create({
    data: { name: "Bruno Fernandes" },
  });
  const teacher2 = await prisma.teachers.create({
    data: { name: "Fulano Ciclano" },
  });
  console.log("👨‍🏫 Teachers criados:", teacher1.name, "|", teacher2.name);

  // 2. Criar Courses com relação 1:1 para Teachers
  const course1 = await prisma.courses.create({
    data: {
      name: "Curso de Node.JS",
      duration: 200,
      description: "Curso top de Node.JS",
      fk_id_teacher: teacher1.id,
    },
  });
  const course2 = await prisma.courses.create({
    data: {
      name: "Curso de Prisma",
      duration: 50,
      description: "Curso sobre como utilizar ORM Prisma.js",
      fk_id_teacher: teacher2.id,
    },
  });
  const course3 = await prisma.courses.create({
    data: {
      name: "Curso de React Native",
      duration: 150,
      description: "Curso completo de React Native",
    },
  });
  console.log("📚 Courses criados:", course1.name, "|", course2.name, "|", course3.name);

  // 3. Criar Modules
  const module1 = await prisma.modules.create({
    data: { name: "Introdução ao Node", description: "Conceitos básicos de Node.js" },
  });
  const module2 = await prisma.modules.create({
    data: { name: "Prisma ORM", description: "Como usar Prisma no dia a dia" },
  });
  const module3 = await prisma.modules.create({
    data: { name: "Aprendendo Firebase", description: "Aprendendo firebase do zero" },
  });
  console.log("📦 Modules criados:", module1.name, "|", module2.name, "|", module3.name);

  // 4. Criar relações Many-to-Many (CoursesModules)
  await prisma.coursesModules.create({
    data: { fk_id_course: course1.id, fk_id_module: module1.id },
  });
  await prisma.coursesModules.create({
    data: { fk_id_course: course1.id, fk_id_module: module2.id },
  });
  await prisma.coursesModules.create({
    data: { fk_id_course: course2.id, fk_id_module: module2.id },
  });
  await prisma.coursesModules.create({
    data: { fk_id_course: course2.id, fk_id_module: module3.id },
  });
  console.log("🔗 Relações CoursesModules criadas!");

  // 5. Criar Authors e Books (relação 1:N)
  const author = await prisma.authors.create({
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
  console.log("✍️  Author criado:", author.name, "com", author.Books.length, "livros");

  // 6. Consulta com include (relações)
  console.log("\n--- 📋 Courses com Teacher e Modules ---");
  const coursesComRelacoes = await prisma.courses.findMany({
    include: {
      teacher: true,
      modules: {
        include: {
          module: true,
        },
      },
    },
  });
  console.log(JSON.stringify(coursesComRelacoes, null, 2));

  // 7. Consulta CoursesModules
  console.log("\n--- 🔗 Todas as relações CoursesModules ---");
  const relacoes = await prisma.coursesModules.findMany({
    include: { course: true, module: true },
  });
  console.log(JSON.stringify(relacoes, null, 2));

  console.log("\n✅ Seed completo! Banco SQLite populado com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
