# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm start` - Run all apps in parallel
- `pnpm start:nextjs` - Run only Next.js ecommerce app
- `pnpm start:react` - Run React/Vite version
- `pnpm start:storybook` - Run Storybook for component development
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all applications

### Database Operations
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations  
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Drizzle Studio for database management
- `pnpm db:drop` - Drop database tables

### Testing & Quality
- `pnpm lint` - Run ESLint across all packages
- Navigate to `apps/min-commerce-nextjs` and run `npm run lint` for Next.js specific linting

## Architecture

### Monorepo Structure
This is a **Turborepo monorepo** with pnpm workspaces containing:
- `apps/min-commerce-nextjs/` - **Primary Next.js 15 ecommerce application**
- `apps/min-commerce-react/` - React/Vite version with documentation
- `apps/storybook/` - Component development environment
- `packages/` - Shared UI components and themes

### Tech Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Styled Components + Tailwind CSS, Radix UI primitives
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js with Google OAuth
- **State Management**: React Context + SWR for data fetching
- **Forms**: React Hook Form + Zod validation

### Database Schema
Key entities: `users`, `customers`, `products`, `categories`, `orders`, `orderItems`
- Schema files in `/src/database/schema/`
- Repository pattern in `/src/database/repositories/`
- Drizzle config at `apps/min-commerce-nextjs/drizzle.config.ts`

### Authentication & Authorization
- Google OAuth via NextAuth.js
- JWT sessions with 30-day expiration
- Middleware-based route protection (`middleware.ts`)
- Admin role system for protected routes (`/admin/**`)

### Key Directories
```
apps/min-commerce-nextjs/src/
├── app/                 # Next.js App Router (pages & API routes)
│   ├── admin/          # Admin dashboard pages  
│   └── api/            # Backend API endpoints
├── components/         # Reusable UI components
├── database/           # Drizzle setup, schema, repositories
├── middleware.ts       # Route protection & auth
├── providers/          # React context providers
└── types/             # TypeScript definitions
```

### Component Architecture
- Atomic design with reusable components
- Styled Components pattern with separate `styled.ts` files
- Index exports for clean imports
- Context providers for global state (CartProvider)

### Admin Features
- Product management with pagination/search
- Customer management and order tracking
- Protected admin routes with proper authorization
- Admin dashboard at `/admin`

## Development Notes

### Database Development
- Always run `pnpm db:generate` after schema changes
- Use `pnpm db:studio` to inspect database state
- Migrations are in `/drizzle/` directory

### Authentication Flow
Google OAuth → NextAuth → Database user/customer creation → JWT session

### Cart Management
Uses React Context with localStorage persistence for cart state across sessions.

### API Development
- API routes in `src/app/api/`
- Repository pattern for data access
- Middleware for authentication on protected endpoints

### Component Development
- Use Storybook (`pnpm start:storybook`) for isolated component development
- Follow existing styled-components patterns
- Maintain TypeScript typing throughout

### Environment Setup
Ensure PostgreSQL database is running and environment variables are configured for database connection and NextAuth.js before starting development.