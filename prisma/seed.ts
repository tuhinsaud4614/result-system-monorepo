import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { username: "A-2000" },
    update: {},
    create: {
      firstName: "admin",
      lastName: "admin",
      password:
        "$argon2i$v=19$m=16,t=2,p=1$U0k3blBjbmpuSzlmZU5WYg$gkxAcrBRLw9rz1b9YOvIQQ",
      username: "A-2000",
      role: "ADMIN",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
