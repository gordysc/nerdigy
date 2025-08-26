# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nerdigy is a Next.js 15 application using Turbopack, TypeScript, Tailwind CSS v4, and PostgreSQL with Drizzle ORM. The project uses shadcn/ui components with Radix UI primitives.

## Development Commands

```bash
# Development
npm run dev        # Start dev server with Turbopack
npm run build      # Build production with Turbopack
npm run start      # Start production server

# Code Quality
npm run lint       # Run ESLint
npm run format     # Format with Prettier

# Database
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Apply Drizzle migrations
```

## Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router and React 19
- **Bundler**: Turbopack
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with CSS variables
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Theme**: Next-themes for dark/light mode support

### Project Structure

```
app/                # Next.js app router pages and layouts
├── (auth)/        # Auth group route for login/signup
├── globals.css    # Global styles with Tailwind directives
├── layout.tsx     # Root layout with theme provider
└── page.tsx       # Home page

components/         # UI components
├── theme/         # Theme provider and toggle components
└── ui/           # shadcn/ui components (50+ components)

db/                # Database layer
├── index.ts      # Database connection
├── schema.ts     # Drizzle schema definitions
└── migrations/   # SQL migrations

features/          # Feature-based modules
└── auth/         # Authentication feature
    ├── actions.ts        # Server actions
    └── components/       # Auth-specific components

lib/              # Utility functions
└── utils.ts      # cn() helper for className merging

hooks/            # Custom React hooks
```

### Key Patterns

1. **Path Aliases**: Use `@/` prefix for imports (maps to project root)
2. **Database**: Drizzle ORM with PostgreSQL, connection string in `DATABASE_URL` env var
3. **Component Library**: All UI components from shadcn/ui are in `components/ui/`
4. **Styling**: Use `cn()` utility from `@/lib/utils` for conditional classes
5. **Forms**: Use React Hook Form with Zod schemas for validation
6. **Theme**: Dark/light mode handled by ThemeProvider in root layout

### Database Schema

- `users` table: id, email, passwordHash, timestamps
- `sessions` table: id, userId (FK), token, timestamps

### Environment Requirements

Required environment variable:

- `DATABASE_URL`: PostgreSQL connection string

### Configuration Files

- `components.json`: shadcn/ui configuration
- `drizzle.config.ts`: Database configuration
- `eslint.config.mjs`: ESLint with Next.js presets
- `tsconfig.json`: TypeScript with strict mode and path aliases
