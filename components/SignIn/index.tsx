"use client";
import { signIn, signOut, useSession } from "next-auth/react";

// Helper function
const wrapText = (text: string, width: number = 10): string => {
  return text.replace(new RegExp(`(.{${width}})`, "g"), "$1\n");
};

// In your component:
const MyComponent = ({ session }: { session: any }) => {
  const jsonStr = JSON.stringify(session, null, 2); // optional formatting
  return <pre>{wrapText(jsonStr, 30)}</pre>;
};

export const SignIn = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <MyComponent session={session} />
        Signed in as {session?.user?.name?.slice(0, 10)} <br />
        Email {session?.user?.email?.slice(0, 10)} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
};
