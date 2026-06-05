import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const prismaClientSingleton = () => {
  // 1. Ensure DATABASE_URL is defined. Default to an absolute SQLite path if missing.
  if (!process.env.DATABASE_URL) {
    const defaultDbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');
    process.env.DATABASE_URL = `file:${defaultDbPath}`;
    console.log(`DATABASE_URL was undefined. Defaulting to SQLite: ${process.env.DATABASE_URL}`);
  }

  // 2. Auto-initialize the SQLite database if it starts with 'file:' and doesn't exist yet
  if (process.env.DATABASE_URL.startsWith('file:')) {
    const dbPath = process.env.DATABASE_URL.replace('file:', '');
    const absoluteDbPath = path.isAbsolute(dbPath) 
      ? dbPath 
      : path.resolve(process.cwd(), 'prisma', dbPath);

    const dbDir = path.dirname(absoluteDbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    if (!fs.existsSync(absoluteDbPath)) {
      console.log(`SQLite database not found at ${absoluteDbPath}. Running auto-migration and seeding...`);
      try {
        // Run prisma db push to create tables
        execSync('npx prisma db push --skip-generate', { 
          stdio: 'inherit',
          env: { ...process.env, DATABASE_URL: `file:${absoluteDbPath}` }
        });
        console.log('Database pushed successfully.');

        // Run seed script to populate initial site settings, admin user, and portfolio projects
        execSync('npx prisma db seed', { 
          stdio: 'inherit',
          env: { ...process.env, DATABASE_URL: `file:${absoluteDbPath}` }
        });
        console.log('Database seeded successfully.');
      } catch (error) {
        console.error('Failed to auto-initialize SQLite database:', error);
      }
    }
  }

  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
