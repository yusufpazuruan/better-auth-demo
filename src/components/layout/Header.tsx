import Link from "next/link";

import { Session } from "@/lib/auth-types";
import { SignOutButton } from "@/components/SignOutButton";

const Nav_Links = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    adminOnly: true,
  },
];

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="w-full sticky top-0 bg-background border-b">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto p-4 md:px-8">
        <h2 className="font-semibold sm:text-2xl">Better Auth</h2>

        <ul className="flex items-center gap-4 md:gap-6">
          {Nav_Links.map((link) =>
            link.adminOnly && session.user.role !== "admin" ? null : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="underline underline-offset-4 text-sm md:text-base text-blue-500"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <SignOutButton />
      </div>
    </header>
  );
};

export default Header;
