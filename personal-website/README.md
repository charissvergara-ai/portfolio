# Personal Website / Portfolio

## Project Description

This repository contains a personal portfolio website built with React and Vite. It showcases projects, skills, and contact information through a set of focused components (Hero, About, Projects, Skills, Contact, Navbar, Footer). The site is intended to be a lightweight, performant static frontend that can be deployed to any static host or CDN.

Key goals:
- Present projects and skills clearly
- Keep the code modular and easy to extend
- Fast local development with HMR via Vite

## Quick Start

Prerequisites: Node.js (18+ recommended) and npm or pnpm.

Install and run locally:

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Architecture

- Project root: top-level Vite app with configuration in `vite.config.js`.
- Source code: `src/` contains application entry points and assets.
	- `src/main.jsx`: app bootstrap and React mounting.
	- `src/App.jsx`: top-level layout that composes page sections.
	- `src/components/`: self-contained UI components. Current components include `Hero.jsx`, `About.jsx`, `Projects.jsx`, `Skills.jsx`, `Contact.jsx`, `Navbar.jsx`, and `Footer.jsx`.
	- `src/assets/`: static images and icons used by the site.
- Styling: global styles live in `src/index.css`. Tailwind and other PostCSS tooling (if present) are configured in the project.
- Public/static files: `public/` is used for static assets served at the site root.

Component responsibilities:
- `Hero`: Landing section with name, title, and primary CTA.
- `About`: Short biography and background.
- `Projects`: Project cards or list with links and descriptions.
- `Skills`: Skill list or visual indicators.
- `Contact`: Contact form or contact links.
- `Navbar` / `Footer`: Site-wide navigation and footer content.

The app follows a simple component-driven architecture where each visible section is a separate component, making it easy to add pages or reuse components across views.

## Technologies

- Framework: React (v19)
- Bundler / Dev server: Vite
- Styling: Tailwind CSS (configured via `tailwindcss` and `@tailwindcss/vite`), plus `src/index.css` for global styles
- Linting: ESLint and related plugins (`eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)
- Build tools: `vite`, `@vitejs/plugin-react`

See `package.json` for exact dependency versions and available npm scripts.

---

If you want, I can also add a short deployment section (Netlify, Vercel, or GitHub Pages) or update the README with screenshots and a demo link. Tell me which you'd prefer.

## Screenshot

<img src="./docs/screenshot1.png" width="600">