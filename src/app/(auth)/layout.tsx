const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <main className="grid w-full min-h-dvh place-items-center">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
