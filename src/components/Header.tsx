import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <header className="relative">
      <h1 className="m-4 font-extrabold">HP</h1>
      {session ? (
        <>
          <button className="absolute top-0 right-4" onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      ) : (
        <button
          className="absolute top-0 right-4"
          onClick={() => signIn("discord")}
        >
          Sign In
        </button>
      )}
    </header>
  );
}
