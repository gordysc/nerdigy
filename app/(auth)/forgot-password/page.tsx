import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-auto w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}