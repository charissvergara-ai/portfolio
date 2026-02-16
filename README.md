# Portfolio Monorepo

This repository contains frontend projects created as portfolio pieces.

## Full-Stack Projects

- **dentafy** — path: `dentafy`
  - Description: Full-stack dental clinic web application with appointment booking, contact inquiries, and role-based dashboards for doctors and customers. Backend is a GraphQL API (Express + Apollo Server) with PostgreSQL via Prisma 7 and JWT authentication. Frontend is an Angular 21 SPA with standalone components, Signals, reactive forms, and SCSS. Includes 88 unit tests across backend and frontend using Vitest.
  - Run:
    ```bash
    cd dentafy/backend
    npm install
    npx prisma dev            # Start local PostgreSQL (keep running)
    npx prisma migrate dev    # Run migrations (new terminal)
    npx prisma generate
    npm run seed
    npm run dev

    cd dentafy/front-end
    npm install
    npm start
    ```

## Angular Projects

- **helping-hands** — path: `helping-hands`
  - Description: Charity website for Helping Hands, Inc. — a 501(c)(3) nonprofit providing free cleft lip and palate surgery for children in the Philippines. Features 9 pages including sponsorships, medical missions, filterable family gallery, team profiles, and contact form. Built with Angular 21, TypeScript, SCSS, Angular Signals, and standalone components.
  - Run:
    ```bash
    cd helping-hands
    npm install
    ng serve
    ```

## Next.js Projects

- **kaguro** — path: `kaguro`
  - Description: Educational materials marketplace inspired by kaguro.ph. Teachers can browse, sell, and discover DepEd-aligned resources. Features product store with category filtering, shopping cart, product detail pages, FAQ accordion, contact form, and auth pages. Built with Next.js 16, React 19, Tailwind CSS v4, PostgreSQL, and Prisma 7.
  - Run:
    ```bash
    cd kaguro
    npm install
    npx prisma dev          # Start local PostgreSQL
    npx prisma migrate dev  # Run migrations
    npm run seed             # Seed dummy data
    npm run dev
    ```

## React Projects

- dashboard — path: `dashboard`
  - Description: Admin dashboard layout with charts and orders.
  - Run:
    ```bash
    cd dashboard
    npm install
    npm run dev
    ```
- flower-shop — path: `flower-shop`
  - Description: Small e-commerce style shop for flowers.
  - Run:
    ```bash
    cd flower-shop  
    npm install
    npm run dev
    ```
- personal-website — path: `personal-website`
  - Description: Personal portfolio website.
  - Run:
    ```bash
    cd personal-website
    npm install
    npm run dev
    ```

## Notes

- React projects use Vite. Angular projects use Angular CLI. Next.js project uses Turbopack. Dentafy uses Express + Apollo Server (backend) and Angular CLI (frontend).
- Ensure Node.js (LTS) is installed.
- To build for production:
  - React projects: `npm run build`
  - Angular projects: `ng build` / `npm run build`
  - Next.js project: `npm run build`
  - Dentafy backend: `npm run build`