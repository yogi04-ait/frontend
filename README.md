# Frontend (React + Vite)

Lightweight React frontend scaffolded with Vite. Includes a component library built with Radix UI primitives, Tailwind tooling, and a routes-based structure.

**Quick overview**

- **Framework:** React 19 with Vite
- **Styling / UI:** Tailwind CSS (via `@tailwindcss/vite`) + Radix UI primitives
- **Routing:** `react-router-dom` with route files under `src/routes/`
- **HTTP:** `axios` for API calls

**What you'll find in this repo**

- Source entry: [src/main.jsx](src/main.jsx)
- App root: [src/App.jsx](src/App.jsx)
- Route views: [src/routes/](src/routes/)
- Reusable UI primitives: [src/components/ui/](src/components/ui/)
- Helpers & API client: [src/lib/api.js](src/lib/api.js), [src/lib/utils.js](src/lib/utils.js)
- Project config: [package.json](package.json) and [vite.config.js](vite.config.js)

Getting started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
npm run preview
```

Available npm scripts (from `package.json`)

- `dev` — start Vite dev server with HMR
- `build` — produce production build via Vite
- `preview` — locally preview the production build
- `lint` — run ESLint across the project

Notes on dependencies

- This project uses a collection of `@radix-ui` packages for accessible primitives, plus utility libraries like `clsx`, `axios`, `recharts`, and `lucide-react` for icons.
- Tailwind tooling is present (`tailwindcss`, `@tailwindcss/vite`) — check `vite.config.js` for integration.

Project structure (important files)

- [index.html](index.html) — HTML entry
- [src/main.jsx](src/main.jsx) — React entry
- [src/App.jsx](src/App.jsx) — application shell
- [src/routes/Index.jsx](src/routes/Index.jsx) — homepage route
- [src/components/](src/components/) — page components and layout
- [src/components/ui/](src/components/ui/) — low-level UI primitives
- [src/lib/api.js](src/lib/api.js) — API helpers

Recommendations & next steps

- Add a short `CONTRIBUTING.md` with commit/style guidelines if multiple contributors will work on the repo.
- Add a tiny `README` section documenting any environment variables or backend API base URL expected by `src/lib/api.js`.
- Optionally add CI (GitHub Actions) to run `npm test`/`npm run lint` and `npm run build` on push.

Contributing

Contributions are welcome. Open issues for bugs or feature requests and create pull requests for fixes.

License

Specify a license for the project (e.g., MIT) by adding a `LICENSE` file.

---

_Generated README updated to reflect this project's structure and scripts._
