"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { users, passwordResetTokens } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import {
  createSession,
  deleteSession,
  hashPassword,
  verifyPassword,
  validateSession
} from "./session";
import { randomBytes } from "crypto";

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

export async function requestPasswordReset(email: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      // Don't reveal if email exists or not for security
      return { success: true };
    }

    // Generate secure random token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Delete any existing reset tokens for this user
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.userId, user.id));

    // Create new reset token
    await db.insert(passwordResetTokens).values({
      userId: user.id,
      token,
      expiresAt
    });

    // In a real app, you would send an email here with the reset link
    // For now, we'll just log it (remove in production)
    console.log(`Password reset link: /reset-password?token=${token}`);

    return { success: true };
  } catch (error) {
    console.error("Password reset request error:", error);
    return { error: "An error occurred while processing your request" };
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    // Find valid token
    const [resetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(
        and(
          eq(passwordResetTokens.token, token),
          gt(passwordResetTokens.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!resetToken) {
      return { error: "Invalid or expired reset token" };
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user password
    await db
      .update(users)
      .set({
        passwordHash: hashedPassword,
        updatedAt: new Date()
      })
      .where(eq(users.id, resetToken.userId));

    // Delete used token
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, resetToken.id));

    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return { error: "An error occurred while resetting your password" };
  }
}

export async function validatePasswordResetToken(token: string) {
  try {
    const [resetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(
        and(
          eq(passwordResetTokens.token, token),
          gt(passwordResetTokens.expiresAt, new Date())
        )
      )
      .limit(1);

    return { valid: !!resetToken };
  } catch (error) {
    console.error("Token validation error:", error);
    return { valid: false };
  }
}
