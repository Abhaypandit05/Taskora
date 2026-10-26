import bcrypt from 'bcryptjs';
import prisma from '../prisma.js';

let isPrismaConnected = false;

// Test connection on boot
(async () => {
  try {
    await prisma.$connect();
    isPrismaConnected = true;
    console.log('✅ [TaskFlow DB] Successfully connected to PostgreSQL via Prisma ORM.');
  } catch (err: any) {
    isPrismaConnected = false;
    console.warn(
      '⚠️  [TaskFlow DB] PostgreSQL connection failed: ' +
        (err?.message?.split('\n')[0] || 'Unable to connect to database')
    );
    console.warn(
      '💡 [TaskFlow DB] Running in resilient In-Memory storage mode. Configure DATABASE_URL in server/.env when PostgreSQL is active.'
    );
  }
})();

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskEntity {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

// In-memory fallback repository conforming directly to Prisma model contracts
const defaultPasswordHash = bcrypt.hashSync('password123', 10);

const store = {
  users: [
    {
      id: 'usr-1',
      name: 'Alex Morgan',
      email: 'alex@taskflow.dev',
      password: defaultPasswordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'usr-2',
      name: 'Sarah Chen',
      email: 'sarah@taskflow.dev',
      password: defaultPasswordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as UserEntity[],
  tasks: [
    {
      id: 'tsk-1',
      title: 'Set up PostgreSQL schema and Prisma migrations',
      description: 'Define models for User and Task with relationships and enums.',
      status: 'COMPLETED',
      priority: 'HIGH',
      dueDate: new Date(Date.now() - 86400000),
      createdAt: new Date(Date.now() - 3 * 86400000),
      updatedAt: new Date(),
      userId: 'usr-1',
    },
    {
      id: 'tsk-2',
      title: 'Implement JWT authentication and bcrypt password hashing',
      description: 'Add auth middleware, token signing, and login/register endpoints.',
      status: 'COMPLETED',
      priority: 'HIGH',
      dueDate: new Date(),
      createdAt: new Date(Date.now() - 2 * 86400000),
      updatedAt: new Date(),
      userId: 'usr-1',
    },
    {
      id: 'tsk-3',
      title: 'Build modern TaskFlow Dashboard with React and Tailwind',
      description: 'Display statistics cards, task search, status and priority filters, and modals.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 2 * 86400000),
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(),
      userId: 'usr-1',
    },
    {
      id: 'tsk-4',
      title: 'Implement task completion toggle and inline actions',
      description: 'Quick checkbox to mark tasks as completed or incomplete.',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() + 3 * 86400000),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'usr-1',
    },
    {
      id: 'tsk-5',
      title: 'Design high-converting Landing Page with hero and features',
      description: 'Create responsive landing page explaining TaskFlow workflow.',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() + 5 * 86400000),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'usr-1',
    },
    {
      id: 'tsk-6',
      title: 'Write comprehensive README with API documentation',
      description: 'Document environment setup, database migrations, and endpoints.',
      status: 'TODO',
      priority: 'LOW',
      dueDate: new Date(Date.now() + 7 * 86400000),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'usr-1',
    },
  ] as TaskEntity[],
};

export const dbService = {
  // USER OPERATIONS
  async findUserByEmail(email: string) {
    if (isPrismaConnected) {
      try {
        return await prisma.user.findUnique({ where: { email } });
      } catch (err) {
        console.error('Prisma query failed, falling back to in-memory store:', err);
      }
    }
    return store.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async findUserByName(name: string) {
    if (isPrismaConnected) {
      try {
        return await prisma.user.findFirst({
          where: { name: { equals: name, mode: 'insensitive' } },
        });
      } catch (err) {
        console.error('Prisma query failed, falling back to in-memory store:', err);
      }
    }
    return store.users.find((u) => u.name.toLowerCase() === name.toLowerCase()) || null;
  },

  async findUserById(id: string) {
    if (isPrismaConnected) {
      try {
        return await prisma.user.findUnique({
          where: { id },
          select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
        });
      } catch (err) {
        console.error('Prisma query failed, falling back to in-memory store:', err);
      }
    }
    const user = store.users.find((u) => u.id === id);
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  },

  async createUser(data: { name: string; email: string; password: string }) {
    if (isPrismaConnected) {
      try {
        return await prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        });
      } catch (err) {
        console.error('Prisma creation failed, falling back to in-memory store:', err);
      }
    }
    const newUser: UserEntity = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.users.push(newUser);
    return newUser;
  },

  // TASK OPERATIONS
  async getTasksForUser(
    userId: string,
    filters?: { status?: string; priority?: string; search?: string }
  ) {
    if (isPrismaConnected) {
      try {
        const where: any = { userId };
        if (filters?.status && filters.status !== 'ALL') {
          where.status = filters.status as TaskStatus;
        }
        if (filters?.priority && filters.priority !== 'ALL') {
          where.priority = filters.priority as TaskPriority;
        }
        if (filters?.search) {
          where.OR = [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } },
          ];
        }

        return await prisma.task.findMany({
          where,
          orderBy: [{ createdAt: 'desc' }],
        });
      } catch (err) {
        console.error('Prisma getTasks failed, falling back to in-memory store:', err);
      }
    }

    let results = store.tasks.filter((t) => t.userId === userId);

    if (filters?.status && filters.status !== 'ALL') {
      results = results.filter((t) => t.status === filters.status);
    }
    if (filters?.priority && filters.priority !== 'ALL') {
      results = results.filter((t) => t.priority === filters.priority);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      );
    }

    return results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  async getTaskById(id: string, userId: string) {
    if (isPrismaConnected) {
      try {
        return await prisma.task.findFirst({
          where: { id, userId },
        });
      } catch (err) {
        console.error('Prisma getTaskById failed, falling back to in-memory store:', err);
      }
    }
    return store.tasks.find((t) => t.id === id && t.userId === userId) || null;
  },

  async createTask(data: {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string | null;
    userId: string;
  }) {
    if (isPrismaConnected) {
      try {
        return await prisma.task.create({
          data: {
            title: data.title,
            description: data.description || null,
            status: data.status || 'TODO',
            priority: data.priority || 'MEDIUM',
            dueDate: data.dueDate ? new Date(data.dueDate) : null,
            userId: data.userId,
          },
        });
      } catch (err) {
        console.error('Prisma createTask failed, falling back to in-memory store:', err);
      }
    }

    const newTask: TaskEntity = {
      id: `tsk-${Date.now()}`,
      title: data.title,
      description: data.description || null,
      status: data.status || 'TODO',
      priority: data.priority || 'MEDIUM',
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
    };
    store.tasks.unshift(newTask);
    return newTask;
  },

  async updateTask(
    id: string,
    userId: string,
    data: {
      title?: string;
      description?: string | null;
      status?: TaskStatus;
      priority?: TaskPriority;
      dueDate?: string | null;
    }
  ) {
    if (isPrismaConnected) {
      try {
        const updateData: any = {};
        if (data.title !== undefined) updateData.title = data.title;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.status !== undefined) updateData.status = data.status;
        if (data.priority !== undefined) updateData.priority = data.priority;
        if (data.dueDate !== undefined) {
          updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
        }

        return await prisma.task.update({
          where: { id },
          data: updateData,
        });
      } catch (err) {
        console.error('Prisma updateTask failed, falling back to in-memory store:', err);
      }
    }

    const index = store.tasks.findIndex((t) => t.id === id && t.userId === userId);
    if (index === -1) return null;

    store.tasks[index] = {
      ...store.tasks[index],
      ...data,
      dueDate:
        data.dueDate !== undefined
          ? data.dueDate
            ? new Date(data.dueDate)
            : null
          : store.tasks[index].dueDate,
      updatedAt: new Date(),
    };
    return store.tasks[index];
  },

  async toggleTaskCompletion(id: string, userId: string) {
    const existing = await this.getTaskById(id, userId);
    if (!existing) return null;

    const newStatus: TaskStatus = existing.status === 'COMPLETED' ? 'TODO' : 'COMPLETED';
    return await this.updateTask(id, userId, { status: newStatus });
  },

  async deleteTask(id: string, userId: string) {
    if (isPrismaConnected) {
      try {
        await prisma.task.delete({
          where: { id },
        });
        return true;
      } catch (err) {
        console.error('Prisma deleteTask failed, falling back to in-memory store:', err);
      }
    }

    const initialLength = store.tasks.length;
    store.tasks = store.tasks.filter((t) => !(t.id === id && t.userId === userId));
    return store.tasks.length < initialLength;
  },

  async getDashboardStats(userId: string) {
    const userTasks = await this.getTasksForUser(userId);

    const totalTasks = userTasks.length;
    const completedTasks = userTasks.filter((t) => t.status === 'COMPLETED').length;
    const pendingTasks = userTasks.filter(
      (t) => t.status === 'TODO' || t.status === 'IN_PROGRESS'
    ).length;
    const highPriorityTasks = userTasks.filter((t) => t.priority === 'HIGH').length;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      highPriorityTasks,
    };
  },
};
