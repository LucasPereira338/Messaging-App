import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

let connectionString;

if (process.env.CURRENT_MODE == "TEST") {
    connectionString = `${process.env.TEST_DATABASE_URL}`;
} else {
    connectionString = `${process.env.DATABASE_URL}`;
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };