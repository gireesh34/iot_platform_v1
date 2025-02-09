import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasourceUrl: process.env.DATABASE_URL,
  })
}

type GlobalWithPrisma = typeof globalThis & {
  prisma?: ReturnType<typeof prismaClientSingleton>
}

const globalForPrisma: GlobalWithPrisma = globalThis

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma 
