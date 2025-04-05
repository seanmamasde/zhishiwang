import { useState } from "react";
import { PayBlock } from "@/components/Pay";
import { SignIn } from "@/components/SignIn";
import { VerifyBlock } from "@/components/Verify";
import Game from "@/components/Game/modules/Game";

export default function Home() {
  const [session, setSession] = useState(null);
  const handleSessionChange = (newSession) => {
    setSession(newSession);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      <SignIn />
      {/* <VerifyBlock />
      <PayBlock /> */}
      {session && <Game />}
    </main>
  );
}
