import { redirect } from "next/navigation";

import Header from "@/components/layout/Header";
import { getSession } from "@/utils/get-session";

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await getSession();

  if (!session || !session.session) {
    redirect("/sign-in");
  }

  return (
    <>
      <Header session={session} />
      <main className="grid w-full min-h-dvh place-items-center">
        {children}
      </main>
    </>
  );
};

export default Layout;
