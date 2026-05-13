require("dotenv/config");
const { PrismaPg } = require ("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma/client.js");

let connectionString;

if (process.env.NODE_ENV == "TEST") {
    connectionString = `${process.env.TEST_DATABASE_URL}`;
} else {
    connectionString = `${process.env.DATABASE_URL}`;
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

module.exports = { prisma };