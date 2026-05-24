"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { nextFetch } from "@/utils/nextFetch";

function Forgotpassword() {
  const router = useRouter();

  // handle forgot password
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const res = await nextFetch("/auth/forgot-password-otp", {
      method: "POST",
      body: { email },
    });
    if (res.success) {
      toast.success(res.message, { id: "forgot-password" });
      router.push(`/auth/verify-otp?token=${res.data.forgetToken}&email=${email}`);
    } else {
      toast.error(res.message, { id: "forgot-password" });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          <ArrowLeftIcon className="size-4 shrink-0" aria-hidden />
          Back to login
        </Link>

        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot password?
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we&apos;ll send you a verification
            code.
          </p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleForgotPassword}>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            className="h-11"
            required
          />
        </div>

        <Button
          type="submit"
          className="h-11 w-full bg-violet-600 text-white hover:bg-violet-600/90"
        >
          Send verification code
        </Button>
      </form>

      <Separator className="bg-border" />

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Forgotpassword;
