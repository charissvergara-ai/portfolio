import { describe, it, expect, vi } from "vitest";
import jwt from "jsonwebtoken";
import {
  hashPassword,
  verifyPassword,
  createToken,
  getUserFromToken,
} from "./auth.js";

const JWT_SECRET = "dentafy-secret-key-change-in-production";

describe("hashPassword", () => {
  it("returns a bcrypt hash different from the plaintext", async () => {
    const hash = await hashPassword("password123");
    expect(hash).not.toBe("password123");
    expect(hash).toMatch(/^\$2[aby]\$/);
  });

  it("produces different hashes for the same input (salted)", async () => {
    const h1 = await hashPassword("same");
    const h2 = await hashPassword("same");
    expect(h1).not.toBe(h2);
  });
});

describe("verifyPassword", () => {
  it("returns true for a correct password", async () => {
    const hash = await hashPassword("correct");
    expect(await verifyPassword("correct", hash)).toBe(true);
  });

  it("returns false for a wrong password", async () => {
    const hash = await hashPassword("correct");
    expect(await verifyPassword("wrong", hash)).toBe(false);
  });
});

describe("createToken", () => {
  it("returns a valid JWT containing userId and role", () => {
    const token = createToken({ id: "user-1", role: "DOCTOR" });
    const decoded = jwt.verify(token, JWT_SECRET) as Record<string, unknown>;
    expect(decoded.userId).toBe("user-1");
    expect(decoded.role).toBe("DOCTOR");
  });

  it("sets a 7-day expiration", () => {
    const token = createToken({ id: "user-2", role: "CUSTOMER" });
    const decoded = jwt.verify(token, JWT_SECRET) as { exp: number; iat: number };
    const diff = decoded.exp - decoded.iat;
    expect(diff).toBe(7 * 24 * 60 * 60);
  });
});

describe("getUserFromToken", () => {
  it("returns the user for a valid token", async () => {
    const token = createToken({ id: "user-1", role: "DOCTOR" });
    const mockUser = { id: "user-1", email: "doc@test.com", name: "Doc", role: "DOCTOR" };
    const prisma = {
      user: { findUnique: vi.fn().mockResolvedValue(mockUser) },
    } as any;

    const result = await getUserFromToken(token, prisma);
    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "user-1" },
    });
  });

  it("returns null for an invalid token", async () => {
    const prisma = {
      user: { findUnique: vi.fn() },
    } as any;

    const result = await getUserFromToken("bad-token", prisma);
    expect(result).toBeNull();
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("returns null for an expired token", async () => {
    const token = jwt.sign({ userId: "user-1", role: "DOCTOR" }, JWT_SECRET, {
      expiresIn: "-1s",
    });
    const prisma = {
      user: { findUnique: vi.fn() },
    } as any;

    const result = await getUserFromToken(token, prisma);
    expect(result).toBeNull();
  });
});
