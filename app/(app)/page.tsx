import { ThemeToggle } from "@/components/theme/theme-toggle";
import { getUser, logout } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await getUser();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Welcome to Next.js!</h1>
      {user && (
        <div className="mb-4 text-center">
          <p className="mb-4">Logged in as: {user.email}</p>
          <form action={logout}>
            <Button type="submit" variant="outline">
              Logout
            </Button>
          </form>
        </div>
      )}
      <ThemeToggle />
    </main>
  );
}
