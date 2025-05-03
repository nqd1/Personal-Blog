import { PrismaClient } from '@prisma/client';

declare global {
  // abbr: global prisma holder
  var globalForPrisma: { prisma?: PrismaClient };
}
global.globalForPrisma = global.globalForPrisma || {};

// CHANGED: wrapped new PrismaClient() in try–catch to give a clearer error msg
export const prisma =
  global.globalForPrisma.prisma ||
  (() => {
    try {
      const client = new PrismaClient();
      if (process.env.NODE_ENV !== 'production') {
        global.globalForPrisma.prisma = client;
      }
      return client;
    } catch (error) {
      throw new Error("@prisma/client did not initialize yet. Please run \"prisma generate\" and try to import it again.");
    }
  })();

export default prisma;
