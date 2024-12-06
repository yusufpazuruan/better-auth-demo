import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-4 font-mono">
      <h2 className="font-bold text-center text-2xl md:text-4xl">
        Welcome to&nbsp;
        <code className="font-semibold bg-slate-50 py-1 px-2 rounded-md text-slate-800">
          better-auth
        </code>
        &nbsp;demo.
      </h2>

      <p>
        Already have an account?&nbsp;
        <Link
          href="/sign-in"
          className="underline underline-offset-4 text-blue-500"
        >
          Sign in
        </Link>
      </p>
      <p>
        Don&apos;t have an account?&nbsp;
        <Link
          href="/sign-up"
          className="underline underline-offset-4 text-blue-500"
        >
          Sign up
        </Link>
      </p>
      <p>
        Already signed in?&nbsp;
        <Link
          href="/profile"
          className="underline underline-offset-4 text-blue-500"
        >
          Visit Profile
        </Link>
      </p>
    </div>
  );
}
