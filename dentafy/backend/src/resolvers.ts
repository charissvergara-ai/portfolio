import type { PrismaClient, User } from "./generated/prisma/client.js";
import { hashPassword, verifyPassword, createToken } from "./auth.js";
import { GraphQLError } from "graphql";

type Context = { prisma: PrismaClient; user: User | null };

function requireAuth(user: User | null): User {
  if (!user) {
    throw new GraphQLError("Not authenticated", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return user;
}

function requireRole(user: User | null, role: string): User {
  const authed = requireAuth(user);
  if (authed.role !== role) {
    throw new GraphQLError("Not authorized", {
      extensions: { code: "FORBIDDEN" },
    });
  }
  return authed;
}

export const resolvers = {
  Query: {
    me: (_: unknown, __: unknown, { user }: Context) => user,

    services: (_: unknown, __: unknown, { prisma }: Context) =>
      prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),

    testimonials: (_: unknown, __: unknown, { prisma }: Context) =>
      prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),

    myAppointments: (_: unknown, __: unknown, { prisma, user }: Context) => {
      const authed = requireAuth(user);
      return prisma.appointment.findMany({
        where: { userId: authed.id },
        orderBy: { createdAt: "desc" },
      });
    },

    allAppointments: (_: unknown, __: unknown, { prisma, user }: Context) => {
      requireRole(user, "DOCTOR");
      return prisma.appointment.findMany({ orderBy: { createdAt: "desc" } });
    },

    allInquiries: (_: unknown, __: unknown, { prisma, user }: Context) => {
      requireRole(user, "DOCTOR");
      return prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
    },
  },

  Mutation: {
    register: async (
      _: unknown,
      { input }: { input: { name: string; email: string; password: string } },
      { prisma }: Context
    ) => {
      const existing = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (existing) {
        throw new GraphQLError("Email already registered", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const hashed = await hashPassword(input.password);
      const user = await prisma.user.create({
        data: { name: input.name, email: input.email, password: hashed },
      });
      const token = createToken(user);
      return { token, user };
    },

    login: async (
      _: unknown,
      { input }: { input: { email: string; password: string } },
      { prisma }: Context
    ) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (!user) {
        throw new GraphQLError("Invalid email or password", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const valid = await verifyPassword(input.password, user.password);
      if (!valid) {
        throw new GraphQLError("Invalid email or password", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const token = createToken(user);
      return { token, user };
    },

    createAppointment: (
      _: unknown,
      {
        input,
      }: {
        input: {
          fullName: string;
          contactNumber: string;
          preferredDate: string;
          preferredTime: string;
          dentalConcern: string;
        };
      },
      { prisma, user }: Context
    ) =>
      prisma.appointment.create({
        data: { ...input, userId: user?.id ?? null },
      }),

    createInquiry: (
      _: unknown,
      {
        input,
      }: {
        input: {
          name: string;
          email: string;
          contactNumber: string;
          message: string;
        };
      },
      { prisma }: Context
    ) => prisma.inquiry.create({ data: input }),

    updateAppointmentStatus: async (
      _: unknown,
      { id, status }: { id: string; status: string },
      { prisma, user }: Context
    ) => {
      requireRole(user, "DOCTOR");
      return prisma.appointment.update({ where: { id }, data: { status } });
    },
  },
};
