"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

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
        {session?.user?.name?.slice(0, 10)}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => signIn()}>Sign in with World</button>
      </>
    );
  }
};
