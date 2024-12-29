"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { signOut } from "@/lib/auth-client";

import { useState } from "react";

export const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    setIsPending(true);
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <Button size="sm" onClick={handleSignOut} disabled={isPending}>
      Sign Out
    </Button>
  );
};
