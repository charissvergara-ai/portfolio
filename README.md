# Portfolio Monorepo

This repository contains frontend projects created as portfolio pieces.

## Angular Projects

- **helping-hands** — path: `helping-hands`
  - Description: Charity website for Helping Hands, Inc. — a 501(c)(3) nonprofit providing free cleft lip and palate surgery for children in the Philippines. Features 9 pages including sponsorships, medical missions, filterable family gallery, team profiles, and contact form. Built with Angular 21, TypeScript, SCSS, Angular Signals, and standalone components.
  - Run:
    ```bash
    cd helping-hands
    npm install
    ng serve
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

- React projects use Vite. Angular project uses Angular CLI.
- Ensure Node.js (LTS) is installed.
- To build for production:
  - React projects: `npm run build`
  - Angular project: `ng build`