# KaGuro Ph

An educational materials marketplace inspired by [kaguro.ph](https://kaguro.ph/). Built with Next.js 16, React 19, Tailwind CSS v4, PostgreSQL, and Prisma 7.

## Project Description

KaGuro Ph is a digital marketplace where Filipino teachers can share, sell, and discover quality educational materials designed for the classroom. The platform features DepEd-aligned resources including lesson plans, worksheets, classroom decors, templates, forms, and Canva templates.

### Key Features

- **Homepage** — Hero banner, "How It Works" steps, featured products grid, stats, testimonial, and CTAs
- **Store** — Product grid with category sidebar filtering, search, sorting, and pagination
- **Product Detail** — Full product view with image, rating, vendor info, add to cart, and related products
- **Shopping Cart** — Slide-out cart drawer and full cart page with quantity controls and order summary
- **FAQs** — Accordion sections for General, Customers, Vendors, and Affiliate Marketers
- **Contact** — Contact form with phone, email, and social links
- **Copyright** — Intellectual property policy page
- **Authentication** — Sign in and sign up with JWT sessions, password visibility toggle
- **Admin Dashboard** — Protected admin panel with sidebar navigation
  - Dashboard stats (users, products, orders, revenue)
  - Users, Products, Vendors, Testimonials management
  - Account settings with profile and password update

## Technologies

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Database | PostgreSQL | via Prisma Dev |
| ORM | Prisma | 7.3.0 |
| Icons | Lucide React | 0.563.0 |
| Build Tool | Turbopack | — |

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Lato font, Header, Footer, CartProvider)
│   ├── page.tsx                # Homepage (server component, fetches featured products)
│   ├── globals.css             # Tailwind imports + custom theme tokens
│   ├── store/
│   │   ├── page.tsx            # Store listing with filters, search, pagination
│   │   └── [slug]/
│   │       ├── page.tsx        # Product detail (server component)
│   │       └── AddToCartButton.tsx
│   ├── cart/page.tsx           # Cart page (client component)
│   ├── faqs/page.tsx           # FAQs with accordion
│   ├── contact/page.tsx        # Contact form
│   ├── copyright/page.tsx      # Legal/copyright info
│   ├── sign-in/page.tsx        # Sign in (UI demo)
│   └── sign-up/page.tsx        # Sign up (UI demo)
├── components/
│   ├── Header.tsx              # Sticky nav, mobile menu, cart badge
│   ├── Footer.tsx              # 4-column footer
│   ├── ProductCard.tsx         # Product card with add to cart
│   ├── CartDrawer.tsx          # Slide-out cart drawer
│   └── FaqAccordion.tsx        # Collapsible FAQ accordion
├── context/
│   └── CartContext.tsx          # Cart state management (React Context)
├── lib/
│   └── prisma.ts               # Prisma client singleton (pg adapter)
└── generated/prisma/           # Generated Prisma client
```

### Design Tokens

```css
--color-primary: #6040ff     /* Purple */
--color-secondary: #ff791f   /* Orange */
--color-text-dark: #142f5b   /* Dark blue */
--color-light-bg: #F2F0FE    /* Light purple */
```

### Database Schema

- **User** — id, name, email, password, role (CUSTOMER/VENDOR/ADMIN)
- **Category** — id, name, slug
- **Product** — id, title, slug, description, price, image, rating, downloads, categoryId, vendorId
- **Order** — id, userId, total, status (PENDING/COMPLETED/CANCELLED)
- **OrderItem** — id, orderId, productId, price
- **Testimonial** — id, quote, author, role, active, createdAt

## Demo Accounts

After seeding the database, you can sign in with these credentials:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@kaguro.ph` | `password123` |
| Vendor | `maria@kaguro.ph` | `password123` |
| Vendor | `jose@kaguro.ph` | `password123` |
| Customer | `juan@kaguro.ph` | `password123` |

> Admin users have access to the admin dashboard at `/admin`.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 10+

### Installation

```bash
npm install
```

### Database Setup

```bash
# Start local Prisma Postgres server
npx prisma dev

# In a separate terminal, run migrations
npx prisma migrate dev

# Seed with dummy data (16 products, 6 categories, 4 users, 4 testimonials)
npm run seed
```

### Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000`.

### Production Build

```bash
npm run build
npm start
```
