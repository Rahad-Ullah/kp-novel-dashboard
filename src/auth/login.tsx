"use client";

import { useId, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { nextFetch } from "@/utils/nextFetch";
import { setCookie } from "cookies-next";

function normalizeEmail(value: string) {
    return value.trim().toLowerCase();
}

function isEmailShape(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type LoginFormValues = {
    email: string;
    password: string;
    remember: boolean;
};

function Login() {
  const emailId = useId();
  const passwordId = useId();
  const rememberId = useId();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { control, clearErrors, formState, getValues, setError } =
    useForm<LoginFormValues>({
      defaultValues: {
        email: "",
        password: "",
        remember: false,
      },
      mode: "onSubmit",
      reValidateMode: "onSubmit",
    });

  const { errors } = formState;

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    clearErrors();
    toast.loading("Logging in...", { id: "login" });

    const form = formRef.current;
    if (!form) return;

    const emailEl = form.elements.namedItem("email") as HTMLInputElement | null;
    const passwordEl = form.elements.namedItem(
      "password",
    ) as HTMLInputElement | null;

    const emailRaw = (emailEl?.value ?? "").trim();
    const passwordRaw = (passwordEl?.value ?? "").trim();
    const remember = getValues("remember");

    if (!emailRaw) {
      setError("email", { type: "required", message: "Email is required" });
      return;
    }
    if (!isEmailShape(emailRaw)) {
      setError("email", {
        type: "validate",
        message: "Enter a valid email address",
      });
      return;
    }
    if (!passwordRaw) {
      setError("password", {
        type: "required",
        message: "Password is required",
      });
      return;
    }

    const email = normalizeEmail(emailRaw);
    const password = passwordRaw;

    // Call the login API
    try {
      const res = await nextFetch("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      if (res.success) {
        toast.success(res.message, { id: "login" });
        setCookie("accessToken", res?.data?.accessToken);
        setCookie("refreshToken", res?.data?.refreshToken);
        if (remember) {
          localStorage.setItem("remember", "true");
        }
        router.push(`/${res?.data?.userData?.role}/dashboard`);
      } else {
        toast.error(res.message, { id: "login" });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "login" });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl font-semibold tracking-tight text-inherit">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to sign in to your dashboard.
        </p>
      </div>

      <form
        ref={formRef}
        className="space-y-5"
        noValidate
        onSubmit={onFormSubmit}
      >
        <div className="space-y-2">
          <Label htmlFor={emailId}>Email</Label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              validate: (v) => {
                const t = (v ?? "").trim();
                if (!t) return "Email is required";
                if (!isEmailShape(t)) return "Enter a valid email address";
                return true;
              },
            }}
            render={({ field }) => (
              <Input
                id={emailId}
                type="text"
                inputMode="email"
                autoComplete="username email"
                placeholder="name@example.com"
                aria-invalid={Boolean(errors.email)}
                className={cn(
                  "h-11 border-zinc-200 bg-zinc-50 text-zinc-950 placeholder:text-zinc-500 dark:border-zinc-300 dark:bg-zinc-50 dark:text-zinc-950 dark:placeholder:text-zinc-500",
                  errors.email && "border-destructive aria-invalid",
                )}
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          {errors.email ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor={passwordId}>Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <Input
                  id={passwordId}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  aria-invalid={Boolean(errors.password)}
                  className={cn(
                    "h-11 border-zinc-200 bg-zinc-50 pr-11 text-zinc-950 placeholder:text-zinc-500 dark:border-zinc-300 dark:bg-zinc-50 dark:text-zinc-950 dark:placeholder:text-zinc-500",
                    errors.password && "border-destructive aria-invalid",
                  )}
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </Button>
          </div>
          {errors.password ? (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <Checkbox
                id={rememberId}
                checked={field.value}
                onCheckedChange={(c) => field.onChange(c === true)}
              />
            )}
          />
          <Label
            htmlFor={rememberId}
            className="cursor-pointer font-normal text-muted-foreground"
          >
            Remember me for 30 days
          </Label>
        </div>

        <Button
          type="submit"
          className="h-11 w-full bg-violet-600 text-white hover:bg-violet-600/90"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default Login;