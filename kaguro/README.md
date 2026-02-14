# KaGuro Ph

An educational materials marketplace inspired by [kaguro.ph](https://kaguro.ph/). Built with Next.js 16, React 19, Tailwind CSS v4, PostgreSQL, and Prisma 7.

## Project Description

KaGuro Ph is a digital marketplace where Filipino teachers can share, sell, and discover quality educational materials designed for the classroom. The platform features DepEd-aligned resources including lesson plans, worksheets, classroom decors, templates, forms, and Canva templates.

### Key Features

- **Homepage** — Hero banner, "How It Works" steps, featured products grid, stats, testimonial, and CTAs
- **Store** — Product grid with category sidebar filtering, search, sorting, and pagination
- **Product Detail** — Full product view with image, rating, vendor info, add to cart, and related products
- **Shopping Cart** — Slide-out cart drawer and full cart page with quantity controls, order summary, and checkout
- **FAQs** — Accordion sections for General, Customers, Vendors, and Affiliate Marketers
- **Contact** — Contact form with phone, email, and social links
- **Copyright** — Intellectual property policy page
- **Authentication** — Sign in and sign up with JWT sessions, password visibility toggle
- **Vendor Dashboard** — Protected vendor panel with sidebar navigation
  - Dashboard stats (active products, total downloads, est. revenue)
  - Product management (add, edit, soft delete, restore)
  - Vendors can only manage their own products
  - Account settings with profile and password update
- **Customer Dashboard** — Protected customer area with sidebar navigation
  - Dashboard stats (total orders, products purchased, total spent)
  - My Purchases with order history, status badges, and re-download links
  - Checkout flow that converts cart items into orders
  - Account settings with profile and password update
- **Admin Dashboard** — Protected admin panel with sidebar navigation
  - Dashboard stats (users, products, orders, revenue)
  - Users, Products (with active/deleted status), Vendors, Testimonials management
  - Account settings with profile and password update

## Technologies

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.0 (with @theme) |
| Database | PostgreSQL | 8.18.0 |
| ORM | Prisma | 7.3.0 |
| Database Adapter | Prisma Adapter for Postgres | 7.3.0 |
| Performance | Prisma Accelerate | 3.0.1 |
| Authentication | jose (JWT) | 6.1.3 |
| Password Hashing | bcryptjs | 3.0.3 |
| Carousel | Embla Carousel React | 8.6.0 |
| Icons | Lucide React | 0.563.0 |
| Build Tool | Turbopack | — |
| Compiler | React Compiler (Babel plugin) | 1.0.0 |

## Architecture

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (Lato font, AuthProvider, CartProvider)
│   ├── page.tsx                      # Homepage (featured products, testimonials, search)
│   ├── loading.tsx                   # Loading skeleton UI
│   ├── globals.css                   # Tailwind 4.0 with @theme custom tokens
│   ├── api/auth/                     # Auth API routes (signin, signup, signout, me)
│   ├── store/
│   │   ├── page.tsx                  # Store listing with filters, search, pagination
│   │   └── [slug]/page.tsx           # Product detail (server component)
│   ├── cart/page.tsx                 # Cart page (client component)
│   ├── faqs/page.tsx                 # FAQs with accordion
│   ├── contact/page.tsx              # Contact form
│   ├── copyright/page.tsx            # Legal/copyright info
│   ├── sign-in/page.tsx              # Authentication UI
│   ├── sign-up/page.tsx              # Registration UI
│   ├── customer/                     # Customer area (CUSTOMER role only)
│   │   ├── layout.tsx                # Customer layout with role guard
│   │   ├── CustomerSidebar.tsx       # Customer navigation sidebar
│   │   ├── page.tsx                  # Customer dashboard (stats)
│   │   ├── orders/
│   │   │   ├── page.tsx              # My Purchases list
│   │   │   ├── actions.ts            # Server actions (checkout, orders)
│   │   │   └── OrderList.tsx         # Order cards with download links
│   │   └── settings/                 # Profile & password update
│   ├── vendor/                       # Vendor panel (VENDOR role only)
│   │   ├── layout.tsx                # Vendor layout with role guard
│   │   ├── VendorSidebar.tsx         # Vendor navigation sidebar
│   │   ├── page.tsx                  # Vendor dashboard (stats)
│   │   ├── products/
│   │   │   ├── page.tsx              # My Products list
│   │   │   ├── actions.ts            # Server actions (CRUD + soft delete)
│   │   │   ├── VendorProductList.tsx  # Product table with add form
│   │   │   └── [id]/edit/            # Edit product (page + form)
│   │   └── settings/                 # Profile & password update
│   └── admin/                        # Admin panel (ADMIN role only)
│       ├── layout.tsx                # Admin layout with role guard
│       ├── AdminSidebar.tsx          # Admin navigation sidebar
│       ├── page.tsx                  # Admin dashboard (stats)
│       ├── users/page.tsx            # User management
│       ├── products/page.tsx         # Product management (with status)
│       ├── vendors/page.tsx          # Vendor management
│       ├── testimonials/             # Testimonial CRUD (page + actions)
│       └── settings/                 # Profile & password update
├── components/
│   ├── Header.tsx                    # Sticky nav, mobile menu, cart badge, role-based links
│   ├── Footer.tsx                    # 4-column footer
│   ├── ProductCard.tsx               # Product card with add to cart
│   ├── CartDrawer.tsx                # Slide-out cart drawer
│   ├── FaqAccordion.tsx              # Collapsible FAQ accordion
│   ├── TestimonialCarousel.tsx       # Embla carousel with testimonials
│   ├── NavigationProgress.tsx        # Page loading indicator
│   └── StoreContent.tsx              # Store page with filters & search
├── context/
│   ├── CartContext.tsx               # Cart state management (React Context)
│   └── AuthContext.tsx               # Auth state + role-based redirects
├── lib/
│   ├── prisma.ts                     # Prisma client singleton (pg adapter)
│   └── auth.ts                       # JWT helpers (sign, verify, session cookies)
└── generated/prisma/                 # Prisma generated client & types
```

### Design Tokens (Tailwind @theme)

```css
--color-primary: #fb1993           /* Pink */
--color-primary-dark: #4a2fd6      /* Purple */
--color-secondary: #fb1993         /* Pink */
--color-secondary-dark: #fb1993    /* Pink Dark */
--color-text-dark: #243963         /* Dark blue */
--color-light-bg: #F2F0FE          /* Light purple */
--color-light-gray: #f8f9fa        /* Light gray */
--color-yellow: #eebb26            /* Yellow accent */
--color-skyblue: #bbf5f7           /* Sky blue */
--color-skyblue-dark: #a6f2f4      /* Sky blue dark */
--color-lightyellow: #fff8e1       /* Light yellow */
--color-lightyellow-dark: #fff0cb  /* Light yellow dark */
--font-sans: "Lato", sans-serif    /* Primary font */
```

### Design Patterns

- **Server & Client Components** - Optimal Next.js 16 with App Router
- **Context API** - Global state management for cart and authentication
- **Tailwind CSS 4.0 @theme** - Centralized design tokens as CSS variables
- **Component Composition** - Reusable UI components with flexible prop patterns
- **Responsive Design** - Tailwind utilities (mobile-first approach)
- **Active State Detection** - usePathname() for header nav indicators
- **Carousel with Embla** - Performance-optimized testimonial carousel
- **React Compiler** - Babel plugin for automatic optimization

### Application Flow

```
Layout.tsx (Root)
  ├── AuthProvider + CartProvider (Context wrappers)
  ├── Header (Navigation with role-based links)
  ├── Page Routes
  │   ├── / → Homepage (featured, testimonials, search)
  │   ├── /store → Product listing & filtering
  │   ├── /store/[slug] → Product detail
  │   ├── /cart → Shopping cart + checkout
  │   ├── /faqs → FAQs accordion
  │   ├── /contact → Contact form
  │   ├── /copyright → IP policy
  │   ├── /sign-in → Login (ADMIN→/admin, VENDOR→/vendor, CUSTOMER→/customer)
  │   ├── /sign-up → Registration
  │   ├── /customer (Protected: CUSTOMER role)
  │   │   ├── /customer → Dashboard stats
  │   │   ├── /customer/orders → My Purchases (order history, downloads)
  │   │   └── /customer/settings → Profile & password
  │   ├── /vendor (Protected: VENDOR role)
  │   │   ├── /vendor → Dashboard stats
  │   │   ├── /vendor/products → My Products (add, edit, delete, restore)
  │   │   ├── /vendor/products/[id]/edit → Edit product
  │   │   └── /vendor/settings → Profile & password
  │   └── /admin (Protected: ADMIN role)
  │       ├── /admin → Dashboard stats
  │       ├── /admin/users → User management
  │       ├── /admin/products → Product management (with status)
  │       ├── /admin/vendors → Vendor management
  │       ├── /admin/testimonials → Testimonial CRUD
  │       └── /admin/settings → Admin settings
  └── Footer (Contact & links)
```

### Database Schema

- **User** — id, name, email, password, role (CUSTOMER/VENDOR/ADMIN)
- **Category** — id, name, slug
- **Product** — id, title, slug, description, price, salePrice, image, rating, downloads, categoryId, vendorId, deletedAt (soft delete)
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

> Admin users have access to the admin dashboard at `/admin`. Vendor users have access to the vendor panel at `/vendor`. Customer users have access to their account area at `/customer`.

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

# Seed with dummy data (16 products, 6 categories, 4 users, 4 testimonials, 3 orders)
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


## Video Demo

- Watch Main Page: [Link](https://youtu.be/wJ3UH23ombE)
- Watch Vendor Page: [Link](https://youtu.be/BMNakytP97Y)
- Watch Admin Page: [Link](https://youtu.be/snubukxxV7o)
- Watch Customer Page: [Link](https://youtu.be/ykPjUVHUKE0)


### Screenshots

#### Home
<img src="./docs/screenshot1.png" width="600">

#### Store
<img src="./docs/screenshot2.png" width="600">

#### Product Preview
<img src="./docs/screenshot5.png" width="600">

#### Faqs
<img src="./docs/screenshot3.png" width="600">

#### Contact Us
<img src="./docs/screenshot4.png" width="600">

#### Vendor Panel - Dashboard
<img src="./docs/screenshot6.png" width="600">

#### Vendor Panel - My Product
<img src="./docs/screenshot7.png" width="600">

#### Vendor Panel - Settings
<img src="./docs/screenshot8.png" width="600">

#### Signin
<img src="./docs/screenshot9.png" width="600">

#### Signup
<img src="./docs/screenshot10.png" width="600">

#### Admin Panel - Dashboard
<img src="./docs/screenshot11.png" width="600">

#### Admin Panel - Users
<img src="./docs/screenshot12.png" width="600">

#### Admin Panel - Products
<img src="./docs/screenshot13.png" width="600">

#### Admin Panel - Vendors
<img src="./docs/screenshot14.png" width="600">

#### Admin Panel - Testimonials
<img src="./docs/screenshot15.png" width="600">

#### Admin Panel - Settings
<img src="./docs/screenshot16.png" width="600">

#### Customer Panel - Dashboard
<img src="./docs/screenshot17.png" width="600">

#### Customer Panel - My Purchase
<img src="./docs/screenshot18.png" width="600">

#### Customer Panel - Settings
<img src="./docs/screenshot19.png" width="600">
