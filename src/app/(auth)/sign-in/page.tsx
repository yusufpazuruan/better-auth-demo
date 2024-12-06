import { Suspense } from "react";

import { AuthForm } from "@/components/AuthForm";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <AuthForm />
    </Suspense>
  );
};

export default Page;
