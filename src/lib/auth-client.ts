import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { twoFactorClient } from "better-auth/client/plugins";

import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    twoFactorClient({
      twoFactorPage: "/two-factor?afterSignIn=true",
      redirect: true,
    }),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  twoFactor,
  updateUser,
  deleteUser,
  changePassword,
} = authClient;
