import { Prisma, PrismaClient } from '.prisma/client'
// OR if that doesn't work:
// import { PrismaClient } from '../.prisma/client'

// Prevent multiple instances of Prisma Client in development
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma 
