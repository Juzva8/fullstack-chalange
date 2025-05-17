import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const user = await prisma.user.upsert({
    where: {
      email: 'laurynas.juzva@gmail.com',
    },
    update: {},
    create: {
      email: 'laurynas.juzva@gmail.com',
      password: '1234',
      name: 'Laurynas Juzva',
    },
  });

  await prisma.invoice.createMany({
    data: [
      {
        vendor_name: 'Juzva',
        amount: 888.45,
        due_date: new Date('2025-05-15'),
        userId: user.id,
      },
      {
        vendor_name: 'Budget Supplies',
        amount: 500,
        due_date: new Date('2025-06-15'),
        userId: user.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
