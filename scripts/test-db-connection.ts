// scripts/test-db-connection.ts
import { prisma } from "../lib/db/prisma";

async function main() {
  try {
    // Test the connection
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log("✅ Database connection successful!");
    console.log("Connection result:", result);

    // Get the number of users
    const userCount = await prisma.user.count();
    console.log(`Number of users in the database: ${userCount}`);

    // Get the number of jobs
    const jobCount = await prisma.job.count();
    console.log(`Number of jobs in the database: ${jobCount}`);
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
