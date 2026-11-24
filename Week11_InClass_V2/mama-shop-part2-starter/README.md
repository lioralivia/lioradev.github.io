# Mama Shop Part 2 — Starter (browser-first edition)

This exercise extends Mama Shop Part 1 with an Express API, login, dynamic product routes, checkout, and order history. The **Vue frontend and Express backend are separate sibling applications** in one teaching project. This is not a pnpm workspace; install dependencies independently.

## Project layout

```text
mama-shop-part2/
├── client/                       # Vue 3 / Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── router/
│   │   ├── services/api.js       # HTTP requests to Express
│   │   ├── stores/              # Pinia stores
│   │   └── views/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                       # Independent Express backend
│   ├── server.js
│   └── package.json
├── README.md
├── student-guide.md
└── youtube-narration-script.md
```

## Start the applications

**Terminal 1 — Vue frontend (from the `mama-shop-part2` parent folder):**

```bash
cd client
pnpm install
pnpm dev
```

**Terminal 2 — Express backend (open a second terminal at `mama-shop-part2`):**

```bash
cd server
pnpm install
pnpm dev
```

Open the Vite URL shown in Terminal 1 (usually `http://localhost:5173`). The backend API is at `http://localhost:8000`. Keep both processes running. Each application has its **own `package.json`**; do not run `pnpm install` or `pnpm dev` from the parent folder.


## Architecture and routing

- **Vue frontend (`client/`, usually port 5173):** `client/src/router/index.js` maps browser URLs to Vue views, `client/src/stores/` manages Pinia state, and `client/src/services/api.js` calls the backend.
- **Express backend (`server/`, port 8000):** `server/server.js` handles `GET /products`, `POST /login`, `POST /orders`, and `GET /orders`.
- Browser navigation to `/products` and the API request `GET http://localhost:8000/products` are **different operations** even though their paths look similar.
- The backend uses CORS to allow requests from the separately served frontend. The API URL is set in `client/src/services/api.js`.

## Teaching sequence

1. Browser → `client/src/views/ProductsView.vue` → products store → API helper → `server/server.js` (**TODO 1**).
2. Login page → auth store → Express login endpoint → saved demo session (**TODO 2**).
3. Product title → dynamic route; protected navigation and login redirect (**TODO 3: observation**).
4. Cart checkout button → cart store → protected orders POST (**TODO 4**).
5. Orders page → orders store → protected orders GET (**TODO 5**).

Read `student-guide.md` and `youtube-narration-script.md` in this folder. Complete TODOs in `client/src/stores/` as you follow the guide.

## Notes

- Demo login accepts any nonempty username and password, e.g. `student` / `demo`.
- Orders and sessions live in **Express process memory**. Restarting the backend resets them; log out and log in again if your saved token is rejected.
- The frontend stores a demo session in localStorage. This is **not production-grade authentication**.
- Part 2 includes the completed Part 1 cart. The starter intentionally leaves Part 2 TODOs unfinished.
