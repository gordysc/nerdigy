"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  createSession,
  deleteSession,
  hashPassword,
  verifyPassword,
  validateSession
} from "./session";

export async function login(email: string, password: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return { error: "Invalid email or password" };
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash);

    if (!isValidPassword) {
      return { error: "Invalid email or password" };
    }

    await createSession(user.id);

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred during login" };
  }
}

export async function signup(email: string, password: string) {
  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return { error: "Email already registered" };
    }

    const hashedPassword = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        passwordHash: hashedPassword
      })
      .returning({ id: users.id });

    await createSession(newUser.id);

    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "An error occurred during signup" };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function getUser() {
  const sessionData = await validateSession();
  return sessionData?.user ?? null;
}
