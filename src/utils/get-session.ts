import { cache } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

// @cache lets you cache the result of a data fetch or computation.
// @see https://react.dev/reference/react/cache

export const getSession = cache(async () => {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  return session;
});
