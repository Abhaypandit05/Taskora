import bcrypt from 'bcryptjs';
import prisma from './prisma.js';

async function main() {
  console.log('🌱 Starting TaskFlow database seed...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // Upsert user
  const user = await prisma.user.upsert({
    where: { email: 'alex@taskflow.dev' },
    update: {},
    create: {
      email: 'alex@taskflow.dev',
      name: 'Alex Morgan',
      password: passwordHash,
    },
  });

  console.log(`👤 Seeded user: ${user.name} (${user.email})`);

  // Create initial tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Set up PostgreSQL schema and Prisma migrations',
        description: 'Define models for User and Task with relationships and enums.',
        status: 'COMPLETED',
        priority: 'HIGH',
        dueDate: new Date(Date.now() - 86400000),
        userId: user.id,
      },
      {
        title: 'Implement JWT authentication and bcrypt password hashing',
        description: 'Add auth middleware, token signing, and login/register endpoints.',
        status: 'COMPLETED',
        priority: 'HIGH',
        dueDate: new Date(),
        userId: user.id,
      },
      {
        title: 'Build modern TaskFlow Dashboard with React and Tailwind',
        description: 'Display statistics cards, task search, status and priority filters, and modals.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 2 * 86400000),
        userId: user.id,
      },
      {
        title: 'Implement task completion toggle and inline actions',
        description: 'Quick checkbox to mark tasks as completed or incomplete.',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        dueDate: new Date(Date.now() + 3 * 86400000),
        userId: user.id,
      },
      {
        title: 'Design high-converting Landing Page with hero and features',
        description: 'Create responsive landing page explaining TaskFlow workflow.',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date(Date.now() + 5 * 86400000),
        userId: user.id,
      },
      {
        title: 'Write comprehensive README with API documentation',
        description: 'Document environment setup, database migrations, and endpoints.',
        status: 'TODO',
        priority: 'LOW',
        dueDate: new Date(Date.now() + 7 * 86400000),
        userId: user.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`📋 Seeded demo tasks for ${user.email}`);
  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
