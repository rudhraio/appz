import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "prod") globalForPrisma.prisma = prisma;


export function connectDB() {
    return new Promise(async (resolve, reject) => {
        try {
            await prisma.$connect();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}