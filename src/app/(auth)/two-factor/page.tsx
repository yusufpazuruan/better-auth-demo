import { redirect } from "next/navigation";

import { TwoFactorForm } from "@/components/TwoFactorForm";

type TwoFactorPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const TwoFactorPage = async ({ searchParams }: TwoFactorPageProps) => {
  const afterSignIn = Boolean((await searchParams).afterSignIn === "true");

  if (!afterSignIn) redirect("/");

  return <TwoFactorForm />;
};

export default TwoFactorPage;
