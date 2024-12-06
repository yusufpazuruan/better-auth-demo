"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  signInSchema,
  signUpSchema,
  type SignInValues,
  type SignUpValues,
} from "@/zod-schemas";
import { signIn, signUp } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { OAuthSignIn } from "./OAuthSignIn";

type AuthFormProps = {
  mode?: "signin" | "signup";
};

export const AuthForm = ({ mode = "signin" }: AuthFormProps) => {
  const [isPassWord, setIsPassWord] = useState(true);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const form = useForm<SignInValues | SignUpValues>({
    resolver: zodResolver(mode === "signin" ? signInSchema : signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (data: SignUpValues) => {
    await signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          toast.success("Sign up successful");
          router.push(redirect ?? "/profile");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(
            ctx.error.message ?? "Something went wrong. Please try again."
          );
        },
      }
    );
  };

  const handleSignIn = async (data: SignInValues) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: (ctx) => {
          setLoading(false);
          if (!Boolean(ctx?.data?.twoFactorRedirect)) {
            toast.success("Sign in successful");
            router.push(redirect ?? "/profile");
          }
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(
            ctx.error.message ?? "Something went wrong. Please try again."
          );
        },
      }
    );
  };

  const onSubmit = async (values: SignInValues | SignUpValues) => {
    setLoading(true);

    if (mode === "signin") {
      const { success, data, error } = signInSchema.safeParse(values);
      if (!success) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      await handleSignIn(data);
    }

    if (mode === "signup") {
      const { success, data, error } = signUpSchema.safeParse(values);
      if (!success) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      await handleSignUp(data);
    }
  };

  const togglePassWord = () => setIsPassWord((prev) => !prev);

  return (
    <Card className="w-full sm:max-w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {mode === "signin"
            ? "Sign in to your account"
            : "Create your account"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OAuthSignIn />

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <input type="hidden" name="redirect" value={redirect || ""} />

            {mode === "signup" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <b>*</b>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        aria-required="true"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <b>*</b>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@email.com"
                      aria-required="true"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password <b>*</b>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="relative"
                        type={isPassWord ? "password" : "text"}
                        placeholder="********"
                        aria-required="true"
                        autoComplete={
                          mode === "signin"
                            ? "current-password"
                            : "new-password"
                        }
                        {...field}
                      />
                      {form.getValues("password")?.length > 0 && (
                        <Button
                          type="button"
                          size="icon"
                          variant="secondary"
                          onClick={togglePassWord}
                          className={cn(
                            "absolute right-2 -translate-y-1/2 top-1/2 size-5 [&_svg]:size-3"
                          )}
                        >
                          <span className="sr-only">
                            {isPassWord ? "Show password" : "Hide password"}
                          </span>
                          {isPassWord ? <EyeIcon /> : <EyeOffIcon />}
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading && (
                <Loader2Icon
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                {mode === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href={`${mode === "signin" ? "/sign-up" : "/sign-in"}${
              redirect ? `?redirect=${redirect}` : ""
            }`}
            className="w-full flex justify-center py-2 px-4 border border-slate-300 rounded-full shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            {mode === "signin"
              ? "Create an account"
              : "Sign in to existing account"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
