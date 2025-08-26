import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { validatePasswordResetToken } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    redirect("/forgot-password");
  }

  const { valid } = await validatePasswordResetToken(token);

  if (!valid) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Invalid or Expired Link</h1>
              <p className="text-muted-foreground text-sm text-balance">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
            </div>
            <div className="text-center text-sm">
              <a href="/forgot-password" className="underline underline-offset-4">
                Request new reset link
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-auto w-full max-w-sm">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}