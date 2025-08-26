import { GalleryVerticalEnd } from "lucide-react";
import { SignupForm } from "@/features/auth/components/signup-form";
import { Footer } from "@/components/layout/footer";

export default function SignupPage() {
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
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
