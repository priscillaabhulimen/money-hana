# MoneyHana — Frontend

The Next.js frontend for MoneyHana, a personal finance tracking app. It provides a dashboard with income/expense charts, transaction management, spending goals, subscription tracking, and AI-generated financial insights — all in a clean, dark-themed interface.

**Live demo:** https://moneyhana.netlify.app  
**Backend repo:** https://github.com/priscillaabhulimen/money-hana-api

---

## Tech Stack

| Technology | Why |
|---|---|
| Next.js 15 (App Router) | File-based routing, server components, easy Netlify deployment |
| Tailwind CSS + shadcn/ui | Utility-first styling with accessible, unstyled primitives |
| TanStack Query | Caching, background refetch, and mutation state out of the box |
| React Hook Form + Zod | Performant uncontrolled forms with schema-based validation |

---

## Features

- **Dashboard** — balance overview, income/expense charts, spending breakdown, recent transactions, and AI insights panel
- **Transactions** — log income and expenses with category, date, and notes; paginated table with filters
- **Goals** — set monthly spending limits per category and track progress in real time
- **Subscriptions** — track recurring payments with fixed-date or periodic billing, trial badges, and due date alerts
- **Notifications** — in-app prompts when a subscription payment is due; confirm to auto-log the expense or dismiss to advance the due date
- **Auth** — email/password login with JWT token rotation and email verification

---

## Local Setup

### Prerequisites

- Node.js 18+
- pnpm
- Backend API running locally (see [money-hana-api](https://github.com/priscillaabhulimen/money-hana-api))

### 1. Clone the repo

```bash
git clone https://github.com/priscillaabhulimen/money-hana.git
cd money-hana
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 4. Start the dev server

```bash
pnpm dev
```

The app will be available at `https://moneyhana.netlify.app`.

---

## Deployment

The frontend is deployed on Netlify with automatic deploys from the `main` branch.

Set the following environment variable in Netlify → Site configuration → Environment variables:

```
NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api/v1
```

After adding or updating env vars, trigger a fresh deploy with **Clear cache and deploy site** — `NEXT_PUBLIC_*` variables are baked in at build time.

---

## Planned Features

- **React Native mobile app** — bring the full MoneyHana experience to iOS and Android, sharing the same backend
- **Receipt scanning** — OCR to automatically parse and log transactions from photos of receipts
- **Premium tier** — gated features including advanced AI insights, custom categories, and multi-currency support
- **Budget forecasting** — project end-of-month spend based on current trajectory and subscription schedule