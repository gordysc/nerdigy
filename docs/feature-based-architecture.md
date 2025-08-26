# Feature-Based Architecture

## Overview

This project follows a **feature-based architecture** pattern, organizing code by business features rather than technical layers. This approach improves code organization, maintainability, and developer experience by keeping related code together.

## Directory Structure

```
app/                    # Next.js App Router pages and layouts
├── (app)/             # Protected routes group
├── (auth)/            # Authentication routes group
│   ├── login/
│   └── signup/
└── layout.tsx         # Root layout with providers

features/              # Feature modules (core business logic)
├── auth/             # Authentication feature
│   ├── actions.ts    # Server actions
│   ├── session.ts    # Session management utilities
│   └── components/   # Feature-specific components
│       ├── login-form.tsx
│       └── signup-form.tsx
└── [feature-name]/   # Other features follow same pattern

components/           # Shared UI components
├── ui/              # shadcn/ui components
└── theme/           # Theme-related components

db/                  # Database layer
├── index.ts        # Database connection
├── schema.ts       # Drizzle ORM schemas
└── migrations/     # SQL migrations

lib/                # Shared utilities
└── utils.ts        # Common utility functions

hooks/              # Shared React hooks
```

## Feature Module Structure

Each feature module is self-contained and follows this structure:

```
features/[feature-name]/
├── actions.ts         # Server actions (API layer)
├── components/        # Feature-specific components
│   └── *.tsx
├── hooks/            # Feature-specific hooks (optional)
├── utils/            # Feature-specific utilities (optional)
└── types.ts          # Feature-specific types (optional)
```

## Key Principles

### 1. **Cohesion Over Separation**

Related code lives together. A feature's components, actions, utilities, and types are all in the same folder, making it easy to understand and modify the feature.

### 2. **Clear Dependencies**

- Features can import from `@/components`, `@/lib`, `@/hooks`, and `@/db`
- Features should NOT import from other features directly
- Shared code goes in the appropriate shared directory

### 3. **Server/Client Separation**

- Server actions (`"use server"`) go in `actions.ts`
- Client components (`"use client"`) go in `components/`
- Utilities can be shared between server and client

### 4. **Progressive Disclosure**

Start simple with just `actions.ts` and `components/`, add additional structure (hooks, utils, types) only when needed.

## Example: Authentication Feature

```
features/auth/
├── actions.ts         # login(), signup(), logout(), getUser()
├── session.ts         # Session management utilities
└── components/
    ├── login-form.tsx   # Login form component
    └── signup-form.tsx  # Signup form component
```

The authentication feature encapsulates:

- **Business Logic**: User authentication, session management
- **Server Actions**: Login, signup, logout operations
- **UI Components**: Forms for user interaction
- **Utilities**: Password hashing, session validation

## Benefits

1. **Improved Developer Experience**
   - Easy to find all code related to a feature
   - Reduces context switching
   - Clear mental model

2. **Better Maintainability**
   - Changes to a feature are localized
   - Easy to understand feature dependencies
   - Simple to remove or refactor features

3. **Scalability**
   - New features don't complicate existing ones
   - Team members can work on different features independently
   - Clear boundaries prevent coupling

4. **Testability**
   - Features can be tested in isolation
   - Clear interfaces make mocking easier
   - Integration tests can focus on feature boundaries

## Adding a New Feature

1. Create a new directory under `features/`
2. Add `actions.ts` for server-side logic
3. Create `components/` directory for UI components
4. Add feature-specific utilities, hooks, or types as needed
5. Import and use the feature in your pages

Example:

```bash
features/
└── posts/
    ├── actions.ts        # createPost(), updatePost(), deletePost()
    └── components/
        ├── post-list.tsx
        ├── post-form.tsx
        └── post-card.tsx
```

## Best Practices

1. **Keep features focused**: Each feature should have a single, clear responsibility
2. **Minimize cross-feature dependencies**: Use events or shared services for communication
3. **Document feature APIs**: Clear documentation in `actions.ts` for server actions
4. **Consistent naming**: Use consistent naming patterns across features
5. **Lazy load when possible**: Dynamic imports for large feature components

## Anti-Patterns to Avoid

❌ **Importing between features directly**

```typescript
// Bad: features/posts importing from features/auth
import { validateUser } from "@/features/auth/utils";
```

❌ **Putting shared code in features**

```typescript
// Bad: Common utility in a feature
features / auth / utils / formatDate.ts; // Should be in lib/
```

❌ **Mixing concerns in a single feature**

```typescript
// Bad: Unrelated functionality in one feature
features/user/
├── profile/       // User profile
├── analytics/     // App analytics (should be separate)
└── billing/       // Billing (should be separate)
```

## Migration Strategy

When migrating from a traditional layered architecture:

1. Identify feature boundaries in existing code
2. Create feature directories
3. Move related components, actions, and utilities together
4. Update imports to use the new structure
5. Test thoroughly
6. Remove old directories

## Conclusion

Feature-based architecture provides a scalable, maintainable way to organize code that aligns with how we think about business requirements. By keeping related code together and maintaining clear boundaries, we create a codebase that's easier to understand, modify, and extend.
