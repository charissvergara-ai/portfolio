import pg from "pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable",
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean existing data
  await prisma.appointment.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.service.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.user.deleteMany();

  // Seed doctor account
  const doctorPassword = await bcrypt.hash("doctor123", 10);
  await prisma.user.create({
    data: {
      name: "Dr. Maria Santos",
      email: "doctor@dentafy.ph",
      password: doctorPassword,
      role: "DOCTOR",
    },
  });
  console.log("Doctor account created: doctor@dentafy.ph / doctor123");

  // Seed customer account
  const customerPassword = await bcrypt.hash("customer123", 10);
  await prisma.user.create({
    data: {
      name: "Juan Dela Cruz",
      email: "customer@dentafy.ph",
      password: customerPassword,
      role: "CUSTOMER",
    },
  });
  console.log("Customer account created: customer@dentafy.ph / customer123");

  // Seed services (26 total across 6 categories)
  const services = [
    // General Dentistry
    { category: "General Dentistry", title: "Comprehensive Oral Examination", icon: "fas fa-search", sortOrder: 1 },
    { category: "General Dentistry", title: "Professional Teeth Cleaning (Oral Prophylaxis)", icon: "fas fa-teeth", sortOrder: 2 },
    { category: "General Dentistry", title: "Tooth-Colored Dental Fillings", icon: "fas fa-fill", sortOrder: 3 },
    { category: "General Dentistry", title: "Tooth Extractions (Simple & Surgical)", icon: "fas fa-tooth", sortOrder: 4 },
    { category: "General Dentistry", title: "Fluoride Treatment", icon: "fas fa-shield-alt", sortOrder: 5 },
    { category: "General Dentistry", title: "Dental Sealants", icon: "fas fa-shield-virus", sortOrder: 6 },

    // Cosmetic Dentistry
    { category: "Cosmetic Dentistry", title: "Teeth Whitening", icon: "fas fa-sun", sortOrder: 7 },
    { category: "Cosmetic Dentistry", title: "Porcelain Veneers", icon: "fas fa-gem", sortOrder: 8 },
    { category: "Cosmetic Dentistry", title: "Smile Makeover", icon: "fas fa-smile-beam", sortOrder: 9 },
    { category: "Cosmetic Dentistry", title: "Cosmetic Bonding", icon: "fas fa-magic", sortOrder: 10 },

    // Restorative Dentistry
    { category: "Restorative Dentistry", title: "Dental Crowns and Bridges", icon: "fas fa-crown", sortOrder: 11 },
    { category: "Restorative Dentistry", title: "Complete & Partial Dentures", icon: "fas fa-teeth-open", sortOrder: 12 },
    { category: "Restorative Dentistry", title: "Root Canal Treatment", icon: "fas fa-procedures", sortOrder: 13 },
    { category: "Restorative Dentistry", title: "Dental Implants", icon: "fas fa-screwdriver", sortOrder: 14 },

    // Pediatric Dentistry
    { category: "Pediatric Dentistry", title: "Gentle Dental Checkups for Kids", icon: "fas fa-child", sortOrder: 15 },
    { category: "Pediatric Dentistry", title: "Fluoride Application", icon: "fas fa-shield-alt", sortOrder: 16 },
    { category: "Pediatric Dentistry", title: "Dental Sealants", icon: "fas fa-shield-virus", sortOrder: 17 },
    { category: "Pediatric Dentistry", title: "Oral Hygiene Education", icon: "fas fa-book-medical", sortOrder: 18 },

    // Orthodontic Services
    { category: "Orthodontic Services", title: "Traditional Metal Braces", icon: "fas fa-teeth", sortOrder: 19 },
    { category: "Orthodontic Services", title: "Ceramic Braces", icon: "fas fa-gem", sortOrder: 20 },
    { category: "Orthodontic Services", title: "Clear Aligners", icon: "fas fa-align-center", sortOrder: 21 },
    { category: "Orthodontic Services", title: "Retainers", icon: "fas fa-undo", sortOrder: 22 },

    // Emergency Dental Care
    { category: "Emergency Dental Care", title: "Toothache Relief", icon: "fas fa-bolt", sortOrder: 23 },
    { category: "Emergency Dental Care", title: "Broken or Chipped Tooth Repair", icon: "fas fa-band-aid", sortOrder: 24 },
    { category: "Emergency Dental Care", title: "Lost Fillings or Crowns", icon: "fas fa-search", sortOrder: 25 },
    { category: "Emergency Dental Care", title: "Swelling and Dental Trauma Treatment", icon: "fas fa-first-aid", sortOrder: 26 },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  // Seed testimonials
  const testimonials = [
    {
      quote: "Dr. Santos explained everything clearly and made me feel comfortable during my treatment.",
      author: "Angela R.",
    },
    {
      quote: "Very accommodating staff and clean clinic. Highly recommended!",
      author: "Carlo M.",
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  console.log("Seed data created successfully!");
  console.log(`Created ${services.length} services and ${testimonials.length} testimonials`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
