"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

// Helper function
const wrapText = (text: string, width: number = 10): string => {
  return text.replace(new RegExp(`(.{${width}})`, "g"), "$1\n");
};

// In your component:
const MyComponent = ({ session }: { session: any }) => {
  const jsonStr = JSON.stringify(session, null, 2); // optional formatting
  return <pre>{wrapText(jsonStr, 30)}</pre>;
};

export const SignIn = ({
  onSessionChange,
}: {
  onSessionChange: (session: any) => void;
}) => {
  const { data: session } = useSession();

  useEffect(() => {
    onSessionChange?.(session);
  }, [session]);

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
