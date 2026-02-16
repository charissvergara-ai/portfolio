import { describe, it, expect, vi, beforeEach } from "vitest";
import { GraphQLError } from "graphql";
import { resolvers } from "./resolvers.js";
import { hashPassword } from "./auth.js";

function mockPrisma() {
  return {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    service: { findMany: vi.fn() },
    testimonial: { findMany: vi.fn() },
    appointment: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    inquiry: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  } as any;
}

const doctor = { id: "d1", email: "doc@test.com", name: "Doc", role: "DOCTOR", password: "" };
const customer = { id: "c1", email: "cust@test.com", name: "Cust", role: "CUSTOMER", password: "" };

// ── Queries ──

describe("Query.me", () => {
  it("returns the current user", () => {
    const result = resolvers.Query.me(null, null, { prisma: mockPrisma(), user: doctor });
    expect(result).toEqual(doctor);
  });

  it("returns null when no user", () => {
    const result = resolvers.Query.me(null, null, { prisma: mockPrisma(), user: null });
    expect(result).toBeNull();
  });
});

describe("Query.services", () => {
  it("fetches services ordered by sortOrder", async () => {
    const prisma = mockPrisma();
    const services = [{ id: "s1", title: "Cleaning" }];
    prisma.service.findMany.mockResolvedValue(services);

    const result = await resolvers.Query.services(null, null, { prisma, user: null });
    expect(result).toEqual(services);
    expect(prisma.service.findMany).toHaveBeenCalledWith({ orderBy: { sortOrder: "asc" } });
  });
});

describe("Query.testimonials", () => {
  it("fetches testimonials ordered by date desc", async () => {
    const prisma = mockPrisma();
    prisma.testimonial.findMany.mockResolvedValue([]);

    await resolvers.Query.testimonials(null, null, { prisma, user: null });
    expect(prisma.testimonial.findMany).toHaveBeenCalledWith({ orderBy: { createdAt: "desc" } });
  });
});

describe("Query.myAppointments", () => {
  it("returns appointments for the authenticated user", async () => {
    const prisma = mockPrisma();
    const appts = [{ id: "a1" }];
    prisma.appointment.findMany.mockResolvedValue(appts);

    const result = await resolvers.Query.myAppointments(null, null, { prisma, user: customer });
    expect(result).toEqual(appts);
    expect(prisma.appointment.findMany).toHaveBeenCalledWith({
      where: { userId: "c1" },
      orderBy: { createdAt: "desc" },
    });
  });

  it("throws UNAUTHENTICATED when no user", () => {
    const prisma = mockPrisma();
    expect(() =>
      resolvers.Query.myAppointments(null, null, { prisma, user: null })
    ).toThrow(GraphQLError);
  });
});

describe("Query.allAppointments", () => {
  it("returns all appointments for DOCTOR", async () => {
    const prisma = mockPrisma();
    prisma.appointment.findMany.mockResolvedValue([]);

    await resolvers.Query.allAppointments(null, null, { prisma, user: doctor });
    expect(prisma.appointment.findMany).toHaveBeenCalled();
  });

  it("throws FORBIDDEN for CUSTOMER", () => {
    const prisma = mockPrisma();
    expect(() =>
      resolvers.Query.allAppointments(null, null, { prisma, user: customer })
    ).toThrow(GraphQLError);
  });

  it("throws UNAUTHENTICATED when no user", () => {
    const prisma = mockPrisma();
    expect(() =>
      resolvers.Query.allAppointments(null, null, { prisma, user: null })
    ).toThrow(GraphQLError);
  });
});

describe("Query.allInquiries", () => {
  it("returns inquiries for DOCTOR", async () => {
    const prisma = mockPrisma();
    prisma.inquiry.findMany.mockResolvedValue([]);

    await resolvers.Query.allInquiries(null, null, { prisma, user: doctor });
    expect(prisma.inquiry.findMany).toHaveBeenCalled();
  });

  it("throws FORBIDDEN for CUSTOMER", () => {
    const prisma = mockPrisma();
    expect(() =>
      resolvers.Query.allInquiries(null, null, { prisma, user: customer })
    ).toThrow(GraphQLError);
  });
});

// ── Mutations ──

describe("Mutation.register", () => {
  it("creates a new user and returns token + user", async () => {
    const prisma = mockPrisma();
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({ id: "new1", email: "new@test.com", name: "New", role: "CUSTOMER" });

    const input = { name: "New", email: "new@test.com", password: "pass123" };
    const result = await resolvers.Mutation.register(null, { input }, { prisma, user: null });

    expect(result.token).toBeDefined();
    expect(result.user.email).toBe("new@test.com");
    expect(prisma.user.create).toHaveBeenCalled();
  });

  it("throws BAD_USER_INPUT for duplicate email", async () => {
    const prisma = mockPrisma();
    prisma.user.findUnique.mockResolvedValue({ id: "existing" });

    const input = { name: "Dup", email: "dup@test.com", password: "pass123" };
    await expect(
      resolvers.Mutation.register(null, { input }, { prisma, user: null })
    ).rejects.toThrow("Email already registered");
  });
});

describe("Mutation.login", () => {
  it("returns token + user for valid credentials", async () => {
    const hashed = await hashPassword("correct");
    const prisma = mockPrisma();
    prisma.user.findUnique.mockResolvedValue({ ...customer, password: hashed });

    const input = { email: "cust@test.com", password: "correct" };
    const result = await resolvers.Mutation.login(null, { input }, { prisma, user: null });

    expect(result.token).toBeDefined();
    expect(result.user.email).toBe("cust@test.com");
  });

  it("throws for nonexistent email", async () => {
    const prisma = mockPrisma();
    prisma.user.findUnique.mockResolvedValue(null);

    const input = { email: "nope@test.com", password: "any" };
    await expect(
      resolvers.Mutation.login(null, { input }, { prisma, user: null })
    ).rejects.toThrow("Invalid email or password");
  });

  it("throws for wrong password", async () => {
    const hashed = await hashPassword("correct");
    const prisma = mockPrisma();
    prisma.user.findUnique.mockResolvedValue({ ...customer, password: hashed });

    const input = { email: "cust@test.com", password: "wrong" };
    await expect(
      resolvers.Mutation.login(null, { input }, { prisma, user: null })
    ).rejects.toThrow("Invalid email or password");
  });
});

describe("Mutation.createAppointment", () => {
  it("creates an appointment with userId when logged in", async () => {
    const prisma = mockPrisma();
    const input = {
      fullName: "John",
      contactNumber: "123",
      preferredDate: "2026-03-01",
      preferredTime: "9:00 AM",
      dentalConcern: "Cleaning",
    };
    prisma.appointment.create.mockResolvedValue({ id: "a1", ...input, status: "PENDING" });

    const result = await resolvers.Mutation.createAppointment(
      null,
      { input },
      { prisma, user: customer }
    );
    expect(result.id).toBe("a1");
    expect(prisma.appointment.create).toHaveBeenCalledWith({
      data: { ...input, userId: "c1" },
    });
  });

  it("creates an appointment with null userId when not logged in", async () => {
    const prisma = mockPrisma();
    const input = {
      fullName: "Anon",
      contactNumber: "456",
      preferredDate: "2026-03-02",
      preferredTime: "10:00 AM",
      dentalConcern: "Toothache",
    };
    prisma.appointment.create.mockResolvedValue({ id: "a2", ...input });

    await resolvers.Mutation.createAppointment(null, { input }, { prisma, user: null });
    expect(prisma.appointment.create).toHaveBeenCalledWith({
      data: { ...input, userId: null },
    });
  });
});

describe("Mutation.createInquiry", () => {
  it("creates an inquiry", async () => {
    const prisma = mockPrisma();
    const input = { name: "Jane", email: "jane@test.com", contactNumber: "789", message: "Hello" };
    prisma.inquiry.create.mockResolvedValue({ id: "i1", ...input });

    const result = await resolvers.Mutation.createInquiry(null, { input }, { prisma, user: null });
    expect(result.id).toBe("i1");
    expect(prisma.inquiry.create).toHaveBeenCalledWith({ data: input });
  });
});

describe("Mutation.updateAppointmentStatus", () => {
  it("updates status when user is DOCTOR", async () => {
    const prisma = mockPrisma();
    prisma.appointment.update.mockResolvedValue({ id: "a1", status: "CONFIRMED" });

    const result = await resolvers.Mutation.updateAppointmentStatus(
      null,
      { id: "a1", status: "CONFIRMED" },
      { prisma, user: doctor }
    );
    expect(result.status).toBe("CONFIRMED");
    expect(prisma.appointment.update).toHaveBeenCalledWith({
      where: { id: "a1" },
      data: { status: "CONFIRMED" },
    });
  });

  it("throws FORBIDDEN for CUSTOMER", async () => {
    const prisma = mockPrisma();
    await expect(
      resolvers.Mutation.updateAppointmentStatus(
        null,
        { id: "a1", status: "CONFIRMED" },
        { prisma, user: customer }
      )
    ).rejects.toThrow(GraphQLError);
  });

  it("throws UNAUTHENTICATED when no user", async () => {
    const prisma = mockPrisma();
    await expect(
      resolvers.Mutation.updateAppointmentStatus(
        null,
        { id: "a1", status: "CONFIRMED" },
        { prisma, user: null }
      )
    ).rejects.toThrow(GraphQLError);
  });
});
