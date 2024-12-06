"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { signOut } from "@/lib/auth-client";

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <Button size="sm" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};
