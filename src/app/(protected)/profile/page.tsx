import { getSession } from "@/utils/get-session";

import { ProfilePageTabs } from "@/components/ProfileTabs";

const Page = async () => {
  const session = await getSession();

  return (
    <>
      <ProfilePageTabs session={session!} />
    </>
  );
};

export default Page;
