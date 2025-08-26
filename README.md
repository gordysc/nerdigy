# Nerdigy

A modern Next.js 15 application built with TypeScript, Tailwind CSS v4, and PostgreSQL.

## Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nerdigy
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Add your DATABASE_URL to .env.local
   ```

4. **Run database migrations**

   ```bash
   bun run db:migrate
   ```

5. **Start the development server**

   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## Documentation

Explore our comprehensive documentation to understand the project architecture and best practices:

- 📚 **[Authentication Guide](./docs/authentication.md)** - Learn about the authentication system implementation
- 🏗️ **[Feature-Based Architecture](./docs/feature-based-architecture.md)** - Understand how features are organized and structured
- 📝 **[Forms with Zod & shadcn/ui](./docs/forms-with-zod-shadcn.md)** - Best practices for building forms with validation

## Tech Stack

- **Package Manager**: [Bun](https://bun.sh) - Fast all-in-one JavaScript runtime
- **Framework**: [Next.js 15](https://nextjs.org) with App Router and [React 19](https://react.dev)
- **Bundler**: [Turbopack](https://turbo.build/pack) for lightning-fast builds
- **Language**: [TypeScript](https://www.typescriptlang.org) with strict mode
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with CSS variables
- **Database**: [PostgreSQL](https://www.postgresql.org) with [Drizzle ORM](https://orm.drizzle.team)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) with [Radix UI](https://www.radix-ui.com) primitives
- **Forms**: [React Hook Form](https://react-hook-form.com) with [Zod](https://zod.dev) validation
- **Theme**: Dark/light mode support with [next-themes](https://github.com/pacocoursey/next-themes)

## Available Scripts

```bash
bun dev          # Start development server with Turbopack
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint
bun format       # Format code with Prettier
bun db:generate  # Generate Drizzle migrations
bun db:migrate   # Apply database migrations
```

## Project Structure

```
app/                # Next.js app router pages and layouts
components/         # Reusable UI components
features/           # Feature-based modules
db/                 # Database schema and migrations
lib/                # Utility functions and helpers
hooks/              # Custom React hooks
docs/               # Project documentation
```
