import "dotenv/config";
import { db } from "./index";
import { users } from "./schema";
import { hashPassword } from "@/features/auth/session";

async function seed() {
  try {
    console.log("Creating test user...");

    const hashedPassword = await hashPassword("password123");

    await db.insert(users).values({
      email: "test@example.com",
      passwordHash: hashedPassword
    });

    console.log("Test user created successfully!");
    console.log("Email: test@example.com");
    console.log("Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
