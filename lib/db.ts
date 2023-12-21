import { PrismaClient } from '@prisma/client';

export const db = createPrismaClient();

//only create a single instance even if call it multiple times.
/**
 * @returns {PrismaClient} 
 */
function createPrismaClient(): PrismaClient {
  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient({});
    // log: [
    //   {
    //     emit: 'stdout',
    //     level: 'query',
    //   },
    // ],
  }
  return globalThis.prismaClient;
}