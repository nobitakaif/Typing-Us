import { PrismaClient } from "./generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const pg = new PrismaPg({
    connectionString : process.env.DATAABSE_URL
})

const globalForPrisma = globalThis as unknown as {prisma : PrismaClient}

export const prisma = globalForPrisma.prisma || new PrismaClient({
    adapter : pg
})

if( process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma