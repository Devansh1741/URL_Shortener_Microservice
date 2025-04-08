# ⚡ URL Shortener Microservice

A lightweight, high-performance URL shortener built using **Next.js** for the frontend, **Node.js + Express** for the backend, and **Redis** for super-fast storage and retrieval of shortened URLs.

---

## 📁 Project Structure

```bash
├── client/ #Frontend - Next.js
└── server/ # Backend - Node.js + Express + Redis
```

## Getting Started

First, run the backend server in the server folder:
Also make sure to have redis installed

```bash
node index.js
```

The express server runs on http://localhost:3001

Then run the development server in the client:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
