import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/features/auth/components/login-form";
import { Footer } from "@/components/layout/footer";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ reset?: string }>;
}) {
  const params = await searchParams;
  const showResetSuccess = params.reset === "success";
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="grid w-full lg:grid-cols-2">
          <div className="bg-muted relative hidden lg:block"></div>
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
              <a href="#" className="flex items-center gap-2 font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                Acme Inc.
              </a>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs">
                {showResetSuccess && (
                  <div className="mb-4 rounded-md bg-green-50 p-3 text-center text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Password reset successfully! You can now login with your new
                    password.
                  </div>
                )}
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
