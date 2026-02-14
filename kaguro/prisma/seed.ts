import "dotenv/config";
import pg from "pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new pg.Pool({
  connectionString: "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable",
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean existing data
  await prisma.testimonial.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Hash default password for seed users (password123)
  const hashedPw = await bcrypt.hash("password123", 10);

  // Create users
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@kaguro.ph",
      password: hashedPw,
      role: "ADMIN",
    },
  });

  const vendor1 = await prisma.user.create({
    data: {
      name: "Maria Clara",
      email: "maria@kaguro.ph",
      password: hashedPw,
      role: "VENDOR",
    },
  });

  const vendor2 = await prisma.user.create({
    data: {
      name: "Jose Rizal",
      email: "jose@kaguro.ph",
      password: hashedPw,
      role: "VENDOR",
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Juan Dela Cruz",
      email: "juan@kaguro.ph",
      password: hashedPw,
      role: "CUSTOMER",
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Lesson Plans", slug: "lesson-plans" } }),
    prisma.category.create({ data: { name: "Worksheets", slug: "worksheets" } }),
    prisma.category.create({ data: { name: "Classroom Decors", slug: "classroom-decors" } }),
    prisma.category.create({ data: { name: "Templates", slug: "templates" } }),
    prisma.category.create({ data: { name: "Forms", slug: "forms" } }),
    prisma.category.create({ data: { name: "Canva Templates", slug: "canva-templates" } }),
  ]);

  const [lessonPlans, worksheets, classroomDecors, templates, forms, canvaTemplates] = categories;

  // Create products
  // Some products have sale prices, and createdAt is varied so some appear as "New"
  const now = new Date();
  const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000);

  const products = [
    { title: "Grade 3 Math Lesson Plan Bundle", slug: "grade-3-math-lesson-plan", description: "Complete lesson plan bundle for Grade 3 Mathematics aligned with DepEd curriculum. Includes daily lesson logs, activities, and assessments.", price: 149, salePrice: 99, image: "https://picsum.photos/seed/prod1/600/400", rating: 4.8, downloads: 234, categoryId: lessonPlans.id, vendorId: vendor1.id, createdAt: daysAgo(5) },
    { title: "Filipino Reading Comprehension Worksheets", slug: "filipino-reading-comprehension", description: "Set of 20 reading comprehension worksheets for Filipino subject, Grades 1-3. Includes answer keys and rubrics.", price: 99, salePrice: 69, image: "https://picsum.photos/seed/prod2/600/400", rating: 4.5, downloads: 189, categoryId: worksheets.id, vendorId: vendor1.id, createdAt: daysAgo(45) },
    { title: "Colorful Alphabet Wall Display", slug: "colorful-alphabet-wall-display", description: "Vibrant alphabet wall display cards with Filipino and English examples. Perfect for kindergarten and Grade 1 classrooms.", price: 79, salePrice: 49, image: "https://picsum.photos/seed/prod3/600/400", rating: 4.9, downloads: 312, categoryId: classroomDecors.id, vendorId: vendor2.id, createdAt: daysAgo(3) },
    { title: "Science DLL Template - Grade 5", slug: "science-dll-template-grade-5", description: "Ready-to-use Daily Lesson Log template for Grade 5 Science. Editable format with DepEd standards alignment.", price: 59, salePrice: 39, image: "https://picsum.photos/seed/prod4/600/400", rating: 4.3, downloads: 156, categoryId: templates.id, vendorId: vendor1.id, createdAt: daysAgo(60) },
    { title: "Student Progress Report Form", slug: "student-progress-report-form", description: "Professional student progress report form with sections for academic performance, behavior, and parent comments.", price: 49, image: "https://picsum.photos/seed/prod5/600/400", rating: 4.6, downloads: 201, categoryId: forms.id, vendorId: vendor2.id, createdAt: daysAgo(10) },
    { title: "Canva Certificate Templates Pack", slug: "canva-certificate-templates", description: "10 beautifully designed certificate templates for Canva. Perfect for recognition day, sports fest, and academic awards.", price: 129, salePrice: 89, image: "https://picsum.photos/seed/prod6/600/400", rating: 4.7, downloads: 278, categoryId: canvaTemplates.id, vendorId: vendor1.id, createdAt: daysAgo(2) },
    { title: "Grade 1 English Phonics Activities", slug: "grade-1-english-phonics", description: "Interactive phonics activity sheets for Grade 1 English. Covers letter sounds, blending, and sight words.", price: 89, image: "https://picsum.photos/seed/prod7/600/400", rating: 4.4, downloads: 167, categoryId: worksheets.id, vendorId: vendor2.id, createdAt: daysAgo(90) },
    { title: "Math Bulletin Board Materials", slug: "math-bulletin-board", description: "Eye-catching math bulletin board materials with multiplication tables, number lines, and math vocabulary cards.", price: 69, image: "https://picsum.photos/seed/prod8/600/400", rating: 4.2, downloads: 143, categoryId: classroomDecors.id, vendorId: vendor1.id, createdAt: daysAgo(50) },
    { title: "MAPEH Lesson Plan - Grade 4", slug: "mapeh-lesson-plan-grade-4", description: "Comprehensive MAPEH lesson plan for Grade 4 covering Music, Arts, PE, and Health. Quarter 1-4 included.", price: 199, salePrice: 149, image: "https://picsum.photos/seed/prod9/600/400", rating: 4.8, downloads: 298, categoryId: lessonPlans.id, vendorId: vendor2.id, createdAt: daysAgo(1) },
    { title: "Classroom Rules Poster Set", slug: "classroom-rules-poster", description: "Set of 8 classroom rules posters with cute illustrations. Available in Filipino and English versions.", price: 39, salePrice: 19, image: "https://picsum.photos/seed/prod10/600/400", rating: 4.1, downloads: 421, categoryId: classroomDecors.id, vendorId: vendor1.id, createdAt: daysAgo(120) },
    { title: "Grade 6 Science Quiz Templates", slug: "grade-6-science-quiz", description: "Ready-made quiz templates for Grade 6 Science covering matter, energy, and living things. With answer keys.", price: 79, salePrice: 49, image: "https://picsum.photos/seed/prod11/600/400", rating: 4.5, downloads: 187, categoryId: templates.id, vendorId: vendor2.id, createdAt: daysAgo(7) },
    { title: "Parent-Teacher Conference Form", slug: "parent-teacher-conference-form", description: "Organized parent-teacher conference form with talking points, action items, and follow-up sections.", price: 29, image: "https://picsum.photos/seed/prod12/600/400", rating: 4.3, downloads: 334, categoryId: forms.id, vendorId: vendor1.id, createdAt: daysAgo(75) },
    { title: "Canva Social Media Templates for Schools", slug: "canva-social-media-schools", description: "20 Canva templates designed for school social media posts. Great for announcements, events, and achievements.", price: 149, image: "https://picsum.photos/seed/prod13/600/400", rating: 4.6, downloads: 215, categoryId: canvaTemplates.id, vendorId: vendor2.id, createdAt: daysAgo(4) },
    { title: "Araling Panlipunan DLL - Grade 3", slug: "araling-panlipunan-dll-grade-3", description: "Complete Daily Lesson Log for Araling Panlipunan Grade 3. All quarters covered with activities and assessments.", price: 169, salePrice: 119, image: "https://picsum.photos/seed/prod14/600/400", rating: 4.7, downloads: 256, categoryId: lessonPlans.id, vendorId: vendor1.id, createdAt: daysAgo(30) },
    { title: "Handwriting Practice Sheets", slug: "handwriting-practice-sheets", description: "50 pages of handwriting practice sheets for cursive and print. Suitable for Grades 1-3.", price: 59, salePrice: 35, image: "https://picsum.photos/seed/prod15/600/400", rating: 4.4, downloads: 198, categoryId: worksheets.id, vendorId: vendor2.id, createdAt: daysAgo(6) },
    { title: "Weekly Lesson Plan Template", slug: "weekly-lesson-plan-template", description: "Clean and organized weekly lesson plan template. Editable in Word and Google Docs. Includes sample entries.", price: 39, image: "https://picsum.photos/seed/prod16/600/400", rating: 4.8, downloads: 467, categoryId: templates.id, vendorId: vendor1.id, createdAt: daysAgo(100) },
  ];

  const createdProducts = [];
  for (const product of products) {
    createdProducts.push(await prisma.product.create({ data: product }));
  }

  // Create testimonials
  const testimonials = [
    { quote: "KaGuro Ph has been a game-changer for my classroom. I can now find quality, DepEd-aligned materials instantly instead of spending hours creating everything from scratch.", author: "Anna", role: "Grade 3, Cebu City" },
    { quote: "As a busy educator, I appreciate the variety and quality of resources available. It has saved me so much time in lesson planning.", author: "Maria", role: "Grade 5, Manila" },
    { quote: "The platform is user-friendly and the materials are exactly what I need for my students. Highly recommended!", author: "Juan", role: "Grade 4, Davao" },
    { quote: "I love sharing my own materials here and earning extra income. The process is simple and straightforward.", author: "Rosa", role: "Grade 6, Cebu" },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // Create sample orders for the customer user
  await prisma.order.create({
    data: {
      userId: customer.id,
      total: createdProducts[0].salePrice! + createdProducts[2].salePrice!,
      status: "COMPLETED",
      createdAt: daysAgo(14),
      items: {
        create: [
          { productId: createdProducts[0].id, price: createdProducts[0].salePrice! },
          { productId: createdProducts[2].id, price: createdProducts[2].salePrice! },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: customer.id,
      total: createdProducts[5].salePrice! + createdProducts[8].salePrice! + createdProducts[4].price,
      status: "COMPLETED",
      createdAt: daysAgo(7),
      items: {
        create: [
          { productId: createdProducts[5].id, price: createdProducts[5].salePrice! },
          { productId: createdProducts[8].id, price: createdProducts[8].salePrice! },
          { productId: createdProducts[4].id, price: createdProducts[4].price },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: customer.id,
      total: createdProducts[10].salePrice!,
      status: "PENDING",
      createdAt: daysAgo(1),
      items: {
        create: [
          { productId: createdProducts[10].id, price: createdProducts[10].salePrice! },
        ],
      },
    },
  });

  console.log("Seed data created successfully!");
  console.log(`Created ${products.length} products, ${testimonials.length} testimonials, 3 orders across ${categories.length} categories`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
