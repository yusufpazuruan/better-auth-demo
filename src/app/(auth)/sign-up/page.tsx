import { Suspense } from "react";

import { AuthForm } from "@/components/AuthForm";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <AuthForm mode="signup" />
    </Suspense>
  );
};

export default Page;
