import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { PrismaClient } from "./generated/prisma/client.js";

const JWT_SECRET = process.env.JWT_SECRET || "dentafy-secret-key-change-in-production";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createToken(user: { id: string; role: string }): string {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function getUserFromToken(
  token: string,
  prisma: PrismaClient
) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };
    return prisma.user.findUnique({ where: { id: decoded.userId } });
  } catch {
    return null;
  }
}
