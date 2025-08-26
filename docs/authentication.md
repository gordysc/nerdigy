# Authentication System

## Overview

This application uses a **cookie-based session authentication** system with the following characteristics:

- **No JWT tokens**: Pure server-side sessions stored in PostgreSQL
- **HTTP-only cookies**: Secure, not accessible via JavaScript
- **bcryptjs hashing**: Industry-standard password hashing
- **Server Actions**: All auth logic runs on the server
- **Middleware protection**: Automatic route protection

## Architecture

### Components

1. **Database Tables** (`db/schema.ts`)
   - `users`: Stores user accounts
   - `sessions`: Stores active sessions

2. **Session Management** (`features/auth/session.ts`)
   - Session creation and validation
   - Cookie management
   - Password hashing utilities

3. **Server Actions** (`features/auth/actions.ts`)
   - Login, signup, logout operations
   - User retrieval

4. **Middleware** (`middleware.ts`)
   - Route protection
   - Automatic redirects

5. **UI Components** (`features/auth/components/`)
   - Login and signup forms

## Database Schema

### Users Table

```typescript
users {
  id: integer (primary key, auto-increment)
  email: varchar(255) (unique, not null)
  passwordHash: varchar(255) (not null)
  createdAt: timestamp (default: now)
  updatedAt: timestamp (default: now)
}
```

### Sessions Table

```typescript
sessions {
  id: integer (primary key, auto-increment)
  userId: integer (foreign key -> users.id)
  token: varchar(255) (unique, not null)
  createdAt: timestamp (default: now)
  expiresAt: timestamp (not null)
}
```

## Authentication Flow

### Login Process

1. User submits email and password via login form
2. Server action validates credentials:
   - Looks up user by email
   - Verifies password with bcrypt.compare()
3. If valid, creates session:
   - Generates secure random token
   - Stores session in database
   - Sets HTTP-only cookie
4. Redirects to protected route

### Session Validation

1. Middleware checks for session cookie on each request
2. If cookie exists:
   - Validates token against database
   - Checks expiration
   - Retrieves user data
3. If invalid or expired:
   - Redirects to login page

### Logout Process

1. User triggers logout action
2. Server deletes session from database
3. Removes session cookie
4. Redirects to login page

## Implementation Details

### Password Hashing

```typescript
// Hashing a password
const hashedPassword = await bcrypt.hash(password, 10);

// Verifying a password
const isValid = await bcrypt.compare(password, hashedPassword);
```

- Uses bcryptjs with 10 salt rounds
- Passwords are never stored in plain text
- Hash comparison is timing-attack resistant

### Session Tokens

```typescript
function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}
```

- 32 bytes of cryptographically secure random data
- Converted to 64-character hex string
- Unique and unpredictable

### Cookie Configuration

```typescript
cookieStore.set(SESSION_COOKIE_NAME, token, {
  httpOnly: true, // Not accessible via JavaScript
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "lax", // CSRF protection
  expires: expiresAt, // 7 days by default
  path: "/" // Available site-wide
});
```

### Route Protection

The middleware (`middleware.ts`) automatically protects routes:

```typescript
// Auth routes (public)
/login
/signup

// Protected routes (require authentication)
/* (everything else)
```

- Unauthenticated users are redirected to `/login`
- Authenticated users are redirected away from auth pages
- No manual checks needed in components

## Usage Examples

### Server Actions

#### Login

```typescript
// features/auth/actions.ts
export async function login(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return { error: "Invalid credentials" };

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return { error: "Invalid credentials" };

  await createSession(user.id);
  return { success: true };
}
```

#### Get Current User

```typescript
// In a server component
import { getUser } from "@/features/auth/actions";

export default async function Profile() {
  const user = await getUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return <div>Welcome, {user.email}!</div>;
}
```

### Client Components

#### Login Form Integration

```typescript
"use client";

import { login } from "@/features/auth/actions";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();

  async function handleSubmit(data: FormData) {
    const result = await login(data.email, data.password);

    if (result.success) {
      router.push("/");
      router.refresh(); // Refresh server components
    } else {
      // Show error
    }
  }
}
```

#### Logout Button

```typescript
import { logout } from "@/features/auth/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
  );
}
```

## Security Considerations

### Best Practices Implemented

1. **Password Security**
   - bcrypt with appropriate cost factor (10)
   - Passwords never logged or stored in plain text
   - Constant-time comparison to prevent timing attacks

2. **Session Security**
   - Cryptographically secure token generation
   - HTTP-only cookies prevent XSS attacks
   - SameSite=lax prevents CSRF attacks
   - Secure flag ensures HTTPS in production

3. **Database Security**
   - Parameterized queries prevent SQL injection
   - Foreign key constraints maintain data integrity
   - Cascade deletion removes orphaned sessions

4. **Error Handling**
   - Generic error messages prevent user enumeration
   - Detailed errors logged server-side only
   - Rate limiting should be added for production

### Security Checklist

✅ Passwords hashed with bcrypt  
✅ Sessions stored server-side  
✅ HTTP-only cookies  
✅ CSRF protection (SameSite)  
✅ Secure cookies in production  
✅ Session expiration  
✅ Automatic route protection  
⚠️ Add rate limiting (recommended)  
⚠️ Add 2FA support (optional)  
⚠️ Add session activity tracking (optional)

## Configuration

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NODE_ENV=development|production
```

### Session Duration

Default: 7 days

To modify, update `SESSION_DURATION` in `features/auth/session.ts`:

```typescript
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // milliseconds
```

### Cookie Name

Default: `session_token`

To modify, update `SESSION_COOKIE_NAME` in `features/auth/session.ts`:

```typescript
const SESSION_COOKIE_NAME = "session_token";
```

## Testing

### Create Test User

```bash
bun run tsx db/seed.ts
```

Creates a test user:

- Email: `test@example.com`
- Password: `password123`

### Manual Testing Flow

1. Start the development server: `bun run dev`
2. Navigate to `/` - should redirect to `/login`
3. Login with test credentials
4. Should redirect to `/` and show user email
5. Click logout - should redirect to `/login`
6. Try accessing `/` - should redirect to `/login`

### Automated Testing

```typescript
// Example test for login flow
test("successful login creates session", async () => {
  const result = await login("test@example.com", "password123");
  expect(result.success).toBe(true);

  // Verify session was created
  const user = await getUser();
  expect(user?.email).toBe("test@example.com");
});
```

## Troubleshooting

### Common Issues

1. **"Invalid credentials" on correct password**
   - Check if user exists in database
   - Verify password was hashed during signup
   - Check DATABASE_URL connection

2. **Redirected to login after successful login**
   - Check middleware configuration
   - Verify cookie is being set
   - Check browser cookie settings

3. **Session expires immediately**
   - Verify system time is correct
   - Check SESSION_DURATION value
   - Verify database timezone settings

4. **Can't access protected routes**
   - Check session cookie exists
   - Verify session hasn't expired
   - Check middleware matcher configuration

### Debug Helpers

```typescript
// Check current session
export async function debugSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  console.log("Session token:", token);

  if (token) {
    const session = await validateSession();
    console.log("Session data:", session);
  }
}
```

## Migration Guide

### From JWT to Sessions

1. Remove JWT libraries
2. Add session table to database
3. Replace token generation with session creation
4. Update middleware to check sessions
5. Migrate existing users (passwords need re-hashing)

### From NextAuth/Auth.js

1. Keep existing user table structure
2. Add sessions table
3. Replace NextAuth providers with custom actions
4. Update middleware configuration
5. Migrate session checks in components

## Future Enhancements

### Recommended Additions

1. **Rate Limiting**

   ```typescript
   // Prevent brute force attacks
   const attempts = await getLoginAttempts(email);
   if (attempts > 5) {
     return { error: "Too many attempts" };
   }
   ```

2. **Remember Me**

   ```typescript
   // Extend session for "remember me"
   const duration = rememberMe
     ? 30 * 24 * 60 * 60 * 1000 // 30 days
     : 7 * 24 * 60 * 60 * 1000; // 7 days
   ```

3. **Session Activity**

   ```typescript
   // Track last activity
   sessions {
     // ... existing fields
     lastActivityAt: timestamp
     ipAddress: varchar(45)
     userAgent: text
   }
   ```

4. **Password Reset**

   ```typescript
   // Email-based password reset
   export async function requestPasswordReset(email: string) {
     const token = generateResetToken();
     await saveResetToken(email, token);
     await sendResetEmail(email, token);
   }
   ```

5. **Two-Factor Authentication**
   ```typescript
   // TOTP-based 2FA
   export async function verify2FA(code: string) {
     const secret = await getUser2FASecret();
     return verifyTOTP(code, secret);
   }
   ```

## Conclusion

This authentication system provides a secure, simple, and maintainable solution for user authentication. By using server-side sessions with HTTP-only cookies, we avoid common JWT pitfalls while maintaining excellent security and user experience.
